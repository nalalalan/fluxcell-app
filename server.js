const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");
const { execFile } = require("node:child_process");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const legacyStorageRoot = path.join(os.homedir(), "Documents", "research", "PhD Chapter 2", "Forge Files");
const focusedStorageRoot = path.join(os.homedir(), "Documents", "research", "PhD Chapter 2", "FluxCell Files");
const configuredStorageRoot = process.env.FLUXCELL_STORAGE_DIR || process.env.FORGE_STORAGE_DIR;
const storageRoot = path.resolve(
  configuredStorageRoot || (fs.existsSync(legacyStorageRoot) ? legacyStorageRoot : focusedStorageRoot)
);
const deletePassword = process.env.FLUXCELL_DELETE_PASSWORD || process.env.FORGE_DELETE_PASSWORD || "";
const maxUploadBytes = Number(process.env.FLUXCELL_MAX_UPLOAD_MB || process.env.FORGE_MAX_UPLOAD_MB || 100) * 1024 * 1024;
const legacyIndexPath = path.join(storageRoot, ".forge-files.json");
const focusedIndexPath = path.join(storageRoot, ".fluxcell-files.json");
const indexPath = fs.existsSync(legacyIndexPath) && !fs.existsSync(focusedIndexPath)
  ? legacyIndexPath
  : focusedIndexPath;
const paperPreviewRoot = path.join(storageRoot, ".fluxcell-paper-previews");
const paperPreviewVersion = 5;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".stl": "model/stl",
  ".3mf": "model/3mf",
  ".obj": "model/obj",
  ".gcode": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Private-Network", "true");
}

function sendJson(res, status, payload) {
  setCors(res);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function isInside(root, filePath) {
  const relative = path.relative(root, filePath);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function safeName(name) {
  const base = path.basename(String(name || "fluxcell-file"));
  return base.replace(/[<>:"/\\|?*\u0000-\u001f]+/g, "-").replace(/\s+/g, " ").trim().slice(0, 140) || "forge-file";
}

function dataUrlToBuffer(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;,]+)?(;base64)?,(.*)$/);
  if (!match) return null;
  const mime = match[1] || "application/octet-stream";
  const encoded = match[3] || "";
  const buffer = match[2] ? Buffer.from(encoded, "base64") : Buffer.from(decodeURIComponent(encoded), "utf8");
  return { mime, buffer };
}

async function ensureStorage() {
  await fsp.mkdir(storageRoot, { recursive: true });
}

async function readIndex() {
  await ensureStorage();
  try {
    const text = await fsp.readFile(indexPath, "utf8");
    const parsed = JSON.parse(text);
    return Array.isArray(parsed.files) ? parsed.files : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeIndex(files) {
  await ensureStorage();
  await fsp.writeFile(indexPath, JSON.stringify({ files }, null, 2));
}

async function readJsonBody(req, limitBytes) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(new Error("Request is too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const text = Buffer.concat(chunks).toString("utf8") || "{}";
        resolve(JSON.parse(text));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function isPdfEntry(entry) {
  return (entry.kind || "").toLowerCase() === "paper"
    || /pdf/i.test(entry.mime || "")
    || /\.pdf$/i.test(entry.name || "")
    || /\.pdf$/i.test(entry.relativePath || "");
}

function runTool(command, args, options = {}) {
  return new Promise((resolve) => {
    execFile(command, args, {
      timeout: options.timeout || 12000,
      maxBuffer: options.maxBuffer || 4 * 1024 * 1024,
      windowsHide: true,
    }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        error,
        stdout: String(stdout || ""),
        stderr: String(stderr || ""),
      });
    });
  });
}

function parsePdfInfo(text) {
  return String(text || "").split(/\r?\n/).reduce((info, line) => {
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (!match) return info;
    info[match[1].trim().toLowerCase()] = match[2].trim();
    return info;
  }, {});
}

function cleanPaperTitle(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/\b(The MIT Faculty has made|Please share how this access benefits you|Downloaded from).*$/i, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,:;.])/g, "$1")
    .trim()
    .replace(/[. ]+$/, "");
}

function plausiblePaperTitle(value, filename = "") {
  const title = cleanPaperTitle(value);
  if (title.length < 12 || title.length > 220) return false;
  if (/\.(pdf|dvi|docx?|pptx?|tex)$/i.test(title)) return false;
  if (/[\\/:*?"<>|]/.test(title)) return false;
  if (/\b(The MIT Faculty has made|Please share how this access benefits you|Downloaded from)\b/i.test(title)) return false;
  if (/^(untitled|microsoft word|download|article|full text|supplement)/i.test(title)) return false;
  const basename = cleanPaperTitle(path.basename(filename || "", path.extname(filename || "")));
  if (basename && title.toLowerCase() === basename.toLowerCase()) return false;
  const words = title.match(/[A-Za-z][A-Za-z-]+/g) || [];
  return words.length >= 3;
}

function isPaperTitleStopLine(line) {
  return /^(abstract|introduction|keywords?|references?|citation:|as published:|publisher:|persistent url:|version:|terms of use|the mit faculty|check for updates|open access)$/i.test(line)
    || /^doi\b|^https?:\/\//i.test(line);
}

function isPaperTitleNoiseLine(line) {
  if (!line) return true;
  if (/^(communications engineering|nature portfolio|mit open access articles|article|research article|open access|www\.|doi\b)/i.test(line)) return true;
  if (/^(received|accepted|published|vol\.|no\.|page|pages)\b/i.test(line)) return true;
  if (/^\d+\s*$/.test(line)) return true;
  if ((line.match(/[A-Za-z]/g) || []).length < 8) return true;
  return false;
}

function isLikelyAuthorLine(line) {
  return /,/.test(line) && /(?:\b[A-Z][a-z]+\.?\s+){2,}/.test(line);
}

function titleFromPdfText(text, filename) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map(cleanPaperTitle)
    .filter(Boolean);

  for (let index = 0; index < Math.min(lines.length, 80); index += 1) {
    const line = lines[index];
    if (isPaperTitleNoiseLine(line) || isPaperTitleStopLine(line)) continue;
    const words = line.match(/[A-Za-z][A-Za-z-]+/g) || [];
    if (words.length < 4) continue;

    const titleLines = [line];
    for (let nextIndex = index + 1; nextIndex < Math.min(lines.length, index + 5); nextIndex += 1) {
      const nextLine = lines[nextIndex];
      if (isPaperTitleStopLine(nextLine) || isPaperTitleNoiseLine(nextLine)) break;
      if (isLikelyAuthorLine(nextLine)) break;
      const nextWords = nextLine.match(/[A-Za-z][A-Za-z-]+/g) || [];
      if (nextWords.length < 2) break;
      titleLines.push(nextLine);
      if (titleLines.join(" ").length > 150 || titleLines.length >= 3) break;
    }

    const title = cleanPaperTitle(titleLines.join(" "));
    if (plausiblePaperTitle(title, filename)) return title;
  }

  return "";
}

async function analyzePdf(filePath, entry) {
  const infoResult = await runTool("pdfinfo", [filePath], { timeout: 10000 });
  const info = parsePdfInfo(infoResult.stdout);
  let title = plausiblePaperTitle(info.title, entry.name) ? cleanPaperTitle(info.title) : "";

  if (!title) {
    const textResult = await runTool("pdftotext", ["-f", "1", "-l", "2", "-layout", filePath, "-"], {
      timeout: 12000,
      maxBuffer: 8 * 1024 * 1024,
    });
    title = titleFromPdfText(textResult.stdout, entry.name);
  }

  return {
    title,
    pages: Number.parseInt(info.pages || "4", 10) || 4,
  };
}

async function cleanupPreviewTemps(prefixBase) {
  const names = await fsp.readdir(paperPreviewRoot).catch(() => []);
  await Promise.all(names
    .filter((name) => name.startsWith(prefixBase))
    .map((name) => fsp.rm(path.join(paperPreviewRoot, name), { force: true }).catch(() => {})));
}

function parsePdfImageList(text) {
  return String(text || "").split(/\r?\n/)
    .map((line) => line.trim().split(/\s+/))
    .filter((parts) => /^\d+$/.test(parts[0] || "") && /^\d+$/.test(parts[1] || ""))
    .map((parts) => ({
      page: Number(parts[0]),
      num: Number(parts[1]),
      type: parts[2],
      width: Number(parts[3]),
      height: Number(parts[4]),
      enc: parts[8] || "",
      ratio: Number(String(parts[parts.length - 1] || "0").replace("%", "")) || 0,
    }))
    .filter((image) => image.type === "image"
      && image.width >= 180
      && image.height >= 120
      && image.width * image.height >= 80000);
}

async function findNotablePdfImage(filePath) {
  const result = await runTool("pdfimages", ["-list", filePath], {
    timeout: 12000,
    maxBuffer: 4 * 1024 * 1024,
  });
  const images = parsePdfImageList(result.stdout);
  if (!images.length) return null;
  const candidates = images.some((image) => image.page > 1)
    ? images.filter((image) => image.page > 1)
    : images;
  const firstFigurePage = Math.min(...candidates.map((image) => image.page));
  return candidates
    .filter((image) => image.page === firstFigurePage)
    .sort((a, b) => {
      const ratioDelta = b.ratio - a.ratio;
      if (Math.abs(ratioDelta) > 0.5) return ratioDelta;
      return (b.width * b.height) - (a.width * a.height);
    })[0];
}

async function extractDisplayablePdfImage(entry, filePath, image) {
  await fsp.mkdir(paperPreviewRoot, { recursive: true });
  const prefixBase = `${entry.id}-image`;
  const prefix = path.join(paperPreviewRoot, prefixBase);
  await cleanupPreviewTemps(prefixBase);

  await runTool("pdfimages", ["-j", "-f", String(image.page), "-l", String(image.page), filePath, prefix], {
    timeout: 20000,
    maxBuffer: 2 * 1024 * 1024,
  });

  const rendered = (await fsp.readdir(paperPreviewRoot).catch(() => []))
    .filter((name) => name.startsWith(prefixBase) && /\.(jpe?g)$/i.test(name))
    .map((name) => path.join(paperPreviewRoot, name));
  if (!rendered.length) return null;

  const stats = await Promise.all(rendered.map(async (renderedPath) => ({
    path: renderedPath,
    size: (await fsp.stat(renderedPath)).size,
  })));
  stats.sort((a, b) => b.size - a.size);

  const finalPath = path.join(paperPreviewRoot, `${entry.id}.jpg`);
  await fsp.copyFile(stats[0].path, finalPath);
  await cleanupPreviewTemps(prefixBase);

  return {
    previewRelativePath: path.relative(storageRoot, finalPath).split(path.sep).join("/"),
    previewUpdatedAt: new Date().toISOString(),
    previewVersion: paperPreviewVersion,
  };
}

async function renderPdfPagePreview(entry, filePath, page) {
  await fsp.mkdir(paperPreviewRoot, { recursive: true });
  const prefixBase = `${entry.id}-page`;
  const prefix = path.join(paperPreviewRoot, prefixBase);
  await cleanupPreviewTemps(prefixBase);

  await runTool("pdftoppm", ["-jpeg", "-r", "115", "-f", String(page), "-l", String(page), "-singlefile", filePath, prefix], {
    timeout: 20000,
    maxBuffer: 2 * 1024 * 1024,
  });

  const rendered = (await fsp.readdir(paperPreviewRoot).catch(() => []))
    .filter((name) => name.startsWith(prefixBase) && /\.(jpe?g)$/i.test(name))
    .map((name) => path.join(paperPreviewRoot, name));
  if (!rendered.length) return null;

  const finalPath = path.join(paperPreviewRoot, `${entry.id}.jpg`);
  await fsp.copyFile(rendered[0], finalPath);
  await cleanupPreviewTemps(prefixBase);

  return {
    previewRelativePath: path.relative(storageRoot, finalPath).split(path.sep).join("/"),
    previewUpdatedAt: new Date().toISOString(),
    previewVersion: paperPreviewVersion,
  };
}

async function createPdfPreview(entry, filePath, pageCount) {
  const notableImage = await findNotablePdfImage(filePath);
  if (notableImage) {
    const extracted = await extractDisplayablePdfImage(entry, filePath, notableImage);
    if (extracted) return extracted;
    const rendered = await renderPdfPagePreview(entry, filePath, notableImage.page);
    if (rendered) return rendered;
  }

  const fallbackPage = Math.min(Math.max(pageCount || 1, 1), 4);
  const fallback = await renderPdfPagePreview(entry, filePath, fallbackPage);
  if (fallback) return fallback;
  return null;
}

async function enrichPdfEntry(entry) {
  if (!isPdfEntry(entry)) return { entry, changed: false };
  if (!entry.relativePath) return { entry: { ...entry, kind: "paper" }, changed: entry.kind !== "paper" };

  const filePath = path.resolve(storageRoot, entry.relativePath);
  if (!isInside(storageRoot, filePath)) return { entry, changed: false };
  if (!fs.existsSync(filePath)) return { entry, changed: false };

  const next = {
    ...entry,
    kind: "paper",
    mime: entry.mime || "application/pdf",
  };
  let changed = entry.kind !== next.kind || entry.mime !== next.mime;
  let analysis = null;

  const currentTitle = cleanPaperTitle(next.paperTitle);
  if (plausiblePaperTitle(currentTitle, next.name)) {
    if (next.paperTitle !== currentTitle) {
      next.paperTitle = currentTitle;
      changed = true;
    }
  } else {
    analysis = await analyzePdf(filePath, next);
    if (analysis.title) {
      next.paperTitle = analysis.title;
      changed = true;
    }
  }

  const previewPath = next.previewRelativePath
    ? path.resolve(storageRoot, next.previewRelativePath)
    : "";
  const hasPreview = previewPath
    && isInside(storageRoot, previewPath)
    && fs.existsSync(previewPath)
    && next.previewVersion === paperPreviewVersion;
  if (!hasPreview) {
    analysis = analysis || await analyzePdf(filePath, next);
    const preview = await createPdfPreview(next, filePath, analysis.pages);
    if (preview) {
      Object.assign(next, preview);
      changed = true;
    }
  }

  return { entry: next, changed };
}

async function enrichPdfEntries(files) {
  let changed = false;
  const nextFiles = [];
  for (const file of files) {
    const result = await enrichPdfEntry(file);
    nextFiles.push(result.entry);
    changed = changed || result.changed;
  }
  if (changed) await writeIndex(nextFiles);
  return nextFiles;
}

async function saveTrackedFile({ name, mime, buffer, kind = "file" }) {
  if (buffer.length > maxUploadBytes) {
    const maxMb = Math.round(maxUploadBytes / 1024 / 1024);
    throw new Error(`File exceeds ${maxMb} MB`);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const date = now.slice(0, 10);
  const folder = kind === "note" ? "Notes" : kind === "paper" ? "Papers" : "Uploads";
  const originalName = safeName(name);
  const storedName = `${now.replace(/[:.]/g, "-")}-${originalName}`;
  const folderPath = path.join(storageRoot, folder, date);
  const filePath = path.join(folderPath, storedName);

  if (!isInside(storageRoot, filePath)) {
    throw new Error("Invalid storage path");
  }

  await fsp.mkdir(folderPath, { recursive: true });
  await fsp.writeFile(filePath, buffer);

  const entry = {
    id,
    name: originalName,
    mime: mime || mimeTypes[path.extname(originalName).toLowerCase()] || "application/octet-stream",
    size: buffer.length,
    kind,
    relativePath: path.relative(storageRoot, filePath).split(path.sep).join("/"),
    createdAt: now,
  };

  const files = await readIndex();
  files.unshift(entry);
  await writeIndex(files);
  return entry;
}

async function handleApi(req, res, requestUrl) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (requestUrl.pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, {
      app: "FluxCell",
      sync: true,
      storageRoot,
      deleteConfigured: Boolean(deletePassword),
      maxUploadMb: Math.round(maxUploadBytes / 1024 / 1024),
    });
    return;
  }

  if (requestUrl.pathname === "/api/files" && req.method === "GET") {
    sendJson(res, 200, { files: await enrichPdfEntries(await readIndex()) });
    return;
  }

  if (requestUrl.pathname === "/api/files" && req.method === "POST") {
    const payload = await readJsonBody(req, Math.ceil(maxUploadBytes * 1.38) + 4096);
    const decoded = dataUrlToBuffer(payload.dataUrl);
    if (!decoded) {
      sendJson(res, 400, { error: "Missing file data" });
      return;
    }
    const saved = await saveTrackedFile({
      name: payload.name,
      mime: payload.mime || decoded.mime,
      buffer: decoded.buffer,
      kind: payload.kind === "paper" || /\.pdf$/i.test(payload.name || "") || /pdf/i.test(payload.mime || decoded.mime)
        ? "paper"
        : "file",
    });
    const files = await enrichPdfEntries(await readIndex());
    const entry = files.find((file) => file.id === saved.id) || saved;
    sendJson(res, 201, { file: entry });
    return;
  }

  if (requestUrl.pathname === "/api/notes" && req.method === "POST") {
    const payload = await readJsonBody(req, 1024 * 1024);
    const text = String(payload.text || "").trim();
    if (!text) {
      sendJson(res, 400, { error: "Missing note text" });
      return;
    }
    sendJson(res, 201, {
      note: {
        id: crypto.randomUUID(),
        text,
        createdAt: new Date().toISOString(),
      },
    });
    return;
  }

  const previewMatch = requestUrl.pathname.match(/^\/api\/files\/([^/]+)\/preview$/);
  if (previewMatch && req.method === "GET") {
    const files = await enrichPdfEntries(await readIndex());
    const entry = files.find((file) => file.id === previewMatch[1]);
    const previewRelativePath = entry?.previewRelativePath;
    if (!entry || !previewRelativePath) {
      sendJson(res, 404, { error: "Preview not found" });
      return;
    }
    const previewPath = path.resolve(storageRoot, previewRelativePath);
    if (!isInside(storageRoot, previewPath)) {
      sendJson(res, 403, { error: "Invalid preview path" });
      return;
    }
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Cache-Control": "no-store",
    });
    fs.createReadStream(previewPath).pipe(res);
    return;
  }

  const fileServeMatch = requestUrl.pathname.match(/^\/api\/files\/([^/]+)\/(download|view)$/);
  if (fileServeMatch && req.method === "GET") {
    const files = await readIndex();
    const entry = files.find((file) => file.id === fileServeMatch[1]);
    if (!entry) {
      sendJson(res, 404, { error: "File not found" });
      return;
    }
    const filePath = path.resolve(storageRoot, entry.relativePath);
    if (!isInside(storageRoot, filePath)) {
      sendJson(res, 403, { error: "Invalid file path" });
      return;
    }
    const disposition = fileServeMatch[2] === "view" ? "inline" : "attachment";
    res.writeHead(200, {
      "Content-Type": entry.mime || mimeTypes[path.extname(entry.name).toLowerCase()] || "application/octet-stream",
      "Content-Disposition": `${disposition}; filename="${entry.name.replace(/"/g, "")}"`,
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  const deleteMatch = requestUrl.pathname.match(/^\/api\/files\/([^/]+)$/);
  if (deleteMatch && req.method === "DELETE") {
    const payload = await readJsonBody(req, 16 * 1024).catch(() => ({}));
    if (!deletePassword) {
      sendJson(res, 403, { error: "Delete password is not configured on this sync server" });
      return;
    }
    if (payload.password !== deletePassword) {
      sendJson(res, 403, { error: "Wrong delete password" });
      return;
    }

    const files = await readIndex();
    const entry = files.find((file) => file.id === deleteMatch[1]);
    if (!entry) {
      sendJson(res, 404, { error: "File not found" });
      return;
    }
    const filePath = path.resolve(storageRoot, entry.relativePath);
    if (!isInside(storageRoot, filePath)) {
      sendJson(res, 403, { error: "Invalid file path" });
      return;
    }
    await fsp.rm(filePath, { force: true });
    await writeIndex(files.filter((file) => file.id !== entry.id));
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { error: "Not found" });
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendText(res, 404, "Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (requestUrl.pathname.startsWith("/api/")) {
    handleApi(req, res, requestUrl).catch((error) => {
      console.error(error);
      sendJson(res, 500, { error: error.message || "Server error" });
    });
    return;
  }

  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === "/") pathname = "/index.html";

  const normalizedPath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, normalizedPath);

  if (!isInside(publicDir, filePath) && filePath !== publicDir) {
    sendText(res, 403, "Forbidden");
    return;
  }

  sendFile(res, filePath);
});

server.listen(port, () => {
  console.log(`FluxCell running at http://localhost:${port}`);
  console.log(`FluxCell local sync folder: ${storageRoot}`);
});
