# fe

Monorepo with small frontend projects. Each subfolder is a standalone Vite + React + Tailwind app.

| Project | What |
|---------|------|
| [valentines](valentines/) | Valentine's Day page |
| [pairs](pairs/) | Memory card game |

## Dev

Each project is independent. Pick one and go:

```sh
cd valentines   # or pairs
pnpm install
pnpm dev        # http://localhost:5173
```

## Test

```sh
cd valentines   # or pairs
pnpm test       # run once
pnpm test:watch # watch mode
```

## Production build

From the repo root — builds both projects into `dist/` with correct base paths:

```sh
pnpm install
pnpm build
```

Preview locally:

```sh
pnpm dlx serve dist
# /            → landing page
# /valentines  → valentines app
# /pairs       → pairs app
```

## Deploy

Hosted on Vercel. Pushes to `main` trigger automatic deploys.

Vercel config lives in `vercel.json` at the root. The Vercel project must be configured with:

- **Root Directory**: `.` (repo root, not a subfolder)
- **Framework Preset**: Other

## Stack

TypeScript, React 19, Vite, Tailwind v4, Vitest, pnpm
