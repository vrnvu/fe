# Frontend Monorepo — Claude Code Configuration

## Project Structure

- Monorepo root: each subdirectory is a standalone frontend project
- Version control: **jujutsu (jj)** with git backend — use `jj` commands, never raw `git`
- Runtime: **Deno** (not Node.js)
- Stack: TypeScript, React, Next.js, Tailwind CSS
- Hosting/CI: GitHub + GitHub Actions

## Version Control Rules

- Always use `jj` commands instead of `git` (e.g., `jj commit`, `jj log`, `jj diff`)
- The only exception: GitHub CLI (`gh`) which requires git — that's fine, jj keeps git in sync
- Do NOT run `git clean`, `git checkout`, or any destructive git commands — they can break jj state
- **Always commit with `jj commit -m "message"`** — keeps history clean and easy to undo
- **No branches or bookmarks** — keep the jj flow linear and simple
- Use `jj abandon` to discard an idea, `jj undo` to revert the last operation
- Push to remote only when explicitly asked (`jj git push`)
- Prefer small, atomic commits with clear descriptions

## Modern Standards (2025–2026)

This monorepo targets modern browsers and runtimes. Prefer current standards over legacy patterns:

### HTML
- Use semantic elements: `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`
- Use `<dialog>` for modals — never build custom modal overlays from `<div>`s
- Use the `popover` attribute for non-modal popover UI (tooltips, dropdowns)
- Use `inert` attribute to disable interaction on background content when a dialog is open

### CSS / Tailwind v4
- **Tailwind v4 is CSS-first** — configure via `@theme` in CSS, not `tailwind.config.js`
- Define custom animations and design tokens with `@theme { }` blocks in `globals.css`
- Use `dvh` units instead of `vh` for mobile-safe viewport heights (`min-h-dvh` not `min-h-screen`)
- Native CSS nesting is supported — use it in custom CSS when needed
- Prefer `oklch()` for custom colors (perceptually uniform, wide-gamut)
- Use `@starting-style` for entry animations on elements that get added to the DOM
- Container queries (`@container`) for component-scoped responsive design when appropriate

### TypeScript 5.9+
- Use `satisfies` operator to validate types without widening: `const x = { ... } satisfies Config`
- Use `using` declarations for disposable resources (e.g., file handles, locks)
- Prefer `Record<string, T>` or mapped types over index signatures

### React 19
- `ref` is a regular prop — no need for `forwardRef`
- Use `use()` hook to read promises and context
- Use `useActionState` for form action state (replaces `useFormState`)
- Use `useOptimistic` for optimistic UI updates
- Server Components are the default — only add `"use client"` when truly needed

## Coding Style

- **TypeScript strict mode** — no `any` unless absolutely necessary, prefer `unknown` + narrowing
- **Functional components only** — no class components in React
- Prefer named exports over default exports
- Use `const` by default, `let` only when reassignment is needed, never `var`
- Destructure props in function signatures: `function Card({ title, children }: CardProps)`
- Colocate types with the code that uses them; extract to a `types.ts` only when shared across modules
- File naming: `kebab-case.ts` for utilities, `kebab-case.tsx` for components
- Component naming: `PascalCase` matching the filename (e.g., `hero-section.tsx` exports `HeroSection`)
- Prefer early returns to reduce nesting
- No barrel files (`index.ts` re-exports) unless the project explicitly uses them

## React & Next.js

- Default to Server Components; only add `"use client"` when state/effects/browser APIs are needed
- Keep components small and composable — extract when a component exceeds ~80 lines
- Use Next.js App Router conventions (`app/` directory, `page.tsx`, `layout.tsx`)
- Prefer `next/image` over raw `<img>` tags
- Prefer `next/link` over raw `<a>` tags for internal navigation

## Tailwind CSS

- Use Tailwind utility classes directly — avoid writing custom CSS unless truly necessary
- Prefer Tailwind's design tokens (spacing, colors) over arbitrary values like `p-[13px]`
- Group related utilities logically: layout → spacing → sizing → typography → colors → effects
- Extract repeated patterns into components, not into `@apply` rules

## Testing

- **Runner**: Vitest (not Jest, not Deno's built-in runner) — run via `deno task test`
- **DOM environment**: happy-dom (not jsdom — jsdom has compatibility issues with Deno)
- **React component testing**: React Testing Library (`@testing-library/react`)
- Test file naming: `*.test.ts` or `*.test.tsx` colocated with source
- **Snapshot testing** for presentational/static components — cheap way to catch unintended markup changes
- **Behavioral tests** (getByRole, getByText, fireEvent) only when components have interactivity
- Prefer integration-style tests that exercise real behavior over mocking everything
- Do NOT write tests unless asked or when adding non-trivial logic
- When updating snapshots, review the diff — never blindly accept `--update`

## Dependencies

- Use Deno-native imports where possible (`jsr:`, `npm:` specifiers)
- Pin dependency versions in `deno.json`
- Prefer the standard library (`@std/`) before reaching for third-party packages

## Claude Conversation Style

- Be direct and concise — skip filler phrases like "Great question!" or "Sure, I'd be happy to help!"
- Lead with the action or answer, explain only if needed
- When showing code, show only what changed or what matters — no redundant context
- If something is ambiguous, ask one focused question rather than guessing
- Use Catalan or Spanish if I write to you in either; otherwise default to English
- Do not add emojis unless I use them first
- When suggesting alternatives, keep it to 2 options max with a clear recommendation
