const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const storageRoot = path.resolve(
  process.env.FORGE_STORAGE_DIR ||
    path.join(os.homedir(), "Documents", "research", "PhD Chapter 2", "Forge Files")
);
const deletePassword = process.env.FORGE_DELETE_PASSWORD || "";
const maxUploadBytes = Number(process.env.FORGE_MAX_UPLOAD_MB || 100) * 1024 * 1024;
const indexPath = path.join(storageRoot, ".forge-files.json");

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
  const base = path.basename(String(name || "forge-file"));
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

async function saveTrackedFile({ name, mime, buffer, kind = "file" }) {
  if (buffer.length > maxUploadBytes) {
    const maxMb = Math.round(maxUploadBytes / 1024 / 1024);
    throw new Error(`File exceeds ${maxMb} MB`);
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const date = now.slice(0, 10);
  const folder = kind === "note" ? "Notes" : "Uploads";
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
      app: "Forge",
      sync: true,
      storageRoot,
      deleteConfigured: Boolean(deletePassword),
      maxUploadMb: Math.round(maxUploadBytes / 1024 / 1024),
    });
    return;
  }

  if (requestUrl.pathname === "/api/files" && req.method === "GET") {
    sendJson(res, 200, { files: await readIndex() });
    return;
  }

  if (requestUrl.pathname === "/api/files" && req.method === "POST") {
    const payload = await readJsonBody(req, Math.ceil(maxUploadBytes * 1.38) + 4096);
    const decoded = dataUrlToBuffer(payload.dataUrl);
    if (!decoded) {
      sendJson(res, 400, { error: "Missing file data" });
      return;
    }
    const entry = await saveTrackedFile({
      name: payload.name,
      mime: payload.mime || decoded.mime,
      buffer: decoded.buffer,
      kind: "file",
    });
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
    const title = safeName(`${String(payload.title || "forge-note").slice(0, 80)}.md`);
    const body = `# ${title.replace(/\.md$/i, "")}\n\n${text}\n`;
    const entry = await saveTrackedFile({
      name: title,
      mime: "text/markdown; charset=utf-8",
      buffer: Buffer.from(body, "utf8"),
      kind: "note",
    });
    sendJson(res, 201, { file: entry });
    return;
  }

  const downloadMatch = requestUrl.pathname.match(/^\/api\/files\/([^/]+)\/download$/);
  if (downloadMatch && req.method === "GET") {
    const files = await readIndex();
    const entry = files.find((file) => file.id === downloadMatch[1]);
    if (!entry) {
      sendJson(res, 404, { error: "File not found" });
      return;
    }
    const filePath = path.resolve(storageRoot, entry.relativePath);
    if (!isInside(storageRoot, filePath)) {
      sendJson(res, 403, { error: "Invalid file path" });
      return;
    }
    res.writeHead(200, {
      "Content-Type": entry.mime || mimeTypes[path.extname(entry.name).toLowerCase()] || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${entry.name.replace(/"/g, "")}"`,
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
  console.log(`Forge running at http://localhost:${port}`);
  console.log(`Forge local sync folder: ${storageRoot}`);
});
