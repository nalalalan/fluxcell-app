const root = document.getElementById("app");

const appName = "fluxcell";
const stateKey = "fluxcell.lab.v1";
const ownerKey = "fluxcell.owner.delete.hash.v1";
const dbName = "fluxcell-file-vault";
const fileStore = "files";
const feedbackKey = "fluxcell.paper.feedback.v1";
const ideaFeedbackKey = "fluxcell.idea.feedback.v1";
const suggestionStateKey = "fluxcell.suggestion.stack.v1";
const aiFeedKey = "fluxcell.ai.feed.v1";
const deletedNoteKey = "fluxcell.deleted-notes.v1";
const apiBaseKey = "fluxcell.api.base.v1";
const aiApiBaseKey = "fluxcell.ai.api.base.v1";
const seedPackKey = "fluxcell.seed-pack.v1";
const recoveredIdeaSeedKey = "fluxcell.recovered-idea-feedback.seed.v1";
const recoveredPaperSeedKey = "fluxcell.recovered-paper-feedback.seed.v1";
const recoveredFeedbackSeedVersion = "2026-05-05-fluxcell-approved-bank-recovery";
const baseSeedPackVersion = "2026-05-04-fluxcell";
const integratedSeedPackVersion = "2026-05-04-fluxcell-integrated-epm";
const monolithicSeedPackVersion = "2026-05-04-fluxcell-monolithic-cell";
const actuationSeedPackVersion = "2026-05-04-fluxcell-actuation-architecture";
const fabricationSeedPackVersion = "2026-05-04-fluxcell-fabrication-plan";
const printableSeedPackVersion = "2026-05-04-fluxcell-printable-electromagnetics";
const validationSeedPackVersion = "2026-05-04-fluxcell-validation-model";
const cellIntegrationSeedPackVersion = "2026-05-04-fluxcell-cell-integration";
const forceBudgetSeedPackVersion = "2026-05-04-fluxcell-force-budget";
const monolithicEndgameSeedPackVersion = "2026-05-04-fluxcell-monolithic-endgame";
const printingRoadmapSeedPackVersion = "2026-05-04-fluxcell-printing-roadmap";
const cellEpmIntegrationSeedPackVersion = "2026-05-04-fluxcell-cell-epm-integration";
const mechanismCouplingSeedPackVersion = "2026-05-04-fluxcell-mechanism-coupling";
const prototypeProtocolSeedPackVersion = "2026-05-04-fluxcell-prototype-protocol";
const monolithicActuationRouteSeedPackVersion = "2026-05-04-fluxcell-monolithic-actuation-route";
const northStarWallSeedPackVersion = "2026-05-04-fluxcell-north-star-wall";
const galleryObjectSeedPackVersion = "2026-05-04-fluxcell-gallery-object";
const proudCellObjectSeedPackVersion = "2026-05-04-fluxcell-proud-cell-object";
const integratedProofSeedPackVersion = "2026-05-04-fluxcell-integrated-proof-object";
const sarrusActuationProofSeedPackVersion = "2026-05-04-fluxcell-sarrus-actuation-proof";
const memoryFigureObjectSeedPackVersion = "2026-05-04-fluxcell-memory-figure-object";
const cartridgeProofWallSeedPackVersion = "2026-05-04-fluxcell-cartridge-proof-wall";
const sarrusFirstExperimentWallSeedPackVersion = "2026-05-04-fluxcell-sarrus-first-experiment-wall";
const proudObjectWallSeedPackVersion = "2026-05-04-fluxcell-proud-object-wall";
const dopamineObjectWallSeedPackVersion = "2026-05-04-fluxcell-dopamine-object-wall";
const northStarJewelWallSeedPackVersion = "2026-05-04-fluxcell-north-star-jewel-wall";
const mechanicalMemoryWallSeedPackVersion = "2026-05-04-fluxcell-mechanical-memory-wall";
const oneCellProofWallSeedPackVersion = "2026-05-04-fluxcell-one-cell-proof-wall";
const printableMaterialsWallSeedPackVersion = "2026-05-04-fluxcell-printable-materials-wall";
const benchProofWallSeedPackVersion = "2026-05-04-fluxcell-bench-proof-wall";
const monolithicIntegrationWallSeedPackVersion = "2026-05-04-fluxcell-monolithic-integration-wall";
const actuatorCandidatesWallSeedPackVersion = "2026-05-04-fluxcell-actuator-candidates-wall";
const magneticCircuitWallSeedPackVersion = "2026-05-04-fluxcell-magnetic-circuit-wall";
const integratedCellWallSeedPackVersion = "2026-05-05-fluxcell-integrated-cell-wall";
const proofObjectWallSeedPackVersion = "2026-05-05-fluxcell-proof-object-wall";
const absorbablePlaybookWallSeedPackVersion = "2026-05-05-fluxcell-absorbable-playbook-wall";
const nextBuildProtocolWallSeedPackVersion = "2026-05-05-fluxcell-next-build-protocol-wall";
const sprintBoardWallSeedPackVersion = "2026-05-05-fluxcell-sprint-board-wall";
const monolithicAtlasWallSeedPackVersion = "2026-05-05-fluxcell-monolithic-atlas-wall";
const seedPackVersion = "2026-05-05-fluxcell-bridge-coupling-wall";
const seedPackOrder = [baseSeedPackVersion, integratedSeedPackVersion, monolithicSeedPackVersion, actuationSeedPackVersion, fabricationSeedPackVersion, printableSeedPackVersion, validationSeedPackVersion, cellIntegrationSeedPackVersion, forceBudgetSeedPackVersion, monolithicEndgameSeedPackVersion, printingRoadmapSeedPackVersion, cellEpmIntegrationSeedPackVersion, mechanismCouplingSeedPackVersion, prototypeProtocolSeedPackVersion, monolithicActuationRouteSeedPackVersion, northStarWallSeedPackVersion, galleryObjectSeedPackVersion, proudCellObjectSeedPackVersion, integratedProofSeedPackVersion, sarrusActuationProofSeedPackVersion, memoryFigureObjectSeedPackVersion, cartridgeProofWallSeedPackVersion, sarrusFirstExperimentWallSeedPackVersion, proudObjectWallSeedPackVersion, dopamineObjectWallSeedPackVersion, northStarJewelWallSeedPackVersion, mechanicalMemoryWallSeedPackVersion, oneCellProofWallSeedPackVersion, printableMaterialsWallSeedPackVersion, benchProofWallSeedPackVersion, monolithicIntegrationWallSeedPackVersion, actuatorCandidatesWallSeedPackVersion, magneticCircuitWallSeedPackVersion, integratedCellWallSeedPackVersion, proofObjectWallSeedPackVersion, absorbablePlaybookWallSeedPackVersion, nextBuildProtocolWallSeedPackVersion, sprintBoardWallSeedPackVersion, monolithicAtlasWallSeedPackVersion, seedPackVersion];
const compatibleSyncApps = new Set(["FluxCell"]);
const recoveredFeedbackSeed = {
  ideas: {
    "short-gap-long-stroke": "not-useful",
    "pulse-table": "not-useful",
    "null-cell": "not-useful",
    "force-gap-first": "not-useful",
    "bistable-switch": "useful",
    "coil-out-of-hinge": "useful",
    "insert-now-print-last": "useful",
    "one-cell-cassette": "useful",
    "paper-to-number": { value: "not-useful", updatedAt: "2026-05-05T06:29:06.032Z" },
    "minimum-beautiful-proof": { value: "useful", updatedAt: "2026-05-05T06:44:32.849Z" },
    "zero-power-hold-demo": { value: "useful", updatedAt: "2026-05-05T06:44:46.946Z" },
    "driver-polarity-table": { value: "not-useful", updatedAt: "2026-05-05T06:45:02.938Z" },
    "array-later": { value: "useful", updatedAt: "2026-05-05T06:45:09.901Z" },
    "rocker-or-wedge": { value: "useful", updatedAt: "2026-05-05T06:45:35.239Z" },
    "width-and-current-trace": { value: "useful", updatedAt: "2026-05-05T06:45:43.756Z" },
    "cell-width-fixture": { value: "useful", updatedAt: "2026-05-05T06:45:48.261Z" },
    "core-material-ablation": { value: "useful", updatedAt: "2026-05-05T06:46:10.598Z" },
    "dummy-magnet-control": { value: "not-useful", updatedAt: "2026-05-05T15:45:22.963Z" },
    "snap-threshold-first": { value: "not-useful", updatedAt: "2026-05-05T15:45:29.510Z" },
    "state-table": { value: "not-useful", updatedAt: "2026-05-05T15:45:32.832Z" },
    "monolithic-word-discipline": { value: "useful", updatedAt: "2026-05-05T15:45:41.985Z" },
    "symmetric-node-pairs": { value: "not-useful", updatedAt: "2026-05-05T15:45:48.072Z" },
    "paper-number-extract": { value: "not-useful", updatedAt: "2026-05-05T15:46:08.371Z" },
    "force-per-energy": { value: "not-useful", updatedAt: "2026-05-05T15:46:16.703Z" },
    "thermal-ceiling": { value: "not-useful", updatedAt: "2026-05-05T15:46:20.212Z" },
    "coil-resistance-before-pulse": { value: "not-useful", updatedAt: "2026-05-05T15:46:24.229Z" },
    "one-variable-fixture": { value: "not-useful", updatedAt: "2026-05-05T15:46:28.193Z" },
    "low-strain-wire-route": { value: "useful", updatedAt: "2026-05-05T15:46:47.500Z" },
    "failure-photo-bank": { value: "useful", updatedAt: "2026-05-05T15:47:00.143Z" },
    "mechanical-advantage-before-current": { value: "useful", updatedAt: "2026-05-05T15:47:07.181Z" },
    "cell-section-cutaway": { value: "useful", updatedAt: "2026-05-05T15:47:37.027Z" },
    "pause-print-cartridge": { value: "useful", updatedAt: "2026-05-05T15:47:44.333Z" },
    "bench-before-cell": { value: "useful", updatedAt: "2026-05-05T15:47:56.876Z" },
    "keeper-gap-as-feature": { value: "not-useful", updatedAt: "2026-05-05T15:48:45.620Z" },
    "object-trace-section": { value: "not-useful", updatedAt: "2026-05-05T15:48:49.286Z" },
    "cutaway-figure": { value: "not-useful", updatedAt: "2026-05-05T15:49:10.309Z" },
    "paper-cluster": { value: "useful", updatedAt: "2026-05-05T15:49:16.070Z" },
    "keeper-overlap-sweep": { value: "not-useful", updatedAt: "2026-05-05T15:49:21.580Z" },
    "paper-credibility-filter": { value: "useful", updatedAt: "2026-05-05T15:49:26.818Z" },
    "figure-first-literature": { value: "useful", updatedAt: "2026-05-05T15:49:41.128Z" },
    "printability-stack": { value: "useful", updatedAt: "2026-05-05T15:49:51.376Z" },
    "approved-thread": { value: "not-useful", updatedAt: "2026-05-05T15:49:54.398Z" },
    "single-cell-actuation-loop": { value: "useful", updatedAt: "2026-05-05T15:50:11.668Z" },
    "flux-leakage-check": { value: "useful", updatedAt: "2026-05-05T15:50:15.577Z" },
    "force-per-volume": { value: "not-useful", updatedAt: "2026-05-05T15:50:17.287Z" },
    "coupon-force-matrix": { value: "not-useful", updatedAt: "2026-05-05T15:50:18.123Z" },
  },
  papers: {
    "e42af69a-c598-4318-a9b1-ec7f5f1e3e64": "not-useful",
    "fb3f55cc-c58d-415f-8dbf-a0eb9f74c586": "not-useful",
    "00f55368-c5d7-45fe-80ef-7f7cd82576f3": "not-useful",
    "a36ce518-e3f2-402f-a57b-546ab16bc7da": "not-useful",
    "0863f6c6-0b89-4e3b-bc64-9273ffb161d0": "not-useful",
    "3c2efd37-0b79-4b3c-a4a1-0c9f7da589cb": "useful",
    "372f18ea-c2b9-4a8f-820e-c842a2c10c3b": "useful",
    "326ff33f-cb04-421e-be24-d60f9eb3b39d": "not-useful",
    "9441a731-c853-4939-9f01-1ba1879f97e7": "useful",
    "2c3a5d61-40c1-4cff-93cc-f85b8434f6df": { value: "useful", updatedAt: "2026-05-05T06:46:38.847Z" },
    "20aa8da7-79c0-4e91-a73e-a69af856166e": { value: "useful", updatedAt: "2026-05-05T06:46:53.475Z" },
    "ebca3830-2451-4dfb-922b-0879a8976431": { value: "useful", updatedAt: "2026-05-05T06:47:04.004Z" },
    "0804fe73-c31d-4581-97ce-428ac2222c1e": { value: "not-useful", updatedAt: "2026-05-05T06:47:38.363Z", reason: "relevance" },
    "2d885d19-1f74-44c3-9bd4-0c4abcf07451": { value: "not-useful", updatedAt: "2026-05-05T06:47:55.708Z", reason: "relevance" },
    "ece34636-1045-45eb-a08f-0f7be4d740bc": { value: "useful", updatedAt: "2026-05-05T06:48:04.947Z" },
    "eb0ab632-c895-436a-9dae-356243ef7256": { value: "not-useful", updatedAt: "2026-05-05T06:48:19.744Z", reason: "quality" },
    "3cfd0288-5017-4906-b040-6dcf3aaa6c41": { value: "useful", updatedAt: "2026-05-05T06:48:40.996Z" },
    "f12ef9ad-6162-4c25-b5d1-dc8daaa8c842": { value: "not-useful", updatedAt: "2026-05-05T06:48:55.381Z", reason: "relevance" },
  },
};

const focus = {
  domain: "fluxcell.aolabs.io",
  title: "Printed electropermanent actuation for Sarrus cells.",
  current: "Integrated EPM actuation in one laterally expanding cell.",
};

const paperGuideRules = [
  {
    match: /Knaian 2010|Electropermanent Magnetic Connectors/i,
    reason: "EPM actuator baseline",
    keywords: ["epm", "electropermanent", "actuator", "latch", "hold", "release", "connector", "one cell"],
    core: true,
  },
  {
    match: /Park 2020|Attractive Force Using an Electropermanent Magnet/i,
    reason: "Force vs. gap model",
    keywords: ["force", "gap", "pull", "model", "air gap", "keeper", "yoke", "flux"],
    core: true,
  },
  {
    match: /Johnson 2024|Compliant Electropermanent Magnets/i,
    reason: "Compliant EPM package",
    keywords: ["compliant", "soft", "flexible", "embedded", "cell", "print", "monolithic"],
    core: true,
  },
  {
    match: /Canada 2024|soft magnetic-cored solenoids/i,
    reason: "Printed coil and core route",
    keywords: ["coil", "core", "solenoid", "printed", "soft magnetic", "conductor", "current"],
    core: true,
  },
  {
    match: /Wang 2023|Sequential multi-material embedded/i,
    reason: "Embedded printing route",
    keywords: ["embedded", "multimaterial", "monolithic", "print", "fabrication", "soft actuator"],
    core: true,
  },
  {
    match: /Yang 2023|Linkage-based three-dimensional/i,
    reason: "Sarrus-cell kinematics",
    keywords: ["sarrus", "linkage", "cell", "lateral", "expand", "kinematic", "poisson"],
    core: true,
  },
  {
    match: /Knaian 2012|Milli-Motein/i,
    reason: "Module-scale EPM motion",
    keywords: ["module", "pitch", "motor", "fold", "pivot", "chain", "cell"],
  },
  {
    match: /Ntella 2023|Gholizadeh 2019|Gallentine 2024|Rus_Soft|s44172|EPM Valve|electropermanent magnet valve/i,
    reason: "Low-power EPM switching",
    keywords: ["valve", "pneumatic", "onboard", "switch", "zero power", "mrf", "fluid", "low power"],
  },
  {
    match: /Compton 2017|Huber 2016|Jacimovic 2016|Li 2016|Domingo-Roca/i,
    reason: "Printed permanent magnet reality",
    keywords: ["printed magnet", "ndfeb", "hard magnet", "permanent magnet", "bonded magnet", "material"],
  },
  {
    match: /Khatri 2018|Rodriguez-Vargas 2023|soft magnetic materials|soft-magnetic functional composite/i,
    reason: "Printed soft magnetic path",
    keywords: ["soft magnetic", "permeability", "iron", "flux", "core", "yoke", "keeper"],
  },
  {
    match: /Choi 2026|Wen 2025|Pal 2023|bistable|mechanical memory/i,
    reason: "Bistable actuation memory",
    keywords: ["bistable", "memory", "snap", "amplified", "hold", "reset", "state"],
  },
  {
    match: /CLOVER 2022|Sarrus Linkage|Son 2017/i,
    reason: "Sarrus actuator precedent",
    keywords: ["sarrus", "linkage", "jump", "capsule", "robot", "mechanism"],
  },
  {
    match: /Wehner 2016|Zixiao 2025|Iyer 2023|Exley 2025|embedded actuation/i,
    reason: "Integrated soft robot build",
    keywords: ["integrated", "embedded", "actuation", "sensing", "monolithic", "soft robot"],
  },
  {
    match: /Peng 2016|Li 2024|liquid metal coils|electromagnetic devices/i,
    reason: "Printed electromagnetic routing",
    keywords: ["electromagnetic", "coil", "wire", "liquid metal", "routing", "conductor"],
  },
];

const ideaGuideRules = [
  {
    id: "one-cell-cassette",
    text: "Make one cell-sized EPM cassette with hard gap stops and visible width markers.",
    reason: "first proof object",
    keywords: ["cell", "sarrus", "gap", "embedded", "cassette", "width", "lateral"],
    core: true,
  },
  {
    id: "force-gap-first",
    text: "Run force vs. air-gap before changing the printed cell geometry.",
    reason: "measurement first",
    keywords: ["force", "gap", "keeper", "yoke", "pull", "load", "model"],
    core: true,
  },
  {
    id: "insert-now-print-last",
    text: "Use inserted NdFeB and steel now; print magnetic materials after the force closes.",
    reason: "material risk control",
    keywords: ["printed", "magnet", "ndfeb", "steel", "material", "monolithic", "composite"],
    core: true,
  },
  {
    id: "short-gap-long-stroke",
    text: "Use a rocker or wedge so short magnetic gap closure becomes lateral expansion.",
    reason: "mechanism coupling",
    keywords: ["sarrus", "linkage", "lateral", "expand", "rocker", "wedge", "stroke", "gap"],
    core: true,
  },
  {
    id: "pulse-table",
    text: "Keep one pulse table: voltage, current, width change, hold, release, heat.",
    reason: "clean evidence",
    keywords: ["pulse", "current", "voltage", "heat", "hold", "release", "driver", "energy"],
    core: true,
  },
  {
    id: "bistable-switch",
    text: "Consider EPM switching of a bistable cell instead of continuous magnetic pulling.",
    reason: "zero-power state",
    keywords: ["bistable", "memory", "snap", "state", "hold", "release", "reset", "zero power"],
  },
  {
    id: "coil-out-of-hinge",
    text: "Route coils and wires through low-strain regions, not through the Sarrus hinges.",
    reason: "survivable integration",
    keywords: ["coil", "wire", "routing", "hinge", "strain", "fatigue", "current"],
  },
  {
    id: "null-cell",
    text: "Build a dummy-magnet null cell so mass and friction cannot fake actuation.",
    reason: "credible comparison",
    keywords: ["test", "compare", "control", "dummy", "friction", "proof", "measurement"],
  },
  {
    id: "paper-to-number",
    text: "For each new paper, extract one number: gap, force, energy, turns, or material loading.",
    reason: "literature becomes build input",
    keywords: ["paper", "literature", "review", "reference", "number", "figure"],
  },
  {
    id: "cutaway-figure",
    text: "Aim for one cutaway figure: Sarrus linkage, EPM flux path, pulse trace, width trace.",
    reason: "paper-quality evidence",
    keywords: ["figure", "science", "paper", "cutaway", "trace", "evidence", "result"],
  },
];

const dynamicIdeaTemplates = [
  {
    id: "coupon-force-matrix",
    text: "Make a coupon matrix: three keeper areas, four air gaps, same pulse, force recorded.",
    reason: "force map",
    keywords: ["force", "gap", "keeper", "yoke", "pulse", "current", "matrix", "coupon"],
    core: true,
  },
  {
    id: "width-and-current-trace",
    text: "Record current and cell width in the same video so actuation is visible and quantified.",
    reason: "proof trace",
    keywords: ["width", "current", "trace", "video", "actuation", "cell", "pulse"],
    core: true,
  },
  {
    id: "single-cell-actuation-loop",
    text: "Define one cycle as contract, pulse, expand, hold, release, reset.",
    reason: "demo protocol",
    keywords: ["cycle", "expand", "hold", "release", "reset", "cell", "state"],
    core: true,
  },
  {
    id: "mechanical-advantage-before-current",
    text: "Estimate linkage mechanical advantage before increasing coil current.",
    reason: "coupling first",
    keywords: ["linkage", "mechanical advantage", "force", "stroke", "current", "sarrus"],
    core: true,
  },
  {
    id: "keeper-gap-as-feature",
    text: "Design the keeper gap as a printed datum, not an assembly accident.",
    reason: "repeatability",
    keywords: ["keeper", "gap", "datum", "fixture", "print", "repeatable"],
    core: true,
  },
  {
    id: "pause-print-cartridge",
    text: "Try a pause-print EPM cartridge before claiming fully printed magnetic material.",
    reason: "integration route",
    keywords: ["pause print", "insert", "cartridge", "monolithic", "embedded", "magnet"],
    core: true,
  },
  {
    id: "core-material-ablation",
    text: "Compare steel insert, iron-filled print, and no core in the same coil fixture.",
    reason: "material ablation",
    keywords: ["steel", "iron", "core", "soft magnetic", "coil", "print", "material"],
    core: true,
  },
  {
    id: "dummy-magnet-control",
    text: "Run a dummy-magnet cell with the same mass and friction so movement cannot be faked.",
    reason: "control",
    keywords: ["control", "dummy", "mass", "friction", "cell", "comparison", "proof"],
    core: true,
  },
  {
    id: "thermal-ceiling",
    text: "Set a pulse energy ceiling from hinge temperature rise and coil resistance.",
    reason: "heat limit",
    keywords: ["heat", "temperature", "pulse", "energy", "resistance", "coil", "hinge"],
  },
  {
    id: "low-strain-wire-route",
    text: "Route conductors through low-strain ribs and keep hinges purely mechanical.",
    reason: "survivable wiring",
    keywords: ["wire", "conductor", "route", "hinge", "strain", "rib", "fatigue"],
  },
  {
    id: "rocker-or-wedge",
    text: "Prototype a rocker or wedge that turns short magnetic closure into lateral width change.",
    reason: "stroke conversion",
    keywords: ["rocker", "wedge", "gap", "stroke", "lateral", "width", "sarrus"],
  },
  {
    id: "symmetric-node-pairs",
    text: "Pull symmetric node pairs so the Sarrus cell expands without twisting.",
    reason: "clean motion",
    keywords: ["symmetric", "node", "twist", "sarrus", "expand", "cell"],
  },
  {
    id: "snap-threshold-first",
    text: "Measure passive snap or stiffness thresholds before adding magnetic drive.",
    reason: "mechanics baseline",
    keywords: ["snap", "stiffness", "threshold", "bistable", "passive", "cell"],
  },
  {
    id: "zero-power-hold-demo",
    text: "Make zero-power hold visible: remove power, leave the cell expanded, then release.",
    reason: "EPM advantage",
    keywords: ["zero power", "hold", "release", "expanded", "epm", "latch"],
  },
  {
    id: "flux-leakage-check",
    text: "Check leakage by measuring attraction with and without the return yoke installed.",
    reason: "magnetic circuit",
    keywords: ["flux", "leakage", "return yoke", "yoke", "keeper", "force"],
  },
  {
    id: "state-table",
    text: "Keep a state table: contracted, expanded, held, released, failed.",
    reason: "paper evidence",
    keywords: ["state", "table", "contracted", "expanded", "hold", "release", "failure"],
  },
  {
    id: "object-trace-section",
    text: "For every promising build, save one object photo, one trace, one section cut.",
    reason: "usable record",
    keywords: ["photo", "trace", "section", "build", "record", "figure"],
  },
  {
    id: "force-per-volume",
    text: "Track force per actuator volume, not only peak force.",
    reason: "cell-scale metric",
    keywords: ["force", "volume", "density", "cell", "actuator", "metric"],
  },
  {
    id: "force-per-energy",
    text: "Track force and displacement per pulse energy so EPM beats pneumatic only where it matters.",
    reason: "energy metric",
    keywords: ["force", "displacement", "energy", "pulse", "pneumatic", "metric"],
  },
  {
    id: "monolithic-word-discipline",
    text: "Separate monolithically packaged from monolithically printed until magnetic material proves it.",
    reason: "claim discipline",
    keywords: ["monolithic", "printed", "embedded", "material", "claim", "proof"],
  },
  {
    id: "paper-number-extract",
    text: "For each useful paper, extract one number: gap, force, turns, pulse, material loading, or strain.",
    reason: "paper to build",
    keywords: ["paper", "number", "force", "gap", "turns", "loading", "strain"],
  },
  {
    id: "paper-credibility-filter",
    text: "Favor papers with apparatus photos, force curves, and repeatable geometry over broad claims.",
    reason: "quality filter",
    keywords: ["paper", "apparatus", "force", "curve", "geometry", "quality", "credibility"],
  },
  {
    id: "figure-first-literature",
    text: "A paper tile earns space only if its figure changes a build decision.",
    reason: "library filter",
    keywords: ["paper", "figure", "decision", "build", "useful", "library"],
  },
  {
    id: "one-variable-fixture",
    text: "Make the next fixture change exactly one variable: gap, pole area, turns, or core.",
    reason: "experiment design",
    keywords: ["fixture", "variable", "gap", "pole", "turns", "core", "experiment"],
  },
  {
    id: "keeper-overlap-sweep",
    text: "Sweep keeper overlap separately from air gap; they are different knobs.",
    reason: "geometry sweep",
    keywords: ["keeper", "overlap", "air gap", "geometry", "sweep", "force"],
  },
  {
    id: "cell-width-fixture",
    text: "Add two fixed camera marks so cell width can be measured from video.",
    reason: "video measurement",
    keywords: ["camera", "marks", "width", "video", "measurement", "cell"],
  },
  {
    id: "driver-polarity-table",
    text: "Log polarity, pulse length, and remanent state after every EPM switch.",
    reason: "driver sanity",
    keywords: ["polarity", "pulse", "remanent", "switch", "driver", "epm"],
  },
  {
    id: "coil-resistance-before-pulse",
    text: "Measure coil resistance before each pulse batch so heating is not invisible.",
    reason: "thermal sanity",
    keywords: ["coil", "resistance", "pulse", "heat", "batch", "measurement"],
  },
  {
    id: "minimum-beautiful-proof",
    text: "Build the smallest object that clearly shows printed cell, magnetic drive, and lateral motion.",
    reason: "showcase proof",
    keywords: ["object", "printed", "cell", "magnetic", "drive", "lateral", "motion"],
  },
  {
    id: "array-later",
    text: "Do not array until one cell has force, heat, hold, release, and repeatability.",
    reason: "scope control",
    keywords: ["array", "one cell", "force", "heat", "hold", "release", "repeatability"],
  },
  {
    id: "paper-cluster",
    text: "Cluster useful papers into magnetic circuit, printed materials, driver, and mechanism coupling.",
    reason: "advisor map",
    keywords: ["paper", "magnetic circuit", "printed materials", "driver", "mechanism", "coupling"],
  },
  {
    id: "failure-photo-bank",
    text: "Photograph failures: slipping keeper, hot coil, hinge tear, no release, weak hold.",
    reason: "failure map",
    keywords: ["failure", "keeper", "coil", "hinge", "release", "hold", "photo"],
  },
  {
    id: "bench-before-cell",
    text: "Use a bench EPM coupon to earn the force, then move that geometry into the Sarrus cell.",
    reason: "risk order",
    keywords: ["bench", "coupon", "force", "geometry", "sarrus", "cell", "epm"],
  },
  {
    id: "printability-stack",
    text: "Rank each component by printability: conductor, hard magnet, soft yoke, insulator, hinge.",
    reason: "materials plan",
    keywords: ["printability", "conductor", "hard magnet", "soft yoke", "insulator", "hinge"],
  },
  {
    id: "cell-section-cutaway",
    text: "Design the cell around one cutaway: hinges, yoke path, magnet, coil, and keeper all visible.",
    reason: "figure-ready CAD",
    keywords: ["cutaway", "hinge", "yoke", "magnet", "coil", "keeper", "cad"],
  },
  {
    id: "approved-thread",
    text: "Use the most recent kept items as the next search query, not the oldest idea bank.",
    reason: "dynamic direction",
    keywords: ["approved", "recent", "search", "query", "suggestion", "dynamic"],
  },
];

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
    pack: fabricationSeedPackVersion,
    text: "Fabrication split: modular insert for the first reliable build, monolithic package for the end result.",
    createdAt: new Date("2026-05-04T21:06:00").toISOString(),
  },
  {
    id: "seed-fab-dummy-print",
    pack: fabricationSeedPackVersion,
    text: "First print: pocketed Sarrus cell with dummy magnet blocks; measure hinge strain and air-gap drift.",
    createdAt: new Date("2026-05-04T21:05:00").toISOString(),
  },
  {
    id: "seed-fab-gap-stop",
    pack: fabricationSeedPackVersion,
    text: "Gap stops: printed hard stops set minimum air gap so magnetic pull does not collapse the linkage.",
    createdAt: new Date("2026-05-04T21:04:00").toISOString(),
  },
  {
    id: "seed-fab-flux-path",
    pack: fabricationSeedPackVersion,
    text: "Flux path test: yoke, NdFeB, AlNiCo, and coil outside the cell before embedding anything.",
    createdAt: new Date("2026-05-04T21:03:00").toISOString(),
  },
  {
    id: "seed-fab-overprint-risk",
    pack: fabricationSeedPackVersion,
    text: "Overprint risk: print heat and tolerances can demagnetize, shift, or short the magnetic cartridge.",
    createdAt: new Date("2026-05-04T21:02:00").toISOString(),
  },
  {
    id: "seed-fab-symmetry",
    pack: fabricationSeedPackVersion,
    text: "Cell interface: push symmetric pivot pairs so the EPM adds lateral strain without twisting the cell.",
    createdAt: new Date("2026-05-04T21:01:00").toISOString(),
  },
  {
    id: "seed-fab-claim",
    pack: fabricationSeedPackVersion,
    text: "Monolithic claim needs integrated body, integrated actuator, no pneumatic input, and repeatable lateral stroke.",
    createdAt: new Date("2026-05-04T21:00:00").toISOString(),
  },
  {
    id: "seed-fab-cycle",
    pack: fabricationSeedPackVersion,
    text: "Do not chase arrays until one cell reaches 100 cycles with stable force and no hinge damage.",
    createdAt: new Date("2026-05-04T20:59:00").toISOString(),
  },
  {
    id: "seed-fab-cutaway",
    pack: fabricationSeedPackVersion,
    text: "Figure target: cutaway showing magnetic circuit, linkage, and lateral expansion in the same cell.",
    createdAt: new Date("2026-05-04T20:58:00").toISOString(),
  },
  {
    id: "seed-fab-cad-next",
    pack: fabricationSeedPackVersion,
    text: "CAD next: single-cell chassis with swappable EPM slot, hard gap datums, and width measurement tabs.",
    createdAt: new Date("2026-05-04T20:57:00").toISOString(),
  },
  {
    id: "seed-printable-magnet-reality",
    pack: printableSeedPackVersion,
    text: "Printed permanent magnets are likely weaker than inserted NdFeB. Use them last, not first.",
    createdAt: new Date("2026-05-04T21:26:00").toISOString(),
  },
  {
    id: "seed-printable-coil-choice",
    pack: printableSeedPackVersion,
    text: "Coil choice: wound copper for force, printed conductor for form-factor research, liquid metal for compliant routing.",
    createdAt: new Date("2026-05-04T21:25:00").toISOString(),
  },
  {
    id: "seed-printable-soft-core",
    pack: printableSeedPackVersion,
    text: "Soft magnetic printed core is a flux guide, not a substitute for a high-energy permanent magnet.",
    createdAt: new Date("2026-05-04T21:24:00").toISOString(),
  },
  {
    id: "seed-printable-coil-density",
    pack: printableSeedPackVersion,
    text: "Coil density test: turns, resistance, pulse current, heat, and magnetic field at the working gap.",
    createdAt: new Date("2026-05-04T21:23:00").toISOString(),
  },
  {
    id: "seed-printable-assembly-path",
    pack: printableSeedPackVersion,
    text: "Assembly path: pause print, place magnetic cartridge, overprint shell, then pulse-test before full cell cycling.",
    createdAt: new Date("2026-05-04T21:22:00").toISOString(),
  },
  {
    id: "seed-printable-material-screen",
    pack: printableSeedPackVersion,
    text: "Material screen: PLA/PETG body, TPU hinges, iron-filled flux path, inserted steel keeper.",
    createdAt: new Date("2026-05-04T21:21:00").toISOString(),
  },
  {
    id: "seed-printable-thermal-budget",
    pack: printableSeedPackVersion,
    text: "Thermal budget: pulse energy must stay below hinge softening and magnet demagnetization limits.",
    createdAt: new Date("2026-05-04T21:20:00").toISOString(),
  },
  {
    id: "seed-printable-evidence",
    pack: printableSeedPackVersion,
    text: "Evidence tile to make: photo of one printed cell, overlay of flux path, displacement trace, and pulse trace.",
    createdAt: new Date("2026-05-04T21:19:00").toISOString(),
  },
  {
    id: "seed-printable-claim-language",
    pack: printableSeedPackVersion,
    text: "Claim language: monolithically packaged first; monolithically printed only when actuator materials are printed too.",
    createdAt: new Date("2026-05-04T21:18:00").toISOString(),
  },
  {
    id: "seed-printable-next-paper",
    pack: printableSeedPackVersion,
    text: "Paper angle: Sarrus-cell architecture enables compact EPM actuation to become structural, local, and printable.",
    createdAt: new Date("2026-05-04T21:17:00").toISOString(),
  },
  {
    id: "seed-model-force-chain",
    pack: validationSeedPackVersion,
    text: "Model the chain: pulse current to flux, flux to pull force, pull force to link torque, torque to lateral strain.",
    createdAt: new Date("2026-05-04T21:46:00").toISOString(),
  },
  {
    id: "seed-model-pass-fail",
    pack: validationSeedPackVersion,
    text: "Pass/fail: EPM-on produces measurable lateral expansion above passive elastic drift.",
    createdAt: new Date("2026-05-04T21:45:00").toISOString(),
  },
  {
    id: "seed-model-null-test",
    pack: validationSeedPackVersion,
    text: "Null test: same printed cell, dummy magnet mass, same pulse wiring, no magnetic switching.",
    createdAt: new Date("2026-05-04T21:44:00").toISOString(),
  },
  {
    id: "seed-model-energy",
    pack: validationSeedPackVersion,
    text: "Energy metric: lateral work per pulse and zero-power hold time, not just peak magnetic force.",
    createdAt: new Date("2026-05-04T21:43:00").toISOString(),
  },
  {
    id: "seed-model-map",
    pack: validationSeedPackVersion,
    text: "Parameter map: air gap, keeper area, link angle, preload, pulse width, and coil temperature.",
    createdAt: new Date("2026-05-04T21:42:00").toISOString(),
  },
  {
    id: "seed-model-publishable",
    pack: validationSeedPackVersion,
    text: "Publishable result: one monolithic cell shows addressable expansion with state memory and no fluid line.",
    createdAt: new Date("2026-05-04T21:41:00").toISOString(),
  },
  {
    id: "seed-model-comparison",
    pack: validationSeedPackVersion,
    text: "Comparison set: pneumatic cell, passive cell, external EPM cell, embedded EPM cell.",
    createdAt: new Date("2026-05-04T21:40:00").toISOString(),
  },
  {
    id: "seed-model-friction",
    pack: validationSeedPackVersion,
    text: "Watch friction: an EPM latch can look strong while the linkage is just binding.",
    createdAt: new Date("2026-05-04T21:39:00").toISOString(),
  },
  {
    id: "seed-model-reversal",
    pack: validationSeedPackVersion,
    text: "Reversal matters: define whether the EPM actively expands, actively contracts, or only toggles a latch.",
    createdAt: new Date("2026-05-04T21:38:00").toISOString(),
  },
  {
    id: "seed-model-video",
    pack: validationSeedPackVersion,
    text: "Video proof: side view with width ruler, synchronized current trace, and visible off-state hold.",
    createdAt: new Date("2026-05-04T21:37:00").toISOString(),
  },
  {
    id: "seed-integrate-node-push",
    pack: cellIntegrationSeedPackVersion,
    text: "Actuate opposite Sarrus side nodes outward. Do not let the magnet just pull the cell diagonally.",
    createdAt: new Date("2026-05-04T22:12:00").toISOString(),
  },
  {
    id: "seed-integrate-structural-rib",
    pack: cellIntegrationSeedPackVersion,
    text: "Make the EPM package a structural rib: magnet, keeper, coil window, and load path in one printed feature.",
    createdAt: new Date("2026-05-04T22:11:00").toISOString(),
  },
  {
    id: "seed-integrate-gap-rocker",
    pack: cellIntegrationSeedPackVersion,
    text: "Keep the magnetic gap small. Use a rocker or wedge to turn short gap closure into wider lateral stroke.",
    createdAt: new Date("2026-05-04T22:10:00").toISOString(),
  },
  {
    id: "seed-integrate-preload",
    pack: cellIntegrationSeedPackVersion,
    text: "Use elastic preload so the EPM crosses a snap threshold instead of supplying the whole stroke continuously.",
    createdAt: new Date("2026-05-04T22:09:00").toISOString(),
  },
  {
    id: "seed-integrate-same-footprint",
    pack: cellIntegrationSeedPackVersion,
    text: "Success metric: same Sarrus cell footprint, added embedded actuation, measurable lateral expansion.",
    createdAt: new Date("2026-05-04T22:08:00").toISOString(),
  },
  {
    id: "seed-integrate-one-pulse",
    pack: cellIntegrationSeedPackVersion,
    text: "Electronics proof: one bipolar pulse toggles state; zero current holds expanded or contracted geometry.",
    createdAt: new Date("2026-05-04T22:07:00").toISOString(),
  },
  {
    id: "seed-integrate-datum-triad",
    pack: cellIntegrationSeedPackVersion,
    text: "CAD datum triad: pivot spacing, keeper overlap, and coil window. These three dimensions control the build.",
    createdAt: new Date("2026-05-04T22:06:00").toISOString(),
  },
  {
    id: "seed-integrate-embedded-not-external",
    pack: cellIntegrationSeedPackVersion,
    text: "Embedded means the actuator shares the cell body. External magnet near the cell is only a fixture test.",
    createdAt: new Date("2026-05-04T22:05:00").toISOString(),
  },
  {
    id: "seed-integrate-material-ladder",
    pack: cellIntegrationSeedPackVersion,
    text: "Material ladder: inserted magnets first, printed flux guide second, printed coil third, printed hard magnet last.",
    createdAt: new Date("2026-05-04T22:04:00").toISOString(),
  },
  {
    id: "seed-integrate-next-build",
    pack: cellIntegrationSeedPackVersion,
    text: "Next build: transparent-width markers, swappable EPM cassette, hard gap stops, and 100-cycle lateral trace.",
    createdAt: new Date("2026-05-04T22:03:00").toISOString(),
  },
  {
    id: "seed-force-budget-first",
    pack: forceBudgetSeedPackVersion,
    text: "Force budget first: required lateral cell force, linkage mechanical advantage, magnetic pull, and losses.",
    createdAt: new Date("2026-05-04T22:32:00").toISOString(),
  },
  {
    id: "seed-force-gap-table",
    pack: forceBudgetSeedPackVersion,
    text: "Make one table: gap, overlap area, pulse energy, pull force, lateral width change, hold state.",
    createdAt: new Date("2026-05-04T22:31:00").toISOString(),
  },
  {
    id: "seed-force-minimum-demo",
    pack: forceBudgetSeedPackVersion,
    text: "Minimum demo: one printed Sarrus cell widens under embedded EPM switching, then holds with zero current.",
    createdAt: new Date("2026-05-04T22:30:00").toISOString(),
  },
  {
    id: "seed-force-short-stroke",
    pack: forceBudgetSeedPackVersion,
    text: "Design around short magnetic stroke. Convert sub-millimeter gap closure into millimeter-scale width change.",
    createdAt: new Date("2026-05-04T22:29:00").toISOString(),
  },
  {
    id: "seed-force-bistable-cell",
    pack: forceBudgetSeedPackVersion,
    text: "If direct pull is weak, make the Sarrus cell bistable and let the EPM trigger the snap.",
    createdAt: new Date("2026-05-04T22:28:00").toISOString(),
  },
  {
    id: "seed-force-heat-limit",
    pack: forceBudgetSeedPackVersion,
    text: "Pulse limit is thermal: coil heat, polymer softening, magnet demag, and hinge creep.",
    createdAt: new Date("2026-05-04T22:27:00").toISOString(),
  },
  {
    id: "seed-force-driver",
    pack: forceBudgetSeedPackVersion,
    text: "Driver target: bipolar H-bridge pulse, current sense, temperature log, and no steady-state coil power.",
    createdAt: new Date("2026-05-04T22:26:00").toISOString(),
  },
  {
    id: "seed-force-fixture",
    pack: forceBudgetSeedPackVersion,
    text: "Fixture target: fixed cell base, dial width marker, load cell against lateral expansion, top-view camera.",
    createdAt: new Date("2026-05-04T22:25:00").toISOString(),
  },
  {
    id: "seed-force-cad-export",
    pack: forceBudgetSeedPackVersion,
    text: "CAD export should expose magnet pockets, keeper faces, coil path, pivots, and lateral measurement tabs.",
    createdAt: new Date("2026-05-04T22:24:00").toISOString(),
  },
  {
    id: "seed-force-paper-claim",
    pack: forceBudgetSeedPackVersion,
    text: "Paper claim: a printed linkage cell can make EPM switching act as local structural actuation.",
    createdAt: new Date("2026-05-04T22:23:00").toISOString(),
  },
  {
    id: "seed-endgame-printed-domain",
    pack: monolithicEndgameSeedPackVersion,
    text: "Endgame material stack: printed hard-magnetic domains provide bias; EPM pulse changes the useful flux path.",
    createdAt: new Date("2026-05-04T22:52:00").toISOString(),
  },
  {
    id: "seed-endgame-two-claims",
    pack: monolithicEndgameSeedPackVersion,
    text: "Separate two claims: monolithically packaged actuator now, monolithically printed magnetic actuator later.",
    createdAt: new Date("2026-05-04T22:51:00").toISOString(),
  },
  {
    id: "seed-endgame-printed-yoke",
    pack: monolithicEndgameSeedPackVersion,
    text: "Try a printed soft-magnetic yoke before a printed permanent magnet. The yoke is the easier printable win.",
    createdAt: new Date("2026-05-04T22:50:00").toISOString(),
  },
  {
    id: "seed-endgame-bistable-sarrus",
    pack: monolithicEndgameSeedPackVersion,
    text: "A bistable Sarrus cell makes the EPM a switch, not a muscle. That may be the cleanest route.",
    createdAt: new Date("2026-05-04T22:49:00").toISOString(),
  },
  {
    id: "seed-endgame-domain-map",
    pack: monolithicEndgameSeedPackVersion,
    text: "Map magnetic domains onto mechanical domains: hinge zone, rigid rib, keeper face, flux return.",
    createdAt: new Date("2026-05-04T22:48:00").toISOString(),
  },
  {
    id: "seed-endgame-printability-test",
    pack: monolithicEndgameSeedPackVersion,
    text: "Printability test: same cell geometry with inert filler, soft magnetic filler, then magnetic + coil.",
    createdAt: new Date("2026-05-04T22:47:00").toISOString(),
  },
  {
    id: "seed-endgame-no-hidden-actuator",
    pack: monolithicEndgameSeedPackVersion,
    text: "Do not hide a big actuator outside the frame. The actuation evidence has to live inside the cell boundary.",
    createdAt: new Date("2026-05-04T22:46:00").toISOString(),
  },
  {
    id: "seed-endgame-reviewer-proof",
    pack: monolithicEndgameSeedPackVersion,
    text: "Reviewer-proof test: remove the EPM cartridge and the same cell should lose the switched lateral response.",
    createdAt: new Date("2026-05-04T22:45:00").toISOString(),
  },
  {
    id: "seed-endgame-cross-section",
    pack: monolithicEndgameSeedPackVersion,
    text: "Best figure: one cutaway showing Sarrus linkage, magnetic circuit, coil, and lateral expansion arrow.",
    createdAt: new Date("2026-05-04T22:44:00").toISOString(),
  },
  {
    id: "seed-endgame-next-cad",
    pack: monolithicEndgameSeedPackVersion,
    text: "Next CAD: one-piece cell shell with replaceable actuator core, then freeze geometry for force testing.",
    createdAt: new Date("2026-05-04T22:43:00").toISOString(),
  },
  {
    id: "seed-printroad-five-materials",
    pack: printingRoadmapSeedPackVersion,
    text: "Printing roadmap: dielectric body, conductive coil, soft-magnetic yoke, hard magnet, compliant hinge.",
    createdAt: new Date("2026-05-04T23:12:00").toISOString(),
  },
  {
    id: "seed-printroad-coupon-first",
    pack: printingRoadmapSeedPackVersion,
    text: "Do not start with the whole cell. Print coupons for coil resistance, yoke permeability, and hinge fatigue.",
    createdAt: new Date("2026-05-04T23:11:00").toISOString(),
  },
  {
    id: "seed-printroad-soft-yoke-coupon",
    pack: printingRoadmapSeedPackVersion,
    text: "Soft-yoke coupon: same coil and magnet, printed yoke versus steel yoke, force at fixed gap.",
    createdAt: new Date("2026-05-04T23:10:00").toISOString(),
  },
  {
    id: "seed-printroad-conductor-choice",
    pack: printingRoadmapSeedPackVersion,
    text: "Conductor choice is a phase gate: wound copper for proof, printed ink for monolithic form, liquid metal for flex.",
    createdAt: new Date("2026-05-04T23:09:00").toISOString(),
  },
  {
    id: "seed-printroad-magnetization-step",
    pack: printingRoadmapSeedPackVersion,
    text: "Printed hard magnets still need magnetization. Treat magnetization as a manufacturing step, not a detail.",
    createdAt: new Date("2026-05-04T23:08:00").toISOString(),
  },
  {
    id: "seed-printroad-pause-print",
    pack: printingRoadmapSeedPackVersion,
    text: "Near-term monolithic package: pause print, insert magnet/coil/keeper, overprint the Sarrus shell.",
    createdAt: new Date("2026-05-04T23:07:00").toISOString(),
  },
  {
    id: "seed-printroad-one-axis",
    pack: printingRoadmapSeedPackVersion,
    text: "Only solve one axis first: lateral expansion. Ignore twisting, crawling, and arrays until one cell closes.",
    createdAt: new Date("2026-05-04T23:06:00").toISOString(),
  },
  {
    id: "seed-printroad-slicer-constraints",
    pack: printingRoadmapSeedPackVersion,
    text: "Slicer constraints matter: no trapped unsupported coil channels, no yoke overhangs, no magnet pocket drift.",
    createdAt: new Date("2026-05-04T23:05:00").toISOString(),
  },
  {
    id: "seed-printroad-material-swap",
    pack: printingRoadmapSeedPackVersion,
    text: "Every test cell should allow material swap: PLA/PETG body, TPU hinge, steel/printed yoke, wound/printed coil.",
    createdAt: new Date("2026-05-04T23:04:00").toISOString(),
  },
  {
    id: "seed-printroad-final-proof",
    pack: printingRoadmapSeedPackVersion,
    text: "Final proof: printed cell, integrated EPM stack, zero-power hold, lateral trace, and no pneumatic port.",
    createdAt: new Date("2026-05-04T23:03:00").toISOString(),
  },
  {
    id: "seed-cell-epm-gap-first",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Cell target: make lateral expansion close the magnetic gap instead of asking the magnet to pull across a long gap.",
    createdAt: new Date("2026-05-05T00:12:00").toISOString(),
  },
  {
    id: "seed-cell-epm-two-states",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Define two states only: expanded/open gap and contracted/closed keeper. Everything else is noise for the first proof.",
    createdAt: new Date("2026-05-05T00:11:00").toISOString(),
  },
  {
    id: "seed-cell-epm-force-budget",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Force budget starts at the Sarrus hinge. Required magnetic force equals hinge torque, friction, and load divided by mechanical advantage.",
    createdAt: new Date("2026-05-05T00:10:00").toISOString(),
  },
  {
    id: "seed-cell-epm-pulse-driver",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Driver proof: bidirectional pulse, measured current, measured coil temperature, and visible hold after power is disconnected.",
    createdAt: new Date("2026-05-05T00:09:00").toISOString(),
  },
  {
    id: "seed-cell-epm-keeper-face",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "The keeper face is part of the mechanism. Put it on the moving Sarrus link, not as a separate bench fixture.",
    createdAt: new Date("2026-05-05T00:08:00").toISOString(),
  },
  {
    id: "seed-cell-epm-cutaway-test",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Build one cutaway cell first so the flux path, coil, yoke, magnet pair, and linkage motion are all visible.",
    createdAt: new Date("2026-05-05T00:07:00").toISOString(),
  },
  {
    id: "seed-cell-epm-monolithic-later",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Monolithic comes in stages: printed shell plus inserted core, then printed yoke, then printed coil, then printed hard magnet.",
    createdAt: new Date("2026-05-05T00:06:00").toISOString(),
  },
  {
    id: "seed-cell-epm-removable-core",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Keep the first actuator core removable. If force is bad, swap the magnetic circuit without reprinting the Sarrus geometry.",
    createdAt: new Date("2026-05-05T00:05:00").toISOString(),
  },
  {
    id: "seed-cell-epm-no-pneumatics",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Best demo frame: same laterally expanding cell, pneumatic line removed, EPM pulse causes the useful state change.",
    createdAt: new Date("2026-05-05T00:04:00").toISOString(),
  },
  {
    id: "seed-cell-epm-next-build",
    pack: cellEpmIntegrationSeedPackVersion,
    text: "Next build: one cell, two keeper pads, one EPM cartridge, one lateral displacement trace, one zero-power hold photo.",
    createdAt: new Date("2026-05-05T00:03:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-sarrus-first",
    pack: mechanismCouplingSeedPackVersion,
    text: "Treat the Sarrus linkage as the transmission. The magnet only needs to bias the path, not brute-force every millimeter.",
    createdAt: new Date("2026-05-05T01:02:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-energy-landscape",
    pack: mechanismCouplingSeedPackVersion,
    text: "Sketch elastic energy plus magnetic energy versus lateral displacement before changing CAD.",
    createdAt: new Date("2026-05-05T01:01:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-snap-window",
    pack: mechanismCouplingSeedPackVersion,
    text: "If the cell is bistable, size the EPM to cross the snap window, not to hold the entire load continuously.",
    createdAt: new Date("2026-05-05T01:00:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-gap-map",
    pack: mechanismCouplingSeedPackVersion,
    text: "Make a gap map from open to closed: keeper distance, overlap area, and lateral displacement at each frame.",
    createdAt: new Date("2026-05-05T00:59:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-no-field-control",
    pack: mechanismCouplingSeedPackVersion,
    text: "Control test: identical cell with nonmagnetic dummy core should show the mechanical baseline only.",
    createdAt: new Date("2026-05-05T00:58:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-magnet-placement",
    pack: mechanismCouplingSeedPackVersion,
    text: "Move magnets to tune the curve. Placement is a design variable, not just packaging.",
    createdAt: new Date("2026-05-05T00:57:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-mechanical-advantage",
    pack: mechanismCouplingSeedPackVersion,
    text: "Use the linkage where mechanical advantage is highest near closure; avoid asking the EPM to start from a weak far gap.",
    createdAt: new Date("2026-05-05T00:56:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-latch-before-muscle",
    pack: mechanismCouplingSeedPackVersion,
    text: "First show magnetic latching contributes to actuation; full magnetic muscle can come after the latch curve is real.",
    createdAt: new Date("2026-05-05T00:55:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-print-insert-proof",
    pack: mechanismCouplingSeedPackVersion,
    text: "Print-insert proof: pause print two keeper pads and one EPM pocket into the cell, then overprint the shell.",
    createdAt: new Date("2026-05-05T00:54:00").toISOString(),
  },
  {
    id: "seed-mech-coupling-one-figure",
    pack: mechanismCouplingSeedPackVersion,
    text: "One figure should explain everything: Sarrus kinematics, EPM flux path, displacement trace, and zero-power state.",
    createdAt: new Date("2026-05-05T00:53:00").toISOString(),
  },
  {
    id: "seed-protocol-open-close",
    pack: prototypeProtocolSeedPackVersion,
    text: "Protocol: record open gap, closed gap, keeper overlap, and lateral displacement in the same frame.",
    createdAt: new Date("2026-05-05T02:12:00").toISOString(),
  },
  {
    id: "seed-protocol-dummy-core",
    pack: prototypeProtocolSeedPackVersion,
    text: "Dummy-core control: replace the EPM with the same-mass nonmagnetic insert and repeat the actuation trace.",
    createdAt: new Date("2026-05-05T02:11:00").toISOString(),
  },
  {
    id: "seed-protocol-pulse-log",
    pack: prototypeProtocolSeedPackVersion,
    text: "Pulse log: voltage, current, pulse width, polarity, coil temperature, and hold state for every trial.",
    createdAt: new Date("2026-05-05T02:10:00").toISOString(),
  },
  {
    id: "seed-protocol-thermal-limit",
    pack: prototypeProtocolSeedPackVersion,
    text: "Thermal limit: strongest pulse that does not soften the printed cell or drift the gap.",
    createdAt: new Date("2026-05-05T02:09:00").toISOString(),
  },
  {
    id: "seed-protocol-zero-power-hold",
    pack: prototypeProtocolSeedPackVersion,
    text: "Zero-power hold proof: show the cell holding after the driver is unplugged, not just after the pulse ends.",
    createdAt: new Date("2026-05-05T02:08:00").toISOString(),
  },
  {
    id: "seed-protocol-gap-shim",
    pack: prototypeProtocolSeedPackVersion,
    text: "Gap shims first: test 0.25, 0.5, 1, and 2 mm keeper gaps before changing magnet material.",
    createdAt: new Date("2026-05-05T02:07:00").toISOString(),
  },
  {
    id: "seed-protocol-force-trace",
    pack: prototypeProtocolSeedPackVersion,
    text: "Force trace: measure lateral force and displacement together so the EPM contribution is not just visual.",
    createdAt: new Date("2026-05-05T02:06:00").toISOString(),
  },
  {
    id: "seed-protocol-magnet-polish",
    pack: prototypeProtocolSeedPackVersion,
    text: "Keeper surface prep matters: flatness and contact area may beat a stronger magnet at this scale.",
    createdAt: new Date("2026-05-05T02:05:00").toISOString(),
  },
  {
    id: "seed-protocol-print-ladder",
    pack: prototypeProtocolSeedPackVersion,
    text: "Print ladder: assembled cartridge, pause-print insert, printed yoke, printed coil, printed hard magnet.",
    createdAt: new Date("2026-05-05T02:04:00").toISOString(),
  },
  {
    id: "seed-protocol-submit-figure",
    pack: prototypeProtocolSeedPackVersion,
    text: "Submission figure: photos, pulse trace, displacement plot, and control trace.",
    createdAt: new Date("2026-05-05T02:03:00").toISOString(),
  },
  {
    id: "seed-mono-route-cell-boundary",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Cell proof: EPM switching must change lateral width while the actuator stays inside the cell boundary.",
    createdAt: new Date("2026-05-05T03:12:00").toISOString(),
  },
  {
    id: "seed-mono-route-stroke-amplifier",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Use a short magnetic stroke: close a 0.5-1 mm gap, then let the Sarrus links amplify lateral expansion.",
    createdAt: new Date("2026-05-05T03:11:00").toISOString(),
  },
  {
    id: "seed-mono-route-dummy-cad",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Make two CADs: active EPM cartridge and same-mass dummy core in the identical cell.",
    createdAt: new Date("2026-05-05T03:10:00").toISOString(),
  },
  {
    id: "seed-mono-route-print-gate",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Monolithic gate: actuator geometry is printed with the cell; magnetic materials can start as inserts.",
    createdAt: new Date("2026-05-05T03:09:00").toISOString(),
  },
  {
    id: "seed-mono-route-four-traces",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Force contribution test: passive preload, pulse on, pulse off, reversed pulse.",
    createdAt: new Date("2026-05-05T03:08:00").toISOString(),
  },
  {
    id: "seed-mono-route-wire-axis",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Wire exits belong on a neutral strain path. If the hinge bends the wire, redesign the route.",
    createdAt: new Date("2026-05-05T03:07:00").toISOString(),
  },
  {
    id: "seed-mono-route-lateral-work",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Measure work: integrate lateral force-displacement per pulse, not just magnetic pull force.",
    createdAt: new Date("2026-05-05T03:06:00").toISOString(),
  },
  {
    id: "seed-mono-route-failure-wall",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Failure wall: heat drift, gap collapse, demag, keeper misalignment, hinge creep.",
    createdAt: new Date("2026-05-05T03:05:00").toISOString(),
  },
  {
    id: "seed-mono-route-reviewer-figure",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Reviewer figure: cutaway photo, flux path, gap trace, current pulse, width trace.",
    createdAt: new Date("2026-05-05T03:04:00").toISOString(),
  },
  {
    id: "seed-mono-route-next-build",
    pack: monolithicActuationRouteSeedPackVersion,
    text: "Next physical build: swappable EPM cartridge inside one laterally expanding Sarrus cell.",
    createdAt: new Date("2026-05-05T03:03:00").toISOString(),
  },
  {
    id: "seed-north-star-photograph",
    pack: northStarWallSeedPackVersion,
    text: "Make one object worth photographing: one Sarrus cell, visible coil, visible keeper, clean lateral width markers.",
    createdAt: new Date("2026-05-05T04:10:00").toISOString(),
  },
  {
    id: "seed-north-star-one-sentence",
    pack: northStarWallSeedPackVersion,
    text: "A printed Sarrus cell where the actuator is part of the architecture, not a tube attached to it.",
    createdAt: new Date("2026-05-05T04:09:00").toISOString(),
  },
  {
    id: "seed-north-star-pretty-proof",
    pack: northStarWallSeedPackVersion,
    text: "Pretty proof: dark cell, copper coil, pale keeper faces, one clean width trace beside the photo.",
    createdAt: new Date("2026-05-05T04:08:00").toISOString(),
  },
  {
    id: "seed-north-star-first-figure",
    pack: northStarWallSeedPackVersion,
    text: "First figure should feel obvious: pulse in, flux switches, links expand, zero-power hold.",
    createdAt: new Date("2026-05-05T04:07:00").toISOString(),
  },
  {
    id: "seed-north-star-monolithic-ladder",
    pack: northStarWallSeedPackVersion,
    text: "Monolithic ladder: beautiful inserted cartridge now, printed yoke next, printed coil after, printed hard magnet last.",
    createdAt: new Date("2026-05-05T04:06:00").toISOString(),
  },
  {
    id: "seed-north-star-cell-aesthetic",
    pack: northStarWallSeedPackVersion,
    text: "Design the prototype like a product: symmetric cell, hidden wire path, deliberate colors, no bench clutter in the frame.",
    createdAt: new Date("2026-05-05T04:05:00").toISOString(),
  },
  {
    id: "seed-north-star-real-test",
    pack: northStarWallSeedPackVersion,
    text: "Real test: same cell with EPM core, dummy core, and no core. The difference is the contribution.",
    createdAt: new Date("2026-05-05T04:04:00").toISOString(),
  },
  {
    id: "seed-north-star-tomorrow",
    pack: northStarWallSeedPackVersion,
    text: "Tomorrow build: freeze one cutaway CAD and print the cleanest cartridge pocket possible.",
    createdAt: new Date("2026-05-05T04:03:00").toISOString(),
  },
  {
    id: "seed-gallery-object-physical",
    pack: galleryObjectSeedPackVersion,
    text: "The next object should look finished, not like a bench workaround.",
    createdAt: new Date("2026-05-05T05:08:00").toISOString(),
  },
  {
    id: "seed-gallery-object-cutaway",
    pack: galleryObjectSeedPackVersion,
    text: "Cutaway: coil, keeper, yoke, magnet, hinge, and lateral width markers in one view.",
    createdAt: new Date("2026-05-05T05:07:00").toISOString(),
  },
  {
    id: "seed-gallery-object-no-tubes",
    pack: galleryObjectSeedPackVersion,
    text: "No pneumatic tube in the hero photo. The actuator lives inside the cell.",
    createdAt: new Date("2026-05-05T05:06:00").toISOString(),
  },
  {
    id: "seed-gallery-object-same-frame",
    pack: galleryObjectSeedPackVersion,
    text: "Beauty and evidence in the same frame: object photo, width trace, pulse trace.",
    createdAt: new Date("2026-05-05T05:05:00").toISOString(),
  },
  {
    id: "seed-gallery-object-materials",
    pack: galleryObjectSeedPackVersion,
    text: "Material direction: dark printed body, copper coil, pale keeper faces, clean ruler marks.",
    createdAt: new Date("2026-05-05T05:04:00").toISOString(),
  },
  {
    id: "seed-gallery-object-three-versions",
    pack: galleryObjectSeedPackVersion,
    text: "Photograph three cells together: dummy, inserted EPM, printed-yoke EPM.",
    createdAt: new Date("2026-05-05T05:03:00").toISOString(),
  },
  {
    id: "seed-gallery-object-publishable",
    pack: galleryObjectSeedPackVersion,
    text: "Publishable claim starts when EPM pulse changes lateral strain above dummy-core baseline.",
    createdAt: new Date("2026-05-05T05:02:00").toISOString(),
  },
  {
    id: "seed-gallery-object-next-cad",
    pack: galleryObjectSeedPackVersion,
    text: "Next CAD: one beautiful cutaway cell with swappable cartridge, hidden wires, and hard gap stops.",
    createdAt: new Date("2026-05-05T05:01:00").toISOString(),
  },
  {
    id: "seed-proud-cell-north-star",
    pack: proudCellObjectSeedPackVersion,
    text: "North star: one printed Sarrus cell where an EPM pulse creates useful lateral actuation.",
    createdAt: new Date("2026-05-05T06:10:00").toISOString(),
  },
  {
    id: "seed-proud-cell-gap-map",
    pack: proudCellObjectSeedPackVersion,
    text: "Make the gap map beautiful: open width, keeper distance, pulse, hold, release.",
    createdAt: new Date("2026-05-05T06:09:00").toISOString(),
  },
  {
    id: "seed-proud-cell-repulsion",
    pack: proudCellObjectSeedPackVersion,
    text: "Test repulsion too. Bistable EPM deformation may avoid the weakest attraction gap.",
    createdAt: new Date("2026-05-05T06:08:00").toISOString(),
  },
  {
    id: "seed-proud-cell-stack",
    pack: proudCellObjectSeedPackVersion,
    text: "Stack to prototype: printed body, wound coil, inserted magnets, steel keeper, then printed substitutes.",
    createdAt: new Date("2026-05-05T06:07:00").toISOString(),
  },
  {
    id: "seed-proud-cell-benchmark",
    pack: proudCellObjectSeedPackVersion,
    text: "Benchmark against the pneumatic cell by lateral work per stroke, not just displacement.",
    createdAt: new Date("2026-05-05T06:06:00").toISOString(),
  },
  {
    id: "seed-proud-cell-beauty-rule",
    pack: proudCellObjectSeedPackVersion,
    text: "If it cannot be photographed cleanly, the architecture is probably still too messy.",
    createdAt: new Date("2026-05-05T06:05:00").toISOString(),
  },
  {
    id: "seed-proud-cell-control",
    pack: proudCellObjectSeedPackVersion,
    text: "Control set: no core, dummy core, active EPM, reversed pulse.",
    createdAt: new Date("2026-05-05T06:04:00").toISOString(),
  },
  {
    id: "seed-proud-cell-next-print",
    pack: proudCellObjectSeedPackVersion,
    text: "Next print: one cutaway cell with hard gap stops and a removable EPM cartridge.",
    createdAt: new Date("2026-05-05T06:03:00").toISOString(),
  },
  {
    id: "seed-integrated-proof-one-object",
    pack: integratedProofSeedPackVersion,
    text: "One object: the cell, actuator, measurement marks, and wires all belong in the same clean frame.",
    createdAt: new Date("2026-05-05T07:10:00").toISOString(),
  },
  {
    id: "seed-integrated-proof-constant-boundary",
    pack: integratedProofSeedPackVersion,
    text: "Keep the cell boundary constant while moving from inserted cartridge to printed yoke to printed coil.",
    createdAt: new Date("2026-05-05T07:09:00").toISOString(),
  },
  {
    id: "seed-integrated-proof-short-gap",
    pack: integratedProofSeedPackVersion,
    text: "Design around a short magnetic stroke. Let the Sarrus linkage create the visible lateral motion.",
    createdAt: new Date("2026-05-05T07:08:00").toISOString(),
  },
  {
    id: "seed-integrated-proof-hold",
    pack: integratedProofSeedPackVersion,
    text: "After the pulse, unplug the driver. Zero-power hold has to be visible and measured.",
    createdAt: new Date("2026-05-05T07:07:00").toISOString(),
  },
  {
    id: "seed-integrated-proof-sensing",
    pack: integratedProofSeedPackVersion,
    text: "Add one embedded width marker or simple sensor before adding another actuation idea.",
    createdAt: new Date("2026-05-05T07:06:00").toISOString(),
  },
  {
    id: "seed-integrated-proof-print-pause",
    pack: integratedProofSeedPackVersion,
    text: "Print-pause-print is acceptable for the first proof if the geometry already anticipates monolithic printing.",
    createdAt: new Date("2026-05-05T07:05:00").toISOString(),
  },
  {
    id: "seed-integrated-proof-reviewer",
    pack: integratedProofSeedPackVersion,
    text: "Reviewer-proof claim: active EPM cell beats dummy-core cell in lateral work per pulse.",
    createdAt: new Date("2026-05-05T07:04:00").toISOString(),
  },
  {
    id: "seed-sarrus-actuation-contribution",
    pack: sarrusActuationProofSeedPackVersion,
    text: "Actuation claim: the EPM changes lateral width under load; holding alone is not enough.",
    createdAt: new Date("2026-05-05T08:10:00").toISOString(),
  },
  {
    id: "seed-sarrus-actuation-gap-stop",
    pack: sarrusActuationProofSeedPackVersion,
    text: "The first cell needs hard stops that preserve a sub-millimeter keeper gap.",
    createdAt: new Date("2026-05-05T08:09:00").toISOString(),
  },
  {
    id: "seed-sarrus-actuation-work",
    pack: sarrusActuationProofSeedPackVersion,
    text: "Measure EPM contribution as active-core minus dummy-core force-displacement work.",
    createdAt: new Date("2026-05-05T08:08:00").toISOString(),
  },
  {
    id: "seed-sarrus-actuation-bistability",
    pack: sarrusActuationProofSeedPackVersion,
    text: "Use magnetic bistability only if it reduces pulse energy or improves holding.",
    createdAt: new Date("2026-05-05T08:07:00").toISOString(),
  },
  {
    id: "seed-sarrus-actuation-figure",
    pack: sarrusActuationProofSeedPackVersion,
    text: "Make the paper figure before the prototype: cutaway, pulse trace, width trace, dummy baseline.",
    createdAt: new Date("2026-05-05T08:06:00").toISOString(),
  },
  {
    id: "seed-sarrus-actuation-wire-route",
    pack: sarrusActuationProofSeedPackVersion,
    text: "Route wires through the lowest-strain path. If the wire path is ugly, the design is not done.",
    createdAt: new Date("2026-05-05T08:05:00").toISOString(),
  },
  {
    id: "seed-sarrus-actuation-monolithic",
    pack: sarrusActuationProofSeedPackVersion,
    text: "Monolithic is a sequence: printed geometry, printed yoke, printed conductor, printed hard magnet.",
    createdAt: new Date("2026-05-05T08:04:00").toISOString(),
  },
  {
    id: "seed-memory-figure-pulse",
    pack: memoryFigureObjectSeedPackVersion,
    text: "Make the EPM pulse cross a mechanical barrier; do not ask it to supply the whole stroke.",
    createdAt: new Date("2026-05-05T09:10:00").toISOString(),
  },
  {
    id: "seed-memory-figure-work",
    pack: memoryFigureObjectSeedPackVersion,
    text: "Show lateral work per pulse for active EPM, dummy core, and no core.",
    createdAt: new Date("2026-05-05T09:09:00").toISOString(),
  },
  {
    id: "seed-memory-figure-gap",
    pack: memoryFigureObjectSeedPackVersion,
    text: "Gap stops are part of the actuator. If the keeper gap drifts, the claim drifts.",
    createdAt: new Date("2026-05-05T09:08:00").toISOString(),
  },
  {
    id: "seed-memory-figure-layout",
    pack: memoryFigureObjectSeedPackVersion,
    text: "One first figure: cutaway, pulse trace, width trace, force-work trace, dummy baseline.",
    createdAt: new Date("2026-05-05T09:07:00").toISOString(),
  },
  {
    id: "seed-memory-figure-memory",
    pack: memoryFigureObjectSeedPackVersion,
    text: "Use bistability only when it gives lower energy, cleaner holding, or a clearer state change.",
    createdAt: new Date("2026-05-05T09:06:00").toISOString(),
  },
  {
    id: "seed-memory-figure-object",
    pack: memoryFigureObjectSeedPackVersion,
    text: "Make the clean object the fixture: integrated marks, routed wires, removable actuator core.",
    createdAt: new Date("2026-05-05T09:05:00").toISOString(),
  },
  {
    id: "seed-memory-figure-monolithic",
    pack: memoryFigureObjectSeedPackVersion,
    text: "Monolithic route stays credible when every inserted part has a planned printed substitute.",
    createdAt: new Date("2026-05-05T09:04:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-boundary",
    pack: cartridgeProofWallSeedPackVersion,
    text: "Cartridge first: the EPM sits inside the Sarrus cell boundary.",
    createdAt: new Date("2026-05-05T10:10:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-controls",
    pack: cartridgeProofWallSeedPackVersion,
    text: "Same cell, same gap, same pulse: active, dummy, empty.",
    createdAt: new Date("2026-05-05T10:09:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-switch",
    pack: cartridgeProofWallSeedPackVersion,
    text: "Use the EPM as a state switch or stroke assist. Let the linkage amplify motion.",
    createdAt: new Date("2026-05-05T10:08:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-gates",
    pack: cartridgeProofWallSeedPackVersion,
    text: "Monolithic path: body, yoke, conductor, hard magnet. One gate at a time.",
    createdAt: new Date("2026-05-05T10:07:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-figure",
    pack: cartridgeProofWallSeedPackVersion,
    text: "One clean cutaway plus one work trace beats a wall of diagrams.",
    createdAt: new Date("2026-05-05T10:06:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-gap",
    pack: cartridgeProofWallSeedPackVersion,
    text: "If the gap changes during motion, the force comparison is not clean.",
    createdAt: new Date("2026-05-05T10:05:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-photo",
    pack: cartridgeProofWallSeedPackVersion,
    text: "Hidden wire path, visible keeper gap, clean width marks.",
    createdAt: new Date("2026-05-05T10:04:00").toISOString(),
  },
  {
    id: "seed-cartridge-proof-claim",
    pack: cartridgeProofWallSeedPackVersion,
    text: "Integrated actuation means magnetic energy produces lateral work.",
    createdAt: new Date("2026-05-05T10:03:00").toISOString(),
  },
  {
    id: "seed-first-experiment-loaded-width",
    pack: sarrusFirstExperimentWallSeedPackVersion,
    text: "First proud demo: one pulse changes lateral width under load.",
    createdAt: new Date("2026-05-05T11:10:00").toISOString(),
  },
  {
    id: "seed-first-experiment-mechanism",
    pack: sarrusFirstExperimentWallSeedPackVersion,
    text: "The actuator lives in the mechanism, not beside it.",
    createdAt: new Date("2026-05-05T11:09:00").toISOString(),
  },
  {
    id: "seed-first-experiment-frame",
    pack: sarrusFirstExperimentWallSeedPackVersion,
    text: "Show keeper gap and cell width in the same frame.",
    createdAt: new Date("2026-05-05T11:08:00").toISOString(),
  },
  {
    id: "seed-first-experiment-magnetization",
    pack: sarrusFirstExperimentWallSeedPackVersion,
    text: "Treat magnetization profile as geometry.",
    createdAt: new Date("2026-05-05T11:07:00").toISOString(),
  },
  {
    id: "seed-first-experiment-origami",
    pack: sarrusFirstExperimentWallSeedPackVersion,
    text: "Origami papers help the shape logic. Sarrus proof needs force.",
    createdAt: new Date("2026-05-05T11:06:00").toISOString(),
  },
  {
    id: "seed-first-experiment-ladder",
    pack: sarrusFirstExperimentWallSeedPackVersion,
    text: "Monolithic printing is a ladder, not a leap.",
    createdAt: new Date("2026-05-05T11:05:00").toISOString(),
  },
  {
    id: "seed-first-experiment-photo",
    pack: sarrusFirstExperimentWallSeedPackVersion,
    text: "Clean face, hidden wires, visible motion.",
    createdAt: new Date("2026-05-05T11:04:00").toISOString(),
  },
  {
    id: "seed-proud-object-one-cell",
    pack: proudObjectWallSeedPackVersion,
    text: "One beautiful cell is enough if the actuation is real.",
    createdAt: new Date("2026-05-05T12:10:00").toISOString(),
  },
  {
    id: "seed-proud-object-force-loop",
    pack: proudObjectWallSeedPackVersion,
    text: "Close the loop: pulse, flux, torque, width, work.",
    createdAt: new Date("2026-05-05T12:09:00").toISOString(),
  },
  {
    id: "seed-proud-object-datums",
    pack: proudObjectWallSeedPackVersion,
    text: "Design datums before design flourishes.",
    createdAt: new Date("2026-05-05T12:08:00").toISOString(),
  },
  {
    id: "seed-proud-object-variables",
    pack: proudObjectWallSeedPackVersion,
    text: "Gap, magnetization, stiffness. Change one at a time.",
    createdAt: new Date("2026-05-05T12:07:00").toISOString(),
  },
  {
    id: "seed-proud-object-failure",
    pack: proudObjectWallSeedPackVersion,
    text: "Make failure beautiful enough to read quickly.",
    createdAt: new Date("2026-05-05T12:06:00").toISOString(),
  },
  {
    id: "seed-proud-object-claim",
    pack: proudObjectWallSeedPackVersion,
    text: "The claim is lateral work from an integrated magnetic actuator.",
    createdAt: new Date("2026-05-05T12:05:00").toISOString(),
  },
  {
    id: "seed-dopamine-object-argument",
    pack: dopamineObjectWallSeedPackVersion,
    text: "The object is the argument.",
    createdAt: new Date("2026-05-05T13:10:00").toISOString(),
  },
  {
    id: "seed-dopamine-object-no-tubes",
    pack: dopamineObjectWallSeedPackVersion,
    text: "No tubes. No tower. Wires only.",
    createdAt: new Date("2026-05-05T13:09:00").toISOString(),
  },
  {
    id: "seed-dopamine-object-alive",
    pack: dopamineObjectWallSeedPackVersion,
    text: "Make the cell feel alive, then make the numbers undeniable.",
    createdAt: new Date("2026-05-05T13:08:00").toISOString(),
  },
  {
    id: "seed-dopamine-object-frame",
    pack: dopamineObjectWallSeedPackVersion,
    text: "One frame: object, pulse, width, force.",
    createdAt: new Date("2026-05-05T13:07:00").toISOString(),
  },
  {
    id: "seed-dopamine-object-baseline",
    pack: dopamineObjectWallSeedPackVersion,
    text: "Active, dummy, empty. Same cell. Same beauty.",
    createdAt: new Date("2026-05-05T13:06:00").toISOString(),
  },
  {
    id: "seed-dopamine-object-ladder",
    pack: dopamineObjectWallSeedPackVersion,
    text: "Monolithic is earned: pocket, yoke, conductor, magnet.",
    createdAt: new Date("2026-05-05T13:05:00").toISOString(),
  },
  {
    id: "seed-dopamine-object-tomorrow",
    pack: dopamineObjectWallSeedPackVersion,
    text: "Tomorrow: print one cell worth photographing.",
    createdAt: new Date("2026-05-05T13:04:00").toISOString(),
  },
  {
    id: "seed-jewel-north-star",
    pack: northStarJewelWallSeedPackVersion,
    text: "Build the cell that makes pneumatic tubing feel old.",
    createdAt: new Date("2026-05-05T14:10:00").toISOString(),
  },
  {
    id: "seed-jewel-hidden-actuator",
    pack: northStarJewelWallSeedPackVersion,
    text: "The actuator disappears into the architecture.",
    createdAt: new Date("2026-05-05T14:09:00").toISOString(),
  },
  {
    id: "seed-jewel-first-pulse",
    pack: northStarJewelWallSeedPackVersion,
    text: "First pulse: move, hold, breathe.",
    createdAt: new Date("2026-05-05T14:08:00").toISOString(),
  },
  {
    id: "seed-jewel-touch-sense",
    pack: northStarJewelWallSeedPackVersion,
    text: "Later, the cell knows its own state.",
    createdAt: new Date("2026-05-05T14:07:00").toISOString(),
  },
  {
    id: "seed-jewel-print-ritual",
    pack: northStarJewelWallSeedPackVersion,
    text: "Insert now. Overprint next. Print everything last.",
    createdAt: new Date("2026-05-05T14:06:00").toISOString(),
  },
  {
    id: "seed-jewel-cover",
    pack: northStarJewelWallSeedPackVersion,
    text: "Make the cover image before the cover letter.",
    createdAt: new Date("2026-05-05T14:05:00").toISOString(),
  },
  {
    id: "seed-jewel-protect",
    pack: northStarJewelWallSeedPackVersion,
    text: "Make the prototype feel precious enough to protect.",
    createdAt: new Date("2026-05-05T14:04:00").toISOString(),
  },
  {
    id: "seed-memory-wall-two-state",
    pack: mechanicalMemoryWallSeedPackVersion,
    text: "Two stable widths, one magnetic command.",
    createdAt: new Date("2026-05-05T15:10:00").toISOString(),
  },
  {
    id: "seed-memory-wall-snap",
    pack: mechanicalMemoryWallSeedPackVersion,
    text: "Let mechanics snap. Let the EPM decide when.",
    createdAt: new Date("2026-05-05T15:09:00").toISOString(),
  },
  {
    id: "seed-memory-wall-state-map",
    pack: mechanicalMemoryWallSeedPackVersion,
    text: "The cell needs a state map, not just a force plot.",
    createdAt: new Date("2026-05-05T15:08:00").toISOString(),
  },
  {
    id: "seed-memory-wall-logic",
    pack: mechanicalMemoryWallSeedPackVersion,
    text: "Mechanical memory turns one cell into a material bit.",
    createdAt: new Date("2026-05-05T15:07:00").toISOString(),
  },
  {
    id: "seed-memory-wall-proof",
    pack: mechanicalMemoryWallSeedPackVersion,
    text: "Show contracted, switched, expanded, held.",
    createdAt: new Date("2026-05-05T15:06:00").toISOString(),
  },
  {
    id: "seed-memory-wall-beauty",
    pack: mechanicalMemoryWallSeedPackVersion,
    text: "Make the state change visible from across the room.",
    createdAt: new Date("2026-05-05T15:05:00").toISOString(),
  },
  {
    id: "seed-memory-wall-paper",
    pack: mechanicalMemoryWallSeedPackVersion,
    text: "A beautiful demo is the shortest introduction.",
    createdAt: new Date("2026-05-05T15:04:00").toISOString(),
  },
  {
    id: "seed-one-cell-proof-pulse",
    pack: oneCellProofWallSeedPackVersion,
    text: "One cell. One pulse. One visible width change.",
    createdAt: new Date("2026-05-05T16:10:00").toISOString(),
  },
  {
    id: "seed-one-cell-proof-work",
    pack: oneCellProofWallSeedPackVersion,
    text: "Lateral work is the proof.",
    createdAt: new Date("2026-05-05T16:09:00").toISOString(),
  },
  {
    id: "seed-one-cell-proof-gap",
    pack: oneCellProofWallSeedPackVersion,
    text: "Make the keeper gap a design feature.",
    createdAt: new Date("2026-05-05T16:08:00").toISOString(),
  },
  {
    id: "seed-one-cell-proof-hold",
    pack: oneCellProofWallSeedPackVersion,
    text: "A zero-power hold is already a new actuation language.",
    createdAt: new Date("2026-05-05T16:07:00").toISOString(),
  },
  {
    id: "seed-one-cell-proof-cutaway",
    pack: oneCellProofWallSeedPackVersion,
    text: "The first monolithic proof can be a beautiful cutaway.",
    createdAt: new Date("2026-05-05T16:06:00").toISOString(),
  },
  {
    id: "seed-one-cell-proof-overprint",
    pack: oneCellProofWallSeedPackVersion,
    text: "Pocket, insert, overprint, measure.",
    createdAt: new Date("2026-05-05T16:05:00").toISOString(),
  },
  {
    id: "seed-one-cell-proof-force-path",
    pack: oneCellProofWallSeedPackVersion,
    text: "Every tile should answer where the force goes.",
    createdAt: new Date("2026-05-05T16:04:00").toISOString(),
  },
  {
    id: "seed-printable-materials-coupon",
    pack: printableMaterialsWallSeedPackVersion,
    text: "A printed magnet is a coupon test before it is an actuator.",
    createdAt: new Date("2026-05-05T17:10:00").toISOString(),
  },
  {
    id: "seed-printable-materials-yoke",
    pack: printableMaterialsWallSeedPackVersion,
    text: "Print the yoke path as carefully as the mechanism.",
    createdAt: new Date("2026-05-05T17:09:00").toISOString(),
  },
  {
    id: "seed-printable-materials-matrix",
    pack: printableMaterialsWallSeedPackVersion,
    text: "Hard magnet, soft yoke, conductor, insulator.",
    createdAt: new Date("2026-05-05T17:08:00").toISOString(),
  },
  {
    id: "seed-printable-materials-substitute",
    pack: printableMaterialsWallSeedPackVersion,
    text: "The monolithic claim becomes real one printable substitute at a time.",
    createdAt: new Date("2026-05-05T17:07:00").toISOString(),
  },
  {
    id: "seed-printable-materials-heat",
    pack: printableMaterialsWallSeedPackVersion,
    text: "Measure permeability and heat like geometry.",
    createdAt: new Date("2026-05-05T17:06:00").toISOString(),
  },
  {
    id: "seed-printable-materials-beauty",
    pack: printableMaterialsWallSeedPackVersion,
    text: "Beautiful cell, brutal coupon tests.",
    createdAt: new Date("2026-05-05T17:05:00").toISOString(),
  },
  {
    id: "seed-printable-materials-insert",
    pack: printableMaterialsWallSeedPackVersion,
    text: "The first proud object can still have one inserted core.",
    createdAt: new Date("2026-05-05T17:04:00").toISOString(),
  },
  {
    id: "seed-bench-proof-trace",
    pack: benchProofWallSeedPackVersion,
    text: "One trace: pulse, width, force.",
    createdAt: new Date("2026-05-04T23:20:00").toISOString(),
  },
  {
    id: "seed-bench-proof-control",
    pack: benchProofWallSeedPackVersion,
    text: "Active, dummy, empty. Same cell.",
    createdAt: new Date("2026-05-04T23:19:00").toISOString(),
  },
  {
    id: "seed-bench-proof-gap",
    pack: benchProofWallSeedPackVersion,
    text: "Gap shims before new geometry.",
    createdAt: new Date("2026-05-04T23:18:00").toISOString(),
  },
  {
    id: "seed-bench-proof-load",
    pack: benchProofWallSeedPackVersion,
    text: "Move one cell under load.",
    createdAt: new Date("2026-05-04T23:17:00").toISOString(),
  },
  {
    id: "seed-bench-proof-claim",
    pack: benchProofWallSeedPackVersion,
    text: "Make the first proof impossible to dismiss.",
    createdAt: new Date("2026-05-04T23:16:00").toISOString(),
  },
  {
    id: "seed-monolithic-integration-stack",
    pack: monolithicIntegrationWallSeedPackVersion,
    text: "Design the cross-section first.",
    createdAt: new Date("2026-05-04T23:36:00").toISOString(),
  },
  {
    id: "seed-monolithic-integration-coil",
    pack: monolithicIntegrationWallSeedPackVersion,
    text: "Give the coil a real window.",
    createdAt: new Date("2026-05-04T23:35:00").toISOString(),
  },
  {
    id: "seed-monolithic-integration-gap",
    pack: monolithicIntegrationWallSeedPackVersion,
    text: "A printed datum is a force multiplier.",
    createdAt: new Date("2026-05-04T23:34:00").toISOString(),
  },
  {
    id: "seed-monolithic-integration-wires",
    pack: monolithicIntegrationWallSeedPackVersion,
    text: "Keep wires out of hinge strain.",
    createdAt: new Date("2026-05-04T23:33:00").toISOString(),
  },
  {
    id: "seed-monolithic-integration-evidence",
    pack: monolithicIntegrationWallSeedPackVersion,
    text: "One photo beside one trace.",
    createdAt: new Date("2026-05-04T23:32:00").toISOString(),
  },
  {
    id: "seed-monolithic-integration-proud",
    pack: monolithicIntegrationWallSeedPackVersion,
    text: "Make the object look inevitable.",
    createdAt: new Date("2026-05-04T23:31:00").toISOString(),
  },
  {
    id: "seed-actuator-candidate-rocker",
    pack: actuatorCandidatesWallSeedPackVersion,
    text: "Pick one architecture before polishing CAD.",
    createdAt: new Date("2026-05-04T23:52:00").toISOString(),
  },
  {
    id: "seed-actuator-candidate-trigger",
    pack: actuatorCandidatesWallSeedPackVersion,
    text: "Use the EPM as a trigger, not a motor.",
    createdAt: new Date("2026-05-04T23:51:00").toISOString(),
  },
  {
    id: "seed-actuator-candidate-pair",
    pack: actuatorCandidatesWallSeedPackVersion,
    text: "Symmetric pull prevents twist.",
    createdAt: new Date("2026-05-04T23:50:00").toISOString(),
  },
  {
    id: "seed-actuator-candidate-reset",
    pack: actuatorCandidatesWallSeedPackVersion,
    text: "Reset is part of the actuator.",
    createdAt: new Date("2026-05-04T23:49:00").toISOString(),
  },
  {
    id: "seed-actuator-candidate-cartridge",
    pack: actuatorCandidatesWallSeedPackVersion,
    text: "The first cartridge should be gorgeous and honest.",
    createdAt: new Date("2026-05-04T23:48:00").toISOString(),
  },
  {
    id: "seed-actuator-candidate-proof",
    pack: actuatorCandidatesWallSeedPackVersion,
    text: "One object, one trace, one claim.",
    createdAt: new Date("2026-05-04T23:47:00").toISOString(),
  },
  {
    id: "seed-magnetic-circuit-gap",
    pack: magneticCircuitWallSeedPackVersion,
    text: "The gap is the experiment.",
    createdAt: new Date("2026-05-05T00:08:00").toISOString(),
  },
  {
    id: "seed-magnetic-circuit-yoke",
    pack: magneticCircuitWallSeedPackVersion,
    text: "Design the flux return before the shell.",
    createdAt: new Date("2026-05-05T00:07:00").toISOString(),
  },
  {
    id: "seed-magnetic-circuit-face",
    pack: magneticCircuitWallSeedPackVersion,
    text: "Keeper face geometry is actuator geometry.",
    createdAt: new Date("2026-05-05T00:06:00").toISOString(),
  },
  {
    id: "seed-magnetic-circuit-pulse",
    pack: magneticCircuitWallSeedPackVersion,
    text: "Switch hard. Hold cold.",
    createdAt: new Date("2026-05-05T00:05:00").toISOString(),
  },
  {
    id: "seed-magnetic-circuit-off",
    pack: magneticCircuitWallSeedPackVersion,
    text: "Off needs to be measured too.",
    createdAt: new Date("2026-05-05T00:04:00").toISOString(),
  },
  {
    id: "seed-magnetic-circuit-proud",
    pack: magneticCircuitWallSeedPackVersion,
    text: "Make the cartridge look like it belongs inside the cell.",
    createdAt: new Date("2026-05-05T00:03:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-width",
    pack: integratedCellWallSeedPackVersion,
    text: "One cell first. Width change is the proof.",
    createdAt: new Date("2026-05-05T00:24:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-force",
    pack: integratedCellWallSeedPackVersion,
    text: "The EPM must move the linkage.",
    createdAt: new Date("2026-05-05T00:23:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-gap",
    pack: integratedCellWallSeedPackVersion,
    text: "Keep the air gap beautiful and small.",
    createdAt: new Date("2026-05-05T00:22:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-pocket",
    pack: integratedCellWallSeedPackVersion,
    text: "Print the pocket. Insert the truth. Replace it later.",
    createdAt: new Date("2026-05-05T00:21:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-trace",
    pack: integratedCellWallSeedPackVersion,
    text: "Measure pulse, heat, width, hold.",
    createdAt: new Date("2026-05-05T00:20:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-memory",
    pack: integratedCellWallSeedPackVersion,
    text: "The final object is a cell that remembers.",
    createdAt: new Date("2026-05-05T00:19:00").toISOString(),
  },
  {
    id: "seed-proof-object-sequence",
    pack: proofObjectWallSeedPackVersion,
    text: "External, embedded, printed.",
    createdAt: new Date("2026-05-05T00:40:00").toISOString(),
  },
  {
    id: "seed-proof-object-fixture",
    pack: proofObjectWallSeedPackVersion,
    text: "The first fixture should make bad data hard.",
    createdAt: new Date("2026-05-05T00:39:00").toISOString(),
  },
  {
    id: "seed-proof-object-window",
    pack: proofObjectWallSeedPackVersion,
    text: "Coil window outside the hinge strain.",
    createdAt: new Date("2026-05-05T00:38:00").toISOString(),
  },
  {
    id: "seed-proof-object-figure",
    pack: proofObjectWallSeedPackVersion,
    text: "Object, trace, cross-section.",
    createdAt: new Date("2026-05-05T00:37:00").toISOString(),
  },
  {
    id: "seed-proof-object-hold",
    pack: proofObjectWallSeedPackVersion,
    text: "Show it holding with power off.",
    createdAt: new Date("2026-05-05T00:36:00").toISOString(),
  },
  {
    id: "seed-proof-object-failure",
    pack: proofObjectWallSeedPackVersion,
    text: "Every failed build gets one parameter name.",
    createdAt: new Date("2026-05-05T00:35:00").toISOString(),
  },
  {
    id: "seed-playbook-route",
    pack: absorbablePlaybookWallSeedPackVersion,
    text: "Route, role, trace.",
    createdAt: new Date("2026-05-05T00:58:00").toISOString(),
  },
  {
    id: "seed-playbook-one-cell",
    pack: absorbablePlaybookWallSeedPackVersion,
    text: "One cell before array.",
    createdAt: new Date("2026-05-05T00:57:00").toISOString(),
  },
  {
    id: "seed-playbook-paper",
    pack: absorbablePlaybookWallSeedPackVersion,
    text: "One paper, one experiment.",
    createdAt: new Date("2026-05-05T00:56:00").toISOString(),
  },
  {
    id: "seed-playbook-width",
    pack: absorbablePlaybookWallSeedPackVersion,
    text: "Measure width every time.",
    createdAt: new Date("2026-05-05T00:55:00").toISOString(),
  },
  {
    id: "seed-playbook-steps",
    pack: absorbablePlaybookWallSeedPackVersion,
    text: "External, embedded, printed.",
    createdAt: new Date("2026-05-05T00:54:00").toISOString(),
  },
  {
    id: "seed-playbook-figure",
    pack: absorbablePlaybookWallSeedPackVersion,
    text: "Object, trace, section.",
    createdAt: new Date("2026-05-05T00:53:00").toISOString(),
  },
  {
    id: "seed-protocol-target",
    pack: nextBuildProtocolWallSeedPackVersion,
    text: "Move one cell under a known load.",
    createdAt: new Date("2026-05-05T01:14:00").toISOString(),
  },
  {
    id: "seed-protocol-choice",
    pack: nextBuildProtocolWallSeedPackVersion,
    text: "Choose pull pair, rocker, or latch.",
    createdAt: new Date("2026-05-05T01:13:00").toISOString(),
  },
  {
    id: "seed-protocol-variable",
    pack: nextBuildProtocolWallSeedPackVersion,
    text: "One variable per test.",
    createdAt: new Date("2026-05-05T01:12:00").toISOString(),
  },
  {
    id: "seed-protocol-table",
    pack: nextBuildProtocolWallSeedPackVersion,
    text: "Off, on, reset, fail.",
    createdAt: new Date("2026-05-05T01:11:00").toISOString(),
  },
  {
    id: "seed-protocol-daily",
    pack: nextBuildProtocolWallSeedPackVersion,
    text: "One card, one test, one trace.",
    createdAt: new Date("2026-05-05T01:10:00").toISOString(),
  },
  {
    id: "seed-protocol-proof",
    pack: nextBuildProtocolWallSeedPackVersion,
    text: "Beautiful, measurable, repeatable.",
    createdAt: new Date("2026-05-05T01:09:00").toISOString(),
  },
  {
    id: "seed-sprint-geometry",
    pack: sprintBoardWallSeedPackVersion,
    text: "Freeze one geometry.",
    createdAt: new Date("2026-05-05T01:28:00").toISOString(),
  },
  {
    id: "seed-sprint-sweep",
    pack: sprintBoardWallSeedPackVersion,
    text: "Sweep gap before redesign.",
    createdAt: new Date("2026-05-05T01:27:00").toISOString(),
  },
  {
    id: "seed-sprint-pulse",
    pack: sprintBoardWallSeedPackVersion,
    text: "Find the cold pulse window.",
    createdAt: new Date("2026-05-05T01:26:00").toISOString(),
  },
  {
    id: "seed-sprint-width",
    pack: sprintBoardWallSeedPackVersion,
    text: "Record width change beside the trace.",
    createdAt: new Date("2026-05-05T01:25:00").toISOString(),
  },
  {
    id: "seed-sprint-reset",
    pack: sprintBoardWallSeedPackVersion,
    text: "Reset counts as actuation.",
    createdAt: new Date("2026-05-05T01:24:00").toISOString(),
  },
  {
    id: "seed-sprint-done",
    pack: sprintBoardWallSeedPackVersion,
    text: "Done means object, trace, section.",
    createdAt: new Date("2026-05-05T01:23:00").toISOString(),
  },
  {
    id: "seed-atlas-cell",
    pack: monolithicAtlasWallSeedPackVersion,
    text: "Design the cell around the flux path.",
    createdAt: new Date("2026-05-05T01:44:00").toISOString(),
  },
  {
    id: "seed-atlas-keeper",
    pack: monolithicAtlasWallSeedPackVersion,
    text: "The keeper face is the actuator face.",
    createdAt: new Date("2026-05-05T01:43:00").toISOString(),
  },
  {
    id: "seed-atlas-cartridge",
    pack: monolithicAtlasWallSeedPackVersion,
    text: "Use an inserted cartridge until the force is real.",
    createdAt: new Date("2026-05-05T01:42:00").toISOString(),
  },
  {
    id: "seed-atlas-monolith",
    pack: monolithicAtlasWallSeedPackVersion,
    text: "Monolithic is the destination.",
    createdAt: new Date("2026-05-05T01:41:00").toISOString(),
  },
  {
    id: "seed-atlas-proof",
    pack: monolithicAtlasWallSeedPackVersion,
    text: "Show width change, hold, heat.",
    createdAt: new Date("2026-05-05T01:40:00").toISOString(),
  },
  {
    id: "seed-atlas-figure",
    pack: monolithicAtlasWallSeedPackVersion,
    text: "One cell becomes the figure.",
    createdAt: new Date("2026-05-05T01:39:00").toISOString(),
  },
  {
    id: "seed-bridge-force",
    pack: seedPackVersion,
    text: "Pull a link, not a wall.",
    createdAt: new Date("2026-05-05T01:58:00").toISOString(),
  },
  {
    id: "seed-bridge-gap",
    pack: seedPackVersion,
    text: "Make the gap short and repeatable.",
    createdAt: new Date("2026-05-05T01:57:00").toISOString(),
  },
  {
    id: "seed-bridge-reset",
    pack: seedPackVersion,
    text: "Reset is part of actuation.",
    createdAt: new Date("2026-05-05T01:56:00").toISOString(),
  },
  {
    id: "seed-bridge-load",
    pack: seedPackVersion,
    text: "Test against a known load.",
    createdAt: new Date("2026-05-05T01:55:00").toISOString(),
  },
  {
    id: "seed-bridge-pocket",
    pack: seedPackVersion,
    text: "Print the pocket before the magnet.",
    createdAt: new Date("2026-05-05T01:54:00").toISOString(),
  },
  {
    id: "seed-bridge-proof",
    pack: seedPackVersion,
    text: "One clean cycle is the proof.",
    createdAt: new Date("2026-05-05T01:53:00").toISOString(),
  },
];

const seedNoteIds = new Set(seedNotes.map((note) => note.id));

let state = loadState();
let paperFeedback = loadPaperFeedback();
let ideaFeedback = loadIdeaFeedback();
let suggestionState = loadSuggestionState();
let aiFeed = loadAiFeed();
let deletedNoteIds = loadDeletedNoteIds();
let sync = { status: "checking", base: "", root: "", deleteConfigured: false, aiConfigured: false, aiModel: "" };
let aiService = { status: "checking", base: "", configured: false, model: "" };
let noteDraft = "";
let pendingFiles = [];
let toastTimer = 0;
let aiRefreshTimer = 0;
let cloudSaveTimer = 0;
let tipWindowIndex = 0;
let suppressCloudStateSave = false;
let lastCloudStateSignature = "";
const previewUrls = new Map();
const visibleTipCount = 9;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(stateKey) || "null");
    if (parsed && Array.isArray(parsed.notes) && Array.isArray(parsed.files)) {
      return finalizeLoadedState({ notes: parsed.notes, files: parsed.files });
    }
  } catch (error) {
    console.warn(error);
  }
  return finalizeLoadedState({ notes: [], files: [] });
}

function isSeedNote(note) {
  return seedNoteIds.has(note?.id) || /^seed-/.test(String(note?.id || ""));
}

function userNotes(notes) {
  return (Array.isArray(notes) ? notes : []).filter((note) => !isSeedNote(note));
}

function finalizeLoadedState(next) {
  const cleaned = {
    notes: userNotes(next.notes),
    files: Array.isArray(next.files) ? next.files.filter(isVisibleLibraryFile) : [],
  };
  try {
    localStorage.setItem(seedPackKey, seedPackVersion);
    localStorage.setItem(stateKey, JSON.stringify(cleaned));
  } catch (error) {
    console.warn(error);
  }
  return cleaned;
}

function saveState() {
  const deleted = new Set(deletedNoteIds);
  state.notes = userNotes(state.notes).filter((note) => !deleted.has(note.id));
  state.files = state.files.filter(isVisibleLibraryFile);
  localStorage.setItem(stateKey, JSON.stringify(state));
  queueCloudStateSave();
}

function withRecoveredFeedback(seed, stored, seedKey) {
  const storedFeedback = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
  if (localStorage.getItem(seedKey) === recoveredFeedbackSeedVersion) return storedFeedback;
  const merged = { ...seed, ...storedFeedback };
  localStorage.setItem(seedKey, recoveredFeedbackSeedVersion);
  return merged;
}

function loadPaperFeedback() {
  try {
    const parsed = JSON.parse(localStorage.getItem(feedbackKey) || "{}");
    return withRecoveredFeedback(recoveredFeedbackSeed.papers, parsed, recoveredPaperSeedKey);
  } catch (error) {
    console.warn(error);
    return { ...recoveredFeedbackSeed.papers };
  }
}

function savePaperFeedback() {
  localStorage.setItem(feedbackKey, JSON.stringify(paperFeedback));
  queueCloudStateSave();
}

function feedbackRecord(store, id) {
  const record = store[id];
  return normalizeFeedbackRecord(record);
}

function normalizeFeedbackRecord(record) {
  if (!record) return { value: "", updatedAt: "" };
  if (typeof record === "string") return { value: record, updatedAt: "" };
  if (typeof record === "object") return { value: record.value || "", updatedAt: record.updatedAt || "", reason: record.reason || "" };
  return { value: "", updatedAt: "" };
}

function paperFeedbackValue(id) {
  return feedbackRecord(paperFeedback, id).value;
}

function paperFeedbackUpdatedAt(id) {
  return feedbackRecord(paperFeedback, id).updatedAt;
}

function paperRejectReason(id) {
  return feedbackRecord(paperFeedback, id).reason;
}

function loadIdeaFeedback() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ideaFeedbackKey) || "{}");
    return withRecoveredFeedback(recoveredFeedbackSeed.ideas, parsed, recoveredIdeaSeedKey);
  } catch (error) {
    console.warn(error);
    return { ...recoveredFeedbackSeed.ideas };
  }
}

function saveIdeaFeedback() {
  localStorage.setItem(ideaFeedbackKey, JSON.stringify(ideaFeedback));
  queueCloudStateSave();
}

function loadDeletedNoteIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(deletedNoteKey) || "[]");
    return Array.isArray(parsed) ? parsed.map((id) => String(id || "")).filter(Boolean) : [];
  } catch (error) {
    console.warn(error);
    return [];
  }
}

function saveDeletedNoteIds() {
  localStorage.setItem(deletedNoteKey, JSON.stringify([...new Set(deletedNoteIds)].slice(0, 5000)));
  queueCloudStateSave();
}

function ideaFeedbackValue(id) {
  return feedbackRecord(ideaFeedback, id).value;
}

function ideaFeedbackUpdatedAt(id) {
  return feedbackRecord(ideaFeedback, id).updatedAt;
}

function loadSuggestionState() {
  try {
    return normalizeSuggestionState(JSON.parse(localStorage.getItem(suggestionStateKey) || "{}"));
  } catch (error) {
    console.warn(error);
    return normalizeSuggestionState({});
  }
}

function normalizeSuggestionState(record) {
  const stateRecord = record && typeof record === "object" && !Array.isArray(record) ? record : {};
  return {
    refreshCount: Number.isFinite(stateRecord.refreshCount) ? stateRecord.refreshCount : 0,
    refreshedAt: stateRecord.refreshedAt || "",
    skippedIdeas: objectRecord(stateRecord.skippedIdeas),
    skippedPapers: objectRecord(stateRecord.skippedPapers),
    customIdeas: objectRecord(stateRecord.customIdeas),
  };
}

function objectRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function saveSuggestionState() {
  localStorage.setItem(suggestionStateKey, JSON.stringify(suggestionState));
  queueCloudStateSave();
}

function loadAiFeed() {
  try {
    return normalizeAiFeed(JSON.parse(localStorage.getItem(aiFeedKey) || "{}"));
  } catch (error) {
    console.warn(error);
    return normalizeAiFeed({});
  }
}

function normalizeAiFeed(record) {
  const feed = record && typeof record === "object" && !Array.isArray(record) ? record : {};
  return {
    status: feed.status || "idle",
    mode: feed.mode || "",
    model: feed.model || "",
    priority: shortTipText(privateSurfaceText(feed.priority), 220),
    summary: shortTipText(privateSurfaceText(feed.summary), 500),
    ideas: Array.isArray(feed.ideas) ? feed.ideas.map(normalizeAiIdea).filter(Boolean) : [],
    paperIds: Array.isArray(feed.paperIds) ? feed.paperIds.map((id) => String(id || "")).filter(Boolean) : [],
    updatedAt: feed.updatedAt || "",
    error: feed.error || "",
  };
}

function normalizeAiIdea(idea) {
  if (!idea || typeof idea !== "object") return null;
  const text = shortTipText(privateSurfaceText(idea.text));
  if (!text) return null;
  return {
    id: String(idea.id || `ai-${hashId(text)}`).replace(/\s+/g, "-").slice(0, 120),
    text,
    reason: shortTipText(privateSurfaceText(idea.reason || "tip"), 60),
    keywords: Array.isArray(idea.keywords) ? idea.keywords.map((keyword) => String(keyword || "").trim()).filter(Boolean).slice(0, 5) : [],
    source: "ai",
  };
}

function shortTipText(text, max = 180) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const breakAt = Math.max(slice.lastIndexOf("."), slice.lastIndexOf(";"), slice.lastIndexOf(","));
  return (breakAt > 70 ? slice.slice(0, breakAt) : slice.replace(/\s+\S*$/, "")).trim();
}

function privateSurfaceText(text) {
  let clean = String(text || "").replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const rules = [
    [/\bAlan's approval point\b/gi, "Decision point"],
    [/\bAlan approval point\b/gi, "Decision point"],
    [/\bsingle generated deliverable for Alan to approve\b/gi, "single generated artifact"],
    [/\bsingle deliverable for Alan to approve\b/gi, "single generated artifact"],
    [/\bfor Alan to inspect and approve\b/gi, "for FluxCell"],
    [/\bfor Alan to review and accept\b/gi, "for FluxCell"],
    [/\bfor Alan to approve\b/gi, "for FluxCell"],
    [/\bfor Alan to inspect\b/gi, "for FluxCell"],
    [/\bfor Alan\b/gi, "for FluxCell"],
    [/\bAlan will only need to review and accept\b/gi, "Codex leaves one check"],
    [/\bAlan will only need to review\b/gi, "Codex leaves one check"],
    [/\bAlan only needs to review and accept\b/gi, "Codex leaves one check"],
    [/\bAlan only needs to review\b/gi, "Codex leaves one check"],
    [/\bAlan only approves? the next artifact\b/gi, "Codex leaves one decision"],
    [/\bAlan only approves?\b/gi, "Codex leaves one decision"],
    [/\bAlan picks only\b/gi, "Codex narrows"],
    [/\bAlan picks\b/gi, "Codex narrows"],
    [/\bfor the user\b/gi, "for FluxCell"],
    [/\bthe user's\b/gi, "FluxCell"],
    [/\bthe user only needs to\b/gi, "Codex leaves"],
    [/\bthe user only has to\b/gi, "Codex leaves"],
    [/\bthe user needs to\b/gi, "Codex needs to"],
    [/\bthe user is\b/gi, "FluxCell is"],
    [/\bthe user can\b/gi, "FluxCell can"],
    [/\bthe user should\b/gi, "Codex should"],
    [/\bthe user\b/gi, "FluxCell"],
    [/\bAlan's\b/g, "FluxCell"],
    [/\bAlan\b/g, "FluxCell"],
  ];
  rules.forEach(([pattern, replacement]) => {
    clean = clean.replace(pattern, replacement);
  });
  return clean
    .replace(/\bI approval point\b/gi, "Decision point")
    .replace(/\bI only approves\b/gi, "Codex leaves one decision")
    .replace(/\bI only approve\b/gi, "Codex leaves one decision")
    .replace(/\bI only need to approve\b/gi, "Codex leaves one check")
    .replace(/\bI only need to check\b/gi, "Codex leaves one check")
    .replace(/\bI only need to\b/gi, "Codex leaves")
    .replace(/\bI only pick\b/gi, "Codex leaves one decision")
    .replace(/\bI pick\b/gi, "Codex narrows")
    .replace(/\bone approval point\b/gi, "one decision point")
    .replace(/\bapproval point\b/gi, "decision point")
    .replace(/\bapproval\b/gi, "decision")
    .replace(/\bto approve\b/gi, "to pick")
    .replace(/\bapproves\b/gi, "picks")
    .replace(/\bapprove\b/gi, "pick")
    .replace(/\bapproved\b/gi, "kept")
    .replace(/\bapproving\b/gi, "keeping")
    .replace(/\bmy H-bridge burden moves to Codex:?\s*/gi, "Codex is building the H-bridge bundle: ")
    .replace(/\bmy next usable H-bridge bundle:?\s*/gi, "Codex is building the H-bridge bundle: ")
    .replace(/\bmy next build\b/gi, "the next build")
    .replace(/\bmy next usable artifact\b/gi, "Codex output")
    .replace(/\bmy burden\b/gi, "Codex work")
    .replace(/\bfor I\b/gi, "for FluxCell")
    .replace(/\bfor me\b/gi, "for FluxCell")
    .replace(/\bme to\b/gi, "FluxCell")
    .replace(/\bmy\b/gi, "FluxCell")
    .replace(/\bI am\b/gi, "FluxCell is")
    .replace(/\bI can\b/gi, "FluxCell can")
    .replace(/\bI should\b/gi, "Codex should")
    .replace(/\bI need to\b/gi, "Codex needs to")
    .replace(/\bI\b/g, "Codex")
    .replace(/\s+/g, " ")
    .trim();
}

function prioritySurfaceText(text) {
  let clean = privateSurfaceText(text);
  clean = clean
    .replace(/^My next usable H-bridge bundle:?\s*/i, "Codex is building the H-bridge bundle: ")
    .replace(/^(?:Produce|Generate|Deliver)\s+(?:one\s+|four\s+|a\s+)?(?:complete\s+)?(?:consolidated\s+)?(?:Codex-owned\s+)?(?:H-bridge\s+)?(?:artifact set|artifacts|artifact|bundle|H-bridge bundle)\s+now:?\s*/i, "Codex is building the H-bridge bundle: ")
    .replace(/^(?:Produce|Generate|Deliver)\s+(?:one\s+|four\s+|a\s+)?(?:complete\s+)?(?:consolidated\s+)?(?:Codex-owned\s+)?/i, "Codex is building the H-bridge bundle: ")
    .replace(/^Pick\s+(?:the\s+|one\s+)?(?:Codex-owned|Codex)\s+deliverable:?\s*/i, "Codex is building the H-bridge bundle: ")
    .replace(/^Produce a complete H-bridge\s+/i, "Codex is building the H-bridge bundle: ")
    .replace(/\s+[-\u2014]\s*pick\b.*$/i, ".")
    .replace(/\s+(?:ready\s+)?for review\.?$/i, ".");
  if (clean) clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  return shortTipText(clean, 220);
}

function ideaSurfaceText(text) {
  let clean = privateSurfaceText(text);
  if (projectStageProfile().id !== "delegate") return clean;
  clean = clean
    .replace(/^Use\s+/i, "Codex uses ")
    .replace(/^Order\s+/i, "Codex adds ")
    .replace(/^Prefer\s+/i, "Codex uses ")
    .replace(/^Target interface:\s*/i, "Codex targets: ")
    .replace(/^Generated code comes\s+/i, "Codex writes generated code after ")
    .replace(/^No H-bridge study plan;\s*/i, "Codex keeps this as a generated artifact; ")
    .replace(/^Pasteable request:\s*/i, "Codex writes: ");
  if (clean) clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  return clean;
}

function hashId(text) {
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(16);
}

function saveAiFeed() {
  localStorage.setItem(aiFeedKey, JSON.stringify(aiFeed));
  queueCloudStateSave();
}

function cloudStateBase() {
  if (sync.status === "local" && sync.base) return sync.base;
  return configuredApiBase();
}

function cloudStatePayload() {
  const deleted = [...new Set(deletedNoteIds)].slice(0, 5000);
  return {
    notes: userNotes(state.notes).filter((note) => !deleted.includes(note.id)),
    deletedNoteIds: deleted,
    paperFeedback,
    ideaFeedback,
    suggestionState,
    aiFeed: normalizeAiFeed({
      ...aiFeed,
      status: aiFeed.status === "loading" ? "idle" : aiFeed.status,
    }),
  };
}

function queueCloudStateSave() {
  if (suppressCloudStateSave) return;
  const base = cloudStateBase();
  if (!base) return;
  window.clearTimeout(cloudSaveTimer);
  cloudSaveTimer = window.setTimeout(() => pushCloudState(), 250);
}

async function pushCloudState({ force = false } = {}) {
  const base = cloudStateBase();
  if (!base) return false;
  const payload = cloudStatePayload();
  const signature = JSON.stringify(payload);
  if (!force && signature === lastCloudStateSignature) return true;
  try {
    await postJson(`${base}/api/app-state`, { state: payload });
    lastCloudStateSignature = signature;
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

function normalizeCloudAppState(record) {
  const cloud = objectRecord(record);
  return {
    notes: Array.isArray(cloud.notes) ? cloud.notes.map(normalizeNoteRecord).filter(Boolean) : [],
    deletedNoteIds: Array.isArray(cloud.deletedNoteIds) ? cloud.deletedNoteIds.map((id) => String(id || "")).filter(Boolean) : [],
    paperFeedback: objectRecord(cloud.paperFeedback),
    ideaFeedback: objectRecord(cloud.ideaFeedback),
    suggestionState: normalizeSuggestionState(cloud.suggestionState),
    aiFeed: normalizeAiFeed(cloud.aiFeed),
  };
}

function normalizeNoteRecord(note) {
  const record = objectRecord(note);
  const text = String(record.text || "").trim();
  if (!text) return null;
  return {
    id: String(record.id || createId()),
    text,
    createdAt: record.createdAt || record.updatedAt || new Date().toISOString(),
    updatedAt: record.updatedAt || record.createdAt || "",
  };
}

function noteTime(note) {
  return Math.max(feedbackTime(note?.updatedAt), feedbackTime(note?.createdAt));
}

function mergeNotes(remoteNotes, localNotes, deletedIds) {
  const deleted = new Set(deletedIds);
  const map = new Map();
  [...remoteNotes, ...localNotes].forEach((note) => {
    const clean = normalizeNoteRecord(note);
    if (!clean || deleted.has(clean.id)) return;
    const existing = map.get(clean.id);
    if (!existing || noteTime(clean) >= noteTime(existing)) map.set(clean.id, clean);
  });
  return [...map.values()].sort((a, b) => noteTime(b) - noteTime(a));
}

function feedbackRecordTime(record) {
  return feedbackTime(normalizeFeedbackRecord(record).updatedAt);
}

function mergeFeedbackStore(remoteStore, localStore) {
  const merged = {};
  const ids = new Set([...Object.keys(objectRecord(remoteStore)), ...Object.keys(objectRecord(localStore))]);
  ids.forEach((id) => {
    const remote = remoteStore[id];
    const local = localStore[id];
    if (remote === undefined) {
      merged[id] = local;
      return;
    }
    if (local === undefined) {
      merged[id] = remote;
      return;
    }
    merged[id] = feedbackRecordTime(local) > feedbackRecordTime(remote) ? local : remote;
  });
  return merged;
}

function skipRecordTime(record) {
  return feedbackTime(objectRecord(record).updatedAt);
}

function mergeSkipStore(remoteStore, localStore) {
  const merged = {};
  const ids = new Set([...Object.keys(objectRecord(remoteStore)), ...Object.keys(objectRecord(localStore))]);
  ids.forEach((id) => {
    const remote = remoteStore[id];
    const local = localStore[id];
    if (remote === undefined) {
      merged[id] = local;
      return;
    }
    if (local === undefined) {
      merged[id] = remote;
      return;
    }
    merged[id] = skipRecordTime(local) > skipRecordTime(remote) ? local : remote;
  });
  return merged;
}

function mergeCustomIdeas(remoteStore, localStore) {
  return { ...objectRecord(remoteStore), ...objectRecord(localStore) };
}

function mergeSuggestionStates(remoteState, localState) {
  const remote = normalizeSuggestionState(remoteState);
  const local = normalizeSuggestionState(localState);
  return {
    refreshCount: Math.max(remote.refreshCount || 0, local.refreshCount || 0),
    refreshedAt: feedbackTime(local.refreshedAt) > feedbackTime(remote.refreshedAt) ? local.refreshedAt : remote.refreshedAt,
    skippedIdeas: mergeSkipStore(remote.skippedIdeas, local.skippedIdeas),
    skippedPapers: mergeSkipStore(remote.skippedPapers, local.skippedPapers),
    customIdeas: mergeCustomIdeas(remote.customIdeas, local.customIdeas),
  };
}

function mergeAiFeeds(remoteFeed, localFeed) {
  const remote = normalizeAiFeed(remoteFeed);
  const local = normalizeAiFeed(localFeed);
  if (local.status === "loading") return local;
  return feedbackTime(local.updatedAt) > feedbackTime(remote.updatedAt) ? local : remote;
}

function applyCloudState(next) {
  suppressCloudStateSave = true;
  state.notes = next.notes;
  deletedNoteIds = next.deletedNoteIds;
  paperFeedback = next.paperFeedback;
  ideaFeedback = next.ideaFeedback;
  suggestionState = next.suggestionState;
  aiFeed = next.aiFeed;
  localStorage.setItem(stateKey, JSON.stringify(state));
  localStorage.setItem(deletedNoteKey, JSON.stringify(deletedNoteIds));
  localStorage.setItem(feedbackKey, JSON.stringify(paperFeedback));
  localStorage.setItem(ideaFeedbackKey, JSON.stringify(ideaFeedback));
  localStorage.setItem(suggestionStateKey, JSON.stringify(suggestionState));
  localStorage.setItem(aiFeedKey, JSON.stringify(aiFeed));
  suppressCloudStateSave = false;
}

async function refreshCloudState() {
  const base = cloudStateBase();
  if (!base) return;
  try {
    const response = await fetch(`${base}/api/app-state`, { cache: "no-store" });
    if (!response.ok) return;
    const json = await response.json();
    const remote = normalizeCloudAppState(json.state || {});
    const deleted = [...new Set([...(remote.deletedNoteIds || []), ...deletedNoteIds])];
    const merged = {
      notes: mergeNotes(remote.notes, userNotes(state.notes), deleted),
      deletedNoteIds: deleted,
      paperFeedback: mergeFeedbackStore(remote.paperFeedback, paperFeedback),
      ideaFeedback: mergeFeedbackStore(remote.ideaFeedback, ideaFeedback),
      suggestionState: mergeSuggestionStates(remote.suggestionState, suggestionState),
      aiFeed: mergeAiFeeds(remote.aiFeed, aiFeed),
    };
    const remoteSignature = JSON.stringify(remote);
    applyCloudState(merged);
    const mergedSignature = JSON.stringify(cloudStatePayload());
    lastCloudStateSignature = remoteSignature;
    if (mergedSignature !== remoteSignature) await pushCloudState({ force: true });
  } catch (error) {
    console.warn(error);
  }
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
    check: "M20 6 9 17l-5-5",
    x: "M18 6 6 18M6 6l12 12",
    skip: "M5 4l8 8-8 8V4Zm10 0v16",
    refresh: "M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2M18 3v5h-5M6 21v-5h5",
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
  shell.append(createTopbar());
  const codexOutput = createCodexOutputSection();
  if (codexOutput) shell.append(codexOutput);
  const focusLibrary = createFocusLibrary();
  if (focusLibrary) shell.append(focusLibrary);
  shell.append(createWorkspace());
  const notes = createNotesSection();
  if (notes) shell.append(notes);
  shell.append(createLibrary());
  return shell;
}

function createTopbar() {
  const topbar = el("header", "suite-topbar");
  topbar.setAttribute("aria-label", "fluxcell navigation");
  const brand = el("a", "suite-app-brand");
  brand.href = "/";
  brand.setAttribute("aria-label", "fluxcell home");
  brand.innerHTML = '<img class="suite-app-mark" src="https://aolabs.io/icons/fluxcell.svg?v=20260508-icon-pass2" alt=""><span class="suite-app-name">fluxcell.aolabs.io</span>';
  const home = el("a", "suite-ao-home");
  home.href = "https://aolabs.io/";
  home.setAttribute("aria-label", "aolabs.io");
  home.innerHTML = '<img src="https://aolabs.io/marks/ao-ink.svg?v=20260516-domain-header" alt="">';
  const left = el("div", "suite-brand-cluster");
  left.append(home, brand);

  const status = el("div", "status-strip");
  const fileCount = state.files.filter(isVisibleLibraryFile).length;
  const noteCount = userNotes(state.notes).length;
  status.append(createStatusPill(syncLabel(), `sync sync-${sync.status}`));
  if (aiBackendAvailable() || aiFeed.mode === "ai") {
    status.append(createStatusPill(aiFeed.status === "loading" ? "ai thinking" : "ai feed", "stat ai-stat"));
  }
  status.append(createStatusPill(`${fileCount} files`, "stat"));
  status.append(createStatusPill(`${noteCount} notes`, "stat"));

  const right = el("div", "suite-topbar-actions");
  right.append(status);

  topbar.append(left, right);
  return topbar;
}

function createStatusPill(text, className) {
  return el("span", className, text);
}

function currentPriorityLine() {
  if (aiFeedPriorityIsCurrent()) {
    return prioritySurfaceText(aiFeed.priority);
  }
  return prioritySurfaceText(generateLocalPriorityLine());
}

function codexOutputActive() {
  const stage = projectStageProfile();
  const text = `${currentPriorityLine()} ${generateProjectState()} ${recentConcernText()}`.toLowerCase();
  return stage.id === "delegate" || /codex|h-?bridge|wiring map|pulse script|bench-test checklist/.test(text);
}

function createCodexOutputSection() {
  if (!codexOutputActive()) return null;
  const section = el("section", "codex-output top-feed");
  const head = el("div", "section-head codex-output-head");
  head.append(el("h2", "", "Generated work"));
  const grid = el("div", "codex-output-grid");
  codexOutputItems().forEach((item) => grid.append(createCodexOutputCard(item)));
  section.append(head, grid);
  return section;
}

function codexOutputItems() {
  return [
    {
      title: "H-bridge wiring, pulse code, parts, bench test",
      rows: generatedWorkStateRows(),
      href: `${cloudStateBase() || ""}/api/generated/hbridge-bundle.md`,
    },
  ];
}

function generatedWorkStateRows() {
  return [
    ["State right now", generatedWorkStateDetail()],
    ["Need right now", generatedWorkNeedText()],
    ["Trying to achieve", generatedWorkTargetText()],
    ["Why this helps", generatedWorkHelpText()],
  ];
}

function generatedWorkStateDetail() {
  const signals = generatedWorkStateSignals();
  const stateText = signals.length ? joinNatural(signals) : "one concrete FluxCell artifact before more decisions";
  return `${generatedWorkStageText()}: ${stateText}.`;
}

function generatedWorkStageText() {
  const stage = projectStageProfile();
  const names = {
    activation: "task initiation",
    delegate: "Codex delegation",
    body: "low-energy reset",
    vent: "friction spike",
    play: "loose idea capture",
    vision: "portfolio proof",
    reset: "re-entry",
    routine: "printer-adjacent loop",
    start: "starter step",
    sourcing: "parts decision",
    bench: "bench build",
    measurement: "bench measurement",
    "cell-integration": "cell integration",
    printing: "print support",
    papers: "paper support",
  };
  return names[stage.id] || stage.label || "current stage";
}

function generatedWorkStateSignals() {
  const text = `${recentConcernText()} ${generateProjectState()} ${currentPriorityLine()}`.toLowerCase();
  const signals = [];
  const add = (signal, pattern) => {
    if (signals.length >= 4 || signals.includes(signal)) return;
    if (pattern.test(text)) signals.push(signal);
  };
  add("hard-to-start energy", /adhd|autis|hard to start|start working|executive|excited|weird brain|compatible with.*brain/);
  add("low energy", /tired|lazy|no idea|don't wanna|dont wanna|overwhelm|confus|lost|hate this|stuck/);
  add("H-bridge/code uncertainty", /h-?bridge|hbridge|wiring|driver|pulse script|arduino|code|codex|chatgpt|ai generation/);
  add("parts and sourcing uncertainty", /parts|buy|order|digikey|mouser|supplier|off[- ]?the[- ]?shelf/);
  add("one bench artifact", /bench|test|checklist|artifact|coupon|epm|keeper|coil/);
  return signals.slice(0, 3);
}

function generatedWorkOutcomeText() {
  const stage = projectStageProfile();
  const outcome = {
    delegate: "Codex turns that into wiring, pulse code, parts, and one bench test.",
    activation: "Codex turns that into one bench-ready artifact.",
    body: "Codex keeps the FluxCell move small while energy is the constraint.",
    vent: "Codex turns frustration into one reversible artifact instead of more decisions.",
    start: "Codex turns the vague starter step into one concrete bench file.",
    sourcing: "Codex narrows buying to the parts needed for one safe pulse.",
    bench: "Codex keeps the next move on the bench before cell CAD expands.",
    routine: "Codex keeps it printer-adjacent and small enough to re-enter.",
  };
  return outcome[stage.id] || "Codex turns that into one artifact that can move FluxCell forward.";
}

function generatedWorkNeedText() {
  const stage = projectStageProfile();
  const need = {
    activation: "One bench-ready artifact; no broad plan.",
    delegate: "Codex-owned wiring, code, parts, and bench checklist.",
    body: "One small FluxCell move that can wait until energy returns.",
    vent: "One reversible step that does not expand the project.",
    start: "A concrete starter file before more research.",
    sourcing: "A small parts set for one safe pulse.",
    bench: "A loose EPM test before cell CAD.",
    routine: "A printer-adjacent step small enough to re-enter.",
  };
  return need[stage.id] || "One concrete artifact before more decisions.";
}

function generatedWorkTargetText() {
  return "First safe EPM pulse loop: driver wiring, short pulse, reverse pulse, hold/release check.";
}

function generatedWorkHelpText() {
  const signals = generatedWorkStateSignals().join(" ");
  if (/h-bridge|code/i.test(signals)) return "Turns unclear H-bridge/code decisions into one openable bench file.";
  if (/parts|sourcing/i.test(signals)) return "Turns buying uncertainty into one compact parts path.";
  return generatedWorkOutcomeText();
}

function createCodexOutputCard(item) {
  const card = el(item.href ? "a" : "article", "codex-output-card");
  if (item.href) {
    card.href = item.href;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `Open ${item.title}`);
  }
  const body = el("div", "item-body");
  body.append(el("p", "item-title", item.title));
  if (item.rows?.length) {
    const rows = el("div", "state-bridge-rows");
    item.rows.forEach(([label, value]) => {
      const row = el("div", "state-bridge-row");
      row.append(el("span", "state-bridge-label", label), el("span", "state-bridge-value", value));
      rows.append(row);
    });
    body.append(rows);
  } else if (item.detail) {
    body.append(el("p", "item-meta", item.detail));
  }
  card.append(body);
  return card;
}

function aiFeedPriorityIsCurrent() {
  if (aiFeed.mode !== "ai" || !aiFeed.priority) return false;
  const latest = userNotes(state.notes)[0];
  const latestTime = noteTime(latest);
  if (!latestTime) return true;
  return feedbackTime(aiFeed.updatedAt) >= latestTime;
}

function syncLabel() {
  if (sync.status === "local") return "cloud sync";
  if (sync.status === "browser") return "browser vault";
  return "checking";
}

function createWorkspace() {
  const section = el("section", "workspace");

  const capture = el("section", "capture-panel");
  capture.append(createIntro(), createCaptureForm());

  const thinking = el("aside", "state-panel");
  thinking.append(createProjectStatePanel());

  section.append(capture, thinking);
  return section;
}

function createIntro() {
  const wrap = el("div", "intro");
  wrap.append(el("h1", "", appName), el("p", "tagline", focus.title));
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

function createProjectStatePanel() {
  const panel = el("div", "state-card");
  const list = el("ul", "state-list");
  projectStateBullets().forEach((item) => {
    list.append(el("li", "", item));
  });
  panel.append(list);
  return panel;
}

function generateProjectState() {
  if (aiFeed.summary && aiFeed.mode === "ai") {
    return privateSurfaceText(aiFeed.summary);
  }
  return privateSurfaceText(generateLocalProjectState());
}

function projectStateBullets() {
  const text = generateProjectState().replace(/\bUpdating\.\s*$/i, "").trim();
  const bullets = summaryToBullets(text);
  return bullets.slice(0, 4);
}

function summaryToBullets(text) {
  const cleaned = String(text || "")
    .replace(/\s+/g, " ")
    .replace(/:\s+(?=(prove|show|measure|test|validate)\b)/gi, ". ")
    .replace(/;\s+(?=[A-Z])/g, ". ")
    .replace(/\s+(Prioritize|Require|Acceptance is|Favor|Keep|Use|Measure|Record|Test|Compare)\b/g, ". $1")
    .trim();
  const parts = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.replace(/[.!?]+$/, "").trim())
    .filter(Boolean);

  const seen = new Set();
  const bullets = [];
  parts.forEach((part) => {
    const bullet = trimBullet(part);
    const key = bullet.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (/^(Keep feeding|Kept bank|Approved bank|Generated from)/i.test(bullet)) return;
    if (!bullet || seen.has(key)) return;
    seen.add(key);
    bullets.push(bullet);
  });

  return bullets.length ? bullets : [trimBullet(focus.current)];
}

function trimBullet(text, max = 104) {
  const clean = String(text || "")
    .replace(/^Focus the next iterations on\s+/i, "")
    .replace(/^Selection profile:\s*/i, "")
    .replace(/^Acceptance is\s+/i, "Acceptance: ")
    .trim();
  if (clean.length <= max) return sentenceCaseBullet(clean);
  const slice = clean.slice(0, max);
  const breakAt = Math.max(slice.lastIndexOf(","), slice.lastIndexOf(";"), slice.lastIndexOf(" and "));
  const clipped = breakAt > 64 ? slice.slice(0, breakAt) : slice.replace(/\s+\S*$/, "");
  return sentenceCaseBullet(`${clipped.trim()}...`);
}

function sentenceCaseBullet(text) {
  return String(text || "").replace(/^[a-z]/, (letter) => letter.toUpperCase());
}

const projectStageDefinitions = [
  {
    id: "body",
    label: "body reset",
    summary: "Handle the body need fast, then return with one tiny FluxCell move.",
    patterns: [/hungry|hunger|food|eat|snack|ice cream|thirst|water|sleepy|exhausted|tired as fuck|tired af|need sleep/],
  },
  {
    id: "activation",
    label: "activation",
    summary: "Make the entry point exciting enough to touch, not another obligation.",
    patterns: [/adhd|autism|autistic|hard to start|start working|executive|excited|exciting|unique weird brain|compatible with my.*brain|weird brain|can't start|cant start/],
  },
  {
    id: "vent",
    label: "rough mood",
    summary: "Let the ugly thought exist, then lower the project to one reversible move.",
    patterns: [/fuck my life|fml|fuck|shit|lazy+|so lazy|hate this|everything sucks|miserable|bad mood|can't do this|cant do this|done with this/],
  },
  {
    id: "delegate",
    label: "delegation",
    summary: "Move code, driver, and H-bridge uncertainty into Codex-owned artifacts.",
    patterns: [/ai generation|codex|chatgpt|all code|handled by ai|h-?bridge|hbridge|don't wanna learn|dont wanna learn|no idea how to use|code handled/],
  },
  {
    id: "play",
    label: "chaos capture",
    summary: "Let the random thought pass through, then convert it into one concrete project touch.",
    patterns: [/slay|bestie|penis|lol|lmao|lmfao|random|silly|goofy|chaos|unhinged|whatever/],
  },
  {
    id: "vision",
    label: "north star",
    summary: "Turn the ambition into a portfolio-visible proof with delight and real engineering.",
    patterns: [/disney|imagineering|imagineer|hired|hire|portfolio|r&d|success|successful|cool stuff|dream job|showcase|magical|delight/],
  },
  {
    id: "reset",
    label: "focus reset",
    summary: "Take a clean reset, then return with one tiny physical FluxCell action.",
    patterns: [/violin|practice|music|rather|avoid|avoiding|distract|distracted|not feeling|don't wanna|dont wanna|do not wanna|burnout|burned out|reset/],
  },
  {
    id: "routine",
    label: "prototype routine",
    summary: "Protect writing momentum while creating a tiny printer-adjacent prototype loop.",
    patterns: [/writing.*prototyp|switch.*states|switching contexts?|context switch|current routine|fit.*routine|iterations?.*printer|printer.*routine|next to a 3d printer|3d printer|print queue|iteration loop|prototype.*routine/],
  },
  {
    id: "start",
    label: "first physical prototype",
    summary: "Make one crude tabletop EPM, not a polished cell.",
    patterns: [/start|starter|just need|too detailed|crazy detailed|overwhelm|tired|no idea|lost|confus|basic|beginner|prototype/],
  },
  {
    id: "sourcing",
    label: "parts sourcing",
    summary: "Get a tiny starter kit with fast shipping before optimizing anything.",
    patterns: [/buy|order|source|supplier|shipping|off[- ]?the[- ]?shelf|component|where to|digikey|digi-key|mouser|mcmaster|amazon|kj magnetics|k&j/],
  },
  {
    id: "bench",
    label: "bench EPM build",
    summary: "Assemble a loose magnet, steel path, coil, keeper, and switchable pulse.",
    patterns: [/bench|epm|electropermanent|coil|wind|magnet|keeper|steel|yoke|hold|release|pulse|switch|power source|wire/],
  },
  {
    id: "measurement",
    label: "measurement and debugging",
    summary: "Find what failed with the smallest visible measurement.",
    patterns: [/measure|test|force|gap|current|temperature|heat|hot|failure|fail|weak|slip|twist|trace|video|before|after|debug/],
  },
  {
    id: "cell-integration",
    label: "Sarrus cell integration",
    summary: "Move only the working bench mechanism into one laterally expanding cell.",
    patterns: [/sarrus|cell|lateral|expand|width|stroke|linkage|mechanism|actuat|cassette|geometry|hinge/],
  },
  {
    id: "printing",
    label: "printed integration",
    summary: "Separate the printable structure from the magnetic material risk.",
    patterns: [/print|printed|monolithic|material|iron|resin|filament|composite|embedded|multimaterial|pocket|insert|core/],
  },
  {
    id: "papers",
    label: "paper triage",
    summary: "Read only papers that change the next build decision.",
    patterns: [/paper|papers|literature|reference|read|article|journal|figure|apparatus|citation|cite|support/],
  },
];

const projectStageTipBank = {
  body: [
    ["body-eat-first", "Eat something easy, then come back for one tiny FluxCell action.", "body reset", ["hungry", "food", "action"], ["eat", "tiny fluxcell action"]],
    ["body-ice-cream-break", "If ice cream is the cue, make it a defined break, not the whole night.", "break", ["ice cream", "break"], ["ice cream", "defined break"]],
    ["body-water", "Water and food first; do not make big design decisions while depleted.", "body reset", ["water", "food"], ["water", "food", "depleted"]],
    ["body-low-energy-task", "Low-energy FluxCell task: add one part link, one photo, or one sentence.", "tiny action", ["low energy", "note"], ["part link", "photo", "sentence"]],
    ["body-open-cart", "After the snack, open the parts cart or bench before any new tab.", "re-entry", ["parts", "bench"], ["parts cart", "bench"]],
    ["body-stop-at-one", "Only promise one move after eating: order, wind, sketch, photograph, or write.", "scope", ["one move", "start"], ["order", "wind", "sketch", "photograph"]],
    ["body-tired-proof", "If tired, protect tomorrow by leaving the next physical step obvious.", "re-entry", ["tired", "next"], ["protect tomorrow", "physical step"]],
    ["body-no-hero-mode", "No hero mode while hungry; make the next action smaller.", "scope", ["hungry", "small"], ["hungry", "smaller"]],
    ["body-return-object", "Return to one object on the bench, not the whole research plan.", "object", ["bench", "object"], ["one object", "research plan"]],
  ],
  activation: [
    ["activation-demo-first", "Make the next artifact a tiny visible demo, not an electronics lesson.", "activation", ["demo", "exciting", "electronics"], ["visible demo", "electronics lesson"]],
    ["activation-codex-options", "Codex generates three bench-demo options; the keeper has the clearest visible payoff.", "choice", ["codex", "options", "exciting"], ["three bench-demo options", "visible payoff"]],
    ["activation-open-only", "Entry step: open one generated diagram; building remains optional until the object feels worth touching.", "entry", ["start", "diagram", "touch"], ["open one generated diagram", "worth touching"]],
    ["activation-sensory-proof", "Use visible motion as the hook: pulse, click, hold, release, short clip.", "motion", ["visible", "motion", "clip"], ["pulse", "click", "hold", "release"]],
    ["activation-no-chore-list", "No chore list; convert the next move into one artifact with a clear visual payoff.", "friction", ["friction", "artifact", "visual"], ["no chore list", "visual payoff"]],
    ["activation-decision-offload", "Offload decisions to Codex: parts, wiring, code, and safety notes become one reviewable packet.", "delegation", ["codex", "parts", "code"], ["parts", "wiring", "code", "safety notes"]],
    ["activation-reentry-object", "Leave one physical object visible: magnet pair, steel keeper, coil spool, or printed holder.", "re-entry", ["object", "visible", "bench"], ["physical object", "visible"]],
  ],
  vent: [
    ["vent-lower-bar", "If the note is ugly, lower the bar: one visible proof, not project identity.", "reset", ["frustration", "proof"], ["ugly", "lower the bar"]],
    ["vent-reversible", "Do one reversible move: add a part link, write a test, or clean the bench.", "tiny action", ["frustration", "action"], ["reversible move", "part link", "test"]],
    ["vent-not-whole-project", "Do not solve the whole project from this mood; preserve the next step.", "scope", ["mood", "next"], ["whole project", "next step"]],
    ["vent-tomorrow-note", "Leave tomorrow one sentence: the next physical thing to touch is ____.", "re-entry", ["tomorrow", "note"], ["one sentence", "physical thing"]],
    ["vent-one-honest-note", "Today can count as one honest note plus one tiny prototype step.", "small win", ["note", "prototype"], ["honest note", "prototype step"]],
    ["vent-no-verdict", "A bad mood is not data about whether FluxCell will work.", "reset", ["mood", "project"], ["bad mood", "data"]],
    ["vent-name-blocker", "Name the blocker in five words, then pick the smallest next move.", "blocker", ["blocker", "next"], ["five words", "smallest next move"]],
    ["vent-tools-away", "If frustration is high, step away from tools and leave a re-entry note.", "safety", ["frustration", "tools"], ["step away", "re-entry note"]],
    ["vent-proof-not-plan", "Make the next proof smaller instead of making the plan bigger.", "scope", ["proof", "plan"], ["proof smaller", "plan bigger"]],
  ],
  delegate: [
    ["delegate-codex-owner", "Codex produces the H-bridge wiring map, pulse script, parts list, and bench-test checklist.", "delegation", ["codex", "h-bridge", "code"], ["codex", "h-bridge", "pulse script"]],
    ["delegate-no-study-plan", "Codex keeps this as a generated artifact, not an H-bridge study plan.", "boundary", ["h-bridge", "artifact", "safety"], ["no h-bridge study", "generated artifact"]],
    ["delegate-approval-point", "Decision point: one diagram, one command, one parts cart, one safe pulse test.", "decision", ["decision", "diagram", "parts"], ["one diagram", "one command", "parts cart"]],
    ["delegate-ai-prompt", "Codex writes the simplest reversible H-bridge pulse plan for a bench EPM.", "prompt", ["ai", "h-bridge", "bench"], ["pulse plan", "bench epm"]],
    ["delegate-code-last", "Codex writes code after the wiring map and current limit are explicit.", "sequence", ["code", "wiring", "current"], ["code", "wiring map", "current limit"]],
    ["delegate-one-button", "Target interface: one button for short pulse, one button for reverse pulse, no continuous coil power.", "interface", ["button", "pulse", "coil"], ["one button", "reverse pulse"]],
    ["delegate-off-the-shelf-driver", "Codex uses an off-the-shelf motor driver breakout over custom electronics for the first pulse.", "hardware", ["driver", "breakout", "electronics"], ["off-the-shelf", "motor driver breakout"]],
  ],
  play: [
    ["play-logged", "Chaotic thought logged; now name one concrete object: magnet, coil, keeper, or fixture.", "capture", ["random", "object"], ["chaotic thought", "concrete object"]],
    ["play-energy", "Use the goofy energy to make the next prototype visually satisfying.", "dopamine", ["goofy", "prototype"], ["goofy energy", "visually satisfying"]],
    ["play-one-touch", "The app can absorb nonsense; the project still needs one small physical touch.", "re-entry", ["chaos", "project"], ["absorb nonsense", "physical touch"]],
    ["play-do-not-spiral", "Do not interpret the random note; route it back to one action.", "scope", ["random", "action"], ["random note", "one action"]],
    ["play-title-card", "Chaos becomes a tile title only when it helps reopen the app.", "dopamine", ["tile", "app"], ["tile title", "reopen"]],
    ["play-quick-reset", "Smile at the dumb note, then add one part, sketch, photo, or test.", "tiny action", ["note", "test"], ["dumb note", "part", "sketch"]],
    ["play-bench-object", "One object stays visible on the bench for re-entry.", "setup", ["bench", "object"], ["one object", "re-entry"]],
    ["play-noise-filter", "If it is just noise, the useful output is a smaller next step.", "filter", ["noise", "next"], ["noise", "smaller next step"]],
    ["play-keep-human", "Keep the weird note; human context is allowed here.", "capture", ["human", "note"], ["weird note", "human context"]],
  ],
  vision: [
    ["vision-disney-demo", "Imagineering proof: make one motion feel magical and back it with real data.", "north star", ["disney", "demo"], ["magical", "real data"]],
    ["vision-portfolio-video", "Portfolio target: one beautiful video of a printed cell moving from an EPM pulse.", "portfolio", ["video", "portfolio"], ["beautiful video", "EPM pulse"]],
    ["vision-artifact", "Every session should leave one artifact: clip, CAD screenshot, part list, or measurement.", "artifact", ["portfolio", "artifact"], ["clip", "cad screenshot", "part list", "measurement"]],
    ["vision-nonexpert", "Make the demo legible to a non-expert: before, pulse, motion, hold.", "story", ["demo", "story"], ["non-expert", "before", "pulse"]],
    ["vision-hire-signal", "Hire signal: delightful motion, robust mechanism, and a clear engineering story.", "career", ["imagineering", "career"], ["delightful motion", "robust mechanism"]],
    ["vision-reel", "Build for the reel: clean background, visible scale, one sentence explanation.", "showcase", ["video", "reel"], ["clean background", "visible scale"]],
    ["vision-cool-and-true", "The object needs both: cool enough to remember, measured enough to trust.", "north star", ["cool", "measure"], ["cool", "measured"]],
    ["vision-one-wow", "Choose one wow moment first; the rest of the prototype supports it.", "scope", ["wow", "prototype"], ["wow moment", "supports it"]],
    ["vision-today-step", "Todayâ€™s Imagineering move is tiny: make the next physical interaction more visible.", "today", ["visible", "interaction"], ["physical interaction", "visible"]],
  ],
  reset: [
    ["reset-clean-break", "Practice violin as a clean reset, then return for one tiny FluxCell action.", "reset", ["violin", "reset", "action"], ["violin", "clean reset", "tiny action"]],
    ["reset-reentry-note", "Before leaving, write the next FluxCell action in one plain sentence.", "re-entry", ["note", "action"], ["next fluxcell action", "one sentence"]],
    ["reset-no-reading", "Return mode: touch a part, cart, coil, or sketch before reading.", "re-entry", ["start", "parts"], ["do not read", "part", "coil"]],
    ["reset-five-minutes", "Five-minute return: one starter component in the parts cart.", "tiny action", ["buy", "parts"], ["five minutes", "parts cart"]],
    ["reset-next-object", "Decide the next physical object before the break: magnet loop, coil, keeper, or fixture.", "object", ["object", "bench"], ["magnet loop", "coil", "keeper", "fixture"]],
    ["reset-not-verdict", "The violin impulse is a break signal, not evidence that the project is failing.", "reset", ["focus", "project"], ["break signal", "project"]],
    ["reset-one-loop", "Close one tiny loop today: one note, one ordered part, or one crude pulse test.", "small win", ["note", "part", "test"], ["one note", "ordered part", "pulse test"]],
    ["reset-table-ready", "Leave the bench ready for the next move before switching contexts.", "setup", ["bench", "next"], ["bench ready", "switching contexts"]],
    ["reset-small-proof", "Keep the research alive with the smallest visible proof, not the perfect plan.", "scope", ["proof", "start"], ["smallest visible proof", "perfect plan"]],
  ],
  routine: [
    ["routine-short-block", "Treat prototyping as one short printer-adjacent block, not a full identity switch.", "routine fit", ["routine", "printer", "state"], ["printer-adjacent block", "identity switch"]],
    ["routine-writing-intact", "Keep writing mode intact: change one printable thing, start it, then leave.", "writing transition", ["writing", "print"], ["writing mode", "one printable thing"]],
    ["routine-batch-iterations", "Batch iterations: queue one small part, inspect it later, then decide the next change.", "iteration loop", ["iteration", "printer"], ["queue", "inspect", "next change"]],
    ["routine-proof", "The first win is routine proof: one ugly print loop without derailing the day.", "routine proof", ["routine", "print"], ["ugly print loop", "derailing"]],
    ["routine-printer-checklist", "Make a printer-side checklist: open file, change one variable, print, photograph result.", "checklist", ["printer", "iteration"], ["checklist", "one variable", "photograph"]],
    ["routine-bench-when-crowded", "When routine is crowded, do bench EPM work; use the printer only for fixture shells.", "scope", ["bench", "printer"], ["routine crowded", "fixture shells"]],
    ["routine-background-printer", "Use the printer like a background process; the real work is choosing the next tiny geometry.", "printer loop", ["printer", "geometry"], ["background process", "tiny geometry"]],
    ["routine-shrink-part", "If a print needs babysitting, shrink the part until babysitting feels tolerable.", "iteration size", ["printer", "part"], ["babysitting", "shrink the part"]],
    ["routine-exit-writing", "Exit writing by leaving one print-ready file, not by forcing a whole prototype day.", "transition", ["writing", "prototype"], ["print-ready file", "prototype day"]],
  ],
  start: [
    ["start-one-task", "Pick one task today: order parts or wind the first coil.", "start here", ["start", "parts", "coil"], ["order parts", "wind first coil"]],
    ["ugly-tabletop", "Make the first switch ugly on the table before designing a fixture.", "first build", ["prototype", "tabletop"], ["ugly", "table", "fixture"]],
    ["bench-before-cell", "Ignore the Sarrus cell until a loose EPM can hold and release.", "first build", ["bench", "epm"], ["loose epm", "hold and release"]],
    ["buy-minimum-kit", "Buy only the starter pile: small magnets, steel pieces, magnet wire, switch, and power source.", "shopping", ["buy", "parts"], ["starter pile", "small magnets", "magnet wire"]],
    ["cardboard-fixture", "Tape the magnet, steel, and coil to cardboard before designing a printed fixture.", "quick rig", ["fixture", "prototype"], ["cardboard", "tape", "printed fixture"]],
    ["first-video-win", "Today counts when one video shows a keeper changing state after a pulse.", "small win", ["video", "keeper"], ["video", "keeper changes state"]],
    ["no-paper-right-now", "Do not read more papers right now; make the crude magnetic switch first.", "start here", ["start", "prototype"], ["do not read", "crude magnetic switch"]],
    ["warm-coil-stop", "Use short pulses, and stop as soon as the coil feels warm.", "basic safety", ["pulse", "heat"], ["short pulses", "coil feels warm"]],
    ["phone-test", "Phone camera measurement: before pulse, after pulse, release.", "easy test", ["video", "test"], ["phone camera", "before pulse", "after pulse"]],
  ],
  sourcing: [
    ["starter-kit", "Order a tiny kit first: small NdFeB blocks, magnet wire, steel pieces, switch, and power source.", "starter kit", ["buy", "parts"], ["starter kit", "magnet wire", "steel pieces"]],
    ["magnet-shop", "Browse K&J Magnetics for small block magnets before hunting exotic parts: https://www.kjmagnetics.com", "magnets", ["buy", "magnet"], ["k&j", "kjmagnetics", "block magnets"]],
    ["electronics-shop", "Use Digi-Key or Mouser for magnet wire, switches, MOSFETs, and basic driver parts.", "electronics", ["digikey", "mouser", "driver"], ["digi-key", "mouser", "magnet wire"]],
    ["hardware-shop", "Use McMaster for steel shim, screws, rods, and quick fixture hardware: https://www.mcmaster.com", "hardware", ["mcmaster", "steel"], ["mcmaster", "steel shim", "fixture hardware"]],
    ["avoid-perfect-cart", "Do not build the perfect cart; buy enough to make one crude switch this week.", "scope", ["buy", "start"], ["perfect cart", "crude switch"]],
  ],
  bench: [
    ["loose-loop", "Build the loose magnetic loop first: magnet, steel return path, keeper, coil, pulse.", "bench build", ["bench", "epm"], ["magnetic loop", "keeper", "coil"]],
    ["dry-fit", "Dry-fit the magnet and steel path by hand before winding anything.", "setup", ["magnet", "steel"], ["dry-fit", "steel path"]],
    ["one-change", "Change only one bench thing at a time: gap, coil position, keeper shape, or magnet size.", "debugging", ["bench", "test"], ["one thing", "gap", "coil position"]],
    ["hold-release-only", "The bench goal is only hold and release; lateral motion can wait.", "scope", ["hold", "release"], ["hold and release", "lateral motion"]],
    ["pulse-note", "After each pulse, write only what changed: held, released, warmed, slipped, or did nothing.", "lab note", ["pulse", "note"], ["held", "released", "warmed"]],
  ],
  measurement: [
    ["visible-before-number", "Film the before and after state before adding force numbers.", "debugging", ["video", "test"], ["before", "after", "force"]],
    ["tiny-failure-list", "Use one failure list: weak hold, no release, heating, slipping, broken geometry.", "failure", ["failure", "debug"], ["weak hold", "no release", "heating"]],
    ["warmth-check", "If the coil warms quickly, shorten the pulse before changing the mechanism.", "heat", ["heat", "pulse"], ["coil warms", "shorten pulse"]],
    ["gap-first", "If it barely holds, reduce the air gap before redesigning the whole actuator.", "gap", ["gap", "hold"], ["air gap", "barely holds"]],
    ["one-photo-per-test", "Save one photo or clip per test so the feed remembers what actually happened.", "evidence", ["photo", "video"], ["one photo", "what happened"]],
  ],
  "cell-integration": [
    ["transplant-last", "Only move into the Sarrus cell after the loose EPM switches cleanly.", "integration", ["sarrus", "bench"], ["loose epm", "switches cleanly"]],
    ["one-cell-only", "Use one Sarrus cell first; arrays can wait until the actuator works.", "scope", ["sarrus", "cell"], ["one sarrus cell", "arrays can wait"]],
    ["line-of-action", "Sketch where the keeper motion becomes lateral width change before designing the fixture.", "motion", ["lateral", "keeper"], ["keeper motion", "width change"]],
    ["removable-first", "Make the first cell actuator removable so a failed magnet does not waste the printed cell.", "fixture", ["cell", "actuator"], ["removable", "failed magnet"]],
    ["visible-stroke", "The first integrated win is visible width change from one pulse.", "proof", ["stroke", "pulse"], ["visible width change", "one pulse"]],
  ],
  printing: [
    ["insert-before-print", "Use inserted steel and magnets before trying printable magnetic material.", "material risk", ["printed", "insert"], ["inserted steel", "printable magnetic"]],
    ["print-pockets", "Print clean pockets for bought parts before printing active magnetic material.", "fixture", ["printed", "pockets"], ["clean pockets", "bought parts"]],
    ["coupon-first", "Make material coupons separately from the Sarrus cell.", "coupon", ["material", "print"], ["material coupons", "sarrus cell"]],
    ["three-materials", "Keep the stack simple: hard magnet, soft magnetic path, normal printed structure.", "material map", ["material", "magnet"], ["hard magnet", "soft magnetic path"]],
    ["monolithic-later", "Treat monolithic printing as the prize, not the first build constraint.", "scope", ["monolithic", "start"], ["monolithic", "first build"]],
  ],
  papers: [
    ["one-paper-one-decision", "Read one paper only until it changes one build decision.", "reading", ["paper", "build"], ["one paper", "build decision"]],
    ["figure-filter", "Keep papers with apparatus photos, coil layouts, force curves, or material stacks.", "paper filter", ["paper", "figure"], ["apparatus photo", "coil layout", "force curve"]],
    ["skip-review-mode", "Skip papers that only make the project feel broader.", "scope", ["paper", "skip"], ["broader", "skip papers"]],
    ["extract-parts", "For useful papers, extract the exact part list or geometry to try next.", "paper to build", ["paper", "parts"], ["part list", "geometry"]],
    ["credibility-first", "Prefer papers from labs that actually built and measured a working device.", "quality", ["paper", "credible"], ["built and measured", "working device"]],
    ["support-claim", "Turn the claim into one exact citation sentence before searching.", "paper support", ["paper", "support"], ["citation sentence", "searching"]],
  ],
};

function generateLocalProjectState() {
  const stage = projectStageProfile();
  const approvedIdeas = approvedIdeaItems();
  const approvedPapers = approvedPaperItems();
  const topics = activeProjectTopics(currentProjectText());
  const terms = preferenceTerms(8);
  const topicText = topics.length ? topics.join(", ") : "one-cell EPM actuation";
  if (!approvedIdeas.length && !approvedPapers.length && !userNotes(state.notes).length) {
    return `Selection profile: ${focus.current}`;
  }
  const recentIdeas = approvedIdeas.slice(0, 3).map((idea) => idea.reason).filter(Boolean);
  const summaryTerms = terms.filter((term) => !["cell", "sarrus", "linkage", "paper"].includes(term)).slice(0, 6);
  const signalText = summaryTerms.length ? joinNatural(summaryTerms) : topicText;
  const preference = signalText ? `Signals: ${signalText}.` : "";
  const approvedSignal = recentIdeas.length ? `Recent kept signals: ${joinNatural([...new Set(recentIdeas)])}.` : "";
  const supportTopic = paperSupportTopic();
  if (supportTopic) {
    return `Stage: paper support. Find papers for "${supportTopic}". Prefer papers with built devices, apparatus photos, and measurements.`;
  }
  if (stage.id === "body") {
    return `Stage: ${stage.label}. ${stage.summary} Next: handle the body cue, then one tiny move.`;
  }
  if (stage.id === "activation") {
    return `Stage: ${stage.label}. ${stage.summary} Next: make one visually exciting proof target and let Codex handle the setup.`;
  }
  if (stage.id === "vent") {
    return `Stage: ${stage.label}. ${stage.summary} Next: one reversible step, not the whole project.`;
  }
  if (stage.id === "delegate") {
    return `Stage: ${stage.label}. ${stage.summary} Next: Codex produces wiring, pulse code, parts, and a bench-test checklist.`;
  }
  if (stage.id === "play") {
    return `Stage: ${stage.label}. ${stage.summary} Next: log it, then touch one object.`;
  }
  if (stage.id === "vision") {
    return `Stage: ${stage.label}. ${stage.summary} Next: make one portfolio-visible artifact.`;
  }
  if (stage.id === "reset") {
    return `Stage: ${stage.label}. ${stage.summary} Next: leave one re-entry action before the break.`;
  }
  if (stage.id === "routine") {
    return `Stage: ${stage.label}. ${stage.summary} Next: make one print loop fit the day.`;
  }
  if (stage.id === "start") {
    return `Stage: ${stage.label}. ${stage.summary} Next: order parts or wind one coil.`;
  }
  return `Stage: ${stage.label}. ${stage.summary} ${preference} ${approvedSignal}`;
}

function generateLocalPriorityLine() {
  const supportTopic = paperSupportTopic();
  if (supportTopic) {
    return `Write the citation sentence first, then keep only papers with a built device or apparatus figure for ${supportTopic}.`;
  }

  const stage = projectStageProfile();
  const stagePriority = {
    body: "Handle food, water, or sleep first; leave one small FluxCell re-entry action before stepping away.",
    activation: "Activation target: one visually exciting bench EPM demo that Codex designs end-to-end; the keeper has the clearest visible payoff.",
    vent: "Name the blocker in five words, then make one reversible project move instead of expanding the plan.",
    delegate: "Codex is building the H-bridge bundle: wiring map, pulse script, parts list, and one bench-test checklist.",
    play: "Keep the random note, then route back to one object: magnet, coil, keeper, or fixture.",
    vision: "Make the portfolio proof small: one clean clip of bench EPM hold, pulse, release, and zero-current state.",
    reset: "Before the break, leave one re-entry line: FluxCell bench EPM, one coil, one keeper, one short pulse.",
    routine: "One printer-adjacent loop: order starter EPM parts, sketch one tiny holder, queue one small overnight print, return to writing.",
    start: "Start with the loose bench EPM: small NdFeB magnets, enamel wire, mild steel keeper, switch, short pulse.",
    sourcing: "Buy only the starter pile: small NdFeB blocks, enamel wire, mild steel keeper, switch, pulseable power source.",
    bench: "Assemble the loose magnetic loop before cell CAD: magnet, steel return path, keeper, coil, one short pulse.",
    measurement: "Record one hold-release clip with the magnetic path, keeper state, pulse, and visible gap change.",
    "cell-integration": "Keep the Sarrus cell out until the loose EPM switches cleanly; sketch keeper closure to lateral width.",
    printing: "Print a holder or pocket only; use bought steel and magnets for the magnetic circuit now.",
    papers: "Read one paper only until one apparatus figure changes the bench EPM parts list.",
  };

  const text = stagePriority[stage.id];
  if (text) return text;
  const idea = usefulIdeaItems()[0];
  if (idea?.text) return shortTipText(idea.text, 220);
  return "Prove the smallest physical loop first: loose EPM hold, pulse, release, then one saved clip.";
}

function projectStageProfile() {
  const latest = latestNoteText().toLowerCase();
  const recent = recentConcernText();
  const preference = stagePreferenceText();
  const fileText = state.files
    .filter(isVisibleLibraryFile)
    .slice(0, 18)
    .map((file) => `${file.name || ""} ${file.paperTitle || ""}`)
    .join(" ")
    .toLowerCase();

  const scored = projectStageDefinitions.map((stage) => {
    let score = stagePatternScore(latest, stage.patterns, 12)
      + stagePatternScore(recent, stage.patterns, 3)
      + stagePatternScore(preference, stage.patterns, 1.5)
      + stagePatternScore(fileText, stage.patterns, 1);
    if (stage.id === "body" && /hungry|food|eat|snack|ice cream|tired as fuck|tired af|exhausted|sleepy/.test(latest)) score += 80;
    if (stage.id === "activation" && /adhd|autism|autistic|hard to start|start working|executive|excited|exciting|unique weird brain|compatible with my.*brain|weird brain|can't start|cant start/.test(latest)) score += 140;
    if (stage.id === "vent" && /fuck my life|fml|fuck|shit|lazy+|hate this|everything sucks|miserable|can't do this|cant do this/.test(latest)) score += 80;
    if (stage.id === "delegate" && /ai generation|codex|chatgpt|all code|handled by ai|h-?bridge|hbridge|don't wanna learn|dont wanna learn|no idea how to use|code handled/.test(latest)) score += 120;
    if (stage.id === "play" && /slay|bestie|penis|lol|lmao|lmfao|random|silly|goofy|chaos/.test(latest)) score += 80;
    if (stage.id === "vision" && /disney|imagineering|imagineer|hired|hire|portfolio|r&d|success|cool stuff|dream job|magical/.test(latest)) score += 85;
    if (stage.id === "reset" && /violin|practice|music|rather|avoid|distract|not feeling|don't wanna|dont wanna|burnout|reset/.test(latest)) score += 70;
    if (stage.id === "routine" && /writing.*prototyp|switch.*states|current routine|fit.*routine|iterations?.*printer|3d printer|prototype.*routine|context switch/.test(latest)) score += 95;
    if (stage.id === "start" && /too detailed|crazy detailed|overwhelm|tired|no idea|lost|just need.*start|start.*prototyp/.test(latest)) score += 45;
    if (stage.id === "sourcing" && /where.*buy|what kind.*component|off[- ]?the[- ]?shelf|quick shipping|order|supplier/.test(latest)) score += 45;
    if (stage.id === "bench" && /make|build|bench|wind|coil|keeper|hold|release|epm/.test(latest)) score += 20;
    if (stage.id === "papers" && /paper|papers|read|literature|citation|cite|support/.test(latest) && !/do not read|don't read|dont read/.test(latest)) score += paperSupportTopic() ? 55 : 28;
    return { ...stage, score };
  }).sort((a, b) => b.score - a.score);

  const stage = scored[0];
  if (!stage || stage.score <= 0) {
    return projectStageDefinitions.find((item) => item.id === "start");
  }
  return stage;
}

function stagePreferenceText() {
  const approvedIdeaText = Object.entries(ideaFeedback)
    .filter(([, record]) => normalizeFeedbackRecord(record).value === "useful")
    .map(([id]) => {
      const custom = objectRecord(suggestionState.customIdeas?.[id]);
      const staticIdea = [...ideaGuideRules, ...dynamicIdeaTemplates].find((idea) => idea.id === id);
      return `${id} ${custom.text || ""} ${staticIdea?.text || ""} ${(custom.keywords || staticIdea?.keywords || []).join(" ")}`;
    });
  const approvedPaperText = state.files
    .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file) && paperFeedbackValue(file.id) === "useful")
    .map(paperSearchText);
  return [...approvedIdeaText, ...approvedPaperText].join(" ").toLowerCase();
}

function stagePatternScore(text, patterns, weight) {
  return patterns.reduce((total, pattern) => total + (pattern.test(text) ? weight : 0), 0);
}

function currentProjectText() {
  return weightedContextSources().map((source) => source.text).join(" ").toLowerCase();
}

function weightedContextSources() {
  const latestNotes = userNotes(state.notes).slice(0, 24).map((note) => note.text);
  const latestFiles = state.files
    .filter(isVisibleLibraryFile)
    .slice(0, 12)
    .map((file) => `${file.paperTitle || ""} ${file.name || ""}`);
  const approvedIdeas = allIdeaCandidates()
    .filter((idea) => ideaFeedbackValue(idea.id) === "useful")
    .map((idea) => ({
      text: `${idea.text} ${idea.reason} ${(idea.keywords || []).join(" ")}`,
      weight: approvalWeight(ideaFeedbackUpdatedAt(idea.id), 16),
    }));
  const approvedPapers = state.files
    .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file) && paperFeedbackValue(file.id) === "useful")
    .map((file) => ({
      text: paperSearchText(file),
      weight: approvalWeight(paperFeedbackUpdatedAt(file.id), 15),
    }));

  return [
    { text: `${focus.title} ${focus.current}`, weight: 5 },
    ...approvedIdeas,
    ...approvedPapers,
    ...latestNotes.map((text, index) => ({ text, weight: recentNoteWeight(index) })),
    ...latestFiles.map((text, index) => ({ text, weight: Math.max(1.4, 3.4 - index * 0.18) })),
  ];
}

function approvedContextText() {
  const approvedIdeas = allIdeaCandidates()
    .filter((idea) => ideaFeedbackValue(idea.id) === "useful")
    .map((idea) => `${idea.text} ${idea.reason} ${(idea.keywords || []).join(" ")}`);
  const approvedPapers = state.files
    .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file) && paperFeedbackValue(file.id) === "useful")
    .map(paperSearchText);
  return [...approvedIdeas, ...approvedPapers].join(" ");
}

function recentNoteWeight(index) {
  return Math.max(3.5, 18 * Math.pow(0.82, index));
}

function approvalWeight(updatedAt, base) {
  if (!updatedAt) return base * 0.55;
  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) return base * 0.55;
  const ageDays = Math.max(0, (Date.now() - date.getTime()) / 86400000);
  return Math.max(4, base * Math.exp(-ageDays / 18));
}

function contextKeywordScore(keywords) {
  const sources = weightedContextSources();
  return (keywords || []).reduce((total, keyword) => {
    const needle = String(keyword || "").toLowerCase();
    if (!needle) return total;
    return total + sources.reduce((sum, source) => (
      String(source.text || "").toLowerCase().includes(needle) ? sum + source.weight : sum
    ), 0);
  }, 0);
}

function weightedImportantWords() {
  const stop = importantStopWords();
  const scores = new Map();
  weightedContextSources().forEach((source) => {
    const words = String(source.text || "").toLowerCase().match(/[a-z0-9]{4,}/g) || [];
    words.forEach((word) => {
      if (stop.has(word)) return;
      scores.set(word, (scores.get(word) || 0) + source.weight);
    });
  });
  return scores;
}

function activeProjectTopics(text) {
  const topics = [];
  if (/sarrus|linkage|cell|lateral|width|expand|kinematic|poisson/.test(text)) topics.push("cell mechanics");
  if (/force|gap|pull|load|keeper|yoke|flux|magnetic circuit|air gap|permeab/.test(text)) topics.push("magnetic circuit");
  if (/coil|pulse|current|driver|heat|energy|wire|conductor/.test(text)) topics.push("pulse and coil behavior");
  if (/print|printed|monolithic|embedded|multimaterial|material|composite|core/.test(text)) topics.push("printed integration");
  if (/bistable|memory|snap|hold|release|reset|latch|state/.test(text)) topics.push("state memory");
  if (/paper|literature|reference|review|science|article/.test(text)) topics.push("paper search");
  return topics.slice(0, 3);
}

function allIdeaCandidates() {
  const seen = new Set();
  return [...contextHelpIdeaCandidates(), ...aiIdeaCandidates(), ...storedCustomIdeas(), ...ideaGuideRules, ...dynamicIdeaTemplates, ...approvalDrivenIdeaCandidates()].filter((idea) => {
    if (!idea?.id || seen.has(idea.id)) return false;
    seen.add(idea.id);
    return true;
  });
}

function storedCustomIdeas() {
  return Object.values(suggestionState.customIdeas || {}).map(normalizeAiIdea).filter(Boolean);
}

function aiIdeaCandidates() {
  return (aiFeed.ideas || []).map(normalizeAiIdea).filter(Boolean);
}

function findIdeaCandidate(id) {
  return [...contextHelpIdeaCandidates(), ...aiIdeaCandidates(), ...storedCustomIdeas(), ...ideaGuideRules, ...dynamicIdeaTemplates, ...approvalDrivenIdeaCandidates()]
    .find((idea) => idea.id === id);
}

function rememberCustomIdea(idea) {
  if (!idea || !idea.id || !idea.text) return;
  suggestionState.customIdeas[idea.id] = {
    id: idea.id,
    text: shortTipText(idea.text),
    reason: idea.reason || "tip",
    keywords: idea.keywords || [],
    source: idea.source || "custom",
  };
  saveSuggestionState();
}

function latestNoteText() {
  return userNotes(state.notes)[0]?.text || "";
}

function contextHelpIdeaCandidates() {
  const notesText = recentConcernText();
  const stage = projectStageProfile();
  const supportTopic = paperSupportTopic();
  const startMode = startModeActive();
  const routineMode = stage.id === "routine" || routineModeActive();
  const tips = [];
  const add = (id, text, reason, keywords = [], signals = keywords, options = {}) => {
    if (ideaFeedbackValue(`help-${id}`) === "useful") return;
    if (!options.keepFresh && helpTipAddressed(id, signals, text)) return;
    tips.push({ id: `help-${id}`, text, reason, keywords, source: "helper", core: true });
  };
  const addStart = (id, text, reason, keywords = [], signals = keywords) => {
    add(id, text, reason, keywords, signals, { keepFresh: true });
  };

  if (supportTopic) {
    const topic = sentenceCaseBullet(supportTopic);
    addStart(`support-scholar-${slugify(supportTopic)}`, `Open [Google Scholar](${scholarSearchUrl(`${supportTopic} electropermanent magnet soft robot`)}) for this support claim.`, "paper search", ["paper", "support", ...importantWords(supportTopic).slice(0, 3)], ["google scholar", supportTopic]);
    addStart(`support-semantic-${slugify(supportTopic)}`, `Open [Semantic Scholar](${semanticScholarSearchUrl(`${supportTopic} actuator magnetic latch soft robotics`)}) for this support claim.`, "paper search", ["paper", "support", ...importantWords(supportTopic).slice(0, 3)], ["semantic scholar", supportTopic]);
    addStart(`support-upload-${slugify(supportTopic)}`, `Upload any promising PDF; keep it only if one figure supports "${supportTopic}".`, "paper filter", ["paper", "figure", ...importantWords(supportTopic).slice(0, 3)], ["upload", supportTopic, "one figure"]);
    addStart(`support-sentence-${slugify(supportTopic)}`, `Write the citation sentence first: "${topic} because..."`, "paper support", ["citation", "support", ...importantWords(supportTopic).slice(0, 3)], ["citation sentence", supportTopic]);
    addStart(`support-avoid-broad-${slugify(supportTopic)}`, `Reject papers that mention "${supportTopic}" but do not show a built or measured device.`, "quality", ["paper", "quality", ...importantWords(supportTopic).slice(0, 3)], ["built", "measured", supportTopic]);
  }

  (projectStageTipBank[stage.id] || projectStageTipBank.start).forEach(([id, text, reason, keywords, signals]) => {
    if (stage.id === "start") addStart(id, text, reason, keywords, signals);
    else add(id, text, reason, keywords, signals, { keepFresh: ["papers", "sourcing", "reset", "routine", "body", "activation", "vent", "delegate", "play", "vision"].includes(stage.id) });
  });

  if (stage.id !== "start" && !routineMode && startMode) {
    projectStageTipBank.start.slice(0, 3).forEach(([id, text, reason, keywords, signals]) => addStart(id, text, reason, keywords, signals));
  }

  if (stage.id === "sourcing" || startMode || /where|buy|order|source|supplier|shipping|off[- ]?the[- ]?shelf|component/.test(notesText)) {
    add("magnet-supplier", "Browse small NdFeB blocks at K&J Magnetics: https://www.kjmagnetics.com", "supplier", ["buy", "magnet", "ndfeb"], ["k&j", "kjmagnetics", "ndfeb blocks"]);
    add("electronics-supplier", "Use Digi-Key (https://www.digikey.com) or Mouser (https://www.mouser.com) for magnet wire and driver parts.", "electronics", ["buy", "coil", "driver"], ["digikey", "digi-key", "mouser", "magnet wire"]);
    add("steel-supplier", "Use McMaster for low-carbon steel shim, small bars, screws, and repeatable fixture hardware: https://www.mcmaster.com", "hardware", ["steel", "yoke", "fixture"], ["mcmaster", "low-carbon steel", "steel shim"]);
    add("shopping-search", "Search: small NdFeB block magnet, low-carbon steel shim, enamel magnet wire, MOSFET driver.", "search terms", ["shopping", "prototype"], ["search", "small ndfeb", "mosfet driver"]);
  }

  if (!routineMode && (startMode || /how|what is|make|build|no idea|don't know|dont know|idk|epm|electropermanent/.test(notesText))) {
    add("epm-basic", "An EPM is a permanent magnet path that a coil pulse switches between hold and release.", "basic EPM", ["epm", "basic"], ["epm is", "permanent magnet path", "coil pulse"]);
    add("epm-parts", "First bench parts: hard magnet, soft steel return path, coil wire, keeper, switch, and power source.", "parts", ["epm", "components"], ["hard magnet", "soft steel", "keeper", "coil wire"]);
    add("bench-first", "First EPM outside the Sarrus cell; magnetic switching stays visible.", "first build", ["bench", "prototype"], ["bench first", "outside the sarrus", "magnetic switching"]);
  }

  if (/heat|hot|temperature|burn|current|pulse/.test(notesText)) {
    add("heat-touch", "Start with short manual pulses and stop if the coil gets warm faster than expected.", "heat caution", ["heat", "pulse"], ["short manual pulse", "coil gets warm"]);
    add("current-watch", "Watch current and coil temperature before caring about the printed cell motion.", "basic measurement", ["current", "temperature"], ["current", "coil temperature"]);
  }

  if (!startMode && /paper|papers|literature|reference|source|read/.test(notesText)) {
    add("paper-figure-filter", "Pick papers by useful figures first: apparatus photo, force curve, coil layout, or material stack.", "paper filter", ["paper", "figure"], ["apparatus photo", "force curve", "coil layout"]);
    add("paper-question", "Paper filter: exact part of the next build changed by the claim.", "reading filter", ["paper", "build"], ["next build changes", "paper question"]);
  }

  if (!startMode && /integrat|sarrus|cell|lateral|expand|mechanism|cad|geometry|actuat/.test(notesText)) {
    add("detachable-cassette", "Make the first EPM a detachable cassette before trying to print it into the Sarrus cell.", "integration path", ["sarrus", "cassette"], ["detachable cassette", "print it into the sarrus"]);
    add("motion-first", "Prove one visible width change before optimizing the magnetic circuit.", "motion proof", ["lateral", "width"], ["visible width change", "motion proof"]);
  }

  if (!routineMode && !startMode && /print|printed|monolithic|material|iron|steel|magnet material|composite/.test(notesText)) {
    add("inserted-before-printed", "Use inserted steel and magnets first; treat printable magnetic material as the second milestone.", "material risk", ["printed", "material"], ["inserted steel", "second milestone"]);
    add("material-split", "Separate the build into three materials: hard magnet, soft magnetic path, and normal printed structure.", "material map", ["material", "magnet"], ["hard magnet", "soft magnetic path", "printed structure"]);
  }

  if (!routineMode && (startMode || /test|measure|measurement|proof|failure|fail|works|work|prototype/.test(notesText))) {
    add("first-proof", "The first proof is simple: pulse it, see the keeper switch, and record the before/after state.", "proof", ["test", "prototype"], ["keeper switch", "before/after state"]);
    if (!startMode) {
      add("failure-list", "Keep a tiny failure list: weak hold, no release, heating, slipping, or broken geometry.", "debugging", ["failure", "test"], ["failure list", "weak hold", "no release"]);
    }
  }

  return tips;
}

function recentConcernText() {
  return userNotes(state.notes)
    .slice(0, 12)
    .map((note) => note.text)
    .join(" ")
    .toLowerCase();
}

function startModeActive() {
  if (paperSupportTopic()) return false;
  if (routineModeActive()) return false;
  if (rawThoughtModeActive()) return false;
  if (resetModeActive()) return false;
  return /(?:\bstart\b|starter|prototyp|crazy detailed|too detailed|overwhelm|tired|no idea|what i'?m doing|lost|confus|just need|basic|beginner|where to buy|what kind of off[- ]?the[- ]?shelf|what kind of component)/i.test(recentConcernText());
}

function routineModeActive() {
  return /(?:writing.*prototyp|switch.*states|switching contexts?|context switch|current routine|fit.*routine|iterations?.*printer|printer.*routine|next to a 3d printer|3d printer|print queue|iteration loop|prototype.*routine)/i.test(latestNoteText());
}

function rawThoughtModeActive() {
  return /(?:hungry|food|eat|snack|ice cream|tired as fuck|tired af|exhausted|sleepy|fuck my life|fml|fuck|shit|lazy+|hate this|everything sucks|miserable|can't do this|cant do this|slay|bestie|penis|lol|lmao|lmfao|random|silly|goofy|chaos|disney|imagineering|imagineer|hired|hire|portfolio|r&d|success|cool stuff|dream job|magical)/i.test(latestNoteText());
}

function resetModeActive() {
  return /(?:violin|practice|music|rather|avoid|avoiding|distract|distracted|not feeling|don't wanna|dont wanna|do not wanna|burnout|burned out|reset)/i.test(latestNoteText());
}

function paperSupportTopic() {
  const text = latestNoteText()
    .replace(/\s+/g, " ")
    .trim();
  const patterns = [
    /(?:looking for|find|need|want)\s+(?:papers?|references?|citations?|sources?)\s+(?:to\s+)?support(?:ing)?\s+(.+)/i,
    /(?:papers?|references?|citations?|sources?)\s+(?:to\s+)?support(?:ing)?\s+(.+)/i,
    /(?:support|cite)\s+(?:the\s+)?(?:claim|idea|argument)\s+(?:that\s+)?(.+)/i,
    /(?:literature|papers?)\s+(?:for|on|about)\s+(.+)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match?.[1]) continue;
    return match[1]
      .replace(/[?.!]+$/, "")
      .replace(/^(that|how|whether)\s+/i, "")
      .trim()
      .slice(0, 120);
  }
  return "";
}

function scholarSearchUrl(query) {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
}

function semanticScholarSearchUrl(query) {
  return `https://www.semanticscholar.org/search?q=${encodeURIComponent(query)}&sort=relevance`;
}

function startModeTipText(text) {
  const value = String(text || "").toLowerCase();
  const practical = /order|buy|browse|search|wind|coil|table|bench|today|first|crude|ugly|video|keeper|pulse|magnet|steel|wire|cardboard|tape|short|warm|power source|switch|parts|starter|phone|epm|hold|release|fixture/.test(value);
  const antiPaperAction = /^do not read more papers right now/.test(value);
  const abstract = !antiPaperAction && /paper|literature|failure tree|detachable cassette|monolithic|metric|cad|figure filter|material proof|printed into|split printed|apparatus|threshold|consecutive|optimiz|map how|magnetic closure|protocol|fixed interval|e\.g\.|\b\d+|declare|success criteria|calibrated|logging|ratio|sweep|force|width|synchronized|trace/.test(value);
  return practical && !abstract;
}

function approvedConcernText() {
  return Object.entries(ideaFeedback)
    .filter(([, record]) => normalizeFeedbackRecord(record).value === "useful")
    .map(([id]) => {
      const custom = objectRecord(suggestionState.customIdeas?.[id]);
      const staticIdea = [...ideaGuideRules, ...dynamicIdeaTemplates].find((idea) => idea.id === id);
      return `${id} ${custom.text || ""} ${staticIdea?.text || ""} ${(custom.keywords || staticIdea?.keywords || []).join(" ")}`;
    })
    .join(" ")
    .toLowerCase();
}

function helpTipAddressed(id, signals, text) {
  if (ideaFeedbackValue(`help-${id}`) === "useful") return true;
  const approved = approvedConcernText();
  if (!approved) return false;
  return [...signals, ...importantWords(text).slice(0, 4)]
    .map((signal) => String(signal || "").toLowerCase().trim())
    .filter((signal) => signal.length >= 4)
    .some((signal) => approved.includes(signal));
}

function approvalDrivenIdeaCandidates() {
  const terms = preferenceTerms(24)
    .filter((term) => !["cell", "sarrus", "linkage", "paper"].includes(term))
    .slice(0, 16);
  const first = (fallback, matcher = () => true) => terms.find(matcher) || fallback;
  const magnetic = first("magnetic circuit", (term) => /flux|gap|keeper|yoke|force|magnetic|core/.test(term));
  const electrical = first("pulse current", (term) => /coil|pulse|current|heat|temperature|energy|driver/.test(term));
  const mechanism = first("lateral width change", (term) => /width|lateral|one cell|hold|release|bistable|stroke|expand/.test(term));
  const material = first("printed material stack", (term) => /print|printed|monolithic|material|steel|iron|core|insert/.test(term));
  const proof = first("one-cell proof", (term) => /one cell|proof|fixture|trace|metric|figure|paper/.test(term));

  return [
    {
      id: `adaptive-one-cell-test-${slugify(proof)}`,
      text: `Turn ${proof} into one bench run with apparatus, one measured number, and a pass/fail threshold.`,
      reason: "next test",
      keywords: [proof, "experiment", "apparatus", "measurement", "threshold"],
      core: true,
    },
    {
      id: `adaptive-paper-hunt-${slugify(magnetic)}`,
      text: `Find one strong paper figure for ${magnetic}: geometry, measurement setup, and the number worth reproducing.`,
      reason: "paper hunt",
      keywords: [magnetic, "paper", "figure", "apparatus", "number"],
      core: true,
    },
    {
      id: `adaptive-fixture-${slugify(magnetic)}`,
      text: `Make the next fixture isolate ${magnetic}; every other dimension should stay locked.`,
      reason: "fixture",
      keywords: [magnetic, "fixture", "variable", "repeatable", "test"],
      core: true,
    },
    {
      id: `adaptive-sarrus-coupling-${slugify(mechanism)}`,
      text: `Map how the magnetic closure becomes ${mechanism} in the Sarrus cell, then remove any part that only looks active.`,
      reason: "cell coupling",
      keywords: [mechanism, "sarrus", "lateral", "width", "coupling"],
      core: true,
    },
    {
      id: `adaptive-trace-${slugify(electrical)}`,
      text: `Record ${electrical}, force, and width in one synchronized clip so the tile is evidence, not a reminder.`,
      reason: "evidence",
      keywords: [electrical, "trace", "current", "temperature", "force", "width"],
    },
    {
      id: "adaptive-failure-tree",
      text: "Keep one failure tree for the actuator: weak hold, no release, heating, slip, twist, fracture.",
      reason: "failure map",
      keywords: ["failure", "hold", "release", "heat", "slip", "twist"],
    },
    {
      id: `adaptive-monolithic-route-${slugify(material)}`,
      text: `Split ${material} into two tracks: inserted-core proof now, printed magnetic material proof later.`,
      reason: "print route",
      keywords: [material, "monolithic", "insert", "printed", "core", "route"],
    },
    {
      id: `adaptive-decision-figure-${slugify(magnetic)}`,
      text: `Only keep a ${magnetic} paper if one figure can change the next CAD, fixture, or measurement decision.`,
      reason: "figure filter",
      keywords: [magnetic, "paper", "figure", "decision", "build"],
    },
    {
      id: `adaptive-metric-${slugify(proof)}`,
      text: `Give ${proof} one metric: force per volume, displacement per joule, or hold force per heat rise.`,
      reason: "metric",
      keywords: [proof, "metric", "force", "volume", "energy", "heat"],
    },
    {
      id: `adaptive-beautiful-object-${slugify(mechanism)}`,
      text: `Make ${mechanism} visible in the object with a clean cutaway, a clear silhouette, and one measured motion.`,
      reason: "showcase object",
      keywords: [mechanism, "object", "section", "visible", "motion", "measurement"],
    },
  ];
}

function preferenceTerms(limit = 12) {
  const text = rawPreferenceText();
  const vocabulary = [
    "force", "air gap", "keeper", "yoke", "flux", "magnetic circuit", "coil", "pulse", "current", "heat",
    "temperature", "energy", "width", "lateral", "sarrus", "linkage", "cell", "one cell", "bistable", "hold",
    "release", "reset", "latch", "printed", "monolithic", "embedded", "cartridge", "core", "soft magnetic",
    "hard magnet", "conductor", "hinge", "fixture", "coupon", "trace", "camera", "figure", "paper", "permeability",
    "mechanical advantage", "rocker", "wedge", "repeatability", "failure", "zero power",
  ];
  const scored = vocabulary
    .map((term) => ({ term, score: termScore(text, term) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.term.localeCompare(b.term))
    .map((item) => item.term);

  const wordScores = new Map();
  importantWords(text).forEach((word) => {
    if (/adaptive|template|useful|approved|suggested/.test(word)) return;
    wordScores.set(word, termScore(text, word));
  });

  const extras = [...wordScores]
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .filter((word) => !scored.includes(word));

  return [...scored, ...extras].slice(0, limit);
}

function rawPreferenceText() {
  const baseIdeas = [...ideaGuideRules, ...dynamicIdeaTemplates]
    .filter((idea) => ideaFeedbackValue(idea.id) === "useful")
    .map((idea) => `${idea.text} ${idea.reason} ${(idea.keywords || []).join(" ")}`);
  const approvedIdeaIds = Object.entries(ideaFeedback)
    .filter(([, record]) => normalizeFeedbackRecord(record).value === "useful")
    .map(([id]) => id.replace(/[-_]/g, " "));
  const approvedPapers = state.files
    .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file) && paperFeedbackValue(file.id) === "useful")
    .map(paperSearchText);
  const notes = userNotes(state.notes).slice(0, 32).map((note) => note.text);
  return [`${focus.title} ${focus.current}`, ...baseIdeas, ...approvedIdeaIds, ...approvedPapers, ...notes].join(" ").toLowerCase();
}

function termScore(text, term) {
  const escaped = String(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = text.match(new RegExp(`\\b${escaped}\\b`, "g"));
  return matches ? matches.length : 0;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "idea";
}

function joinNatural(items) {
  const values = items.filter(Boolean);
  if (values.length <= 1) return values[0] || "";
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

function suggestionEntryId(entry) {
  return entry?.id || entry?.idea?.id || entry?.paper?.id || "";
}

function suggestionJitter(id) {
  const text = `${suggestionState.refreshCount}:${id}`;
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return (((Math.abs(hash) % 1000) / 1000) - 0.5) * 8;
}

function suggestionSort(a, b) {
  const aSkipped = Boolean(a.skippedAt);
  const bSkipped = Boolean(b.skippedAt);
  if (aSkipped !== bSkipped) return aSkipped ? 1 : -1;
  if (aSkipped && bSkipped) return feedbackTime(a.skippedAt) - feedbackTime(b.skippedAt);
  const aScore = a.score + suggestionJitter(suggestionEntryId(a));
  const bScore = b.score + suggestionJitter(suggestionEntryId(b));
  return bScore - aScore;
}

function activeSkipRecord(store, id) {
  const record = objectRecord(store?.[id]);
  if (!record.updatedAt || record.cleared || record.count === 0) return null;
  return record;
}

function activeSkipIds(store) {
  return Object.keys(objectRecord(store)).filter((id) => activeSkipRecord(store, id));
}

function usefulIdeaItems() {
  const scored = allIdeaCandidates()
    .map((idea) => scoreIdeaForProject(idea))
    .filter(Boolean)
    .sort(suggestionSort);

  return diversifyIdeaEntries(scored.filter((entry) => entry.feedback !== "useful"))
    .slice(0, 24)
    .map((entry) => entry.idea);
}

function diversifyIdeaEntries(entries) {
  const picked = [];
  const pickedIds = new Set();
  const familyCounts = new Map();
  const signatures = new Set();

  const tryPick = (entry, mode) => {
    if (!entry?.id || pickedIds.has(entry.id)) return false;
    const family = ideaFamily(entry.idea);
    const signature = ideaTextSignature(entry.idea?.text);
    if (mode !== "fill" && signatures.has(signature)) return false;
    if (mode === "strict" && (familyCounts.get(family) || 0) >= 2) return false;
    picked.push(entry);
    pickedIds.add(entry.id);
    signatures.add(signature);
    familyCounts.set(family, (familyCounts.get(family) || 0) + 1);
    return true;
  };

  entries.forEach((entry) => tryPick(entry, "strict"));
  entries.forEach((entry) => tryPick(entry, "relaxed"));
  entries.forEach((entry) => tryPick(entry, "fill"));
  return picked;
}

function ideaFamily(idea) {
  const reason = String(idea?.reason || "").toLowerCase().trim();
  if (reason) return reason;
  return String(idea?.id || "").replace(/^adaptive-/, "").split("-").slice(0, 2).join("-");
}

function ideaTextSignature(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/list the failure mode for [^:]+:/g, "list the failure mode:")
    .replace(/separate the inserted-core version of .+? from/g, "separate the inserted-core version from")
    .replace(/attach .+? to a trace/g, "attach variable to a trace")
    .replace(/ask how .+? creates/g, "ask how variable creates")
    .replace(/turn .+? into/g, "turn variable into")
    .replace(/find a paper where .+? is/g, "find a paper where variable is")
    .replace(/make a fixture where .+? is/g, "make a fixture where variable is")
    .replace(/give .+? a metric/g, "give variable a metric")
    .replace(/only keep a .+? paper/g, "only keep a variable paper")
    .replace(/demonstrate zero-power hold.+/g, "demonstrate zero-power hold")
    .replace(/build a bench epm.+?record force vs gap.+/g, "build bench epm force gap rig")
    .replace(/make a bench epm coupon.+?air-gap.+/g, "build bench epm force gap rig")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreIdeaForProject(idea) {
  const feedback = ideaFeedbackValue(idea.id);
  if (feedback === "not-useful") return null;
  const stage = projectStageProfile();
  if (feedback !== "useful" && startModeActive() && !startModeTipText(idea.text)) return null;
  if (feedback !== "useful" && !stageRelevantIdea(stage.id, idea)) return null;
  if (feedback !== "useful" && isOverTechnicalSuggestion(idea)) return null;

  const keywordScore = contextKeywordScore(idea.keywords);
  let score = feedback === "useful" ? 100 : 0;
  score += idea.core ? 8 : 0;
  score += idea.source === "helper" ? 220 : 0;
  score += idea.source === "ai" ? 18 : 0;
  score += stageKeywordScore(stage.id, idea) * 4;
  score += keywordScore;
  if (!hasGuidanceContext() && !idea.core && feedback !== "useful") return null;

  const skippedAt = activeSkipRecord(suggestionState.skippedIdeas, idea.id)?.updatedAt || "";
  return {
    id: idea.id,
    idea: { ...idea, feedback, skippedAt },
    score,
    feedback,
    skippedAt,
  };
}

function stageRelevantIdea(stageId, idea) {
  if (idea?.source === "helper") return true;
  const text = `${idea?.text || ""} ${idea?.reason || ""} ${(idea?.keywords || []).join(" ")}`.toLowerCase();
  const supportTopic = paperSupportTopic();
  if (supportTopic) return /paper|scholar|citation|cite|source|reference|figure|apparatus|measurement|built|device/.test(text);
  if (stageId === "start") return startModeTipText(text);
  if (stageId === "sourcing") return /buy|order|source|supplier|component|part|magnet|wire|steel|switch|power|shipping|mcmaster|mouser|digikey|digi-key|amazon/.test(text);
  if (stageId === "body") return /eat|food|snack|water|hungry|ice cream|tired|sleep|depleted|low-energy|low energy|parts cart|one move|body/.test(text);
  if (stageId === "activation") return /activation|exciting|demo|visible|motion|hook|diagram|touch|codex|option|choice|artifact|payoff|friction|adhd|autism|re-entry|reentry/.test(text);
  if (stageId === "vent") return /ugly|mood|frustration|reversible|blocker|tomorrow|honest note|prototype step|bad mood|proof smaller|step away/.test(text);
  if (stageId === "delegate") return /codex|chatgpt|ai|h-bridge|hbridge|code|wiring|pulse|script|parts list|checklist|approval|driver|breakout|current limit|artifact/.test(text);
  if (stageId === "play") return /chaotic|goofy|random|nonsense|weird note|human context|tile title|physical touch|bench|object|smile|noise/.test(text);
  if (stageId === "vision") return /disney|imagineering|portfolio|reel|demo|magical|delight|delightful|artifact|video|non-expert|showcase|wow|career/.test(text);
  if (stageId === "reset") return /reset|break|return|re-entry|reentry|next action|one note|ordered part|pulse test|bench ready|smallest visible proof|violin|five minutes|parts cart|switching contexts/.test(text);
  if (stageId === "routine") return /routine|writing|printer|print-ready|prototype day|state|context|iteration|queue|inspect|checklist|babysitting|background process|tiny geometry|fixture shell/.test(text);
  if (stageId === "bench") return /bench|epm|coil|magnet|keeper|steel|hold|release|pulse|switch|wire|table|loop/.test(text);
  if (stageId === "measurement") return /measure|test|debug|failure|force|gap|current|heat|temperature|video|photo|trace|before|after/.test(text);
  if (stageId === "cell-integration") return /sarrus|cell|lateral|width|stroke|keeper|mechanism|fixture|integrat|actuat/.test(text);
  if (stageId === "printing") return /print|printed|monolithic|material|insert|pocket|coupon|steel|magnet|core|structure/.test(text);
  if (stageId === "papers") return /paper|scholar|citation|cite|source|reference|figure|apparatus|built|measured|device/.test(text);
  return true;
}

function stageKeywordScore(stageId, idea) {
  const text = `${idea?.text || ""} ${idea?.reason || ""} ${(idea?.keywords || []).join(" ")}`.toLowerCase();
  const stage = projectStageDefinitions.find((item) => item.id === stageId);
  if (!stage) return 0;
  return stage.patterns.reduce((score, pattern) => score + (pattern.test(text) ? 1 : 0), 0);
}

function isOverTechnicalSuggestion(idea) {
  const text = String(idea?.text || "");
  if (idea?.source === "helper") return false;
  if (text.length > 190) return true;
  return /[â‰¥â‰¤Â±]|(?:\b\d+(?:\.\d+)?\s*(?:ms|s|sec|seconds|Â°c|c\b|cycles|%|mm|awg|psi)\b)|\b\d+\s*consecutive\b/i.test(text);
}

function approvedIdeaItems() {
  return allIdeaCandidates()
    .filter((idea) => ideaFeedbackValue(idea.id) === "useful")
    .map((idea) => ({ ...idea, feedback: "useful", approvedAt: ideaFeedbackUpdatedAt(idea.id) }))
    .sort((a, b) => feedbackTime(b.approvedAt) - feedbackTime(a.approvedAt));
}

function hasGuidanceContext() {
  return userNotes(state.notes).length
    || Object.values(ideaFeedback).some((record) => normalizeFeedbackRecord(record).value === "useful")
    || Object.values(paperFeedback).some((record) => normalizeFeedbackRecord(record).value === "useful");
}

function createNotesSection() {
  const notes = userNotes(state.notes);
  if (!notes.length) return null;

  const section = el("section", "notes-library");
  const head = el("div", "section-head");
  head.append(el("h2", "", "Notes"));
  section.append(head);

  const grid = el("div", "notes-grid");
  notes.slice(0, 8).forEach((note) => grid.append(createNoteCard({
    ...note,
    type: "note",
    title: note.text,
    meta: formatDate(note.createdAt),
  })));
  section.append(grid);

  const older = notes.slice(8);
  if (older.length) {
    const drawer = document.createElement("details");
    drawer.className = "archive-drawer notes-drawer";
    drawer.append(el("summary", "archive-summary", `Older notes (${older.length})`));
    const olderGrid = el("div", "notes-grid archive-grid");
    older.forEach((note) => olderGrid.append(createNoteCard({
      ...note,
      type: "note",
      title: note.text,
      meta: formatDate(note.createdAt),
    })));
    drawer.append(olderGrid);
    section.append(drawer);
  }
  return section;
}

function createFocusLibrary() {
  const approvedIdeas = approvedIdeaItems();
  const approvedPapers = approvedPaperItems();
  const ideas = usefulIdeaItems();
  const papers = focusPaperItems();
  if (!approvedIdeas.length && !approvedPapers.length && !ideas.length && !papers.length) return null;

  const section = el("section", "focus-library useful-library top-feed");
  const head = el("div", "section-head section-head-row");
  const heading = projectStageProfile().id === "delegate" ? "Codex queue" : "Suggestions";
  head.append(el("h2", "", heading), createFeedControls(ideas.length));
  section.append(head);

  const layout = el("div", "useful-layout");
  if (ideas.length) {
    const ideaBlock = el("section", "useful-block");
    const visibleIdeas = visibleTipItems(ideas);
    const ideaGrid = el("div", "ideas-grid tip-grid");
    visibleIdeas.forEach((idea) => ideaGrid.append(createIdeaCard(idea)));
    ideaBlock.append(ideaGrid);
    layout.append(ideaBlock);
  }
  const approvedBank = createApprovedBank(approvedIdeas, approvedPapers);
  if (approvedBank) layout.append(approvedBank);
  const paperDrawer = createSuggestedPaperDrawer(papers);
  if (paperDrawer) layout.append(paperDrawer);
  section.append(layout);
  return section;
}

function visibleTipItems(ideas) {
  if (ideas.length <= visibleTipCount) return ideas;
  const start = ((tipWindowIndex % ideas.length) + ideas.length) % ideas.length;
  return Array.from({ length: visibleTipCount }, (_, offset) => ideas[(start + offset) % ideas.length]);
}

function createFeedControls(total) {
  const controls = el("div", "feed-controls");
  controls.append(createRefreshSuggestionsButton());
  if (total > visibleTipCount) {
    const next = el("button", "refresh-button feed-next");
    next.type = "button";
    next.dataset.action = "next-tips";
    next.title = "Show next tips";
    next.append(icon("skip"), document.createTextNode("Next"));
    controls.append(next);
  }
  return controls;
}

function createSuggestedPaperDrawer(papers) {
  if (!papers.length) return null;
  const drawer = document.createElement("details");
  drawer.className = "archive-drawer paper-suggestion-drawer";
  drawer.append(el("summary", "archive-summary", `Suggested papers (${papers.length})`));
  const grid = el("div", "focus-grid archive-grid");
  papers.slice(0, 8).forEach((item, index) => grid.append(createFocusCard(item, index)));
  drawer.append(grid);
  return drawer;
}

function createApprovedBank(approvedIdeas, approvedPapers) {
  if (!approvedIdeas.length && !approvedPapers.length) return null;
  const total = approvedIdeas.length + approvedPapers.length;
  const drawer = document.createElement("details");
  drawer.className = "archive-drawer approved-drawer";
  drawer.append(el("summary", "archive-summary", `Kept bank (${total})`));

  const body = el("div", "approved-bank-body archive-grid");
  if (approvedIdeas.length) {
    const ideaBlock = el("section", "approved-bank-block");
    ideaBlock.append(el("p", "section-label", `Notes (${approvedIdeas.length})`));
    const ideaGrid = el("div", "ideas-grid approved-grid");
    approvedIdeas.forEach((idea) => ideaGrid.append(createIdeaCard(idea)));
    ideaBlock.append(ideaGrid);
    body.append(ideaBlock);
  }
  if (approvedPapers.length) {
    const paperBlock = el("section", "approved-bank-block");
    paperBlock.append(el("p", "section-label", `Papers (${approvedPapers.length})`));
    const paperGrid = el("div", "focus-grid approved-grid");
    approvedPapers.forEach((item, index) => paperGrid.append(createFocusCard(item, index)));
    paperBlock.append(paperGrid);
    body.append(paperBlock);
  }
  drawer.append(body);
  return drawer;
}

function createRefreshSuggestionsButton() {
  const button = el("button", "refresh-button");
  button.type = "button";
  button.dataset.action = "refresh-suggestions";
  button.title = "Refresh suggestions";
  button.append(icon("refresh"), document.createTextNode("Refresh"));
  return button;
}

function createLibrary() {
  const section = el("section", "library archive-library");
  const items = libraryItems();
  if (!items.length) {
    section.append(el("p", "empty", "Nothing saved yet."));
    return section;
  }

  const drawer = document.createElement("details");
  drawer.className = "archive-drawer";
  const summary = el("summary", "archive-summary", `All files (${items.length})`);
  const grid = el("div", "library-grid archive-grid");
  items.forEach((item, index) => grid.append(createItemCard(item, index)));
  drawer.append(summary, grid);
  section.append(drawer);
  return section;
}

function libraryItems() {
  return state.files.filter(isVisibleLibraryFile).map((file) => ({
    ...file,
    type: "file",
    title: isPaperFile(file) ? paperDisplayTitle(file) : file.name,
    kind: file.kind || classifyFile(file),
    meta: fileMeta(file),
  })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function paperSearchText(file) {
  return `${file.name || ""} ${file.paperTitle || ""} ${file.detectedTitle || ""} ${file.title || ""}`;
}

function paperItem(file) {
  return {
    ...file,
    type: "file",
    title: paperDisplayTitle(file),
    kind: file.kind || classifyFile(file),
    meta: fileMeta(file),
  };
}

function focusPaperItems() {
  const papers = state.files
    .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file))
    .filter((paper) => paperFeedbackValue(paper.id) !== "useful")
    .map(paperItem);
  const scored = papers
    .map((paper) => scorePaperForProject(paper))
    .filter(Boolean)
    .sort((a, b) => suggestionSort(a, b) || new Date(b.paper.createdAt) - new Date(a.paper.createdAt));

  return scored.slice(0, 24).map((entry) => ({ ...entry.paper, focusReason: entry.reason, skippedAt: entry.skippedAt }));
}

function approvedPaperItems() {
  return state.files
    .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file) && paperFeedbackValue(file.id) === "useful")
    .map((file) => ({ ...paperItem(file), focusReason: "Kept", approvedAt: paperFeedbackUpdatedAt(file.id) }))
    .sort((a, b) => feedbackTime(b.approvedAt) - feedbackTime(a.approvedAt) || new Date(b.createdAt) - new Date(a.createdAt));
}

function scorePaperForProject(paper) {
  const feedback = paperFeedbackValue(paper.id);
  if (feedback === "not-useful") return null;

  const search = paperSearchText(paper).toLowerCase();
  const supportTopic = paperSupportTopic();
  let score = feedback === "useful" ? 100 : 0;
  let bestReason = feedback === "useful" ? "Marked useful" : "";
  let bestReasonScore = 0;

  paperGuideRules.forEach((rule) => {
    if (!rule.match.test(paperSearchText(paper))) return;
    const ruleScore = (rule.core ? 8 : 2) + contextKeywordScore(rule.keywords);
    score += ruleScore;
    if (ruleScore > bestReasonScore) {
      bestReason = rule.reason;
      bestReasonScore = ruleScore;
    }
  });

  const wordOverlap = [...weightedImportantWords()]
    .filter(([word]) => search.includes(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .reduce((sum, [, weight]) => sum + weight * 0.2, 0);
  score += wordOverlap;
  if (supportTopic) {
    const supportWords = importantWords(supportTopic);
    const supportOverlap = supportWords.filter((word) => search.includes(word));
    const supportScore = supportOverlap.length * 18;
    score += supportScore;
    if (supportScore > bestReasonScore) {
      bestReason = `May support: ${supportTopic}`;
      bestReasonScore = supportScore;
    }
  }
  score -= rejectionPenalty(search);
  const aiRank = aiPaperRank(paper.id);
  if (aiRank >= 0) {
    score += 70 - aiRank * 2.5;
    if (!bestReason || bestReason === "Reference") bestReason = "AI ranked";
  }

  if (/electropermanent|epm|sarrus|linkage|printed|embedded|monolithic|magnetic/.test(search)) score += 3;
  if (!bestReason && wordOverlap) bestReason = "Matches notes";
  if (!bestReason) bestReason = "Reference";

  const skippedAt = activeSkipRecord(suggestionState.skippedPapers, paper.id)?.updatedAt || "";
  return { id: paper.id, paper, score, reason: bestReason, feedback, skippedAt };
}

function aiPaperRank(id) {
  return (aiFeed.paperIds || []).findIndex((paperId) => paperId === id);
}

function rejectionPenalty(search) {
  const candidateWords = new Set(importantWords(search));
  if (!candidateWords.size) return 0;
  return state.files
    .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file))
    .filter((file) => paperFeedbackValue(file.id) === "not-useful" && paperRejectReason(file.id) === "relevance")
    .reduce((penalty, file) => {
      const rejectedWords = importantWords(paperSearchText(file));
      const overlap = rejectedWords.filter((word) => candidateWords.has(word)).length;
      return penalty + Math.min(22, overlap * 3.5);
    }, 0);
}

function importantWords(text) {
  const stop = importantStopWords();
  return [...new Set(String(text || "").toLowerCase().match(/[a-z0-9]{4,}/g) || [])]
    .filter((word) => !stop.has(word));
}

function importantStopWords() {
  return new Set(["about", "after", "again", "also", "based", "because", "before", "being", "build", "could", "from", "have", "into", "like", "make", "more", "need", "notes", "paper", "papers", "should", "that", "then", "there", "thing", "this", "want", "with"]);
}

function feedbackTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
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

function createIdeaCard(idea) {
  const feedback = ideaFeedbackValue(idea.id);
  const card = el("article", `item-card idea-card${feedback === "useful" ? " paper-kept" : ""}`);
  const body = el("div", "item-body");
  const title = el("p", "item-title");
  appendLinkedText(title, ideaSurfaceText(idea.text));
  body.append(title);
  if (feedback === "useful" && idea.reason) body.append(el("p", "item-meta", ideaSurfaceText(idea.reason)));
  const actionItems = [
    { action: "idea-feedback", id: idea.id, value: "useful", title: "Useful", iconName: "check", className: "feedback-useful", active: feedback === "useful" },
  ];
  if (feedback !== "useful") {
    actionItems.push({ action: "skip-idea", id: idea.id, title: "Skip", iconName: "skip", className: "feedback-skip" });
  }
  actionItems.push({ action: "idea-feedback", id: idea.id, value: "not-useful", title: "Not useful", iconName: "x", className: "feedback-not-useful", active: feedback === "not-useful" });
  const actions = createActions(actionItems);
  card.append(body, actions);
  return card;
}

function appendLinkedText(node, text) {
  const value = String(text || "");
  const markdownPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let markdownCursor = 0;
  let matchedMarkdown = false;
  for (const match of value.matchAll(markdownPattern)) {
    matchedMarkdown = true;
    if (match.index > markdownCursor) appendRawLinkedText(node, value.slice(markdownCursor, match.index));
    const link = document.createElement("a");
    link.href = match[2];
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = match[1];
    node.append(link);
    markdownCursor = match.index + match[0].length;
  }
  if (matchedMarkdown) {
    if (markdownCursor < value.length) appendRawLinkedText(node, value.slice(markdownCursor));
    return;
  }
  appendRawLinkedText(node, value);
}

function appendRawLinkedText(node, value) {
  const urlPattern = /https?:\/\/[^\s)]+/g;
  let cursor = 0;
  for (const match of value.matchAll(urlPattern)) {
    if (match.index > cursor) node.append(document.createTextNode(value.slice(cursor, match.index)));
    const href = match[0].replace(/[.,;]+$/, "");
    const trailing = match[0].slice(href.length);
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = href.replace(/^https?:\/\/(?:www\.)?/, "");
    node.append(link);
    if (trailing) node.append(document.createTextNode(trailing));
    cursor = match.index + match[0].length;
  }
  if (cursor < value.length) node.append(document.createTextNode(value.slice(cursor)));
}

function createFocusCard(file, index) {
  const card = createFileCard(file, index);
  card.classList.add("focus-card");
  const body = card.querySelector(".item-body");
  if (body && file.focusReason) body.append(el("p", "focus-reason", file.focusReason));
  return card;
}

function createFileCard(file, index) {
  const kind = file.kind || classifyFile(file);
  const card = el("article", `item-card file-card ${kind === "paper" ? "paper-card" : ""}${isImageFile(file) ? " image-card" : ""}`);
  const feedback = paperFeedbackValue(file.id);
  if (feedback === "not-useful") card.classList.add("paper-dismissed");
  if (feedback === "useful") card.classList.add("paper-kept");
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

  const paperActions = [
      { action: "open-file", id: file.id, title: "Open", iconName: "open" },
      { action: "paper-feedback", id: file.id, value: "useful", title: "Useful", iconName: "check", className: "feedback-useful", active: feedback === "useful" },
    ];
  if (feedback !== "useful") {
    paperActions.push({ action: "skip-paper", id: file.id, title: "Skip", iconName: "skip", className: "feedback-skip" });
  }
  paperActions.push(
      { action: "paper-feedback", id: file.id, value: "not-useful", title: paperRejectReason(file.id) ? `Not useful: ${paperRejectReason(file.id)}` : "Not useful", iconName: "x", className: "feedback-not-useful", active: feedback === "not-useful" },
      { action: "delete", id: file.id, title: "Delete", iconName: "trash", danger: true },
  );
  const actions = createActions(kind === "paper"
    ? paperActions
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
    const button = el("button", `icon-button${item.className ? ` ${item.className}` : ""}${item.active ? " active" : ""}${item.danger ? " danger" : ""}`);
    button.type = "button";
    button.title = item.title;
    button.dataset.action = item.action;
    button.dataset.id = item.id;
    if (item.value) button.dataset.value = item.value;
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
  root.querySelectorAll("[data-action='refresh-suggestions']").forEach((button) => {
    button.addEventListener("click", refreshSuggestions);
  });
  root.querySelectorAll("[data-action='next-tips']").forEach((button) => {
    button.addEventListener("click", nextTipWindow);
  });
  root.querySelectorAll("[data-action='open-file']").forEach((button) => {
    button.addEventListener("click", () => openFile(button.dataset.id));
  });
  root.querySelectorAll("[data-action='skip-paper']").forEach((button) => {
    button.addEventListener("click", () => skipPaper(button.dataset.id));
  });
  root.querySelectorAll("[data-action='skip-idea']").forEach((button) => {
    button.addEventListener("click", () => skipIdea(button.dataset.id));
  });
  root.querySelectorAll("[data-action='paper-feedback']").forEach((button) => {
    button.addEventListener("click", () => setPaperFeedback(button.dataset.id, button.dataset.value));
  });
  root.querySelectorAll("[data-action='idea-feedback']").forEach((button) => {
    button.addEventListener("click", () => setIdeaFeedback(button.dataset.id, button.dataset.value));
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

function nextTipWindow() {
  const count = usefulIdeaItems().length;
  if (!count) return;
  tipWindowIndex = (tipWindowIndex + visibleTipCount) % count;
  render();
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
  scheduleAiFeedRefresh();
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

async function refreshSuggestions() {
  suggestionState.refreshCount = (suggestionState.refreshCount || 0) + 1;
  suggestionState.refreshedAt = new Date().toISOString();
  saveSuggestionState();
  render();
  if (aiBackendAvailable()) {
    toast("Refreshing AI feed.");
    await requestAiFeed({ force: true });
  } else {
    toast(sync.status === "local" ? "Local suggestions refreshed. Add OPENAI_API_KEY for AI." : "Suggestions refreshed.");
  }
}

function scheduleAiFeedRefresh() {
  if (!aiBackendAvailable()) return;
  window.clearTimeout(aiRefreshTimer);
  aiRefreshTimer = window.setTimeout(() => requestAiFeed({ force: false }), 350);
}

function aiBackendBase() {
  if (aiService.configured && aiService.base) return aiService.base;
  if (sync.status === "local" && sync.aiConfigured) return sync.base;
  return "";
}

function aiBackendAvailable() {
  return Boolean(aiBackendBase());
}

function aiFeedPayload() {
  const approvedIdeas = approvedIdeaItems();
  const approvedPapers = approvedPaperItems();
  const ideaLookup = new Map(allIdeaCandidates().map((idea) => [idea.id, idea]));
  const paperLookup = new Map(state.files.filter((file) => isVisibleLibraryFile(file) && isPaperFile(file)).map((file) => [file.id, file]));
  const notes = userNotes(state.notes);
  const stage = projectStageProfile();
  return {
    focus: `${focus.title} ${focus.current}`,
    priority: generateLocalPriorityLine(),
    summary: generateLocalProjectState(),
    stage: {
      id: stage.id,
      label: stage.label,
      summary: stage.summary,
    },
    paperSupportTopic: paperSupportTopic(),
    refreshCount: suggestionState.refreshCount || 0,
    latestNote: notes[0]?.text || "",
    notes: notes.slice(0, 32).map((note) => ({ text: note.text, createdAt: note.createdAt })),
    approvedIdeas: approvedIdeas.map((idea) => ({
      id: idea.id,
      text: privateSurfaceText(idea.text),
      reason: privateSurfaceText(idea.reason),
      approvedAt: idea.approvedAt,
    })),
    approvedPapers: approvedPapers.map((paper) => ({
      id: paper.id,
      title: paperDisplayTitle(paper),
      reason: privateSurfaceText(paper.focusReason || ""),
      approvedAt: paper.approvedAt,
    })),
    rejectedIdeas: Object.entries(ideaFeedback)
      .filter(([, record]) => normalizeFeedbackRecord(record).value === "not-useful")
      .map(([id]) => ({ id, text: ideaLookup.get(id)?.text || id })),
    rejectedPapers: Object.entries(paperFeedback)
      .filter(([, record]) => normalizeFeedbackRecord(record).value === "not-useful")
      .map(([id, record]) => {
        const paper = paperLookup.get(id);
        return { id, title: paper ? paperDisplayTitle(paper) : id, reason: normalizeFeedbackRecord(record).reason || "" };
      }),
    skippedIdeas: activeSkipIds(suggestionState.skippedIdeas).map((id) => ({ id, text: ideaLookup.get(id)?.text || id })),
    skippedPapers: activeSkipIds(suggestionState.skippedPapers).map((id) => {
      const paper = paperLookup.get(id);
      return { id, title: paper ? paperDisplayTitle(paper) : id };
    }),
    candidatePapers: state.files
      .filter((file) => isVisibleLibraryFile(file) && isPaperFile(file) && paperFeedbackValue(file.id) !== "useful")
      .map((file) => ({
        id: file.id,
        title: paperDisplayTitle(file),
        meta: fileMeta(file),
      })),
  };
}

async function requestAiFeed({ force = false } = {}) {
  const base = aiBackendBase();
  if (!base) return false;
  if (!force && aiFeed.status === "loading") return false;
  aiFeed = { ...aiFeed, status: "loading", error: "" };
  saveAiFeed();
  render();
  try {
    const response = await postJson(`${base}/api/ai/suggestions`, aiFeedPayload());
    if (response.mode !== "ai") {
      aiFeed = normalizeAiFeed({ ...response, status: "idle" });
      saveAiFeed();
      render();
      toast(response.error || "AI is not configured.");
      return false;
    }
    aiFeed = normalizeAiFeed({
      status: "idle",
      mode: response.mode,
      model: response.model,
      priority: response.priority,
      summary: response.summary,
      ideas: response.notes,
      paperIds: response.paperIds,
      updatedAt: response.updatedAt,
    });
    aiFeed.ideas.forEach(rememberCustomIdea);
    saveAiFeed();
    render();
    toast("AI feed updated.");
    return true;
  } catch (error) {
    console.error(error);
    aiFeed = normalizeAiFeed({ ...aiFeed, status: "idle", error: error.message || "AI request failed" });
    saveAiFeed();
    render();
    toast(aiFeed.error);
    return false;
  }
}

function skipIdea(id) {
  if (!id) return;
  const existing = activeSkipRecord(suggestionState.skippedIdeas, id);
  suggestionState.skippedIdeas[id] = {
    updatedAt: new Date().toISOString(),
    count: (existing?.count || 0) + 1,
  };
  saveSuggestionState();
  render();
  scheduleAiFeedRefresh();
  toast("Idea moved down.");
}

function skipPaper(id) {
  if (!id) return;
  const existing = activeSkipRecord(suggestionState.skippedPapers, id);
  suggestionState.skippedPapers[id] = {
    updatedAt: new Date().toISOString(),
    count: (existing?.count || 0) + 1,
  };
  saveSuggestionState();
  render();
  scheduleAiFeedRefresh();
  toast("Paper moved down.");
}

function clearSuggestionSkip(kind, id) {
  const skipped = kind === "paper" ? suggestionState.skippedPapers : suggestionState.skippedIdeas;
  if (!skipped[id]) return;
  skipped[id] = { updatedAt: new Date().toISOString(), count: 0, cleared: true };
  saveSuggestionState();
}

function setPaperFeedback(id, value) {
  if (!id || !["useful", "not-useful"].includes(value)) return;
  const wasActive = paperFeedbackValue(id) === value;
  if (wasActive) {
    paperFeedback[id] = { value: "", updatedAt: new Date().toISOString() };
  } else {
    const reason = value === "not-useful" ? choosePaperRejectReason(id) : "";
    if (value === "not-useful" && !reason) return;
    paperFeedback[id] = { value, updatedAt: new Date().toISOString(), ...(reason ? { reason } : {}) };
  }
  clearSuggestionSkip("paper", id);
  savePaperFeedback();
  render();
  scheduleAiFeedRefresh();
  toast(wasActive ? "Rating cleared." : value === "useful" ? "Kept in useful papers." : `Removed: ${paperRejectReason(id) || "not useful"}.`);
}

function choosePaperRejectReason(id) {
  const file = state.files.find((item) => item.id === id);
  const title = paperDisplayTitle(file || {});
  const answer = window.prompt(`Why reject this paper?\n\n${title}\n\nType: relevance, quality, or credibility`, paperRejectReason(id) || "relevance");
  if (answer === null) return "";
  const normalized = answer.toLowerCase().trim();
  if (/cred|lab|venue|source|trust/.test(normalized)) return "credibility";
  if (/qual|weak|bad|sloppy|unclear|paper/.test(normalized)) return "quality";
  return "relevance";
}

function setIdeaFeedback(id, value) {
  if (!id || !["useful", "not-useful"].includes(value)) return;
  const wasActive = ideaFeedbackValue(id) === value;
  const idea = findIdeaCandidate(id);
  if (wasActive) {
    ideaFeedback[id] = { value: "", updatedAt: new Date().toISOString() };
  } else {
    if (value === "useful") rememberCustomIdea(idea);
    ideaFeedback[id] = { value, updatedAt: new Date().toISOString() };
  }
  clearSuggestionSkip("idea", id);
  saveIdeaFeedback();
  render();
  scheduleAiFeedRefresh();
  toast(wasActive ? "Rating cleared." : value === "useful" ? "Kept idea." : "Removed idea.");
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
  paperFeedback[id] = { value: "", updatedAt: new Date().toISOString() };
  suggestionState.skippedPapers[id] = { updatedAt: new Date().toISOString(), count: 0, cleared: true };
  savePaperFeedback();
  saveSuggestionState();
  saveState();
  render();
  scheduleAiFeedRefresh();
  toast("Deleted.");
}

function deleteNote(id) {
  const note = state.notes.find((item) => item.id === id);
  if (!note) return;
  if (!window.confirm("Delete this note?")) return;
  deletedNoteIds = [...new Set([note.id, ...deletedNoteIds])];
  state.notes = state.notes.filter((item) => item.id !== id);
  saveDeletedNoteIds();
  saveState();
  render();
  scheduleAiFeedRefresh();
  toast("Note deleted.");
}

async function browserDeleteAllowed(password) {
  const existing = localStorage.getItem(ownerKey);
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
  const configuredBase = configuredApiBase();
  const candidates = [
    ...(configuredBase ? [configuredBase] : []),
    ...(isLocalHost
      ? [""]
      : window.isSecureContext
        ? ["http://127.0.0.1:3010", "http://127.0.0.1:3000"]
        : []),
  ].filter((base, index, list) => list.indexOf(base) === index);
  if (!candidates.length) {
    sync = { status: "browser", base: "", root: "", deleteConfigured: false, aiConfigured: false, aiModel: "" };
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
        aiConfigured: Boolean(json.aiConfigured),
        aiModel: json.aiModel || "",
      };
      await refreshCloudState();
      await refreshSyncFiles();
      scheduleAiFeedRefresh();
      render();
      return;
    } catch (error) {
      // Keep checking quieter fallbacks.
    }
  }
  sync = { status: "browser", base: "", root: "", deleteConfigured: false, aiConfigured: false, aiModel: "" };
  render();
}

function configuredApiBase() {
  const fromWindow = String(window.FLUXCELL_API_BASE || "").trim();
  const fromStorage = String(localStorage.getItem(apiBaseKey) || "").trim();
  const value = fromWindow || fromStorage;
  return value.replace(/\/+$/, "");
}

async function detectAiService() {
  const base = configuredAiApiBase();
  if (!base) {
    aiService = { status: "none", base: "", configured: false, model: "" };
    render();
    return;
  }
  try {
    const response = await fetch(`${base}/api/health`, { cache: "no-store" });
    if (!response.ok) throw new Error("AI service health check failed");
    const json = await response.json();
    if (!compatibleSyncApps.has(json.app) || !json.aiConfigured) {
      throw new Error("AI service is not configured");
    }
    aiService = {
      status: "ready",
      base,
      configured: true,
      model: json.aiModel || "",
    };
    scheduleAiFeedRefresh();
  } catch (error) {
    console.warn(error);
    aiService = { status: "offline", base, configured: false, model: "" };
  }
  render();
}

function configuredAiApiBase() {
  const fromWindow = String(window.FLUXCELL_AI_API_BASE || "").trim();
  const fromStorage = String(localStorage.getItem(aiApiBaseKey) || "").trim();
  const value = fromWindow || fromStorage;
  return value.replace(/\/+$/, "");
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
detectAiService();
