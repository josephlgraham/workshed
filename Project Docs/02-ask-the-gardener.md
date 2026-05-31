# Ask the Gardener — Spec

A search-driven FAQ that lets a visitor type a question, see a short hand-written answer, and click through to the relevant tool or article. **Not AI.** The answers are curated by Joe (the site owner) in a flat content file. The dev does not write garden answers.

This document is intended as a handoff brief. A dev unfamiliar with the codebase should be able to read this, look at the referenced existing files, and produce a reviewable PR.

---

## 1. Why this exists

The site has six gardening calculators and a growing collection of Field Notes posts. Visitors who come in cold often don't know what tool to use, or what to call the thing they want to look up. The Ask page is the entry point for "I have a question," and every answer funnels to one specific page on the site.

The feature also produces SEO-friendly long-tail landing pages (Phase 1B, see §10) without the dev or site owner having to write blog posts to capture that traffic.

---

## 2. Goals

- A visitor can type a natural-language question (e.g. "how much mulch for a 4×8 bed") and get a relevant short answer + a link to the tool that solves it.
- Answers are short (1–3 sentences) and always end with a path forward (a link).
- Content is hand-curated in a flat TypeScript file. Updating the FAQ list is a one-file edit.
- Zero backend. No DB, no submission form, no AI API.
- The page looks and reads like the rest of the Workshed tools (same paper/ink palette, same voice, same overall page shape).

---

## 3. Non-goals (Phase 1)

- **No AI.** No LLM lookups, no semantic embeddings, no "I'll generate an answer." Match is keyword/tag based.
- **No submission form.** If a visitor's question doesn't match anything, the page shows a `mailto:` link. Do not build a database or form-submission backend.
- **No user accounts, no rating, no comments.**
- **No analytics integration.** (Site-wide analytics may be added later as a separate task.)

---

## 4. Routes & files to create

```
app/ask/page.tsx                        — server component shell
app/ask/[slug]/page.tsx                 — per-question landing page (server)
components/ask/AskSearch.tsx            — client component (search input + results list)
content/faqs.ts                         — the FAQ data
```

Update:
```
components/Masthead.tsx                 — add "Ask" to the primary nav, between Tools and Field Notes
components/Footer.tsx                   — add "Ask" to the Sections column
```

---

## 5. Data shape

`content/faqs.ts` exports an array of FAQ entries:

```ts
export type FAQ = {
  slug: string                  // url-safe, used in /ask/[slug]
  question: string              // the canonical question text shown in results
  answer: string                // 1-3 sentence answer in Workshed voice
  link: { href: string; label: string }  // CTA at end of answer
  tags: string[]                // for keyword matching; lowercase
}

export const FAQS: FAQ[] = [
  {
    slug: 'how-much-mulch-for-a-4x8-bed',
    question: 'How much mulch do I need for a 4×8 bed?',
    answer: 'About 1 cubic yard at three inches deep. The Mulch Math calculator handles bags vs. bulk and adds 10% for settling.',
    link: { href: '/tools/mulch', label: 'Open Mulch Math' },
    tags: ['mulch', 'raised bed', '4x8', 'cubic yards', 'depth'],
  },
  // ... ~15-30 entries to start
]
```

Joe will provide the first batch of FAQ entries. **The dev does not write garden content.** If example entries are needed for development, copy the structure from one entry and use placeholder text clearly marked `TODO`.

---

## 6. UX — the `/ask` page

Page layout (top to bottom):

1. **Breadcrumb**: `Tool Shed · Ask` (match the breadcrumb style in `app/tools/soil-volume/page.tsx`)
2. **H1**: "Ask the gardener"
3. **Intro paragraph** (~2 sentences): voice should match Joe's other intros. Joe will write this.
4. **Search input**: a single text field, placeholder "What do you want to know?". Inter sans, `var(--paper)` background, `var(--rule)` border, focus state `var(--green)`.
5. **Results area**:
   - **Empty state** (no query yet): show 6-8 featured questions (just the first 6-8 from the data file for now).
   - **Has query, matches found**: show top 5 matches as a vertical list of result rows.
   - **Has query, no matches**: show a `mailto:` link prompt — "Don't see your question? [Email it →](mailto:workshedgarden@gmail.com?subject=Workshed%20question)". Wording can be tightened by Joe.
6. **Each result row** displays: the question (serif, weight 600), the short answer (serif, `var(--ink-soft)`), and the CTA link with a sunflower underline. Whole row is clickable and goes to `/ask/[slug]`.

Match algorithm (Phase 1):
- Lowercase the query.
- For each FAQ, score = (count of query tokens that appear in `question`) × 2 + (count of query tokens that appear in any `tag`).
- Filter out zero-score entries.
- Sort descending. Return top 5.

This is dumb on purpose. If results feel weak after Joe has 30+ entries in the data file, the next iteration can swap to [Fuse.js](https://www.fusejs.io/) (~5kb, MIT licensed) — but don't pull in a dependency for v1.

---

## 7. UX — the `/ask/[slug]` page

Each FAQ also gets its own URL so visitors can land directly from search engines.

Layout:
1. Breadcrumb: `Tool Shed · Ask · {short question}`
2. H1: the full question
3. The answer paragraph (serif, `var(--ink)`, ~1.15rem)
4. A prominent CTA card (green left border, paper-tint background) with the link label and `href`
5. A "More questions" footer with 3 related FAQs (just pick 3 entries that share at least one tag; if none share a tag, show 3 random others)
6. `mailto:` fallback line at the very bottom: "Have a different question? Send it."

Use `generateStaticParams` so all FAQ pages are statically generated at build time. Use `generateMetadata` to set `<title>` and meta description per FAQ (title = question, description = answer).

---

## 8. Visual design — follow the existing template

All visual decisions should mirror existing tool pages. **Concrete reference files:**

- **Page shell shape** (breadcrumb, h1, intro, content, pairs-with footer): see `app/tools/soil-volume/page.tsx`
- **CTA card / pull-quote style**: see the green-bar pull quote in any tool page (e.g. `app/tools/frost-dates/page.tsx`)
- **"More questions" related-row card style**: see the `PairCard` component in `app/tools/soil-volume/page.tsx`
- **Theme tokens**: read `app/globals.css` — only use `var(--paper)`, `var(--paper-tint)`, `var(--card)`, `var(--ink)`, `var(--ink-soft)`, `var(--ink-muted)`, `var(--rule)`, `var(--green)`, `var(--sunflower)`, `var(--tomato)`. Do not introduce new colors.
- **Fonts**: `var(--font-serif)` (Fraunces) for body and headings; `var(--font-sans)` (Inter) for labels, breadcrumbs, button text, and tabular numbers; `var(--font-mono)` for monospace data only.
- **Magazine figure breaks**: optional, not needed for v1.
- **Dark mode**: nothing special to do — the brand tokens auto-flip via `[data-theme="dark"]` already.
- **Responsive**: the page should collapse cleanly under 700px. Match the breakpoints used in existing tool pages (`@media (max-width: 760px)` etc.).

---

## 9. Voice & content rules

Read first: **`Project Docs/01-voice.md`** is canonical.

Additional rules confirmed in code-review history (these are in repo memory but stating them here to save the dev from missing them):

- **Never put "Joe" or "Joseph" in visible UI copy.** Variable names like `joeGrows` are fine; tooltip and aria-label text is not. Use first-person pronouns ("my", "I", "here") or neutral framing ("grown here") instead.
- **No em dashes**, no exclamation points, no "we" pronouns. First-person where appropriate.
- **Summary number font rule**: dashboard-style numbers (small counts above a small-caps label) use `var(--font-sans)` with `font-feature-settings: '"tnum" 1'`. Big editorial hero numbers stay in Fraunces. See existing tools for examples.
- **No legacy narrator references.** The site has one voice — the gardener, first person. Do not introduce a cat narrator, third-person character framing, or named-narrator asides.

If a copy choice is unclear, leave a `TODO` comment with the question and let Joe resolve in review. Better than guessing.

---

## 10. Future phases (out of scope, but worth noting)

These are deferred. Do not build them now, but the Phase 1 data shape should not preclude them.

- **1B — featured & categorized browsing**: a "Browse by topic" section grouping FAQs by tag. Trivial once content is in place.
- **2A — submission capture**: replace the `mailto:` fallback with a form that POSTs to Supabase or Formspree. Surfaces unmatched questions to Joe.
- **2B — Fuse.js fuzzy match**: swap the dumb scorer for proper fuzzy search if quality suffers at scale.
- **3A — JSON-LD FAQPage schema** on each `/ask/[slug]` for rich search results.

---

## 11. Acceptance criteria

Phase 1 ships when all of these are true:

- [ ] `/ask` renders an intro, a working search input, an empty state with 6-8 featured questions, and a "no matches" mailto fallback.
- [ ] Typing a query filters the result list live (no page reload, no enter-to-search). Searching "mulch 4x8" returns the mulch-quantity FAQ when one exists.
- [ ] `/ask/[slug]` renders for every FAQ at build time (verify with `npm run build` — no dynamic-render warnings for these routes).
- [ ] Each result row and each per-question page links to the right `href`.
- [ ] No visible "Joe" / "Joseph" or cat-narrator references in any of the new code's strings.
- [ ] Light + dark themes both render correctly. Test by setting `localStorage.setItem('workshed-theme', 'dark')` and reloading.
- [ ] Mobile (≤700px) layout is usable — no overflow, no broken grid.
- [ ] The "Ask" link appears in the Masthead primary nav and the Footer Sections column.
- [ ] No console errors when navigating to `/ask`, typing, and clicking through to a per-question page.
- [ ] Joe has reviewed at least one round of the final result against the example FAQ in §5 and signed off on the search behavior.

---

## 12. Estimated effort

For a dev familiar with Next.js 16 App Router, TypeScript, and React:

- `content/faqs.ts` scaffolding + 3 placeholder entries: **1 hour**
- `app/ask/page.tsx` + `components/ask/AskSearch.tsx`: **3-4 hours** (server shell + client search component, including empty/loading/no-match states)
- `app/ask/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata`: **2 hours**
- Masthead + Footer nav updates: **30 minutes**
- Polish, dark mode check, mobile, acceptance walk-through: **1-2 hours**

**Total: roughly one solid day of focused work**, assuming Joe provides a starter FAQ batch in parallel. Adding more FAQs later is a one-file edit by Joe with no dev involvement.

---

## 13. Open questions for the dev to confirm with Joe before starting

- How many FAQs in the initial batch? (Suggested: 15-30 to make the search feel populated.)
- Should the search input persist its query in the URL (`/ask?q=mulch`) for shareable links? Phase 2 is fine — leave a `// TODO` if not now.
- Email for the `mailto:` fallback: `workshedgarden@gmail.com` — confirm or substitute.
- Page intro copy: Joe will draft and paste in.
