const root = document.getElementById("app");
const storageKey = "forge.entries.v1";

const types = [
  ["idea", "Idea"],
  ["sketch", "Sketch"],
  ["prototype", "Prototype"],
  ["test", "Test"],
  ["decision", "Decision"],
  ["question", "Question"],
  ["task", "Task"],
];

const areas = [
  "Cell",
  "EPM",
  "Sarrus",
  "Pneumatics",
  "Sensing",
  "Materials",
  "Controls",
  "Notes",
];

const statuses = [
  ["next", "Next"],
  ["doing", "Doing"],
  ["waiting", "Waiting"],
  ["done", "Done"],
];

const importanceLevels = [
  ["normal", "Normal"],
  ["key", "Key"],
  ["risk", "Risk"],
];

const seedEntries = [
  {
    id: "seed-epm-print",
    title: "3D printed electropermanent magnet",
    body: "Primary prototype path. Track print geometry, conductive paths, magnetic core choice, heat, pulse energy, holding force, and reset behavior.",
    type: "prototype",
    area: "EPM",
    status: "doing",
    importance: "key",
    tags: ["magnet", "print", "force"],
    createdAt: "2026-05-02T08:00:00.000Z",
    updatedAt: "2026-05-02T08:00:00.000Z",
    pinned: true,
  },
  {
    id: "seed-sarrus-direct",
    title: "Direct Sarrus cell actuation",
    body: "Question: can the EPM directly drive the Sarrus-based cell without making the unit too heavy, slow, or hard to assemble?",
    type: "question",
    area: "Sarrus",
    status: "next",
    importance: "risk",
    tags: ["direct", "kinematics"],
    createdAt: "2026-05-02T08:08:00.000Z",
    updatedAt: "2026-05-02T08:08:00.000Z",
    pinned: false,
  },
  {
    id: "seed-air-valve",
    title: "EPM as pneumatic airflow control",
    body: "Indirect path. Use the magnet as a valve, latch, or flow selector for an integrated pneumatic actuator.",
    type: "idea",
    area: "Pneumatics",
    status: "next",
    importance: "key",
    tags: ["airflow", "valve"],
    createdAt: "2026-05-02T08:16:00.000Z",
    updatedAt: "2026-05-02T08:16:00.000Z",
    pinned: true,
  },
  {
    id: "seed-integrated-sensing",
    title: "Integrated sensing target",
    body: "Define what the cell needs to know about itself: displacement, contact, pressure, magnetic state, strain, or actuation history.",
    type: "task",
    area: "Sensing",
    status: "next",
    importance: "normal",
    tags: ["sensor", "state"],
    createdAt: "2026-05-02T08:24:00.000Z",
    updatedAt: "2026-05-02T08:24:00.000Z",
    pinned: false,
  },
  {
    id: "seed-test-loop",
    title: "Minimum useful test loop",
    body: "One prototype cycle should answer one question: what changed, what was expected, what actually happened, what to try next.",
    type: "decision",
    area: "Notes",
    status: "doing",
    importance: "key",
    tags: ["workflow"],
    createdAt: "2026-05-02T08:32:00.000Z",
    updatedAt: "2026-05-02T08:32:00.000Z",
    pinned: false,
  },
];

let entries = loadEntries();
let filter = "all";
let query = "";
let editingId = null;
let imageDraft = null;
let draftValues = createEmptyDraft();
let toastTimer = 0;

function loadEntries() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (Array.isArray(stored)) return stored.map(normalizeEntry);
  } catch (error) {
    console.warn(error);
  }
  return seedEntries.map(normalizeEntry);
}

function saveEntries() {
  localStorage.setItem(storageKey, JSON.stringify(entries));
}

function normalizeEntry(entry) {
  return {
    id: entry.id || createId(),
    title: String(entry.title || "").trim() || "Untitled",
    body: String(entry.body || "").trim(),
    type: typeExists(entry.type) ? entry.type : "idea",
    area: areas.includes(entry.area) ? entry.area : "Notes",
    status: statusExists(entry.status) ? entry.status : "next",
    importance: importanceLevels.some(([value]) => value === entry.importance) ? entry.importance : "normal",
    tags: Array.isArray(entry.tags) ? entry.tags.map(cleanTag).filter(Boolean) : parseTags(entry.tags || ""),
    image: typeof entry.image === "string" ? entry.image : "",
    imageName: typeof entry.imageName === "string" ? entry.imageName : "",
    createdAt: entry.createdAt || new Date().toISOString(),
    updatedAt: entry.updatedAt || entry.createdAt || new Date().toISOString(),
    pinned: Boolean(entry.pinned),
  };
}

function typeExists(value) {
  return types.some(([type]) => type === value);
}

function statusExists(value) {
  return statuses.some(([status]) => status === value);
}

function createId() {
  if (window.crypto?.randomUUID) return crypto.randomUUID();
  return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createEmptyDraft() {
  return {
    title: "",
    body: "",
    type: "idea",
    area: "Cell",
    status: "next",
    importance: "normal",
    tags: "",
  };
}

function entryToDraft(entry) {
  return {
    title: entry.title || "",
    body: entry.body || "",
    type: entry.type || "idea",
    area: entry.area || "Cell",
    status: entry.status || "next",
    importance: entry.importance || "normal",
    tags: Array.isArray(entry.tags) ? entry.tags.join(", ") : "",
  };
}

function rememberDraft(form) {
  if (!form) return;
  const formData = new FormData(form);
  draftValues = {
    title: String(formData.get("title") || ""),
    body: String(formData.get("body") || ""),
    type: String(formData.get("type") || "idea"),
    area: String(formData.get("area") || "Cell"),
    status: String(formData.get("status") || "next"),
    importance: String(formData.get("importance") || "normal"),
    tags: String(formData.get("tags") || ""),
  };
}

function cleanTag(tag) {
  return String(tag).trim().replace(/^#/, "").slice(0, 28);
}

function parseTags(value) {
  return String(value)
    .split(",")
    .map(cleanTag)
    .filter(Boolean)
    .slice(0, 8);
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(date);
}

function getLabel(collection, value) {
  const match = collection.find(([key]) => key === value);
  return match ? match[1] : value;
}

function sortEntries(list) {
  return [...list].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

function visibleEntries() {
  const text = query.trim().toLowerCase();
  return sortEntries(entries).filter((entry) => {
    const matchesFilter = filter === "all" || entry.status === filter || entry.type === filter || entry.area === filter;
    if (!matchesFilter) return false;
    if (!text) return true;
    return [
      entry.title,
      entry.body,
      entry.type,
      entry.area,
      entry.status,
      entry.importance,
      entry.tags.join(" "),
    ].join(" ").toLowerCase().includes(text);
  });
}

function icon(name) {
  const paths = {
    add: "M12 5v14M5 12h14",
    search: "m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
    download: "M12 3v12m0 0 5-5m-5 5-5-5M4 21h16",
    upload: "M12 21V9m0 0 5 5m-5-5-5 5M4 3h16",
    reset: "M3 12a9 9 0 1 0 3-6.7M3 5v7h7",
    pin: "m14 4 6 6-4 1-4 7-2 2-2-2-7 4 1-4-6-6 8-4Z",
  };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", paths[name] || paths.add);
  svg.append(path);
  return svg;
}

function render() {
  root.replaceChildren(createShell());
  bindEvents();
}

function createShell() {
  const shell = document.createElement("div");
  shell.className = "app-shell";

  const topbar = document.createElement("header");
  topbar.className = "topbar";
  topbar.append(createBrand(), createTopActions());

  const workspace = document.createElement("main");
  workspace.className = "workspace";
  workspace.append(createCapturePanel(), createBoardPanel(), createContextPanel());

  shell.append(topbar, workspace);
  return shell;
}

function createBrand() {
  const brand = document.createElement("div");
  brand.className = "brand";
  brand.innerHTML = `
    <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span>
    <span class="brand-copy">
      <p class="brand-kicker">forge.aolabs.io</p>
      <h1 class="brand-title">Forge</h1>
    </span>
  `;
  return brand;
}

function createTopActions() {
  const actions = document.createElement("div");
  actions.className = "top-actions";

  const exportButton = document.createElement("button");
  exportButton.className = "button";
  exportButton.type = "button";
  exportButton.dataset.action = "export";
  exportButton.append(icon("download"), "Export");

  const importLabel = document.createElement("label");
  importLabel.className = "button";
  importLabel.append(icon("upload"), "Import");
  const importInput = document.createElement("input");
  importInput.className = "import-input";
  importInput.type = "file";
  importInput.accept = "application/json,.json";
  importInput.dataset.action = "import";
  importLabel.append(importInput);

  const resetButton = document.createElement("button");
  resetButton.className = "button button-ghost";
  resetButton.type = "button";
  resetButton.dataset.action = "reset-seed";
  resetButton.title = "Restore starter board";
  resetButton.append(icon("reset"), "Starter");

  actions.append(exportButton, importLabel, resetButton);
  return actions;
}

function createCapturePanel() {
  const panel = document.createElement("section");
  panel.className = "panel capture-panel";
  panel.innerHTML = `
    <div class="panel-head">
      <h2 class="panel-title">${editingId ? "Edit entry" : "Capture"}</h2>
      <span class="subtle-count">${entries.length} saved</span>
    </div>
  `;

  const form = document.createElement("form");
  form.className = "capture-form";
  form.dataset.role = "capture-form";

  const editingEntry = editingId ? entries.find((entry) => entry.id === editingId) : null;
  if (editingId && !editingEntry) editingId = null;
  const source = draftValues;
  form.append(
    createField("Title", "title", "input", source.title),
    createField("Note", "body", "textarea", source.body),
    createSelectGrid(source),
    createField("Tags", "tags", "input", source.tags),
    createImageField(),
    createFormActions()
  );

  panel.append(form);
  return panel;
}

function createField(labelText, name, kind, value) {
  const field = document.createElement("div");
  field.className = "field";
  const id = `field-${name}`;
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;

  const input = kind === "textarea" ? document.createElement("textarea") : document.createElement("input");
  input.id = id;
  input.name = name;
  input.className = kind === "textarea" ? "textarea" : "input";
  input.value = value || "";
  if (name === "title") {
    input.required = true;
    input.placeholder = "What changed?";
  }
  if (name === "body") input.placeholder = "Result, idea, question, or next check";
  if (name === "tags") input.placeholder = "magnet, airflow, print";

  field.append(label, input);
  return field;
}

function createSelectGrid(source) {
  const grid = document.createElement("div");
  grid.className = "field-grid";
  grid.append(
    createSelect("Type", "type", types, source.type),
    createSelect("Area", "area", areas.map((area) => [area, area]), source.area),
    createSelect("State", "status", statuses, source.status),
    createSelect("Weight", "importance", importanceLevels, source.importance)
  );
  return grid;
}

function createSelect(labelText, name, options, value) {
  const field = document.createElement("div");
  field.className = "field";
  const id = `field-${name}`;
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = labelText;
  const select = document.createElement("select");
  select.id = id;
  select.name = name;
  select.className = "select";
  options.forEach(([optionValue, optionLabel]) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionLabel;
    option.selected = optionValue === value;
    select.append(option);
  });
  field.append(label, select);
  return field;
}

function createImageField() {
  const wrapper = document.createElement("div");
  wrapper.className = "field";
  const label = document.createElement("span");
  label.className = "field-label";
  label.textContent = "Image";

  const drop = document.createElement("label");
  drop.className = "image-drop";
  drop.textContent = imageDraft ? imageDraft.name : "Add sketch or photo";
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.name = "image";
  input.dataset.action = "image";
  drop.append(input);

  const preview = document.createElement("div");
  const previewImage = imageDraft?.src || "";
  preview.className = `image-preview${previewImage ? " is-visible" : ""}`;
  if (previewImage) {
    const img = document.createElement("img");
    img.src = previewImage;
    img.alt = "";
    preview.append(img);
  }

  wrapper.append(label, drop, preview);
  return wrapper;
}

function createFormActions() {
  const actions = document.createElement("div");
  actions.className = "form-actions";

  const submit = document.createElement("button");
  submit.className = "button button-primary";
  submit.type = "submit";
  submit.append(icon("add"), editingId ? "Update" : "Add");

  const cancel = document.createElement("button");
  cancel.className = "button icon-button";
  cancel.type = "button";
  cancel.dataset.action = editingId ? "cancel-edit" : "clear-form";
  cancel.title = editingId ? "Cancel edit" : "Clear form";
  cancel.textContent = editingId ? "X" : "-";

  actions.append(submit, cancel);
  return actions;
}

function createBoardPanel() {
  const panel = document.createElement("section");
  panel.className = "panel board-panel";
  panel.append(createBoardTools(), createStatusStrip(), createBoard());
  return panel;
}

function createBoardTools() {
  const tools = document.createElement("div");
  tools.className = "board-tools";

  const search = document.createElement("div");
  search.className = "search-wrap";
  search.append(icon("search"));
  const input = document.createElement("input");
  input.className = "input search-input";
  input.type = "search";
  input.placeholder = "Search board";
  input.value = query;
  input.dataset.action = "search";
  search.append(input);

  const segmented = document.createElement("div");
  segmented.className = "segmented";
  const filters = [["all", "All"], ...statuses, ["question", "Questions"], ["decision", "Decisions"]];
  filters.forEach(([value, label]) => {
    const button = document.createElement("button");
    button.className = `segment${filter === value ? " is-active" : ""}`;
    button.type = "button";
    button.dataset.action = "filter";
    button.dataset.value = value;
    button.textContent = label;
    segmented.append(button);
  });

  tools.append(search, segmented);
  return tools;
}

function createStatusStrip() {
  const strip = document.createElement("div");
  strip.className = "status-strip";
  statuses.forEach(([status, label]) => {
    const count = entries.filter((entry) => entry.status === status).length;
    const cell = document.createElement("button");
    cell.className = "status-cell";
    cell.type = "button";
    cell.dataset.action = "filter";
    cell.dataset.value = status;
    cell.innerHTML = `<span class="status-label">${label}</span><span class="status-value">${count}</span>`;
    strip.append(cell);
  });
  return strip;
}

function createBoard() {
  const board = document.createElement("div");
  board.className = "board";
  const list = visibleEntries();
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No matching entries.";
    board.append(empty);
    return board;
  }
  list.forEach((entry) => board.append(createCard(entry)));
  return board;
}

function createCard(entry) {
  const card = document.createElement("article");
  card.className = `note-card type-${entry.type}${entry.pinned ? " is-pinned" : ""}`;
  card.dataset.id = entry.id;

  if (entry.image) {
    const img = document.createElement("img");
    img.className = "card-image";
    img.src = entry.image;
    img.alt = entry.imageName || "";
    card.append(img);
  }

  const body = document.createElement("div");
  body.className = "card-body";

  const meta = document.createElement("div");
  meta.className = "card-meta";
  const pill = document.createElement("span");
  pill.className = "pill";
  pill.textContent = `${getLabel(types, entry.type)} / ${entry.area}`;
  const date = document.createElement("span");
  date.className = "card-date";
  date.textContent = formatDate(entry.updatedAt);
  meta.append(pill, date);

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = entry.title;

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = entry.body;

  const tags = document.createElement("div");
  tags.className = "tag-row";
  [entry.status, entry.importance, ...entry.tags].forEach((tag) => {
    const node = document.createElement("span");
    node.className = "tag";
    node.textContent = tag;
    tags.append(node);
  });

  body.append(meta, title);
  if (entry.body) body.append(text);
  body.append(tags);

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(
    createCardAction(entry.id, "cycle", getNextStatusLabel(entry.status)),
    createCardAction(entry.id, "pin", entry.pinned ? "Unpin" : "Pin"),
    createCardAction(entry.id, "edit", "Edit"),
    createCardAction(entry.id, "delete", "Delete")
  );

  card.append(body, actions);
  return card;
}

function createCardAction(id, action, text) {
  const button = document.createElement("button");
  button.className = "card-action";
  button.type = "button";
  button.dataset.action = action;
  button.dataset.id = id;
  button.textContent = text;
  return button;
}

function getNextStatusLabel(status) {
  const index = statuses.findIndex(([value]) => value === status);
  const next = statuses[(index + 1) % statuses.length];
  return next ? next[1] : "Next";
}

function createContextPanel() {
  const panel = document.createElement("aside");
  panel.className = "panel context-panel";
  panel.innerHTML = `
    <div class="panel-head">
      <h2 class="panel-title">Now</h2>
      <span class="subtle-count">${new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
    </div>
  `;
  appendContextSection(panel, "Focus", focusEntries());
  appendContextSection(panel, "Questions", entriesByType("question"));
  appendContextSection(panel, "Decisions", entriesByType("decision"));
  return panel;
}

function appendContextSection(panel, title, list) {
  const heading = document.createElement("h3");
  heading.className = "divider-title";
  heading.textContent = title;
  const wrapper = document.createElement("div");
  wrapper.className = "context-list";

  const items = list.slice(0, 4);
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "mini-item";
    empty.innerHTML = `<p class="mini-title">Nothing here yet</p><span class="mini-meta">${title}</span>`;
    wrapper.append(empty);
  } else {
    items.forEach((entry) => wrapper.append(createMiniItem(entry)));
  }

  panel.append(heading, wrapper);
}

function createMiniItem(entry) {
  const item = document.createElement("button");
  item.className = "mini-item";
  item.type = "button";
  item.dataset.action = "jump";
  item.dataset.id = entry.id;
  const title = document.createElement("p");
  title.className = "mini-title";
  title.textContent = entry.title;
  const meta = document.createElement("span");
  meta.className = "mini-meta";
  meta.textContent = `${entry.status} / ${entry.area}`;
  item.append(title, meta);
  return item;
}

function focusEntries() {
  return sortEntries(entries).filter((entry) => entry.status === "doing" || entry.status === "next" || entry.pinned);
}

function entriesByType(type) {
  return sortEntries(entries).filter((entry) => entry.type === type && entry.status !== "done");
}

function bindEvents() {
  const form = root.querySelector("[data-role='capture-form']");
  if (form) {
    form.addEventListener("submit", handleSubmit);
    form.addEventListener("input", () => rememberDraft(form));
    form.addEventListener("change", () => rememberDraft(form));
  }

  root.querySelectorAll("[data-action]").forEach((node) => {
    const action = node.dataset.action;
    if (action === "search") node.addEventListener("input", handleSearch);
    if (action === "filter") node.addEventListener("click", handleFilter);
    if (action === "export") node.addEventListener("click", exportBoard);
    if (action === "import") node.addEventListener("change", importBoard);
    if (action === "reset-seed") node.addEventListener("click", resetStarterBoard);
    if (action === "image") node.addEventListener("change", handleImageInput);
    if (action === "clear-form") node.addEventListener("click", clearForm);
    if (action === "cancel-edit") node.addEventListener("click", cancelEdit);
    if (action === "cycle") node.addEventListener("click", cycleStatus);
    if (action === "pin") node.addEventListener("click", togglePin);
    if (action === "edit") node.addEventListener("click", editEntry);
    if (action === "delete") node.addEventListener("click", deleteEntry);
    if (action === "jump") node.addEventListener("click", jumpToEntry);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const now = new Date().toISOString();
  const previous = editingId ? entries.find((entry) => entry.id === editingId) : null;
  const entry = normalizeEntry({
    id: previous ? previous.id : createId(),
    title: formData.get("title"),
    body: formData.get("body"),
    type: formData.get("type"),
    area: formData.get("area"),
    status: formData.get("status"),
    importance: formData.get("importance"),
    tags: parseTags(formData.get("tags")),
    image: imageDraft?.src || previous?.image || "",
    imageName: imageDraft?.name || previous?.imageName || "",
    pinned: previous?.pinned || false,
    createdAt: previous?.createdAt || now,
    updatedAt: now,
  });

  if (previous) {
    entries = entries.map((item) => (item.id === previous.id ? entry : item));
    toast("Entry updated.");
  } else {
    entries = [entry, ...entries];
    toast("Entry added.");
  }

  editingId = null;
  imageDraft = null;
  draftValues = createEmptyDraft();
  saveEntries();
  render();
}

function handleSearch(event) {
  query = event.currentTarget.value;
  render();
  const input = root.querySelector("[data-action='search']");
  if (input) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

function handleFilter(event) {
  filter = event.currentTarget.dataset.value || "all";
  render();
}

function cycleStatus(event) {
  const id = event.currentTarget.dataset.id;
  entries = entries.map((entry) => {
    if (entry.id !== id) return entry;
    const index = statuses.findIndex(([status]) => status === entry.status);
    const next = statuses[(index + 1) % statuses.length][0];
    return { ...entry, status: next, updatedAt: new Date().toISOString() };
  });
  saveEntries();
  render();
}

function togglePin(event) {
  const id = event.currentTarget.dataset.id;
  entries = entries.map((entry) => (
    entry.id === id ? { ...entry, pinned: !entry.pinned, updatedAt: new Date().toISOString() } : entry
  ));
  saveEntries();
  render();
}

function editEntry(event) {
  editingId = event.currentTarget.dataset.id;
  const entry = entries.find((item) => item.id === editingId);
  if (!entry) return;
  draftValues = entryToDraft(entry);
  imageDraft = entry.image ? { src: entry.image, name: entry.imageName || "Attached image" } : null;
  render();
  root.querySelector("#field-title")?.focus();
}

function deleteEntry(event) {
  const id = event.currentTarget.dataset.id;
  const entry = entries.find((item) => item.id === id);
  if (!entry) return;
  if (!window.confirm(`Delete "${entry.title}"?`)) return;
  entries = entries.filter((item) => item.id !== id);
  if (editingId === id) editingId = null;
  saveEntries();
  render();
  toast("Entry deleted.");
}

function jumpToEntry(event) {
  const id = event.currentTarget.dataset.id;
  filter = "all";
  query = "";
  render();
  const card = root.querySelector(`[data-id="${CSS.escape(id)}"]`);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function clearForm() {
  imageDraft = null;
  editingId = null;
  draftValues = createEmptyDraft();
  render();
}

function cancelEdit() {
  editingId = null;
  imageDraft = null;
  draftValues = createEmptyDraft();
  render();
}

async function handleImageInput(event) {
  const file = event.currentTarget.files?.[0];
  if (!file) return;
  rememberDraft(event.currentTarget.form);
  try {
    imageDraft = await resizeImage(file);
    render();
    toast("Image attached.");
  } catch (error) {
    console.error(error);
    toast("That image could not be added.");
  }
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load image"));
      img.onload = () => {
        const maxSide = 1400;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, width, height);
        resolve({
          name: file.name,
          src: canvas.toDataURL("image/jpeg", 0.86),
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function exportBoard() {
  const payload = {
    app: "Forge",
    version: 1,
    exportedAt: new Date().toISOString(),
    entries,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `forge-board-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  toast("Board exported.");
}

function importBoard(event) {
  const file = event.currentTarget.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const imported = Array.isArray(payload) ? payload : payload.entries;
      if (!Array.isArray(imported)) throw new Error("Missing entries");
      const normalized = imported.map(normalizeEntry);
      if (!window.confirm(`Replace this board with ${normalized.length} imported entries?`)) return;
      entries = normalized;
      editingId = null;
      imageDraft = null;
      draftValues = createEmptyDraft();
      saveEntries();
      render();
      toast("Board imported.");
    } catch (error) {
      console.error(error);
      toast("Import failed.");
    }
  };
  reader.readAsText(file);
}

function resetStarterBoard() {
  if (!window.confirm("Replace this board with the starter Forge board?")) return;
  entries = seedEntries.map(normalizeEntry);
  editingId = null;
  imageDraft = null;
  draftValues = createEmptyDraft();
  saveEntries();
  render();
  toast("Starter board restored.");
}

function toast(message) {
  window.clearTimeout(toastTimer);
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.append(node);
  toastTimer = window.setTimeout(() => node.remove(), 2600);
}

document.addEventListener("paste", async (event) => {
  const item = [...(event.clipboardData?.items || [])].find((clipboardItem) => clipboardItem.type.startsWith("image/"));
  if (!item) return;
  const file = item.getAsFile();
  if (!file) return;
  imageDraft = await resizeImage(file);
  const form = root.querySelector("[data-role='capture-form']");
  rememberDraft(form);
  render();
  toast("Pasted image attached.");
});

render();
