# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

World-log-demo is a SvelteKit app demonstrating an **event interpreter pattern**: raw IoT/home events (JSON) are transformed into human-readable text via swappable interpreter templates (Home, Rover, Cyberpunk). Same events, different stories.

## Commands

```bash
npm run dev              # Dev server (Vite)
npm run build            # Production build
npm run preview          # Preview production build
npm run check            # svelte-check type checking
npm run lint             # Prettier + ESLint check
npm run format           # Prettier auto-fix
npm run test:unit        # Vitest (watch mode)
npm run test:unit -- --run  # Vitest (single run)
npm run test:e2e         # Playwright e2e tests
npm run test             # All tests (unit + e2e)
```

## Architecture

**Core pattern** — Events → Interpreter → Output:
- `src/lib/composables/engine.ts` — `render()` function: takes events array + interpreter map, outputs human-readable strings via template replacement (`{actor}`, `{device}`, `{zone}`, `{duration_min}`)
- `src/lib/composables/preset.ts` — Preset event data and interpreter maps (home/rover/cyberpunk themes)
- `src/routes/+page.svelte` — Main UI: 3-column layout (Events JSON | Interpreter JSON | Output)

**UI stack**: shadcn-svelte (Mira style, Taupe base color) + Tailwind CSS v4 + Lucide icons

**i18n**: Paraglide with English (base) + Thai locales. Messages in `messages/{locale}.json`. Hooks in `src/hooks.ts` (reroute) and `src/hooks.server.ts` (middleware) handle locale routing.

**Component aliases** (from `svelte.config.js`):
- `@/*` → `./src/*`
- `$lib/components/ui` — shadcn-svelte UI components

## Testing

Vitest is configured with two test projects:
- **client**: Browser-based tests via Playwright provider for `.svelte.{test,spec}.ts` files
- **server**: Node environment for regular `.{test,spec}.ts` files
- `requireAssertions: true` — every test must contain at least one assertion

Playwright e2e tests match `**/*.e2e.{ts,js}` and build+preview the app before running.

## Code Style

- **Svelte 5 runes mode** enforced (non-node_modules files)
- Prettier: tabs, single quotes, no trailing commas, 100 char width
- Tailwind CSS stylesheet: `src/routes/layout.css`
- Dark theme support via `mode-watcher`

## Svelte MCP Tools

A Svelte MCP server is configured (`.mcp.json`). Use `list-sections` → `get-documentation` for Svelte/SvelteKit docs. Use `svelte-autofixer` to validate Svelte code before finalizing.
