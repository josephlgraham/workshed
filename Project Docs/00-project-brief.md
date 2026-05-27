# Workshed — Project Brief

## What it is

Workshed is a personal homesteading and gardening site at **workshed.garden**. First-person, written by one gardener for visitors who want real numbers, clear answers, and no fluff. The site combines a Tool Shed (calculators and planners) with Field Notes (longer-form posts about builds, mistakes, and what's working) and the Garden page (current conditions and a weekly recap).

The credibility is "I did this," not "experts recommend." The voice doc (`01-voice.md`) is canonical for how anything written on the site should sound.

## What it isn't

- Not anonymous in a paranoid sense, but the writing doesn't broadcast identity. No state, no city, no zone, no specific address. If a determined visitor digs, they may find the author; the site does not help them.
- Not a content farm. Every tool is built because the author needed it. Every Field Notes post is something they actually did.
- Not AI-narrated. The "Ask the Gardener" feature (see `02-ask-the-gardener.md`) is hand-curated, not generative.

## Audience

RSS-first. The site is built for the "freaks and weirdos" who still use feed readers, who want technical depth, who appreciate dry humor, and who don't need marketing copy. SEO is real but secondary: tools are written to rank for long-tail gardening queries because each tool answers a specific question someone is already typing into a search engine.

## Sections

- **Tool Shed** (`/tools`) — calculators and planners. Currently six live tools: Rainwater Harvest, Mulch Math, Seed Starting Calendar, Square Foot Planner, Frost Dates & Protection, Raised Bed Soil Calculator. Catalog also lists "coming soon" and "horizon" placeholders.
- **Field Notes** (`/field`) — longer-form posts about builds, projects, pest watches, what's growing.
- **Garden** (`/garden`) — current conditions metrics and weekly recap.
- **Ask the Gardener** (`/ask`, planned) — hand-curated FAQ with per-question landing pages. See `02-ask-the-gardener.md`.

## Stack & architecture

- Next.js 16 App Router, TypeScript, Tailwind v4 (only used incidentally; the production tool template uses inline CSS-variable styles, not Tailwind classes).
- Paper/ink design system. Color tokens in `app/globals.css`: `--paper`, `--paper-tint`, `--card`, `--ink`, `--ink-soft`, `--ink-muted`, `--rule`, `--green`, `--sunflower`, `--tomato`. Light mode default, dark mode via `[data-theme="dark"]` plus a `prefers-color-scheme` fallback. Anti-flash inline script in `app/layout.tsx`.
- Fonts: Fraunces (serif, editorial body and headings) and Inter (sans, labels and dashboard numbers). Loaded via Google Fonts in the layout head.
- Data layer: `lib/garden.ts` is the abstraction. Components never import from `content/*` directly. Phase 1 data is hardcoded; Phase 2 will swap individual getters to fetch from Ambient Weather and Supabase.

## Established patterns

When building a new tool page, copy the shape of an existing one. `app/tools/soil-volume/page.tsx` is the cleanest current reference:

- Server-component page wrapper with breadcrumb, h1, intro paragraph, calculator, pull quote (green left border), editorial prose `<Section>` components, optional magazine `<Figure>` break, and a "Pairs with" footer.
- Calculator extracted to its own `'use client'` component in `components/tools/`.
- All visible numbers follow the summary-number font rule (see `style_summary_numbers.md` in memory): big hero number in Fraunces, small dashboard summary cells in Inter with tabular figures.

## Things to avoid

These are committed to memory and are easy to slip past. The repo has a feedback memory entry for each.

- **No first name** in visitor-facing copy. Internal variable names like `joeGrows` are fine; tooltip/aria text saying "in my garden" is fine; "Joe's picks" is not.
- **No state name, city, or climate zone** in copy. Use "the South" or "my garden" if a region is unavoidable. Specific zone references in technical contexts (the frost calculator) are allowed if they help the math, but copy should not advertise where the author lives.
- **No legacy narrator framing.** The site has one voice — the gardener, first person. No cat narrator, no third-person character, no named narrator asides.
- **No em dashes, no exclamation points, no AI tics.** See `01-voice.md` for the full list.

## Status

Tool Shed migration complete (May 2026). All six routes follow the paper/ink template. Home, Garden, Field Notes pages on the new design. Ask the Gardener spec'd but not built. Legacy content folders (phrase pools, story beats, garden-state vignettes) deleted; only `content/recaps/archive.ts`, `content/data.ts`, and `content/tools.ts` are alive.
