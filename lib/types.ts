export interface GardenConditions {
  tempF: number
  soilPct: number
  windMph: number
  uvIndex: number
  uvLabel: string
  narration: string
}

export interface WeeklyRecap {
  headline: string
  body: string          // raw HTML allowed — em tags for emphasis
  days: number
  rainInches: number
  avgTempF: number
  dayLabel: string      // e.g. "posted Tuesday"
}

export interface PollOption {
  emoji: string
  label: string
  pct: number
}

export interface ActivePoll {
  question: string
  totalVotes: number
  closes: string        // e.g. "closes Sunday"
  options: PollOption[]
}

export interface ToolEntry {
  emoji: string
  label: string
  href: string
}

export type ToolStatus = 'live' | 'soon' | 'horizon'
export type ToolCategory = 'soil' | 'water' | 'planting' | 'planning' | 'structure' | 'misc'

/** The three pillars the site is organized around. */
export type Bucket = 'plan' | 'build' | 'grow'

export interface Tool {
  slug: string
  href: string
  label: string
  blurb: string
  category: ToolCategory
  bucket: Bucket
  status: ToolStatus
  num: string
  photo?: string
  gradient?: 'water' | 'timing' | 'soil' | 'planning' | 'compost'
  featured?: boolean
  /** Extra phrases the "I want to…" search should match, beyond label/blurb. */
  intents?: string[]
}

export type ArticleStatus = 'live' | 'planned'

/** Longer-form how-to writing that lives inside a bucket (distinct from the
 *  chronological Field Notes journal). */
export interface Article {
  slug: string
  href: string
  title: string
  blurb: string
  bucket: Bucket
  status: ArticleStatus
  intents?: string[]
}

/** The areas the intent search can point you at: the three pillars plus the
 *  two cross-cutting sections (Gear, Field Notes). Drives the result chip. */
export type SearchArea = Bucket | 'gear' | 'field'

/** Flattened entry the client-side intent search indexes over. */
export interface SearchEntry {
  title: string
  href: string
  blurb: string
  area: SearchArea
  kind: 'tool' | 'article' | 'game' | 'section'
  status: 'live' | 'soon' | 'horizon' | 'planned'
  keywords: string      // joined, lowercased text the search tokenizes and stems
}

export interface FieldNotesEntry {
  slug: string
  title: string
  date: string          // ISO date string
}

export interface MarqueeItem {
  emoji: string
  text: string
}

export type Phrase = string

export interface GardenState {
  text: string
  timeLabel: string
}

export interface StoryBeat {
  text: string
  chapter: number
  total: number
}

export interface GreenhouseCard {
  title: string
  question: string
  status: string
}

export interface SiteData {
  conditions: GardenConditions
  recap: WeeklyRecap
  poll: ActivePoll
  tools: ToolEntry[]
  latestNote: FieldNotesEntry
  totalNotes: number
  marqueeItems: MarqueeItem[]
}
