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
const seedPackVersion = "2026-05-05-fluxcell-integrated-cell-wall";
const seedPackOrder = [baseSeedPackVersion, integratedSeedPackVersion, monolithicSeedPackVersion, actuationSeedPackVersion, fabricationSeedPackVersion, printableSeedPackVersion, validationSeedPackVersion, cellIntegrationSeedPackVersion, forceBudgetSeedPackVersion, monolithicEndgameSeedPackVersion, printingRoadmapSeedPackVersion, cellEpmIntegrationSeedPackVersion, mechanismCouplingSeedPackVersion, prototypeProtocolSeedPackVersion, monolithicActuationRouteSeedPackVersion, northStarWallSeedPackVersion, galleryObjectSeedPackVersion, proudCellObjectSeedPackVersion, integratedProofSeedPackVersion, sarrusActuationProofSeedPackVersion, memoryFigureObjectSeedPackVersion, cartridgeProofWallSeedPackVersion, sarrusFirstExperimentWallSeedPackVersion, proudObjectWallSeedPackVersion, dopamineObjectWallSeedPackVersion, northStarJewelWallSeedPackVersion, mechanicalMemoryWallSeedPackVersion, oneCellProofWallSeedPackVersion, printableMaterialsWallSeedPackVersion, benchProofWallSeedPackVersion, monolithicIntegrationWallSeedPackVersion, actuatorCandidatesWallSeedPackVersion, magneticCircuitWallSeedPackVersion, seedPackVersion];
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
    pack: seedPackVersion,
    text: "One cell first. Width change is the proof.",
    createdAt: new Date("2026-05-05T00:24:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-force",
    pack: seedPackVersion,
    text: "The EPM must move the linkage.",
    createdAt: new Date("2026-05-05T00:23:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-gap",
    pack: seedPackVersion,
    text: "Keep the air gap beautiful and small.",
    createdAt: new Date("2026-05-05T00:22:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-pocket",
    pack: seedPackVersion,
    text: "Print the pocket. Insert the truth. Replace it later.",
    createdAt: new Date("2026-05-05T00:21:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-trace",
    pack: seedPackVersion,
    text: "Measure pulse, heat, width, hold.",
    createdAt: new Date("2026-05-05T00:20:00").toISOString(),
  },
  {
    id: "seed-integrated-cell-memory",
    pack: seedPackVersion,
    text: "The final object is a cell that remembers.",
    createdAt: new Date("2026-05-05T00:19:00").toISOString(),
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
