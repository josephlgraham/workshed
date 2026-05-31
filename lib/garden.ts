import type {
  GardenConditions,
  WeeklyRecap,
  Tool,
  ToolStatus,
  Article,
  Bucket,
  SearchEntry,
} from '@/lib/types'
import data from '@/content/data'
import { tools as toolCatalog } from '@/content/tools'
import { articles as articleCatalog } from '@/content/articles'
import { recapArchive } from '@/content/recaps/archive'
import { seasonalTasks, type SeasonalBucket } from '@/content/seasonal-tasks'
import { getActiveTheme } from '@/lib/seasons'
import { rotateWeekly } from '@/lib/rotate'

// Phase 1: static data fallbacks. Phase 2: swap individual functions to
// fetch from Ambient Weather API / Supabase. Components never import from
// content/data.ts directly — always through here.

export function getCurrentConditions(): GardenConditions {
  return data.conditions
}

export function getToolsByStatus(status: ToolStatus): Tool[] {
  return toolCatalog.filter((t) => t.status === status)
}

export function getFeaturedTool(): Tool | undefined {
  return toolCatalog.find((t) => t.featured)
}

// ── PLAN / BUILD / GROW ────────────────────────────────────────────────────

export interface BucketMeta {
  id: Bucket
  label: string          // "Plan"
  word: string           // "PLAN" — used by the masthead intro cycle
  tagline: string        // short verb phrase
  blurb: string          // one or two sentences, on-voice
  accent: string         // CSS var for the bucket accent color
}

/** Canonical order and copy for the three pillars. Order matters: it drives
 *  the nav, the homepage sections, and the masthead intro word cycle. */
export const BUCKETS: BucketMeta[] = [
  {
    id: 'plan',
    label: 'Plan',
    word: 'PLAN',
    tagline: 'Decide before you dig.',
    blurb: 'Timing, layout, and what goes where. The thinking that saves you a season of do-overs.',
    accent: 'var(--sunflower)',
  },
  {
    id: 'build',
    label: 'Build',
    word: 'BUILD',
    tagline: 'Make the thing.',
    blurb: 'Beds, water systems, structures. The math and the parts list before you cut anything.',
    accent: 'var(--rust)',
  },
  {
    id: 'grow',
    label: 'Grow',
    word: 'GROW',
    tagline: 'Keep it alive.',
    blurb: 'Soil, compost, pests, and the ongoing work once things are in the ground.',
    accent: 'var(--green)',
  },
]

export function getBucketMeta(id: Bucket): BucketMeta {
  return BUCKETS.find((b) => b.id === id)!
}

/** Tools in a bucket, optionally filtered by status, in catalog order. */
export function getToolsByBucket(bucket: Bucket, status?: ToolStatus): Tool[] {
  return toolCatalog.filter((t) => t.bucket === bucket && (!status || t.status === status))
}

/** Articles in a bucket, optionally filtered by status. */
export function getArticlesByBucket(bucket: Bucket, status?: Article['status']): Article[] {
  return articleCatalog.filter((a) => a.bucket === bucket && (!status || a.status === status))
}

/** The recycling sorting game. Featured in Grow. */
export const sortGame = {
  title: 'Sort It! — the recycling game',
  href: '/games/sort-it.html',
  blurb: 'Ten items, four bins. Figure out where each one really goes, and why.',
  bucket: 'grow' as Bucket,
}

/** Landing pages and cross-cutting sections, so the search can point at a whole
 *  area of the site, not just a single calculator. Keywords stay lean on purpose
 *  so a specific tool still outranks its parent section. Gear is `soon` until it
 *  has real picks — the result row shows an honest "Soon" badge until then. */
const SECTION_ENTRIES: SearchEntry[] = [
  ...BUCKETS.map((b): SearchEntry => ({
    title: b.label,
    href: `/${b.id}`,
    blurb: b.blurb,
    area: b.id,
    kind: 'section',
    status: 'live',
    keywords: [b.label, b.tagline, b.id].join(' ').toLowerCase(),
  })),
  {
    title: 'Gear',
    href: '/gear',
    blurb: 'The tools and supplies I actually reach for — recommended in context, never for the placement.',
    area: 'gear',
    kind: 'section',
    status: 'soon',
    keywords:
      'gear tools supplies equipment kit recommendations reviews buy purchase shopping product picks ' +
      'shovel spade hose gloves pruners shears wheelbarrow rake what should i buy what to buy',
  },
  {
    title: 'Field Notes',
    href: '/field',
    blurb: 'The running journal — projects, experiments, and what actually happened out in the dirt.',
    area: 'field',
    kind: 'section',
    status: 'live',
    keywords:
      'field notes journal blog diary log updates story posts projects experiments greenhouse build',
  },
]

/** Flattened, static index for the "I want to…" client-side search. Built once
 *  at module load; safe to import into a client component (no server needed). */
export function getSearchIndex(): SearchEntry[] {
  const toolEntries: SearchEntry[] = toolCatalog.map((t) => ({
    title: t.label,
    href: t.href,
    blurb: t.blurb,
    area: t.bucket,
    kind: 'tool',
    status: t.status,
    keywords: [t.label, t.blurb, t.category, t.bucket, ...(t.intents ?? [])].join(' ').toLowerCase(),
  }))
  const articleEntries: SearchEntry[] = articleCatalog.map((a) => ({
    title: a.title,
    href: a.href,
    blurb: a.blurb,
    area: a.bucket,
    kind: 'article',
    status: a.status,
    keywords: [a.title, a.blurb, a.bucket, ...(a.intents ?? [])].join(' ').toLowerCase(),
  }))
  const gameEntry: SearchEntry = {
    title: sortGame.title,
    href: sortGame.href,
    blurb: sortGame.blurb,
    area: sortGame.bucket,
    kind: 'game',
    status: 'live',
    keywords: 'recycling sort waste compost bins game reduce waste landfill hazardous trash sorting',
  }
  return [...toolEntries, ...articleEntries, gameEntry, ...SECTION_ENTRIES]
}

/** Weekly recap from the archive — rotates weekly (offset 3 for drift). */
export function getRotatingRecap(): WeeklyRecap {
  return rotateWeekly(recapArchive, 3)
}

// Alias so /garden page can keep calling getRecentRecap().
export const getRecentRecap = getRotatingRecap

/** "What I'm doing now" tasks for the current season. */
export function getSeasonalTasks(now = new Date()): SeasonalBucket {
  const theme = getActiveTheme(now)
  return seasonalTasks[theme.id as keyof typeof seasonalTasks]
}
