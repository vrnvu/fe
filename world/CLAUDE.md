# World Project

Interactive travel map — places we want to visit together.

## Stack

- Node.js + Vite + React 19 + Tailwind CSS v4 + pnpm
- `@vnedyalk0v/react19-simple-maps` for SVG map rendering

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (output in `dist/`)
- `pnpm test` — run tests once
- `pnpm test:watch` — run tests in watch mode

## Project Notes

- Single-page client-side app — everything lives in `src/`
- Entry point: `index.html` → `src/main.tsx` → `src/app.tsx`
- Map data fetched at runtime from world-atlas CDN (not bundled)
- Pink/rose aesthetic matching the valentines project
- Tests colocated next to components: `app.test.tsx` beside `app.tsx`
- Snapshot tests for static markup, behavioral tests only for interactive parts
