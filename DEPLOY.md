# Deploying to Railway

This repo is configured for [Railway](https://railway.app). It builds the Vite
site and serves the static `dist/` folder with [`serve`](https://www.npmjs.com/package/serve),
bound to Railway's injected `$PORT`.

What's already wired up:

- **`npm run build`** → type-checks and produces `dist/` (set as the build command).
- **`npm run start`** → `serve -s dist -l $PORT` (SPA fallback included).
- **`railway.json`** → tells Railway to use Nixpacks with the commands above.
- **`engines.node >= 20`** → Nixpacks picks a modern Node.

## One-time deploy (dashboard)

1. Go to <https://railway.app/new> → **Deploy from GitHub repo**.
2. Pick **`Geoffe-Ga/wavelength-demo`**.
3. Deploy from **`main`** (the default branch). Railway tracks the default
   branch unless you pin another under Service → Settings → Source → Branch.
4. Railway auto-detects the config and runs build → start. No env vars needed.
5. Service → Settings → **Networking → Generate Domain** to get a public preview URL.

## Already have a service? Point it at `main`

`main` is now the default branch and holds the latest site. If an existing
Railway service is still pinned to an old branch (e.g.
`claude/archetypal-wavelength-promo-5osuer`), switch it under **Service →
Settings → Source → Branch → `main`** and trigger a redeploy. After that the old
`claude/*` branches can be deleted safely.

## Deploy from the CLI (optional)

```bash
npm i -g @railway/cli
railway login
railway link        # select/create the project
railway up          # build & deploy the current branch
railway domain      # print/create the public URL
```

## Letting Claude deploy for you

I can run the Railway CLI from a session if a **project token** is available as
the `RAILWAY_TOKEN` environment variable in this environment (Railway → Project →
Settings → Tokens). Without it, I can't reach your Railway account, so the steps
above are the fastest path.
