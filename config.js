(() => {
  const productionBase = "https://fluxcell-api-production.up.railway.app";
  const isLocal = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const defaultBase = isLocal ? window.location.origin : productionBase;
  window.FLUXCELL_API_BASE = window.FLUXCELL_API_BASE || defaultBase;
})();
