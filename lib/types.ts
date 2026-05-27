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

export interface Tool {
  slug: string
  href: string
  label: string
  blurb: string
  category: ToolCategory
  status: ToolStatus
  num: string
  photo?: string
  gradient?: 'water' | 'timing' | 'soil' | 'planning' | 'compost'
  featured?: boolean
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
