# FluxCell

A FluxCell memory wall for saved ideas, images, links, and thoughts. The public page opens on the saved wall first; it is no longer a brainstorming, to-do, proof, or current-issues surface.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

For the public page at `fluxcell.aolabs.io` to sync with this computer, run the local sync server on port `3010`:

```bash
$env:PORT="3010"
$env:FLUXCELL_STORAGE_DIR="C:\Users\phama\Documents\research\PhD Chapter 2\FluxCell Files"
$env:FLUXCELL_DELETE_PASSWORD="<set locally>"
$env:OPENAI_API_KEY="<set locally>"
npm start
```

## Data

Notes are stored in the browser with `localStorage`.

Files are saved to the browser vault unless the local sync server is running. With local sync running, uploads save into `FLUXCELL_STORAGE_DIR`.

Deletion from the local sync folder requires `FLUXCELL_DELETE_PASSWORD`. Do not commit that password into this repo.

## Deploy

The app is static and deploys from `public` to GitHub Pages with the current custom domain `fluxcell.aolabs.io`.

It can also run on Railway or any Node host with `npm start`. AI brainstorming is disabled; the backend is for synced notes and uploads.
