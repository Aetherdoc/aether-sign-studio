# Cloudflare Workers Deployment

This app is a TanStack Start SSR app that deploys to **Cloudflare Workers**.

## One-time setup (Cloudflare Dashboard → Workers → Connect to Git)

Use these exact build settings:

| Setting               | Value                       |
| --------------------- | --------------------------- |
| Build command         | `npm install && npm run build` |
| Deploy command        | `npx wrangler deploy --config dist/server/wrangler.json` |
| Root directory        | `/` (repo root)             |
| Node.js version       | `20` or higher              |

## Why this works

- `npm run build` runs `vite build`, which produces:
  - `dist/client/assets/*` – static assets (served by Cloudflare's asset layer via the `ASSETS` binding)
  - `dist/server/index.js` – the Worker SSR entry
  - `dist/server/wrangler.json` – auto-generated, fully resolved Wrangler config with the correct `main`, `assets.directory`, bindings, and compatibility flags
- The deploy command points Wrangler at the generated config so no manual binding setup is needed.

## Local deploy

```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

## Notes

- `wrangler.jsonc` at the repo root is the **source** config consumed by the Vite plugin during `build`. Do not deploy it directly — always deploy `dist/server/wrangler.json`.
- `nodejs_compat` is required for the Worker runtime to provide Node built-ins used by SSR.
- SPA fallback / 404 handling is handled by the SSR Worker itself; no `_redirects` file is needed.
