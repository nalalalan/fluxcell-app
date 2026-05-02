# Forge

A minimal web board for prototype research notes, sketches, test results, decisions, questions, and next actions.

## Run Locally

```bash
npm start
```

Open `http://localhost:3000`.

## Data

Forge stores board entries in the browser with `localStorage`.

Use **Export** regularly if the board becomes important. Import that JSON on another browser or after redeploying.

## Deploy

The app is static and can be deployed from `public` to GitHub Pages with the custom domain `forge.aolabs.io`.

It can also run on Railway or any Node host with `npm start`.
