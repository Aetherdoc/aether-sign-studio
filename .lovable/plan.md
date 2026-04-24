## Why we are NOT rewriting the app

Your build fails at **"Installing tools and dependencies"** — Cloudflare hasn't even reached your code yet. This is an `npm install` / package manager problem, not a TypeScript/React problem. Rewriting AetherSign in another language would:

- Throw away your entire app (templates, signing flow, custom fields, PDF export, UI)
- Not fix the install step (any Node-based framework hits the same installer)
- Cloudflare Workers runs **JavaScript only** anyway — Python/Go/etc. would require a totally different platform

The fix is small config changes. Keep the app as-is.

## Root causes in this repo

1. **Two competing lockfiles**: `bun.lockb` AND `package-lock.json` both exist. Cloudflare's auto-detector picks one and the install can fail or use mismatched versions.
2. **No Node version pin**: Cloudflare may default to Node 18, which can't reliably install React 19 + Vite 7 + TanStack Start 1.x.
3. **Build command** in your dashboard says `npm install && npm run build`, but a stale `bun.lockb` still triggers Bun heuristics on some builders.

## Plan

### 1. Pin the Node version
Create `.nvmrc` containing `20` so Cloudflare's builder uses Node 20.

### 2. Pick one package manager (npm) and remove the other lockfile
- Delete `bun.lockb` (keep `package-lock.json`)
- This guarantees `npm ci` / `npm install` works deterministically on Cloudflare

### 3. Add an `engines` field to `package.json`
```json
"engines": { "node": ">=20" }
```
Belt-and-suspenders signal to the installer.

### 4. Update `DEPLOY.md` with the exact, verified Cloudflare Workers Builds settings
| Setting | Value |
|---|---|
| Build command | `npm ci && npm run build` |
| Deploy command | `npx wrangler deploy --config dist/server/wrangler.json` |
| Root directory | `/` |
| Node version (env var `NODE_VERSION`) | `20` |

Also document: in Cloudflare dashboard → your Worker → **Settings → Variables and Secrets**, add as plain text (not secret unless noted):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (mark as Secret)

These must exist **before** clicking Retry build, otherwise the SSR Worker will 500 even after a clean install.

### 5. Verify locally
Run `npm ci && npm run build` in the sandbox to confirm the install + build path succeeds end-to-end with the same commands Cloudflare will run.

## What you do after I apply this

1. Push the changes (Lovable handles this).
2. In Cloudflare dashboard → your Worker → Settings → Build:
   - Set Build command: `npm ci && npm run build`
   - Set Deploy command: `npx wrangler deploy --config dist/server/wrangler.json`
   - Add environment variable `NODE_VERSION` = `20` under **Build variables**
3. Add the three Supabase env vars under **Variables and Secrets**.
4. Click **Retry build**.

## Files to change

- create `.nvmrc`
- edit `package.json` (add `engines`)
- delete `bun.lockb`
- edit `DEPLOY.md` (clearer dashboard instructions + env vars section)
