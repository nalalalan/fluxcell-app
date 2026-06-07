(() => {
  const isLocal = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const isHostedApp = window.location.hostname.endsWith(".aolabs.io") || window.location.hostname.endsWith(".up.railway.app");
  const defaultBase = isLocal || isHostedApp ? window.location.origin : "https://phd.aolabs.io";
  window.FLUXCELL_API_BASE = window.FLUXCELL_API_BASE || defaultBase;
})();
