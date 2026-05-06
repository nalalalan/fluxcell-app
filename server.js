const http = require("node:http");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");
const { execFile } = require("node:child_process");

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(__dirname, "public");
const focusedStorageRoot = path.join(os.homedir(), "Documents", "research", "PhD Chapter 2", "FluxCell Files");
const configuredStorageRoot = process.env.FLUXCELL_STORAGE_DIR;
const storageRoot = path.resolve(configuredStorageRoot || focusedStorageRoot);
const deletePassword = process.env.FLUXCELL_DELETE_PASSWORD || "";
const maxUploadBytes = Number(process.env.FLUXCELL_MAX_UPLOAD_MB || 100) * 1024 * 1024;
const openAiModel = process.env.FLUXCELL_OPENAI_MODEL || process.env.OPENAI_MODEL || "gpt-5-mini";
const focusedIndexPath = path.join(storageRoot, ".fluxcell-files.json");
const indexPath = focusedIndexPath;
const appStatePath = path.join(storageRoot, ".fluxcell-app-state.json");
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

function openAiKey() {
  return process.env.OPENAI_API_KEY || process.env.FLUXCELL_OPENAI_API_KEY || "";
}

function isInside(root, filePath) {
  const relative = path.relative(root, filePath);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function safeName(name) {
  const base = path.basename(String(name || "fluxcell-file"));
  return base.replace(/[<>:"/\\|?*\u0000-\u001f]+/g, "-").replace(/\s+/g, " ").trim().slice(0, 140) || "fluxcell-file";
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

function objectRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function cleanNote(note) {
  const record = objectRecord(note);
  const text = String(record.text || "").trim();
  if (!text) return null;
  return {
    id: String(record.id || crypto.randomUUID()).slice(0, 160),
    text,
    createdAt: record.createdAt || new Date().toISOString(),
    updatedAt: record.updatedAt || record.createdAt || "",
  };
}

function cleanFeedbackStore(store) {
  return Object.entries(objectRecord(store)).reduce((cleaned, [id, record]) => {
    const key = String(id || "").trim().slice(0, 180);
    if (!key) return cleaned;
    if (typeof record === "string") {
      cleaned[key] = { value: record, updatedAt: "" };
      return cleaned;
    }
    const value = objectRecord(record).value || "";
    if (!["useful", "not-useful", ""].includes(value)) return cleaned;
    cleaned[key] = {
      value,
      updatedAt: objectRecord(record).updatedAt || new Date().toISOString(),
      ...(objectRecord(record).reason ? { reason: String(objectRecord(record).reason).slice(0, 80) } : {}),
    };
    return cleaned;
  }, {});
}

function cleanSkipStore(store) {
  return Object.entries(objectRecord(store)).reduce((cleaned, [id, record]) => {
    const key = String(id || "").trim().slice(0, 180);
    if (!key) return cleaned;
    const item = objectRecord(record);
    cleaned[key] = {
      updatedAt: item.updatedAt || new Date().toISOString(),
      count: Number.isFinite(item.count) ? item.count : 1,
      ...(item.cleared ? { cleared: true } : {}),
    };
    return cleaned;
  }, {});
}

function cleanCustomIdeas(store) {
  return Object.entries(objectRecord(store)).reduce((cleaned, [id, idea]) => {
    const key = String(id || "").trim().slice(0, 180);
    const record = objectRecord(idea);
    const text = String(record.text || "").replace(/\s+/g, " ").trim().slice(0, 520);
    if (!key || !text) return cleaned;
    cleaned[key] = {
      id: String(record.id || key).slice(0, 180),
      text,
      reason: String(record.reason || "").replace(/\s+/g, " ").trim().slice(0, 120),
      keywords: Array.isArray(record.keywords)
        ? record.keywords.map((keyword) => String(keyword || "").trim()).filter(Boolean).slice(0, 12)
        : [],
      source: String(record.source || "custom").slice(0, 40),
    };
    return cleaned;
  }, {});
}

function cleanSuggestionState(record) {
  const state = objectRecord(record);
  return {
    refreshCount: Number.isFinite(state.refreshCount) ? state.refreshCount : 0,
    refreshedAt: state.refreshedAt || "",
    skippedIdeas: cleanSkipStore(state.skippedIdeas),
    skippedPapers: cleanSkipStore(state.skippedPapers),
    customIdeas: cleanCustomIdeas(state.customIdeas),
  };
}

function cleanAiFeed(record) {
  const feed = objectRecord(record);
  return {
    status: feed.status === "loading" ? "idle" : String(feed.status || "idle").slice(0, 40),
    mode: String(feed.mode || "").slice(0, 40),
    model: String(feed.model || "").slice(0, 80),
    summary: String(feed.summary || "").replace(/\s+/g, " ").trim().slice(0, 1200),
    ideas: Array.isArray(feed.ideas) ? feed.ideas.map((idea) => objectRecord(idea)).slice(0, 80) : [],
    paperIds: Array.isArray(feed.paperIds) ? feed.paperIds.map((id) => String(id || "")).filter(Boolean).slice(0, 120) : [],
    updatedAt: feed.updatedAt || "",
    error: String(feed.error || "").slice(0, 240),
  };
}

function cleanAppState(record = {}) {
  const state = objectRecord(record);
  const deletedNoteIds = Array.isArray(state.deletedNoteIds)
    ? state.deletedNoteIds.map((id) => String(id || "").trim()).filter(Boolean).slice(0, 5000)
    : [];
  const deletedNotes = new Set(deletedNoteIds);
  return {
    notes: Array.isArray(state.notes)
      ? state.notes.map(cleanNote).filter(Boolean).filter((note) => !deletedNotes.has(note.id)).slice(0, 1000)
      : [],
    deletedNoteIds,
    paperFeedback: cleanFeedbackStore(state.paperFeedback),
    ideaFeedback: cleanFeedbackStore(state.ideaFeedback),
    suggestionState: cleanSuggestionState(state.suggestionState),
    aiFeed: cleanAiFeed(state.aiFeed),
    updatedAt: state.updatedAt || new Date().toISOString(),
  };
}

async function readAppState() {
  await ensureStorage();
  try {
    const text = await fsp.readFile(appStatePath, "utf8");
    return cleanAppState(JSON.parse(text));
  } catch (error) {
    if (error.code === "ENOENT") return cleanAppState();
    throw error;
  }
}

async function writeAppState(state) {
  await ensureStorage();
  const cleaned = cleanAppState({ ...state, updatedAt: new Date().toISOString() });
  await fsp.writeFile(appStatePath, JSON.stringify(cleaned, null, 2));
  return cleaned;
}

async function mergeAppState(patch) {
  const current = await readAppState();
  return writeAppState({
    notes: Array.isArray(patch.notes) ? patch.notes : current.notes,
    deletedNoteIds: Array.isArray(patch.deletedNoteIds) ? patch.deletedNoteIds : current.deletedNoteIds,
    paperFeedback: patch.paperFeedback !== undefined ? patch.paperFeedback : current.paperFeedback,
    ideaFeedback: patch.ideaFeedback !== undefined ? patch.ideaFeedback : current.ideaFeedback,
    suggestionState: patch.suggestionState !== undefined ? patch.suggestionState : current.suggestionState,
    aiFeed: patch.aiFeed !== undefined ? patch.aiFeed : current.aiFeed,
  });
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
  if (/[\\*?"<>|]/.test(title)) return false;
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
  if (/^(communications engineering|nature portfolio|mit open access articles|sigchi conference paper format|article|research article|open access|www\.|doi\b)/i.test(line)) return true;
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

function compactString(value, max = 1400) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

function compactArray(items, maxItems, mapper) {
  return (Array.isArray(items) ? items : []).slice(0, maxItems).map(mapper).filter(Boolean);
}

function compactAiPayload(payload) {
  return {
    focus: compactString(payload.focus, 700),
    summary: compactString(payload.summary, 900),
    stage: {
      id: compactString(payload.stage?.id, 80),
      label: compactString(payload.stage?.label, 120),
      summary: compactString(payload.stage?.summary, 240),
    },
    paperSupportTopic: compactString(payload.paperSupportTopic, 240),
    refreshCount: Number(payload.refreshCount || 0),
    latestNote: compactString(payload.latestNote, 700),
    notes: compactArray(payload.notes, 24, (note) => compactString(note?.text, 500)),
    approvedIdeas: compactArray(payload.approvedIdeas, 36, (idea) => ({
      id: compactString(idea?.id, 120),
      text: compactString(idea?.text, 380),
      reason: compactString(idea?.reason, 140),
    })),
    approvedPapers: compactArray(payload.approvedPapers, 18, (paper) => ({
      id: compactString(paper?.id, 120),
      title: compactString(paper?.title, 320),
      reason: compactString(paper?.reason, 140),
    })),
    rejectedIdeas: compactArray(payload.rejectedIdeas, 24, (idea) => compactString(idea?.text || idea?.id, 260)),
    rejectedPapers: compactArray(payload.rejectedPapers, 18, (paper) => ({
      title: compactString(paper?.title, 260),
      reason: compactString(paper?.reason, 80),
    })),
    skippedIdeas: compactArray(payload.skippedIdeas, 18, (idea) => compactString(idea?.text || idea?.id, 240)),
    skippedPapers: compactArray(payload.skippedPapers, 18, (paper) => compactString(paper?.title, 240)),
    candidatePapers: compactArray(payload.candidatePapers, 80, (paper) => ({
      id: compactString(paper?.id, 120),
      title: compactString(paper?.title, 340),
      meta: compactString(paper?.meta, 180),
    })),
  };
}

const aiFeedSchema = {
  type: "json_schema",
  name: "fluxcell_feed",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["summary", "notes", "paperIds"],
    properties: {
      summary: {
        type: "string",
        maxLength: 500,
        description: "A calm project-state profile in 3 or 4 short bullet-like clauses.",
      },
      notes: {
        type: "array",
        minItems: 12,
        maxItems: 18,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "text", "reason", "keywords"],
          properties: {
            id: { type: "string" },
            text: { type: "string", maxLength: 180 },
            reason: { type: "string", maxLength: 70 },
            keywords: {
              type: "array",
              minItems: 2,
              maxItems: 5,
              items: { type: "string", maxLength: 60 },
            },
          },
        },
      },
      paperIds: {
        type: "array",
        minItems: 0,
        maxItems: 18,
        items: { type: "string", maxLength: 120 },
        description: "IDs from candidatePapers only, ordered by usefulness.",
      },
    },
  },
};

function aiSystemPrompt() {
  return [
    "You are the private practical helper feed for FluxCell.",
    "The project is 3D printed electropermanent magnet actuation integrated into laterally expanding Sarrus-linkage-based cells.",
    "The user is shaping taste by approving, rejecting, and skipping notes and papers.",
    "The client provides a current project stage. Treat that stage as the strongest context unless latestNote clearly changes it.",
    "Treat latestNote and open questions in notes as the main problems to help with right now.",
    "Suggested notes are helpful tips, tiny explanations, shopping routes, search terms, source links, or next tiny actions that directly answer those concerns.",
    "For each stage, give the fastest useful action for that exact stage: focus reset means take a clean break and leave one re-entry action; orientation means reduce friction; sourcing means parts and suppliers; bench means crude EPM switching; measurement means one visible diagnostic; cell integration means transplant the working bench mechanism; printing means isolate material risk; papers means citations that support the stated claim.",
    "If latestNote is off-topic or says the user wants to practice violin, avoid guilt or hype; treat it as RESET MODE and give short re-entry suggestions that keep the research alive after the break.",
    "Keep addressing a concern until approvedIdeas already contains a tip that clearly answers it.",
    "If notes say start, too detailed, overwhelmed, tired, no idea, lost, or just need to prototype, switch to START MODE.",
    "In START MODE, every note must be an immediate physical action for today: buy parts, wind a coil, make a crude tabletop EPM, use short pulses, or record one hold-release video.",
    "In START MODE, do not suggest papers, failure trees, detachable cassettes, monolithic integration, metrics, CAD, literature filters, elaborate experiment design, or exact targets.",
    "If paperSupportTopic is present, generate paper-search help for that exact topic and rank candidatePapers by whether their title/metadata supports it.",
    "For paper-support requests, include search phrases or source links such as Google Scholar/Semantic Scholar when no uploaded candidate paper is clearly relevant.",
    "For paper-support requests, paperIds should include only candidatePapers that are plausibly useful for the stated support topic; return an empty list if none fit.",
    "If latestNote asks where to buy or what components to get, give supplier/site suggestions and search phrases.",
    "If latestNote says the user does not know how something works, explain the beginner version before proposing a test.",
    "Keep each suggested note to one short complete sentence, usually 8 to 22 words.",
    "Use plain language. Avoid review-paper tone, dense engineering language, and long multi-clause cards.",
    "Do not invent exact numbers, thresholds, temperatures, cycle counts, material grades, or dimensions unless they are explicitly present in the provided context.",
    "Prefer words like small, short, low, simple, first, bench, and off-the-shelf over fake precision.",
    "A good card should feel like: 'K&J Magnetics is a good first place to browse small NdFeB blocks: https://www.kjmagnetics.com'.",
    "Another good card: 'An EPM is basically a permanent magnet plus a coil that flips part of the magnetic path.'",
    "Rejected content should be avoided, especially if it looks low credibility, low quality, or irrelevant.",
    "Return JSON only in the requested schema.",
  ].join(" ");
}

function responseOutputText(response) {
  if (typeof response.output_text === "string") return response.output_text;
  const chunks = [];
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") chunks.push(content.text);
      if (typeof content.output_text === "string") chunks.push(content.output_text);
    }
  }
  return chunks.join("");
}

function normalizeAiResult(result, candidatePaperIds) {
  const paperIdSet = new Set(candidatePaperIds);
  const notes = compactArray(result.notes, 18, (note, index) => {
    const text = compactString(note?.text, 180);
    if (!text) return null;
    return {
      id: `ai-${compactString(note.id, 80) || crypto.createHash("sha1").update(text).digest("hex").slice(0, 12)}-${index}`,
      text,
      reason: compactString(note?.reason, 70) || "tip",
      keywords: compactArray(note?.keywords, 5, (keyword) => compactString(keyword, 60)),
      source: "ai",
    };
  });
  return {
    mode: "ai",
    model: openAiModel,
    summary: compactString(result.summary, 500),
    notes,
    paperIds: compactArray(result.paperIds, 18, (id) => compactString(id, 120)).filter((id) => paperIdSet.has(id)),
    updatedAt: new Date().toISOString(),
  };
}

async function createAiSuggestions(payload) {
  const apiKey = openAiKey();
  if (!apiKey) {
    return {
      mode: "fallback",
      error: "OPENAI_API_KEY is not configured on the local sync server.",
      updatedAt: new Date().toISOString(),
    };
  }

  const compact = compactAiPayload(payload);
  const candidatePaperIds = compact.candidatePapers.map((paper) => paper.id);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: openAiModel,
      instructions: aiSystemPrompt(),
      input: `JSON context:\n${JSON.stringify(compact)}`,
      text: { format: aiFeedSchema },
      max_output_tokens: 8000,
    }),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = json?.error?.message || `OpenAI request failed with ${response.status}`;
    throw new Error(message);
  }

  const output = responseOutputText(json);
  const parsed = JSON.parse(output);
  return normalizeAiResult(parsed, candidatePaperIds);
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
      aiConfigured: Boolean(openAiKey()),
      aiModel: openAiKey() ? openAiModel : "",
      maxUploadMb: Math.round(maxUploadBytes / 1024 / 1024),
    });
    return;
  }

  if (requestUrl.pathname === "/api/ai/suggestions" && req.method === "POST") {
    const payload = await readJsonBody(req, 2 * 1024 * 1024);
    const result = await createAiSuggestions(payload);
    sendJson(res, 200, result);
    return;
  }

  if (requestUrl.pathname === "/api/app-state" && req.method === "GET") {
    sendJson(res, 200, { state: await readAppState() });
    return;
  }

  if (requestUrl.pathname === "/api/app-state" && req.method === "POST") {
    const payload = await readJsonBody(req, 3 * 1024 * 1024);
    sendJson(res, 200, { state: await mergeAppState(objectRecord(payload.state || payload)) });
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
    const appState = await readAppState();
    const note = cleanNote({
      id: payload.id || crypto.randomUUID(),
      text,
      createdAt: payload.createdAt || new Date().toISOString(),
    });
    appState.deletedNoteIds = (appState.deletedNoteIds || []).filter((id) => id !== note.id);
    appState.notes = [note, ...appState.notes.filter((item) => item.id !== note.id)];
    await writeAppState(appState);
    sendJson(res, 201, { note });
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
