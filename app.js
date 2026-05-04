const root = document.getElementById("app");

const appName = "FluxCell";
const stateKey = "fluxcell.lab.v1";
const legacyStateKey = "forge.calm.v1";
const ownerKey = "fluxcell.owner.delete.hash.v1";
const legacyOwnerKey = "forge.owner.delete.hash.v1";
const dbName = "forge-file-vault";
const fileStore = "files";
const seedPackKey = "fluxcell.seed-pack.v1";
const baseSeedPackVersion = "2026-05-04-fluxcell";
const integratedSeedPackVersion = "2026-05-04-fluxcell-integrated-epm";
const monolithicSeedPackVersion = "2026-05-04-fluxcell-monolithic-cell";
const actuationSeedPackVersion = "2026-05-04-fluxcell-actuation-architecture";
const seedPackVersion = "2026-05-04-fluxcell-fabrication-plan";
const seedPackOrder = [baseSeedPackVersion, integratedSeedPackVersion, monolithicSeedPackVersion, actuationSeedPackVersion, seedPackVersion];
const compatibleSyncApps = new Set(["FluxCell", "Forge"]);

const focus = {
  domain: "fluxcell.aolabs.io",
  title: "Printed electropermanent actuation for Sarrus cells.",
  current: "Integrated EPM actuation in one laterally expanding cell.",
};

const seedNotes = [
  {
    id: "seed-flux",
    pack: baseSeedPackVersion,
    text: "One-cell proof: an EPM latch moves one Sarrus cell before array work.",
    createdAt: new Date("2026-05-04T04:00:00").toISOString(),
  },
  {
    id: "seed-force-gap",
    pack: baseSeedPackVersion,
    text: "Force-gap sweep: same fixture, same pulse, 0.5-5 mm gap, hold and release result.",
    createdAt: new Date("2026-05-04T03:55:00").toISOString(),
  },
  {
    id: "seed-driver-log",
    pack: baseSeedPackVersion,
    text: "Driver log: voltage, current, pulse width, polarity, temperature rise.",
    createdAt: new Date("2026-05-04T03:50:00").toISOString(),
  },
  {
    id: "seed-geometry-lock",
    pack: baseSeedPackVersion,
    text: "Geometry lock: keeper area, air gap, alignment pins, and core material stay explicit.",
    createdAt: new Date("2026-05-04T03:45:00").toISOString(),
  },
  {
    id: "seed-print-role",
    pack: baseSeedPackVersion,
    text: "Printed part role: fixture, coil form, flux path, or magnet. Test one at a time.",
    createdAt: new Date("2026-05-04T03:40:00").toISOString(),
  },
  {
    id: "seed-benchmark",
    pack: baseSeedPackVersion,
    text: "Benchmark: compare EPM force to the pneumatic curve at the same cell displacement.",
    createdAt: new Date("2026-05-04T03:35:00").toISOString(),
  },
  {
    id: "seed-integrated-target",
    pack: integratedSeedPackVersion,
    text: "End target: a laterally expanding Sarrus cell with EPM actuation inside the printed architecture.",
    createdAt: new Date("2026-05-04T20:10:00").toISOString(),
  },
  {
    id: "seed-integrated-role",
    pack: integratedSeedPackVersion,
    text: "EPM role: latch, bias switch, or stroke assist. Sarrus geometry supplies the lateral expansion.",
    createdAt: new Date("2026-05-04T20:09:00").toISOString(),
  },
  {
    id: "seed-integrated-demo",
    pack: integratedSeedPackVersion,
    text: "First demo: one cell expands laterally, holds without continuous power, then resets cleanly.",
    createdAt: new Date("2026-05-04T20:08:00").toISOString(),
  },
  {
    id: "seed-integrated-loop",
    pack: integratedSeedPackVersion,
    text: "Mechanical loop: magnetic force changes one internal link state; linkage converts it to lateral strain.",
    createdAt: new Date("2026-05-04T20:07:00").toISOString(),
  },
  {
    id: "seed-integrated-print-path",
    pack: integratedSeedPackVersion,
    text: "Print path: inserted magnets and coils first; printed magnetic composite only after the force closes.",
    createdAt: new Date("2026-05-04T20:06:00").toISOString(),
  },
  {
    id: "seed-integrated-package",
    pack: integratedSeedPackVersion,
    text: "Packaging rule: no external actuator tower. Coil, keeper, flux return, and link interface stay cell-sized.",
    createdAt: new Date("2026-05-04T20:05:00").toISOString(),
  },
  {
    id: "seed-integrated-metrics",
    pack: integratedSeedPackVersion,
    text: "Measure lateral strain, blocked force, hold force, pulse energy, heat, and reset reliability.",
    createdAt: new Date("2026-05-04T20:04:00").toISOString(),
  },
  {
    id: "seed-integrated-risk",
    pack: integratedSeedPackVersion,
    text: "Risk: printed magnetic material is weak. Keep the design compatible with inserted NdFeB and steel.",
    createdAt: new Date("2026-05-04T20:03:00").toISOString(),
  },
  {
    id: "seed-integrated-figure",
    pack: integratedSeedPackVersion,
    text: "Figure idea: one cell cross-section showing coil, keeper, flux path, hinge line, and expansion direction.",
    createdAt: new Date("2026-05-04T20:02:00").toISOString(),
  },
  {
    id: "seed-monolithic-direct-force",
    pack: monolithicSeedPackVersion,
    text: "Do not just pull a wall. Route magnetic force through a link or rocker that amplifies lateral expansion.",
    createdAt: new Date("2026-05-04T20:28:00").toISOString(),
  },
  {
    id: "seed-monolithic-air-gap",
    pack: monolithicSeedPackVersion,
    text: "CAD constraint: keep the working air gap short even while the cell expands laterally.",
    createdAt: new Date("2026-05-04T20:27:00").toISOString(),
  },
  {
    id: "seed-monolithic-zero-power-state",
    pack: monolithicSeedPackVersion,
    text: "Choose the zero-power state now: expanded hold, contracted hold, or only a pulse-triggered transition.",
    createdAt: new Date("2026-05-04T20:26:00").toISOString(),
  },
  {
    id: "seed-monolithic-stage-plan",
    pack: monolithicSeedPackVersion,
    text: "Prototype ladder: external EPM near cell, embedded EPM cartridge, then monolithic printed package.",
    createdAt: new Date("2026-05-04T20:25:00").toISOString(),
  },
  {
    id: "seed-monolithic-bistable",
    pack: monolithicSeedPackVersion,
    text: "Best architecture may be bistable Sarrus mechanics plus EPM switching, not continuous magnetic pulling.",
    createdAt: new Date("2026-05-04T20:24:00").toISOString(),
  },
  {
    id: "seed-monolithic-coil-path",
    pack: monolithicSeedPackVersion,
    text: "Print coil channels and keeper pockets as real geometry; winding and insertion can happen before full printing works.",
    createdAt: new Date("2026-05-04T20:23:00").toISOString(),
  },
  {
    id: "seed-monolithic-paper-link",
    pack: monolithicSeedPackVersion,
    text: "Paper link: compliant EPMs inform the soft package; EPM jamming papers inform zero-power holding.",
    createdAt: new Date("2026-05-04T20:22:00").toISOString(),
  },
  {
    id: "seed-monolithic-test",
    pack: monolithicSeedPackVersion,
    text: "Test: pulse the EPM while measuring lateral cell width, blocked force, current, and surface temperature.",
    createdAt: new Date("2026-05-04T20:21:00").toISOString(),
  },
  {
    id: "seed-monolithic-material-stack",
    pack: monolithicSeedPackVersion,
    text: "Material stack: hard magnet, soft keeper, coil, printed hinge, printed body. Do not merge failures.",
    createdAt: new Date("2026-05-04T20:20:00").toISOString(),
  },
  {
    id: "seed-monolithic-module-contract",
    pack: monolithicSeedPackVersion,
    text: "Module contract: same Sarrus cell footprint, added actuation, no pneumatic line, one pulse input.",
    createdAt: new Date("2026-05-04T20:19:00").toISOString(),
  },
  {
    id: "seed-actuation-contribution",
    pack: actuationSeedPackVersion,
    text: "Actuation contribution: the EPM changes cell state, not just clamps after motion.",
    createdAt: new Date("2026-05-04T20:46:00").toISOString(),
  },
  {
    id: "seed-actuation-rocker",
    pack: actuationSeedPackVersion,
    text: "Mechanism sketch: EPM drives a short rocker that pushes opposite Sarrus pivots outward.",
    createdAt: new Date("2026-05-04T20:45:00").toISOString(),
  },
  {
    id: "seed-actuation-preload",
    pack: actuationSeedPackVersion,
    text: "Use stored elastic energy for stroke. Use the EPM to switch or hold the state.",
    createdAt: new Date("2026-05-04T20:44:00").toISOString(),
  },
  {
    id: "seed-actuation-cartridge",
    pack: actuationSeedPackVersion,
    text: "Design a cartridge-sized magnetic circuit that can be overprinted into the cell body.",
    createdAt: new Date("2026-05-04T20:43:00").toISOString(),
  },
  {
    id: "seed-actuation-wiring",
    pack: actuationSeedPackVersion,
    text: "Route wires along a low-strain path. Keep coils out of the hinge strain zone.",
    createdAt: new Date("2026-05-04T20:42:00").toISOString(),
  },
  {
    id: "seed-actuation-thermal",
    pack: actuationSeedPackVersion,
    text: "Thermal limit: EPM pulses cannot soften hinges or change the air gap.",
    createdAt: new Date("2026-05-04T20:41:00").toISOString(),
  },
  {
    id: "seed-actuation-data",
    pack: actuationSeedPackVersion,
    text: "Best first data: lateral displacement per pulse, blocked force at fixed width, and hold force at zero power.",
    createdAt: new Date("2026-05-04T20:40:00").toISOString(),
  },
  {
    id: "seed-actuation-failure",
    pack: actuationSeedPackVersion,
    text: "Failure mode: magnetic attraction closes the gap but produces no useful Sarrus expansion.",
    createdAt: new Date("2026-05-04T20:39:00").toISOString(),
  },
  {
    id: "seed-actuation-array",
    pack: actuationSeedPackVersion,
    text: "Array future: local state memory, shared power bus, no pneumatic manifold.",
    createdAt: new Date("2026-05-04T20:38:00").toISOString(),
  },
  {
    id: "seed-actuation-win",
    pack: actuationSeedPackVersion,
    text: "Win condition: one printed cell cycles expand, hold, release, reset with wires only.",
    createdAt: new Date("2026-05-04T20:37:00").toISOString(),
  },
  {
    id: "seed-fab-split",
    pack: seedPackVersion,
    text: "Fabrication split: modular insert for the first reliable build, monolithic package for the end result.",
    createdAt: new Date("2026-05-04T21:06:00").toISOString(),
  },
  {
    id: "seed-fab-dummy-print",
    pack: seedPackVersion,
    text: "First print: pocketed Sarrus cell with dummy magnet blocks; measure hinge strain and air-gap drift.",
    createdAt: new Date("2026-05-04T21:05:00").toISOString(),
  },
  {
    id: "seed-fab-gap-stop",
    pack: seedPackVersion,
    text: "Gap stops: printed hard stops set minimum air gap so magnetic pull does not collapse the linkage.",
    createdAt: new Date("2026-05-04T21:04:00").toISOString(),
  },
  {
    id: "seed-fab-flux-path",
    pack: seedPackVersion,
    text: "Flux path test: yoke, NdFeB, AlNiCo, and coil outside the cell before embedding anything.",
    createdAt: new Date("2026-05-04T21:03:00").toISOString(),
  },
  {
    id: "seed-fab-overprint-risk",
    pack: seedPackVersion,
    text: "Overprint risk: print heat and tolerances can demagnetize, shift, or short the magnetic cartridge.",
    createdAt: new Date("2026-05-04T21:02:00").toISOString(),
  },
  {
    id: "seed-fab-symmetry",
    pack: seedPackVersion,
    text: "Cell interface: push symmetric pivot pairs so the EPM adds lateral strain without twisting the cell.",
    createdAt: new Date("2026-05-04T21:01:00").toISOString(),
  },
  {
    id: "seed-fab-claim",
    pack: seedPackVersion,
    text: "Monolithic claim needs integrated body, integrated actuator, no pneumatic input, and repeatable lateral stroke.",
    createdAt: new Date("2026-05-04T21:00:00").toISOString(),
  },
  {
    id: "seed-fab-cycle",
    pack: seedPackVersion,
    text: "Do not chase arrays until one cell reaches 100 cycles with stable force and no hinge damage.",
    createdAt: new Date("2026-05-04T20:59:00").toISOString(),
  },
  {
    id: "seed-fab-cutaway",
    pack: seedPackVersion,
    text: "Figure target: cutaway showing magnetic circuit, linkage, and lateral expansion in the same cell.",
    createdAt: new Date("2026-05-04T20:58:00").toISOString(),
  },
  {
    id: "seed-fab-cad-next",
    pack: seedPackVersion,
    text: "CAD next: single-cell chassis with swappable EPM slot, hard gap datums, and width measurement tabs.",
    createdAt: new Date("2026-05-04T20:57:00").toISOString(),
  },
];

let state = loadState();
let sync = { status: "checking", base: "", root: "", deleteConfigured: false };
let noteDraft = "";
let pendingFiles = [];
let toastTimer = 0;
const previewUrls = new Map();

function loadState() {
  const seeds = pendingSeedNotes();
  for (const key of [stateKey, legacyStateKey]) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      if (parsed && Array.isArray(parsed.notes) && Array.isArray(parsed.files)) {
        return finalizeLoadedState({ notes: parsed.notes, files: parsed.files }, seeds);
      }
    } catch (error) {
      console.warn(error);
    }
  }
  return finalizeLoadedState({ notes: [], files: [] }, seeds);
}

function pendingSeedNotes() {
  const currentPack = localStorage.getItem(seedPackKey);
  if (currentPack === seedPackVersion) return [];
  const currentIndex = seedPackOrder.indexOf(currentPack);
  if (currentIndex >= 0) {
    const pendingPacks = new Set(seedPackOrder.slice(currentIndex + 1));
    return seedNotes.filter((note) => pendingPacks.has(note.pack));
  }
  return seedNotes;
}

function finalizeLoadedState(next, seeds) {
  if (!seeds.length) return next;
  const seeded = { ...next, notes: mergeSeedNotes(next.notes, seeds) };
  try {
    localStorage.setItem(seedPackKey, seedPackVersion);
    localStorage.setItem(stateKey, JSON.stringify(seeded));
  } catch (error) {
    console.warn(error);
  }
  return seeded;
}

function mergeSeedNotes(notes, seeds) {
  const seedById = new Map(seeds.map((note) => [note.id, note]));
  const updated = notes.map((note) => seedById.get(note.id) || note);
  const existing = new Set(updated.map((note) => note.id));
  const missing = seeds.filter((note) => !existing.has(note.id));
  return [...missing, ...updated];
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
    open: "M7 17 17 7M10 7h7v7M5 5v14h14",
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
  textarea.placeholder = "Note, measurement, CAD, failure.";
  textarea.value = noteDraft;

  const fileLabel = el("label", "file-inline");
  fileLabel.append(icon("upload"), el("span", "", "Drop or attach"));
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;
  input.dataset.role = "file-input";
  fileLabel.append(input);

  dropzone.append(textarea, fileLabel);

  const footer = el("div", "composer-footer");
  const save = el("button", "save-button");
  save.type = "submit";
  save.append(icon("spark"), el("span", "", pendingFiles.length ? `Add ${pendingFiles.length + (noteDraft.trim() ? 1 : 0)}` : "Add"));

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
  panel.append(el("p", "next-note", generateNextStep()));
  return panel;
}

function generateNextStep() {
  const visibleFiles = state.files.filter(isVisibleLibraryFile);
  const latestNotes = state.notes.slice(0, 2);
  const latestFiles = visibleFiles.slice(0, 3);
  const latestNoteText = String(latestNotes[0]?.text || "").toLowerCase();
  const text = [
    ...latestNotes.map((note) => note.text),
    ...latestFiles.map((file) => `${file.paperTitle || ""} ${file.name}`),
  ].join(" ").toLowerCase();
  const phase = (state.notes.length + visibleFiles.length) % 3;

  if (/force|gap|load|pull|stiff/.test(latestNoteText)) {
    return ["Run one force-gap sweep.", "Hold fixture constant; change one gap.", "Record force, gap, pulse, hold state."][phase];
  }
  if (/heat|coil|pulse|current|driver|energy/.test(latestNoteText)) {
    return ["Log pulse width, current, heat.", "Separate switching from temperature.", "One pulse test before geometry changes."][phase];
  }
  if (/cad|print|fixture|mount|core|magnet/.test(latestNoteText)) {
    return ["Make the gap repeatable.", "Print only the fixture needed for one test.", "Remove alignment doubt first."][phase];
  }
  if (/latch|hold|release|polarity|switch/.test(latestNoteText)) {
    return ["Make the latch/release table.", "Test hold, release, reset.", "One cell-sized latch cycle."][phase];
  }
  if (latestFiles.some(isPaperFile)) {
    return [
      "Extract one build constraint from the newest paper.",
      "Pull one geometry, one drive condition, one number.",
      "Turn the newest paper into a single EPM test.",
    ][phase];
  }
  if (/force|gap|load|pull|stiff/.test(text)) return ["Run one force-gap sweep.", "Hold fixture constant; change one gap.", "Record force, gap, pulse, hold state."][phase];
  if (/heat|coil|pulse|current|driver|energy/.test(text)) return ["Log pulse width, current, heat.", "Separate switching from temperature.", "One pulse test before geometry changes."][phase];
  if (/cad|print|fixture|mount|core|magnet/.test(text)) return ["Make the gap repeatable.", "Print only the fixture needed for one test.", "Remove alignment doubt first."][phase];
  if (/latch|hold|release|polarity|switch/.test(text)) return ["Make the latch/release table.", "Test hold, release, reset.", "One cell-sized latch cycle."][phase];
  if (!visibleFiles.length) return ["Save one piece of evidence.", "Add a photo, CAD, paper, or force plot.", "One input, one next test."][phase];
  return ["One measurable EPM latch test.", "Keep the next test cell-sized.", "One variable, one result."][phase];
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
  if (kind === "paper") {
    card.dataset.openFile = file.id;
    card.tabIndex = 0;
    card.title = "Open paper";
  }
  const visual = el("div", "file-visual");
  if (kind === "paper") {
    visual.classList.add("paper-visual");
    const previewSrc = paperPreviewSrc(file);
    if (previewSrc) {
      const img = document.createElement("img");
      img.src = previewSrc;
      img.alt = "";
      img.loading = index < 4 ? "eager" : "lazy";
      img.decoding = "async";
      visual.append(img);
    } else if (file.source !== "sync") {
      const browserPreview = el("div", "browser-paper-preview");
      browserPreview.dataset.paperPreviewId = file.id;
      browserPreview.append(el("div", "paper-preview-empty", "paper"));
      visual.append(browserPreview);
    } else {
      visual.append(el("div", "paper-preview-empty", "preview offline"));
    }
    visual.append(el("span", "paper-badge", "paper"));
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

  const actions = createActions(kind === "paper"
    ? [
      { action: "open-file", id: file.id, title: "Open", iconName: "open" },
      { action: "delete", id: file.id, title: "Delete", iconName: "trash", danger: true },
    ]
    : [
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
  return "";
}

function bind() {
  const form = root.querySelector("[data-role='capture']");
  const dropzone = root.querySelector("[data-role='dropzone']");
  form?.addEventListener("submit", saveCapture);
  const noteInput = form?.querySelector("textarea");
  noteInput?.addEventListener("input", (event) => {
    noteDraft = event.currentTarget.value;
  });
  noteInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    form.requestSubmit();
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
  root.querySelectorAll("[data-action='open-file']").forEach((button) => {
    button.addEventListener("click", () => openFile(button.dataset.id));
  });
  root.querySelectorAll("[data-action='delete']").forEach((button) => {
    button.addEventListener("click", () => deleteFile(button.dataset.id));
  });
  root.querySelectorAll("[data-action='delete-note']").forEach((button) => {
    button.addEventListener("click", () => deleteNote(button.dataset.id));
  });
  root.querySelectorAll("[data-open-file]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".item-actions")) return;
      openFile(card.dataset.openFile);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest(".item-actions")) return;
      event.preventDefault();
      openFile(card.dataset.openFile);
    });
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

  const paperPreviews = [...root.querySelectorAll("[data-paper-preview-id]")];
  await Promise.all(paperPreviews.map(async (node) => {
    const id = node.dataset.paperPreviewId;
    const key = `paper:${id}`;
    const stored = await getBrowserFile(id).catch(() => null);
    if (!stored?.blob) return;
    const url = previewUrls.get(key) || URL.createObjectURL(stored.blob);
    previewUrls.set(key, url);
    const frame = document.createElement("iframe");
    frame.src = `${url}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
    frame.title = "";
    frame.loading = "lazy";
    node.replaceChildren(frame);
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

async function openFile(id) {
  const file = state.files.find((item) => item.id === id);
  if (!file) return;
  if (file.source === "sync") {
    if (sync.status !== "local") {
      toast("Start local sync to open this paper.");
      return;
    }
    window.open(`${sync.base}/api/files/${encodeURIComponent(id)}/view`, "_blank", "noopener");
    return;
  }

  const opened = window.open("about:blank", "_blank");
  const stored = await getBrowserFile(id).catch(() => null);
  if (!stored?.blob) {
    opened?.close();
    toast("Paper is not available in this browser.");
    return;
  }
  const url = URL.createObjectURL(stored.blob);
  if (opened) {
    opened.opener = null;
    opened.location.href = url;
  } else {
    window.location.href = url;
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
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
