'use client'

import { useMemo, useRef, useState } from 'react'
import type { SearchArea, SearchEntry } from '@/lib/types'
import { getSearchIndex } from '@/lib/garden'

// Words that carry no signal in an "I want to…" phrase. Note: "plant" is NOT
// here — it's a real verb people search with ("plant eggplants"), so it's
// routed through SYNONYMS to the Grow pillar instead of being dropped.
const STOP = new Set([
  'i', 'want', 'to', 'a', 'an', 'the', 'my', 'me', 'how', 'do', 'can', 'in',
  'of', 'for', 'and', 'with', 'some', 'need', 'help', 'garden',
])

// Common ways people phrase a need that don't literally appear in our copy.
// Each query word also matches the listed alternates (so "bugs" finds "pest").
const SYNONYMS: Record<string, string[]> = {
  // Nouns / conditions
  bug: ['pest'], bugs: ['pest'], insect: ['pest'], insects: ['pest'], critter: ['pest'],
  dirt: ['soil'], ground: ['soil'],
  veggie: ['vegetable'], veggies: ['vegetable'],
  water: ['irrigate', 'irrigation'], watering: ['irrigate', 'irrigation'],
  irrigate: ['water'], irrigation: ['water'],
  rain: ['rainwater'], barrel: ['rainwater', 'cistern'],
  feed: ['fertilize', 'fertilizer'], fertiliser: ['fertilizer'],
  worms: ['worm', 'vermicompost'], vermicompost: ['worm', 'compost'],
  layout: ['spacing', 'planner'], spacing: ['layout'],
  recycle: ['recycling', 'sort'], trash: ['waste'], garbage: ['waste'],
  buy: ['gear'], shop: ['gear'], shopping: ['gear'], recommend: ['gear'], recommendation: ['gear'],

  // Verbs — planting & growing → the Grow pillar and planting/timing tools.
  plant: ['grow'], plants: ['grow'], planting: ['grow'],
  sow: ['seed', 'plant'], sowing: ['seed', 'plant'],
  transplant: ['plant', 'seed'], transplanting: ['plant', 'seed'],
  propagate: ['grow', 'seed'], cultivate: ['grow'],
  grow: ['plant'], growing: ['plant'], raise: ['grow'],
  harvest: ['yield'], harvesting: ['yield'], pick: ['harvest', 'yield'],
  prune: ['grow'], pruning: ['grow'], trim: ['grow'],

  // Verbs — making things → the Build pillar.
  make: ['build'], making: ['build'], construct: ['build'], constructing: ['build'],
  assemble: ['build'], install: ['build'], installing: ['build'],
  dig: ['build', 'bed'], digging: ['build', 'bed'],

  // Verbs — deciding things → the Plan pillar.
  design: ['plan', 'layout'], designing: ['plan', 'layout'],
  schedule: ['plan', 'timing'], scheduling: ['plan', 'timing'], arrange: ['layout', 'plan'],

  // Verbs — care, protection, and collecting water.
  protect: ['frost'], protecting: ['frost'], kill: ['pest'], spray: ['pest'],
  collect: ['rainwater'], collecting: ['rainwater'], catch: ['rainwater'], capture: ['rainwater'],
}

const AREA_LABEL: Record<SearchArea, string> = {
  plan: 'Plan',
  build: 'Build',
  grow: 'Grow',
  gear: 'Gear',
  field: 'Field',
}
const AREA_ACCENT: Record<SearchArea, string> = {
  plan: 'var(--sunflower)',
  build: 'var(--rust)',
  grow: 'var(--green)',
  gear: 'var(--ink)',     // cross-cutting sections use a neutral chip, not a pillar color
  field: 'var(--ink)',
}

// On a score tie, prefer a specific tool over the section that contains it.
const KIND_RANK: Record<SearchEntry['kind'], number> = {
  tool: 3, game: 2, article: 2, section: 1,
}

// Light suffix stripping so inflections collapse to one stem: "watering",
// "watered", "waters" → "water"; "pests" → "pest"; "seeds" → "seed".
function stem(w: string): string {
  if (w.length <= 3) return w
  for (const suf of ['ing', 'ed', 'es', 's']) {
    if (w.endsWith(suf) && w.length - suf.length >= 3) return w.slice(0, -suf.length)
  }
  return w
}

function stemSet(text: string): Set<string> {
  const set = new Set<string>()
  for (const w of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (w.length > 1) set.add(stem(w))
  }
  return set
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
}

// Expand query words with synonyms, then stem everything into a deduped list.
function queryStems(tokens: string[]): string[] {
  const out = new Set<string>()
  for (const t of tokens) {
    out.add(stem(t))
    for (const syn of SYNONYMS[t] ?? []) out.add(stem(syn))
  }
  return [...out]
}

// Each index entry, with its title/keyword text pre-stemmed into token sets so
// matching is by whole word (not naive substring — no "row" matching "grow").
interface Indexed {
  entry: SearchEntry
  titleStems: Set<string>
  kwStems: Set<string>
}

function score(item: Indexed, stems: string[], raw: string): number {
  if (stems.length === 0) return 0
  let s = 0
  // Whole-phrase hit is the strongest signal ("collect rainwater").
  if (raw.length > 3 && item.entry.keywords.includes(raw)) s += 12
  for (const st of stems) {
    if (item.titleStems.has(st)) s += 5
    else if (item.kwStems.has(st)) s += 2
  }
  return s
}

export default function IntentSearch() {
  const index = useMemo<Indexed[]>(
    () =>
      getSearchIndex().map((entry) => ({
        entry,
        titleStems: stemSet(entry.title),
        kwStems: stemSet(entry.keywords),
      })),
    [],
  )
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const raw = query.trim().toLowerCase()
  const stems = useMemo(() => queryStems(tokenize(query)), [query])

  const results = useMemo(() => {
    if (stems.length === 0) return []
    return index
      .map((item) => ({ item, s: score(item, stems, raw) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || KIND_RANK[b.item.entry.kind] - KIND_RANK[a.item.entry.kind])
      .slice(0, 6)
      .map((r) => r.item.entry)
  }, [index, stems, raw])

  const showPanel = open && query.trim().length > 0

  return (
    <div className="ws-intent" style={{ position: 'relative', width: '100%', maxWidth: 640, margin: '0 auto' }}>
      <label
        htmlFor="ws-intent-input"
        style={{
          display: 'block',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          marginBottom: '0.6rem',
          textAlign: 'center',
        }}
      >
        Tell me what you&rsquo;re after
      </label>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.4rem',
          border: '2px solid var(--ink)',
          background: 'var(--card)',
          padding: '0.85rem 1.1rem',
        }}
        className="ws-intent-box"
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.15rem',
            color: 'var(--ink-muted)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          I want to
        </span>
        <input
          id="ws-intent-input"
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            setOpen(true)
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
            // Delay so a click on a result still registers.
            blurTimer.current = setTimeout(() => setOpen(false), 150)
          }}
          placeholder={focused ? '' : 'irrigate my garden, start seeds, deal with pests…'}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1.15rem',
            color: 'var(--ink)',
          }}
        />
      </div>

      {showPanel && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            zIndex: 30,
            background: 'var(--card)',
            border: '1px solid var(--rule)',
            boxShadow: '0 16px 40px var(--shadow-deep)',
            overflow: 'hidden',
            textAlign: 'left',
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: '1.1rem 1.25rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: 'var(--ink-muted)',
              }}
            >
              Nothing matches that yet. Try a verb — water, build, plant, compost.
            </div>
          ) : (
            results.map((r) => (
              <a
                key={r.href}
                href={r.href}
                onMouseDown={() => {
                  if (blurTimer.current) clearTimeout(blurTimer.current)
                }}
                className="ws-intent-result"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1.25rem',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                  borderBottom: '1px solid var(--rule)',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--paper)',
                    background: AREA_ACCENT[r.area],
                    padding: '0.2rem 0.45rem',
                    borderRadius: 3,
                    minWidth: 52,
                    textAlign: 'center',
                  }}
                >
                  {AREA_LABEL[r.area]}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.98rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {r.title}
                    {r.status !== 'live' && (
                      <span
                        style={{
                          marginLeft: '0.5rem',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.58rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--ink-muted)',
                        }}
                      >
                        {r.status === 'planned' || r.status === 'horizon' ? 'Planned' : 'Soon'}
                      </span>
                    )}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.78rem',
                      color: 'var(--ink-muted)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.blurb}
                  </span>
                </span>
                <span aria-hidden="true" style={{ color: 'var(--ink-muted)', flexShrink: 0 }}>
                  →
                </span>
              </a>
            ))
          )}
        </div>
      )}

      <style>{`
        .ws-intent-box:focus-within { border-color: var(--green); }
        .ws-intent-result:last-child { border-bottom: none; }
        .ws-intent-result:hover { background: var(--paper-tint); }
      `}</style>
    </div>
  )
}
