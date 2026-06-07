# phd

A PhD capture inbox for thoughts, files, links, screenshots, and fragments. The public page opens on the saved stream first so nothing gets lost or falls out of view.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

For the public page at `fluxcell.aolabs.io` to sync with this computer, run the local sync server on port `3010`:

```bash
$env:PORT="3010"
$env:FLUXCELL_STORAGE_DIR="C:\Users\phama\Documents\research\PhD Chapter 2\FluxCell Files"
$env:FLUXCELL_PAPER_PASSWORD="031120"
$env:OPENAI_API_KEY="<set locally>"
npm start
```

## Data

Notes are stored in the browser with `localStorage`.

Files are saved to the browser vault unless the local sync server is running. With local sync running, uploads save into `FLUXCELL_STORAGE_DIR`.

Deletion from the local sync folder uses `FLUXCELL_DELETE_PASSWORD` when it is set. Otherwise it uses the current paper access code, `031120`.

## Deploy

The app is static and deploys from `public` to GitHub Pages with the current custom domain `fluxcell.aolabs.io`.

It can also run on Railway or any Node host with `npm start`. The public identity is `phd`; AI brainstorming is disabled and the backend is only for synced notes and uploads.
