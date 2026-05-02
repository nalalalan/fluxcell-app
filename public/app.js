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
  title: "3D printed electropermanent magnet actuation",
  now: "Replace pneumatic actuation with strong printed EPMs.",
  next: "Design and test a magnet latch/driver that can move one Sarrus cell.",
};

const seedNotes = [
  {
    id: "seed-flux",
    text: "Main direction: electropermanent magnet actuation for Sarrus-linkage-based cells. Every capture here should help answer force, gap, pulse, latch geometry, heat, or cell integration.",
    createdAt: new Date("2026-05-02T12:00:00").toISOString(),
  },
];

const researchTiles = [
  {
    type: "mission",
    shape: "hero",
    kicker: "focus lock",
    title: "One app for the EPM cell push.",
    text: "Files, sketches, test shots, force plots, notes, CAD, and dead ends all land here.",
  },
  {
    type: "image",
    shape: "wide",
    image: "/assets/sarrus-array-wall.jpg",
    kicker: "target organism",
    title: "Sarrus cells, but no air lines as the main actuator.",
  },
  {
    type: "image",
    shape: "portrait",
    image: "/assets/module-iso.jpg",
    kicker: "cell body",
    title: "Printed module geometry waiting for local field-driven motion.",
  },
  {
    type: "field",
    shape: "tall",
    kicker: "actuation stack",
    title: "Pulse -> latch -> hold -> release",
    text: "EPMs should spend energy only when switching magnetic state.",
  },
  {
    type: "image",
    shape: "cinema",
    image: "/assets/local-control-sarrus.jpg",
    kicker: "system sketch",
    title: "Sensor, driver, EPM, Sarrus cell: one local control cartridge.",
  },
  {
    type: "checklist",
    shape: "square",
    kicker: "next coupons",
    title: "Build the magnetic truth table",
    items: ["force vs gap", "coil pulse energy", "core geometry", "printed fixture", "cell displacement"],
  },
  {
    type: "image",
    shape: "portrait",
    image: "/assets/module-parts.jpg",
    kicker: "parts spread",
    title: "Make the actuator fit the cell, not the other way around.",
  },
  {
    type: "metric",
    shape: "wide",
    kicker: "north star",
    title: "Strong hold, low heat, short pulse",
    stats: [
      ["force", "gap limited"],
      ["power", "switch only"],
      ["motion", "cell-scale"],
    ],
  },
  {
    type: "image",
    shape: "portrait",
    image: "/assets/valve-tube.jpg",
    kicker: "legacy path",
    title: "Pneumatic control stays as context, not the center.",
  },
  {
    type: "image",
    shape: "wide",
    image: "/assets/squish-120.jpg",
    kicker: "mechanical output",
    title: "Keep the Sarrus transformation. Change the actuation source.",
  },
  {
    type: "image",
    shape: "cinema",
    image: "/assets/linkage-geometry.jpg",
    kicker: "geometry evidence",
    title: "Pressure-era data becomes the benchmark to beat.",
  },
  {
    type: "image",
    shape: "cinema",
    image: "/assets/module-biasing.jpg",
    kicker: "array behavior",
    title: "Magnetic actuation has to work through module coupling.",
  },
  {
    type: "image",
    shape: "square",
    image: "/assets/force-stiffness.jpg",
    kicker: "measurement habit",
    title: "Every exciting prototype needs force numbers attached.",
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
  shell.append(createDock(), createWall());
  return shell;
}

function createDock() {
  const dock = el("section", "dock");
  const brand = el("div", "brand");
  brand.append(el("p", "domain", focus.domain), el("h1", "", appName), el("p", "tagline", focus.title));

  const status = el("div", "status-strip");
  status.append(createStatusPill(syncLabel(), `sync sync-${sync.status}`));
  status.append(createStatusPill(`${state.files.length} files`, "stat"));
  status.append(createStatusPill(`${state.notes.length} notes`, "stat"));

  const header = el("div", "dock-header");
  header.append(brand, status);

  const form = el("form", "capture-form");
  form.dataset.role = "capture";

  const textarea = el("textarea", "note-input");
  textarea.name = "note";
  textarea.placeholder = "Capture the next EPM cell thought, test result, CAD change, or failure.";
  textarea.value = noteDraft;

  const actions = el("div", "capture-actions");
  const fileLabel = el("label", "file-pick");
  fileLabel.append(icon("upload"), el("span", "", pendingFiles.length ? `${pendingFiles.length} staged` : "Upload"));
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.dataset.role = "file-input";
  fileLabel.append(input);

  const save = el("button", "save-button");
  save.type = "submit";
  save.append(icon("spark"), el("span", "", "Save"));

  actions.append(fileLabel, save);
  form.append(textarea, actions);

  const line = el("p", "focus-line");
  line.append(el("span", "", "Now"), document.createTextNode(focus.now));
  const next = el("p", "focus-line muted");
  next.append(el("span", "", "Next"), document.createTextNode(focus.next));

  dock.append(header, form, createPendingList(), line, next);
  return dock;
}

function createStatusPill(text, className) {
  return el("span", className, text);
}

function syncLabel() {
  if (sync.status === "local") return "local sync";
  if (sync.status === "browser") return "browser vault";
  return "checking";
}

function createPendingList() {
  const wrap = el("div", "pending-list");
  if (!pendingFiles.length) return wrap;
  pendingFiles.slice(0, 4).forEach((file) => wrap.append(el("span", "pending-chip", file.name)));
  if (pendingFiles.length > 4) wrap.append(el("span", "pending-chip", `+${pendingFiles.length - 4}`));
  return wrap;
}

function createWall() {
  const wall = el("section", "wall");
  wall.setAttribute("aria-label", "FluxCell research wall");
  layoutWall(wall, wallItems());
  return wall;
}

function wallItems() {
  const notes = state.notes.map((note) => ({
    ...note,
    type: "note",
    shape: note.text.length > 180 ? "wide" : "square",
    createdAt: note.createdAt,
  }));

  const files = state.files.map((file) => ({
    ...file,
    type: "file",
    shape: isImageFile(file) ? "portrait" : "square",
    createdAt: file.createdAt,
  }));

  const recent = [...notes, ...files]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 18);

  return [...recent, ...researchTiles];
}

function layoutWall(wall, items) {
  const count = columnCount();
  const columns = Array.from({ length: count }, () => el("div", "masonry-column"));
  const heights = Array.from({ length: count }, () => 0);

  items.forEach((item, index) => {
    let target = 0;
    for (let i = 1; i < heights.length; i += 1) {
      if (heights[i] < heights[target]) target = i;
    }
    columns[target].append(createTile(item, index));
    heights[target] += shapeScore(item);
  });

  wall.style.setProperty("--columns", count);
  wall.replaceChildren(...columns);
}

function columnCount() {
  const width = window.innerWidth || document.documentElement.clientWidth || 1200;
  if (width <= 560) return 1;
  if (width <= 720) return 2;
  if (width <= 1100) return 3;
  return Math.max(4, Math.min(5, Math.floor(width / 340)));
}

function shapeScore(item) {
  return {
    cinema: 0.68,
    hero: 1.5,
    portrait: 1.38,
    square: 1,
    tall: 1.72,
    wide: 0.74,
  }[item.shape || "square"] || 1;
}

function createTile(item, index) {
  if (item.type === "file") return createFileTile(item, index);
  if (item.type === "note") return createNoteTile(item);
  if (item.type === "checklist") return createChecklistTile(item);
  if (item.type === "metric") return createMetricTile(item);
  return createResearchTile(item, index);
}

function createResearchTile(item, index) {
  const tile = el("article", `tile tile-${item.type || "image"} tile--${item.shape || "square"}`);
  appendVisual(tile, item, index);
  tile.append(createTileCopy(item.kicker, item.title, item.text));
  return tile;
}

function createChecklistTile(item) {
  const tile = el("article", `tile tile-checklist tile--${item.shape || "square"}`);
  tile.append(createFieldVisual(), createTileCopy(item.kicker, item.title));
  const list = el("div", "mini-list");
  item.items.forEach((entry) => list.append(el("span", "", entry)));
  tile.append(list);
  return tile;
}

function createMetricTile(item) {
  const tile = el("article", `tile tile-metric tile--${item.shape || "wide"}`);
  tile.append(createTileCopy(item.kicker, item.title));
  const stats = el("div", "metric-grid");
  item.stats.forEach(([label, value]) => {
    const stat = el("div", "metric");
    stat.append(el("span", "", label), el("strong", "", value));
    stats.append(stat);
  });
  tile.append(stats);
  return tile;
}

function createNoteTile(note) {
  const tile = el("article", `tile tile-note tile--${note.shape || "square"}`);
  tile.append(createTileCopy("lab note", note.text, formatDate(note.createdAt)));
  return tile;
}

function createFileTile(file, index) {
  const tile = el("article", `tile tile-file tile--${file.shape || "square"}`);
  appendFileVisual(tile, file, index);

  const copy = createTileCopy(file.kind === "note" ? "synced note" : fileLabel(file), file.name, `${formatSize(file.size)} ${file.source === "sync" ? "synced" : "browser"} ${formatDate(file.createdAt)}`);
  tile.append(copy);

  const actions = el("div", "tile-actions");
  const download = el("button", "icon-button");
  download.type = "button";
  download.title = "Download";
  download.dataset.action = "download";
  download.dataset.id = file.id;
  download.append(icon("down"));

  const del = el("button", "icon-button danger");
  del.type = "button";
  del.title = "Delete";
  del.dataset.action = "delete";
  del.dataset.id = file.id;
  del.append(icon("trash"));

  actions.append(download, del);
  tile.append(actions);
  return tile;
}

function appendVisual(tile, item, index) {
  if (item.image) {
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = "";
    img.loading = index < 8 ? "eager" : "lazy";
    img.decoding = "async";
    tile.append(img);
    return;
  }
  tile.append(createFieldVisual());
}

function appendFileVisual(tile, file, index) {
  if (isImageFile(file) && (file.source !== "sync" || sync.status === "local")) {
    const img = document.createElement("img");
    img.alt = "";
    img.loading = index < 8 ? "eager" : "lazy";
    img.decoding = "async";
    if (file.source === "sync" && sync.status === "local") {
      img.src = `${sync.base}/api/files/${encodeURIComponent(file.id)}/download`;
    } else if (file.source !== "sync") {
      img.dataset.previewId = file.id;
    }
    tile.append(img);
    return;
  }

  const visual = createFieldVisual(fileExtension(file.name));
  tile.append(visual);
}

function createFieldVisual(label) {
  const visual = el("div", "field-visual");
  const rings = el("div", "field-rings");
  for (let i = 0; i < 5; i += 1) rings.append(el("span"));
  const core = el("div", "mag-core", label || "");
  visual.append(rings, core);
  return visual;
}

function createTileCopy(kicker, title, text) {
  const copy = el("div", "tile-copy");
  if (kicker) copy.append(el("p", "kicker", kicker));
  if (title) copy.append(el("h2", "", title));
  if (text) copy.append(el("p", "tile-text", text));
  return copy;
}

function fileExtension(name) {
  const ext = String(name || "").split(".").pop();
  return ext && ext !== name ? ext.slice(0, 5).toUpperCase() : "FILE";
}

function fileLabel(file) {
  if (isImageFile(file)) return "image evidence";
  if (/stl|3mf|obj|gcode|step|stp/i.test(file.name || "")) return "print file";
  if (/pdf|doc|ppt|xls/i.test(file.name || "")) return "document";
  return "file";
}

function isImageFile(file) {
  return /^image\//.test(file.mime || "") || /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name || "");
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

  let resizeTimer = 0;
  window.onresize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(render, 140);
  };
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
    if (sync.status === "local") {
      postJson(`${sync.base}/api/notes`, {
        title: text.split(/\s+/).slice(0, 8).join(" ") || "fluxcell note",
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
