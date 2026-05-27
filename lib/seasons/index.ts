import { defaultTheme } from './default'
import { highSummer } from './high-summer'
import { lateSummer } from './dog-days'
import { firstFrost } from './first-frost'
import { hollowSeason } from './hollow-season'
import { lateFall } from './late-fall'
import { winterSolstice } from './winter-solstice'
import { deepWinter } from './deep-winter'
import { lateWinter } from './late-winter'
import { springEquinox } from './spring-equinox'
import { lateSpring } from './late-spring'

export interface SeasonTheme {
  id: string
  label: string
  dateRange: { start: string; end: string }  // MM-DD
  accent: string
  glow: string
  ornament: string
  storyBeatPool: string
  homepageNote: string | null
}

const themes: SeasonTheme[] = [
  deepWinter,
  lateWinter,
  springEquinox,
  lateSpring,
  highSummer,
  lateSummer,
  firstFrost,
  hollowSeason,
  lateFall,
  winterSolstice,
]

function mmdd(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${m}-${d}`
}

function inRange(now: string, start: string, end: string): boolean {
  if (start <= end) return now >= start && now <= end
  return now >= start || now <= end
}

export function getActiveTheme(now = new Date()): SeasonTheme {
  const today = mmdd(now)
  return themes.find(t => inRange(today, t.dateRange.start, t.dateRange.end)) ?? defaultTheme
}

export { defaultTheme }
