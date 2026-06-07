# phd

A PhD capture inbox for thoughts, files, links, screenshots, and fragments. The public page opens on the saved stream first so nothing gets lost or falls out of view.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

For the public page at `phd.aolabs.io` to sync with this computer, run the local sync server on port `3010`:

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

The app deploys from this repo to Railway with the preferred custom domain `phd.aolabs.io`. Keep `fluxcell.aolabs.io` attached as a temporary recovery alias until Alan confirms old browser-origin storage has been checked. Do not redirect it before that check: notes saved only in the old hostname's `localStorage` need the old hostname to load once and merge into the synced Railway state, and browser-vault files need the old origin to remain reachable for manual recovery.

It can also run on Railway or any Node host with `npm start`. The public identity is `phd`; AI brainstorming is disabled and the backend is only for synced notes and uploads.
