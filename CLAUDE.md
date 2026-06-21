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

A small React app — no routing, state library, backend, or data persistence (state is in-memory only; **everything resets on page reload**, no `localStorage`/API).

- [src/main.jsx](src/main.jsx) — entry point; mounts `<App />` inside `<StrictMode>` into `#root`.
- [src/App.jsx](src/App.jsx) — the orchestrator. It owns the **only shared state**: `transactions` (the source of truth, seeded with sample data), the static `categories` list, and `handleAdd` (appends a new transaction). It renders three child components, passing data down via props:
  - `<Summary transactions={transactions} />`
  - `<TransactionForm categories={categories} onAdd={handleAdd} />`
  - `<TransactionList transactions={transactions} categories={categories} />`
- [src/components/](src/components/) — presentational child components, each owning its own local UI state (state is not lifted unless shared):
  - [Summary.jsx](src/components/Summary.jsx) — derives income/expense/balance totals from `transactions` via `reduce` (not stored as state).
  - [TransactionForm.jsx](src/components/TransactionForm.jsx) — owns the add-form field state (description, amount, type, category); builds a new transaction (`id: Date.now()`, today's ISO date), calls `onAdd`, then resets its fields.
  - [TransactionList.jsx](src/components/TransactionList.jsx) — owns the two filter dropdowns (type, category) and derives the filtered list shown in the table.
- [src/App.css](src/App.css) / [src/index.css](src/index.css) — plain global CSS, no preprocessor or CSS modules. Styles are class-based and shared across components, so the components don't import CSS themselves.

## Totals bug (fixed)

The `amount` field is stored as a **string**, so the totals `reduce` in [Summary.jsx](src/components/Summary.jsx) must coerce it — `sum + Number(t.amount)` — to add numerically instead of concatenating. The original starter concatenated (`sum + t.amount`), which produced garbage like `$05000`; this has been corrected. If you refactor the amount handling, keep the numeric coercion at the reduce (or convert amounts to numbers at storage time).

## Lint note

`no-unused-vars` is configured with `varsIgnorePattern: '^[A-Z_]'`, so unused identifiers that begin with an uppercase letter or underscore won't error.
