const root = document.getElementById("app");

const appName = "FluxCell";
const stateKey = "fluxcell.lab.v1";
const legacyStateKey = "forge.calm.v1";
const ownerKey = "fluxcell.owner.delete.hash.v1";
const legacyOwnerKey = "forge.owner.delete.hash.v1";
const dbName = "forge-file-vault";
const fileStore = "files";
const compatibleSyncApps = new Set(["FluxCell", "Forge"]);

const focus = {
  domain: "fluxcell.aolabs.io",
  title: "3D printed electropermanent magnet actuation for Sarrus cells.",
  current: "Build a compact EPM latch/driver that can move one Sarrus cell.",
};

const seedNotes = [
  {
    id: "seed-flux",
    text: "Electropermanent magnet actuation for Sarrus-linkage cells. Track force, gap, pulse energy, latch geometry, heat, and how the actuator fits inside the cell.",
    createdAt: new Date("2026-05-02T12:00:00").toISOString(),
  },
];

let state = loadState();
let sync = { status: "checking", base: "", root: "", deleteConfigured: false };
let noteDraft = "";
let pendingFiles = [];
let toastTimer = 0;
const previewUrls = new Map();

function loadState() {
  for (const key of [stateKey, legacyStateKey]) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      if (parsed && Array.isArray(parsed.notes) && Array.isArray(parsed.files)) {
        return {
          notes: parsed.notes.length ? parsed.notes : seedNotes,
          files: parsed.files,
        };
      }
    } catch (error) {
      console.warn(error);
    }
  }
  return { notes: seedNotes, files: [] };
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(state));
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

function formatSize(bytes) {
  if (!Number.isFinite(bytes)) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

function createId() {
  if (window.crypto?.randomUUID) return crypto.randomUUID();
  return `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function iconPath(name) {
  return {
    down: "M12 3v12m0 0 5-5m-5 5-5-5M4 21h16",
    trash: "M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3",
    file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6",
    upload: "M12 21V9m0 0-5 5m5-5 5 5M5 3h14",
    spark: "M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z",
  }[name];
}

function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", iconPath(name));
  svg.append(path);
  return svg;
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(fileStore, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putBrowserFile(record) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(fileStore, "readwrite");
    tx.objectStore(fileStore).put(record);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function getBrowserFile(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(fileStore, "readonly");
    const request = tx.objectStore(fileStore).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deleteBrowserBlob(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(fileStore, "readwrite");
    tx.objectStore(fileStore).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function hashText(text) {
  const encoded = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function render() {
  root.replaceChildren(createShell());
  bind();
  hydrateBrowserPreviews();
}

function createShell() {
  const shell = el("main", "app-shell");
  shell.append(createTopbar(), createWorkspace(), createLibrary());
  return shell;
}

function createTopbar() {
  const topbar = el("header", "topbar");
  const brand = el("a", "brand", appName);
  brand.href = "/";

  const status = el("div", "status-strip");
  const fileCount = state.files.filter(isVisibleLibraryFile).length;
  status.append(createStatusPill(syncLabel(), `sync sync-${sync.status}`));
  status.append(createStatusPill(`${fileCount} files`, "stat"));
  status.append(createStatusPill(`${state.notes.length} notes`, "stat"));

  topbar.append(brand, status);
  return topbar;
}

function createStatusPill(text, className) {
  return el("span", className, text);
}

function syncLabel() {
  if (sync.status === "local") return "local sync";
  if (sync.status === "browser") return "browser vault";
  return "checking";
}

function createWorkspace() {
  const section = el("section", "workspace");

  const capture = el("section", "capture-panel");
  capture.append(createIntro(), createCaptureForm());

  const thinking = el("aside", "next-panel");
  thinking.append(createNextPanel());

  section.append(capture, thinking);
  return section;
}

function createIntro() {
  const wrap = el("div", "intro");
  wrap.append(el("p", "domain", focus.domain), el("h1", "", appName), el("p", "tagline", focus.title));

  const current = el("p", "current-line");
  current.append(el("span", "", "focus"), document.createTextNode(focus.current));
  wrap.append(current);
  return wrap;
}

function createCaptureForm() {
  const form = el("form", "composer");
  form.dataset.role = "capture";

  const dropzone = el("div", "dropzone");
  dropzone.dataset.role = "dropzone";

  const textarea = el("textarea", "note-input");
  textarea.name = "note";
  textarea.placeholder = "Write the next note, measurement, CAD change, or failure.";
  textarea.value = noteDraft;

  const fileLabel = el("label", "file-inline");
  fileLabel.append(icon("upload"), el("span", "", "Drop files here or click to attach"));
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.dataset.role = "file-input";
  fileLabel.append(input);

  dropzone.append(textarea, fileLabel);

  const footer = el("div", "composer-footer");
  const save = el("button", "save-button");
  save.type = "submit";
  save.append(icon("spark"), el("span", "", pendingFiles.length ? `Save ${pendingFiles.length + (noteDraft.trim() ? 1 : 0)}` : "Save"));

  footer.append(createPendingList(), save);
  form.append(dropzone, footer);
  return form;
}

function createPendingList() {
  const wrap = el("div", "pending-list");
  if (!pendingFiles.length) return wrap;
  pendingFiles.slice(0, 4).forEach((file) => wrap.append(el("span", "pending-chip", file.name)));
  if (pendingFiles.length > 4) wrap.append(el("span", "pending-chip", `+${pendingFiles.length - 4}`));
  return wrap;
}

function createNextPanel() {
  const panel = el("div", "next-card");
  const suggestion = generateNextStep();
  panel.append(el("p", "section-label", "generated"), el("h2", "", suggestion.title));
  panel.append(el("p", "next-copy", suggestion.copy));
  panel.append(el("p", "next-source", suggestion.source));
  return panel;
}

function generateNextStep() {
  const latestNotes = state.notes.slice(0, 3);
  const latestFiles = state.files.filter(isVisibleLibraryFile).slice(0, 5);
  const text = [
    ...latestNotes.map((note) => note.text),
    ...latestFiles.map((file) => file.name),
  ].join(" ").toLowerCase();
  const fileCount = state.files.filter(isVisibleLibraryFile).length;
  const source = `Generated from ${state.notes.length} ${state.notes.length === 1 ? "note" : "notes"} and ${fileCount} ${fileCount === 1 ? "file" : "files"}.`;

  if (latestFiles.some(isPaperFile)) {
    return {
      title: "Turn the latest paper into one concrete experiment.",
      copy: "Pull out the actuator geometry, drive condition, measurement method, and one number worth reproducing. Save that as the next build note.",
      source,
    };
  }
  if (/force|gap|load|pull|stiff/.test(text)) {
    return {
      title: "Lock the force measurement before changing the actuator.",
      copy: "Use the same fixture and record gap, pulse condition, hold state, and force. Change only one geometry variable.",
      source,
    };
  }
  if (/heat|coil|pulse|current|driver|energy/.test(text)) {
    return {
      title: "Separate magnetic switching from thermal limits.",
      copy: "Run one short pulse test with current, pulse width, temperature rise, and latch result in the same note.",
      source,
    };
  }
  if (/cad|print|fixture|mount|core|magnet/.test(text)) {
    return {
      title: "Print the smallest fixture that makes the gap repeatable.",
      copy: "The next useful prototype should remove alignment doubt before testing a full Sarrus cell.",
      source,
    };
  }
  if (/latch|hold|release|polarity|switch/.test(text)) {
    return {
      title: "Make the latch state table.",
      copy: "Record hold, release, reset, and failure mode for one cell-sized actuator before scaling up.",
      source,
    };
  }
  if (!state.files.length) {
    return {
      title: "Attach one piece of evidence to the next note.",
      copy: "A photo, CAD export, paper PDF, or force plot will make the next step easier to choose.",
      source,
    };
  }
  return {
    title: "Test one Sarrus cell before thinking about arrays.",
    copy: "Keep the next pass focused on a single cell, one actuator gap, and one measurable result.",
    source,
  };
}

function createLibrary() {
  const section = el("section", "library");
  const head = el("div", "section-head");
  head.append(el("h2", "", "Library"));
  section.append(head);

  const items = libraryItems();
  if (!items.length) {
    section.append(el("p", "empty", "Nothing saved yet."));
    return section;
  }

  const grid = el("div", "library-grid");
  items.forEach((item, index) => grid.append(createItemCard(item, index)));
  section.append(grid);
  return section;
}

function libraryItems() {
  const notes = state.notes.map((note) => ({
    ...note,
    type: "note",
    title: note.text,
    meta: formatDate(note.createdAt),
  }));

  const files = state.files.filter(isVisibleLibraryFile).map((file) => ({
    ...file,
    type: "file",
    title: isPaperFile(file) ? paperDisplayTitle(file) : file.name,
    kind: file.kind || classifyFile(file),
    meta: fileMeta(file),
  }));

  const saved = [...notes, ...files]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12);

  return saved;
}

function fileMeta(file) {
  const kind = file.kind || classifyFile(file);
  const label = kind === "paper" ? "paper" : file.source === "sync" ? "synced" : "browser";
  return `${label} ${formatSize(file.size)} ${formatDate(file.createdAt)}`;
}

function createItemCard(item, index) {
  if (item.type === "note") return createNoteCard(item);
  return createFileCard(item, index);
}

function createNoteCard(note) {
  const card = el("article", "item-card note-card");
  const actions = createActions([{ action: "delete-note", id: note.id, title: "Delete note", iconName: "trash", danger: true }]);
  card.append(actions, el("p", "item-text", note.text), el("p", "item-meta", note.meta));
  return card;
}

function createFileCard(file, index) {
  const kind = file.kind || classifyFile(file);
  const card = el("article", `item-card file-card ${kind === "paper" ? "paper-card" : ""}${isImageFile(file) ? " image-card" : ""}`);
  const visual = el("div", "file-visual");
  if (kind === "paper") {
    visual.classList.add("paper-visual");
    const img = document.createElement("img");
    img.src = paperPreviewSrc(file);
    img.alt = "";
    img.loading = index < 4 ? "eager" : "lazy";
    img.decoding = "async";
    visual.append(img, el("span", "paper-badge", "paper"));
  } else if (isImageFile(file) && (file.source !== "sync" || sync.status === "local")) {
    const img = document.createElement("img");
    img.alt = "";
    img.loading = index < 4 ? "eager" : "lazy";
    img.decoding = "async";
    if (file.source === "sync" && sync.status === "local") {
      img.src = `${sync.base}/api/files/${encodeURIComponent(file.id)}/download`;
    } else if (file.source !== "sync") {
      img.dataset.previewId = file.id;
    }
    visual.append(img);
  } else {
    const fileIcon = el("div", "file-icon", fileExtension(file.name));
    visual.append(fileIcon);
  }

  const body = el("div", "item-body");
  body.append(el("p", "item-title", kind === "paper" ? paperDisplayTitle(file) : file.name), el("p", "item-meta", file.meta));

  const actions = createActions([
    { action: "download", id: file.id, title: "Download", iconName: "down" },
    { action: "delete", id: file.id, title: "Delete", iconName: "trash", danger: true },
  ]);
  card.append(visual, body, actions);
  return card;
}

function createActions(items) {
  const actions = el("div", "item-actions");
  items.forEach((item) => {
    const button = el("button", `icon-button${item.danger ? " danger" : ""}`);
    button.type = "button";
    button.title = item.title;
    button.dataset.action = item.action;
    button.dataset.id = item.id;
    button.append(icon(item.iconName));
    actions.append(button);
  });
  return actions;
}

function fileExtension(name) {
  const ext = String(name || "").split(".").pop();
  return ext && ext !== name ? ext.slice(0, 5).toUpperCase() : "FILE";
}

function isImageFile(file) {
  return /^image\//.test(file.mime || "") || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name || "");
}

function isPaperFile(file) {
  return (file.kind || "").toLowerCase() === "paper"
    || /pdf/i.test(file.mime || "")
    || /\.pdf$/i.test(file.name || "");
}

function classifyFile(file) {
  return isPaperFile(file) ? "paper" : "file";
}

function isVisibleLibraryFile(file) {
  return (file.kind || "").toLowerCase() !== "note";
}

function paperTitle(name) {
  return String(name || "Paper")
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 90) || "Paper";
}

function paperDisplayTitle(file) {
  return String(file.paperTitle || file.detectedTitle || file.title || paperTitle(file.name))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160) || "Paper";
}

function paperPreviewSrc(file) {
  if (file.source === "sync" && sync.status === "local" && file.hasPreview) {
    const version = file.previewUpdatedAt ? `?v=${encodeURIComponent(file.previewUpdatedAt)}` : "";
    return `${sync.base}/api/files/${encodeURIComponent(file.id)}/preview${version}`;
  }
  return "/assets/linkage-geometry.jpg";
}

function bind() {
  const form = root.querySelector("[data-role='capture']");
  const dropzone = root.querySelector("[data-role='dropzone']");
  form?.addEventListener("submit", saveCapture);
  form?.querySelector("textarea")?.addEventListener("input", (event) => {
    noteDraft = event.currentTarget.value;
  });
  root.querySelector("[data-role='file-input']")?.addEventListener("change", (event) => {
    stageFiles([...event.currentTarget.files]);
  });
  dropzone?.addEventListener("dragenter", handleDrag);
  dropzone?.addEventListener("dragover", handleDrag);
  dropzone?.addEventListener("dragleave", (event) => {
    if (!dropzone.contains(event.relatedTarget)) dropzone.classList.remove("drag-active");
  });
  dropzone?.addEventListener("drop", handleDrop);
  root.querySelectorAll("[data-action='download']").forEach((button) => {
    button.addEventListener("click", () => downloadFile(button.dataset.id));
  });
  root.querySelectorAll("[data-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteFile(button.dataset.id));
  });
  root.querySelectorAll("[data-action='delete-note']").forEach((button) => {
    button.addEventListener("click", () => deleteNote(button.dataset.id));
  });

  let resizeTimer = 0;
  window.onresize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(render, 140);
  };
}

function stageFiles(files) {
  if (!files.length) return;
  pendingFiles = [...pendingFiles, ...files];
  render();
  toast(`${files.length} ${files.length === 1 ? "file" : "files"} attached.`);
}

function handleDrag(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-active");
}

function handleDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-active");
  stageFiles([...event.dataTransfer.files]);
}

async function hydrateBrowserPreviews() {
  const previews = [...root.querySelectorAll("[data-preview-id]")];
  await Promise.all(previews.map(async (img) => {
    const id = img.dataset.previewId;
    if (previewUrls.has(id)) {
      img.src = previewUrls.get(id);
      return;
    }
    const stored = await getBrowserFile(id).catch(() => null);
    if (!stored?.blob) return;
    const url = URL.createObjectURL(stored.blob);
    previewUrls.set(id, url);
    img.src = url;
  }));
}

async function saveCapture(event) {
  event.preventDefault();
  const text = noteDraft.trim();
  const files = [...pendingFiles];
  if (!text && !files.length) {
    toast("Add one thing first.");
    return;
  }

  const now = new Date().toISOString();
  if (text) {
    const note = { id: createId(), text, createdAt: now };
    state.notes.unshift(note);
  }

  for (const file of files) {
    try {
      const kind = classifyFile(file);
      if (sync.status === "local") {
        const dataUrl = await readFileAsDataUrl(file);
        const response = await postJson(`${sync.base}/api/files`, {
          name: file.name,
          mime: file.type || "application/octet-stream",
          dataUrl,
          kind,
        });
        upsertFile(normalizeSyncFile(response.file));
      } else {
        const id = createId();
        const record = {
          id,
          name: file.name,
          size: file.size,
          mime: file.type || "application/octet-stream",
          source: "browser",
          kind,
          createdAt: now,
        };
        await putBrowserFile({ ...record, blob: file });
        upsertFile(record);
      }
    } catch (error) {
      console.error(error);
      toast(`Could not save ${file.name}.`);
    }
  }

  noteDraft = "";
  pendingFiles = [];
  saveState();
  render();
  toast(sync.status === "local" ? "Saved and synced." : "Saved in browser.");
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.error || "Request failed");
  return json;
}

function normalizeSyncFile(file) {
  return {
    id: file.id,
    name: file.name,
    size: file.size,
    mime: file.mime,
    createdAt: file.createdAt,
    source: "sync",
    kind: file.kind || classifyFile(file),
    paperTitle: file.paperTitle || file.detectedTitle || "",
    hasPreview: Boolean(file.previewRelativePath),
    previewUpdatedAt: file.previewUpdatedAt || "",
  };
}

function upsertFile(file) {
  state.files = [file, ...state.files.filter((item) => item.id !== file.id)];
}

async function downloadFile(id) {
  const file = state.files.find((item) => item.id === id);
  if (!file) return;
  if (file.source === "sync" && sync.status === "local") {
    window.location.href = `${sync.base}/api/files/${encodeURIComponent(id)}/download`;
    return;
  }
  const stored = await getBrowserFile(id);
  if (!stored?.blob) {
    toast("File is not available in this browser.");
    return;
  }
  const url = URL.createObjectURL(stored.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = stored.name;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function deleteFile(id) {
  const file = state.files.find((item) => item.id === id);
  if (!file) return;
  if (!window.confirm(`Delete ${file.name}?`)) return;

  const password = window.prompt("Delete key");
  if (!password) return;

  if (file.source === "sync") {
    if (sync.status !== "local") {
      toast("Start local sync before deleting synced files.");
      return;
    }
    const response = await fetch(`${sync.base}/api/files/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      toast(json.error || "Delete failed.");
      return;
    }
  } else {
    const allowed = await browserDeleteAllowed(password);
    if (!allowed) {
      toast("Wrong delete key.");
      return;
    }
    await deleteBrowserBlob(id);
  }

  state.files = state.files.filter((item) => item.id !== id);
  saveState();
  render();
  toast("Deleted.");
}

function deleteNote(id) {
  const note = state.notes.find((item) => item.id === id);
  if (!note) return;
  if (!window.confirm("Delete this note?")) return;
  state.notes = state.notes.filter((item) => item.id !== id);
  saveState();
  render();
  toast("Note deleted.");
}

async function browserDeleteAllowed(password) {
  const existing = localStorage.getItem(ownerKey) || localStorage.getItem(legacyOwnerKey);
  const hashed = await hashText(password);
  if (!existing) {
    localStorage.setItem(ownerKey, hashed);
    return true;
  }
  if (existing === hashed) {
    localStorage.setItem(ownerKey, hashed);
    return true;
  }
  return false;
}

async function detectSync() {
  const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const candidates = isLocalHost
    ? [""]
    : window.isSecureContext
      ? ["http://127.0.0.1:3010", "http://127.0.0.1:3000"]
      : [];
  if (!candidates.length) {
    sync = { status: "browser", base: "", root: "", deleteConfigured: false };
    render();
    return;
  }
  for (const base of candidates) {
    try {
      const response = await fetch(`${base}/api/health`, { cache: "no-store" });
      if (!response.ok) continue;
      const json = await response.json();
      if (!compatibleSyncApps.has(json.app)) continue;
      sync = {
        status: "local",
        base,
        root: json.storageRoot || "research folder",
        deleteConfigured: Boolean(json.deleteConfigured),
      };
      await refreshSyncFiles();
      render();
      return;
    } catch (error) {
      // Keep checking quieter fallbacks.
    }
  }
  sync = { status: "browser", base: "", root: "", deleteConfigured: false };
  render();
}

async function refreshSyncFiles() {
  if (sync.status !== "local") return;
  const response = await fetch(`${sync.base}/api/files`, { cache: "no-store" });
  if (!response.ok) return;
  const json = await response.json();
  const synced = Array.isArray(json.files)
    ? json.files.map(normalizeSyncFile).filter(isVisibleLibraryFile)
    : [];
  const browserOnly = state.files.filter((file) => file.source !== "sync" && isVisibleLibraryFile(file));
  state.files = [...synced, ...browserOnly];
  saveState();
}

function toast(message) {
  window.clearTimeout(toastTimer);
  document.querySelector(".toast")?.remove();
  const node = el("div", "toast", message);
  document.body.append(node);
  toastTimer = window.setTimeout(() => node.remove(), 2400);
}

document.addEventListener("paste", (event) => {
  const files = [...(event.clipboardData?.items || [])]
    .filter((item) => item.kind === "file")
    .map((item) => item.getAsFile())
    .filter(Boolean);
  if (!files.length) return;
  stageFiles(files);
});

render();
detectSync();
