# Cloudflare Workers Deployment

This app is a TanStack Start SSR app that deploys to **Cloudflare Workers** (not Pages).

## 1. Cloudflare Dashboard → Workers & Pages → Create → Connect to Git

Use **exactly** these settings:

| Setting               | Value                                                       |
| --------------------- | ----------------------------------------------------------- |
| Build command         | `npm ci && npm run build`                                   |
| Deploy command        | `npx wrangler deploy --config dist/server/wrangler.json`    |
| Root directory        | `/`                                                         |
| Build output dir      | leave blank (Wrangler handles it)                           |

**Important:** the repo `wrangler.jsonc` must use the **same Worker name** as the Cloudflare project. This repo is now set to:

```jsonc
"name": "aether-sign-studio"
```

If Cloudflare shows a banner telling you to update `wrangler.jsonc`, it means the Worker name in the dashboard and the repo config do not match.

## 2. Build environment variables

Under **Settings → Build → Variables**, add:

| Name           | Value |
| -------------- | ----- |
| `NODE_VERSION` | `20`  |

(`.nvmrc` in the repo also pins this, but setting it here is belt-and-suspenders.)

## 3. Runtime environment variables (REQUIRED — build will succeed but app will 500 without these)

Under **Settings → Variables and Secrets**, add:

| Name                            | Type      | Where to find it                                                  |
| ------------------------------- | --------- | ----------------------------------------------------------------- |
| `VITE_SUPABASE_URL`             | Plaintext | Lovable → Project Settings → Cloud → API URL                      |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Plaintext | Lovable → Project Settings → Cloud → Publishable (anon) key       |
| `SUPABASE_URL`                  | Plaintext | Same as `VITE_SUPABASE_URL`                                       |
| `SUPABASE_PUBLISHABLE_KEY`      | Plaintext | Same as `VITE_SUPABASE_PUBLISHABLE_KEY`                           |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Secret**| Lovable → Project Settings → Cloud → Service role key             |

`VITE_*` variables are needed at **build time** (bundled into the client). `SUPABASE_*` (no prefix) are needed at **runtime** by SSR server functions. Add both sets.

## 4. Click **Save and Deploy** (or **Retry build** if you already created the project).

If it still fails in the Cloudflare UI, check these three items first:

1. **Build command** is exactly `npm ci && npm run build` (not `npm install && npm run build`)
2. **Variables and Secrets** is **not empty** — add the required `VITE_*` and `SUPABASE_*` values
3. The Worker/project name shown in Cloudflare matches `aether-sign-studio`

---

## Why this works

- `npm ci` is deterministic and uses the committed `package-lock.json`. We removed the stray `bun.lockb` so Cloudflare's auto-detector cannot pick the wrong package manager.
- `.nvmrc` + `engines` field + `NODE_VERSION=20` triple-pin Node 20 (required for React 19 + Vite 7 + TanStack Start 1.x).
- `npm run build` runs `vite build`, which produces:
  - `dist/client/assets/*` — static assets (served by Cloudflare's asset layer via the `ASSETS` binding)
  - `dist/server/index.js` — the Worker SSR entry
  - `dist/server/wrangler.json` — auto-generated, fully resolved Wrangler config with the correct `main`, `assets.directory`, bindings, and compatibility flags
- The deploy command points Wrangler at the generated config so no manual binding setup is needed.

## Local deploy (optional)

```bash
npm ci
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

## Notes

- `wrangler.jsonc` at the repo root is the **source** config consumed by the Vite plugin during `build`. Do not deploy it directly — always deploy `dist/server/wrangler.json`.
- `nodejs_compat` is required for the Worker runtime to provide Node built-ins used by SSR.
- SPA fallback / 404 handling is performed by the SSR Worker itself; no `_redirects` file is needed.
- There is no `index.html` in this repo by design — SSR generates the HTML on every request from `src/routes/__root.tsx`. There is no `.env` file by design — Lovable injects env vars; on Cloudflare you provide them in the dashboard (step 3 above).
