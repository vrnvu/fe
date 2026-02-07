# Valentines Project

Valentine's Day themed frontend page.

## Stack

- Node.js + Vite + React 19 + Tailwind CSS v4 + pnpm

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (output in `dist/`)
- `pnpm test` — run tests once
- `pnpm test:watch` — run tests in watch mode

## Project Notes

- Single-page client-side app — everything lives in `src/`
- Entry point: `index.html` → `src/main.tsx` → `src/app.tsx`
- Keep it visually playful — Valentine's theme (pinks, reds, hearts)
- Tests colocated next to components: `app.test.tsx` beside `app.tsx`
- Snapshot tests for static markup, behavioral tests only for interactive parts
