# FluxCell

A focused AO Labs research wall for the 3D printed electropermanent magnet actuation direction: Sarrus-cell images, evidence, CAD uploads, notes, force plots, and build artifacts.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

For the public page at `fluxcell.aolabs.io` to sync with this computer, run the local sync server on port `3010`:

```bash
$env:PORT="3010"
$env:FLUXCELL_STORAGE_DIR="C:\Users\phama\Documents\research\PhD Chapter 2\Forge Files"
$env:FLUXCELL_DELETE_PASSWORD="<set locally>"
$env:OPENAI_API_KEY="<set locally>"
npm start
```

The server still accepts the old `FORGE_*` variables so existing local scripts keep working.

## Data

Notes are stored in the browser with `localStorage`.

Files are saved to the browser vault unless the local sync server is running. With local sync running, uploads save into `FLUXCELL_STORAGE_DIR`. If the existing Forge index is present, the server keeps using it so current files remain visible.

Deletion from the local sync folder requires `FLUXCELL_DELETE_PASSWORD`. Do not commit that password into this repo.

## Deploy

The app is static and deploys from `public` to GitHub Pages with the current custom domain `fluxcell.aolabs.io`.

It can also run on Railway or any Node host with `npm start`. For AI feed generation, set `OPENAI_API_KEY` in the server environment. Optional: set `FLUXCELL_OPENAI_MODEL` to override the default model.

If the static GitHub Pages site should use a Railway backend instead of the local sync server, set `window.FLUXCELL_API_BASE` in `public/config.js` to the Railway service URL, for example:

```js
window.FLUXCELL_API_BASE = "https://your-fluxcell-service.up.railway.app";
```
