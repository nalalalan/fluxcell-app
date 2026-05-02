const root = document.getElementById("app");
const stateKey = "forge.calm.v1";
const ownerKey = "forge.owner.delete.hash.v1";
const dbName = "forge-file-vault";
const fileStore = "files";

const focus = {
  title: "Chapter 2 prototype",
  now: "Build the printed EPM.",
  next: "Run one clean test that says direct actuation or airflow control.",
  watch: "Keep sensing and file evidence attached as you go.",
};

const seedNotes = [
  {
    id: "seed-now",
    text: "Current path: integrated actuation and sensing cell. Main uncertainty is whether the printed EPM directly drives the Sarrus unit or becomes the control element for pneumatic airflow.",
    createdAt: new Date("2026-05-02T08:00:00").toISOString(),
  },
];

let state = loadState();
let sync = { status: "checking", base: "", root: "", deleteConfigured: false };
let noteDraft = "";
let pendingFiles = [];
let toastTimer = 0;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(stateKey) || "null");
    if (parsed && Array.isArray(parsed.notes) && Array.isArray(parsed.files)) {
      return parsed;
    }
  } catch (error) {
    console.warn(error);
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
  }[name];
}

function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
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
}

function createShell() {
  const shell = el("main", "shell");
  shell.append(createHeader(), createFocus(), createCapture(), createRecent(), createFiles());
  return shell;
}

function createHeader() {
  const header = el("header", "header");
  const titleWrap = el("div");
  titleWrap.append(el("p", "eyebrow", "forge.aolabs.io"), el("h1", "", "Forge"));
  const status = el("div", `sync sync-${sync.status}`);
  status.textContent = syncLabel();
  header.append(titleWrap, status);
  return header;
}

function syncLabel() {
  if (sync.status === "local") return "local sync";
  if (sync.status === "browser") return "browser vault";
  return "checking";
}

function createFocus() {
  const section = el("section", "focus");
  section.append(el("p", "eyebrow", focus.title));
  const line = el("h2");
  line.textContent = focus.now;
  section.append(line);

  const next = el("div", "calm-lines");
  next.append(createLine("next", focus.next), createLine("watch", focus.watch));
  section.append(next);
  return section;
}

function createLine(label, text) {
  const row = el("p", "line");
  row.append(el("span", "", label), document.createTextNode(text));
  return row;
}

function createCapture() {
  const section = el("section", "capture");
  const form = el("form", "capture-form");
  form.dataset.role = "capture";

  const textarea = el("textarea", "note-input");
  textarea.name = "note";
  textarea.placeholder = "One thought, result, screenshot, or file.";
  textarea.value = noteDraft;

  const bottom = el("div", "capture-bottom");
  const fileLabel = el("label", "file-pick");
  fileLabel.textContent = pendingFiles.length ? `${pendingFiles.length} attached` : "attach";
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.dataset.role = "file-input";
  fileLabel.append(input);

  const save = el("button", "save-button", "Save");
  save.type = "submit";
  bottom.append(fileLabel, save);
  form.append(textarea, bottom);

  const helper = el("p", "helper");
  helper.textContent = sync.status === "local"
    ? "Synced to Chapter 2 folder."
    : "Browser-only until local sync is running.";

  section.append(form, helper);
  return section;
}

function createRecent() {
  const section = el("section", "quiet-section");
  section.append(el("h3", "", "Recent"));

  const recent = [
    ...state.notes.map((note) => ({ ...note, entryType: "note" })),
    ...state.files.map((file) => ({ ...file, entryType: "file" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const list = el("div", "list");
  if (!recent.length) {
    list.append(el("p", "empty", "Nothing saved yet."));
  } else {
    recent.forEach((item) => list.append(item.entryType === "file" ? createFileRow(item, true) : createNoteRow(item)));
  }
  section.append(list);
  return section;
}

function createNoteRow(note) {
  const row = el("article", "row note-row");
  row.append(el("p", "row-main", note.text), el("p", "row-meta", formatDate(note.createdAt)));
  return row;
}

function createFiles() {
  const section = el("section", "quiet-section files-section");
  section.append(el("h3", "", "Files"));
  const list = el("div", "list");
  const files = [...state.files].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (!files.length) {
    list.append(el("p", "empty", "No files yet."));
  } else {
    files.slice(0, 12).forEach((file) => list.append(createFileRow(file, false)));
  }
  section.append(list);
  return section;
}

function createFileRow(file, compact) {
  const row = el("article", compact ? "row file-row compact" : "row file-row");
  const main = el("button", "file-name");
  main.type = "button";
  main.dataset.action = "download";
  main.dataset.id = file.id;
  main.append(icon("file"), el("span", "", file.name));

  const meta = el("p", "row-meta");
  meta.textContent = `${formatSize(file.size)} ${file.source === "sync" ? "synced" : "browser"} ${formatDate(file.createdAt)}`;

  const del = el("button", "delete-button");
  del.type = "button";
  del.title = "Delete file";
  del.dataset.action = "delete";
  del.dataset.id = file.id;
  del.append(icon("trash"));

  const body = el("div", "file-body");
  body.append(main, meta);
  row.append(body);
  if (!compact) row.append(del);
  return row;
}

function bind() {
  const form = root.querySelector("[data-role='capture']");
  form?.addEventListener("submit", saveCapture);
  form?.querySelector("textarea")?.addEventListener("input", (event) => {
    noteDraft = event.currentTarget.value;
  });
  root.querySelector("[data-role='file-input']")?.addEventListener("change", (event) => {
    pendingFiles = [...event.currentTarget.files];
    render();
  });
  root.querySelectorAll("[data-action='download']").forEach((button) => {
    button.addEventListener("click", () => downloadFile(button.dataset.id));
  });
  root.querySelectorAll("[data-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteFile(button.dataset.id));
  });
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
    if (sync.status === "local") {
      postJson(`${sync.base}/api/notes`, {
        title: text.split(/\s+/).slice(0, 8).join(" ") || "forge note",
        text,
      }).then(refreshSyncFiles).catch(() => {});
    }
  }

  for (const file of files) {
    try {
      if (sync.status === "local") {
        const dataUrl = await readFileAsDataUrl(file);
        const response = await postJson(`${sync.base}/api/files`, {
          name: file.name,
          mime: file.type || "application/octet-stream",
          dataUrl,
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
    kind: file.kind || "file",
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

async function browserDeleteAllowed(password) {
  const existing = localStorage.getItem(ownerKey);
  const hashed = await hashText(password);
  if (!existing) {
    localStorage.setItem(ownerKey, hashed);
    return true;
  }
  return existing === hashed;
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
      if (json.app !== "Forge") continue;
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
  const synced = Array.isArray(json.files) ? json.files.map(normalizeSyncFile) : [];
  const browserOnly = state.files.filter((file) => file.source !== "sync");
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
  pendingFiles = [...pendingFiles, ...files];
  render();
  toast("Attached.");
});

render();
detectSync();
