# Valentines Project

Valentine's Day themed frontend page.

## Stack

- Deno + Next.js (App Router) + React 19 + Tailwind CSS v4
- Run locally: `deno task dev` from this directory

## Commands

- `deno task dev` — start dev server
- `deno task test` — run tests once
- `deno task test:watch` — run tests in watch mode

## Project Notes

- Single-page project for now — everything lives in `app/`
- Keep it visually playful — Valentine's theme (pinks, reds, hearts)
- Tests colocated next to components: `page.test.tsx` beside `page.tsx`
- Snapshot tests for static markup, behavioral tests only for interactive parts
