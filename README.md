# Forge

A very minimal web surface for Chapter 2 prototype focus, quick notes, screenshots, and research files.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

For the public page at `forge.aolabs.io` to sync with this computer, run the local sync server on port `3010`:

```bash
$env:PORT="3010"
$env:FORGE_STORAGE_DIR="C:\Users\phama\Documents\research\PhD Chapter 2\Forge Files"
$env:FORGE_DELETE_PASSWORD="<set locally>"
npm start
```

## Data

Notes are stored in the browser with `localStorage`.

Files are saved to the browser vault unless the local sync server is running. With local sync running, uploads save into `FORGE_STORAGE_DIR` and are tracked by `.forge-files.json`.

Deletion from the local sync folder requires `FORGE_DELETE_PASSWORD`. Do not commit that password into this repo.

## Deploy

The app is static and can be deployed from `public` to GitHub Pages with the custom domain `forge.aolabs.io`.

It can also run on Railway or any Node host with `npm start`.
