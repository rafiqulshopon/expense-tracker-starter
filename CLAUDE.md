# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the **starter project for the Claude Code course** (see [README.md](README.md)). It is an expense/income tracker built intentionally with a known bug, poor UI, and messy code that learners fix throughout the course. Do not auto-refactor or "clean up" the app unless explicitly asked — the rough edges are pedagogically intentional.

## Commands

- `npm run dev` — start the Vite dev server (http://localhost:5173).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production build locally.
- `npm run lint` — run ESLint (flat config in [eslint.config.js](eslint.config.js)).
- `npm audit` / `npm audit fix` — check/repair dependency vulnerabilities.

There is **no test runner configured** — no `npm test`, no test files. Don't assume one exists.

## Architecture

The entire app is a **single React component** — there is no routing, state library, backend, or data persistence.

- [src/main.jsx](src/main.jsx) — entry point; mounts `<App />` inside `<StrictMode>` into `#root`.
- [src/App.jsx](src/App.jsx) — the whole application. All UI and state live here:
  - `useState` holds the transaction list plus individual fields for the add-transaction form and the two filter dropdowns (type, category).
  - Income/expense/balance totals are **derived** inline with `Array.prototype.reduce` over the filtered transactions, not stored as state.
  - New transactions get `id: Date.now()` and today's ISO date; state is in-memory only — **everything resets on page reload** (no `localStorage`, no API).
- [src/App.css](src/App.css) / [src/index.css](src/index.css) — plain CSS, no preprocessor or CSS modules.

## Known intentional bug

The `amount` field is stored and accumulated as a **string**, so the totals `reduce` in [App.jsx](src/App.jsx) concatenates instead of adding (e.g. income renders as `$05000`). This is the bug the course walks through fixing — leave it unless asked otherwise.

## Lint note

`no-unused-vars` is configured with `varsIgnorePattern: '^[A-Z_]'`, so unused identifiers that begin with an uppercase letter or underscore won't error.
