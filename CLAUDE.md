# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`dorianmoy.fr` — Dorian Moy's personal portfolio. A single-page Vue 3 + Vite + TypeScript site styled as a Vim/IDE editor (title bar, sidebar file tree, status line, NORMAL/INSERT modes). Deployed on Vercel. No router, no state library — it is one screen.

## Commands

Package manager is **Yarn**; Node is pinned to **22.22.2** (`.nvmrc`).

- `yarn dev` — Vite dev server
- `yarn build` — `vue-tsc` type-check **then** `vite build`. The type-check gates the build; a type error fails the build.
- `yarn preview` — serve the production build locally
- `yarn lint` / `yarn lint:fix` — ESLint over `src/` (`.vue`, `.ts`)
- `yarn format` / `yarn format:fix` — Prettier (check / write)
- `yarn test` — Vitest (run once); `yarn test:watch` to watch, `yarn test:coverage` for coverage

Tests use **Vitest** + jsdom. Pure logic is extracted into `src/lib/*.ts` and tested directly (`*.test.ts` co-located); the keyboard state machine is tested by mounting `useEditorKeys` in a harness component (`src/composables/useEditorKeys.test.ts`) and dispatching real key events with fake timers. A single test: `yarn test <path>` or `yarn test -t "<name>"`.

## Architecture

### Single-component orchestration
`src/App.vue` is the application shell — it wires the sidebar file list, sections, and the two lazy modals together, but the stateful behaviour lives in `src/composables/`: `useEditorKeys` (Vim NORMAL/INSERT mode + motions + `:wq`/`:q!` ex-command state machine), `useScrollSpy` (IntersectionObserver + rAF-batched scroll), and `useBodyScrollLock` (ref-counted, shared by both modals). The five `src/sections/*.vue` render in a fixed scroll order inside `<main>`; navigation = smooth-scroll to a section, not routing. There is no Vue Router and no Pinia/Vuex.

### Shared state = module-level refs (not provide/inject)
Cross-component state lives in `src/lib/` as exported Vue `ref`s with setter functions, imported directly wherever needed:
- `lib/theme.ts` — `themeChoice` (`light|system|dark`), derived `isDark`; toggles `.dark` on `<html>` and persists to `localStorage`. Imported for side effects in `main.ts`.
- `lib/language.ts` — `langChoice` (`en|system|fr`); drives `i18n.global.locale` and `<html lang>`. Also a side-effect import in `main.ts`.
- `lib/filters.ts` — `selectedTechs` multi-tech filter shared between the Stack and Projects sections (clicking a tech card deep-links into filtered projects).

When adding cross-section state, follow this pattern rather than introducing a store.

### Content / data layer
- `src/lib/portfolio.ts` — the `PORTFOLIO` const: name, socials, competencies, and the full project list. Project copy is **keyed by project `id`**: components resolve text via `projectText(project, "title"|"subtitle"|"description"|"body")` → `projects.list.<id>.<field>`. There are no per-project key fields; to edit copy, find the project's `id` in the locale files.
- `src/i18n/locales/{en,fr}.json` — all user-visible text. Every string is bilingual; add keys to **both** files. `en` is the fallback locale.
- `src/lib/techRegistry.ts` — per-technology metadata (simple-icons `slug`, brand `hex`, mono fallback label, homepage URL), declared with `satisfies` so its keys form the `TechName` union. `Project.stack`, `CompetencyItem.name`, and the filter state are typed as `TechName`, so an unknown tech is a **compile error**. A blank `slug` means "no simple-icons logo, use the mono label" — do not invent slugs (commit `0a2c212`: nonexistent slugs caused console 404s). `TechIcon` probes the CDN once per URL (module-cached) and falls back to the monogram tile; `TechHomeLink` wraps an icon/label in the homepage link when known.

### Theming
`darkMode: "selector"` in `tailwind.config.js`. Colors are CSS custom properties defined in `src/style.css` (`:root` + `.dark`) and surfaced as semantic Tailwind tokens (`bg`, `fg`, `dim`, `panel`, `border`, …) plus fixed brand colors (`gold`, `ink`, `cream`, `tag.*`). Use these tokens; alpha modifiers like `text-fg/50` work because tokens use `<alpha-value>` triplets. **Tailwind is the styling system — prefer utility classes over inline `:style` or new `style.css` rules.** A custom `@max-[Npx]:` container-query variant is registered in the config for max-width responsive overrides.

### Vim/IDE interaction model
`useEditorKeys` implements the editor metaphor: `j/k/g/G/Enter` navigate the file list; `"r` downloads the résumé; `"a`/`"b` open socials (register-style); ex-commands `:wq`→E45, `:wq!`→E212, `:q!`→`about:blank` (escalation via a short grace timer). INSERT vs NORMAL mode tracks focus on text inputs. Note: `selIdx` (keyboard cursor) and `active` (in-view section, from the scrollspy) are intentionally independent. Modals (`ProjectModal`, `VimErrorModal`) are `defineAsyncComponent` lazy-loaded to keep them off the initial mount path. User-visible bio text with `<strong>` emphasis renders through `RichText` (no `v-html`).

### Agent content negotiation
`middleware.ts` (Vercel Edge, matches `/`) serves the pre-rendered `public/index.md` to clients requesting `Accept: text/markdown`; browsers fall through to the SPA. This runs before the static filesystem (which `vercel.json` rewrites cannot). `public/profile.jsonld` is advertised via a `Link` header.

### Build & security
`vite.config.ts` includes a custom `sitemap` plugin (emits `sitemap.xml` at build) and a manual `vendor` chunk split (`vue`, `vue-i18n`, `@vercel/analytics`). Analytics is deferred off the critical render path in `main.ts` via `requestIdleCallback`. `vercel.json` sets a Content-Security-Policy plus hardening headers on `/(.*)`; the CSP keeps `'unsafe-inline'` for scripts/styles because the inline font-swap `onload` (index.html) and Vue inline `:style` bindings require it — if you add an external script/style/image/connect origin, update the matching CSP directive or it will be blocked.

## Conventions

- Code is performance-conscious (LCP, lazy modals, batched scroll reads) — preserve the deferral/lazy-loading patterns when editing the affected files; recent commits (`perf/*`) exist specifically for these.
- New tech entries: add to `techRegistry.ts` (which makes the name a valid `TechName`) **and** reference it in `portfolio.ts` `stack[]`; a typo is now a type error rather than a silent monogram.
