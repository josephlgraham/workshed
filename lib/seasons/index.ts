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

export type Hemisphere = 'north' | 'south'

function shiftMonths(d: Date, months: number): Date {
  const r = new Date(d)
  r.setMonth(r.getMonth() + months)
  return r
}

export function getActiveTheme(now = new Date(), hemisphere: Hemisphere = 'north'): SeasonTheme {
  const effective = hemisphere === 'south' ? shiftMonths(now, 6) : now
  const today = mmdd(effective)
  return themes.find(t => inRange(today, t.dateRange.start, t.dateRange.end)) ?? defaultTheme
}

// Timezone prefixes covering the populated Southern Hemisphere. Equatorial and
// ambiguous zones intentionally fall through to 'north' — the seasonal swing
// near the equator is small enough that getting it wrong is harmless.
const SOUTHERN_TZ_PREFIXES = [
  'Australia/',
  'Pacific/Auckland', 'Pacific/Chatham', 'Pacific/Norfolk',
  'Pacific/Fiji', 'Pacific/Tongatapu', 'Pacific/Apia', 'Pacific/Noumea',
  'Africa/Johannesburg', 'Africa/Maputo', 'Africa/Windhoek',
  'Africa/Maseru', 'Africa/Mbabane', 'Africa/Gaborone',
  'Africa/Harare', 'Africa/Lusaka', 'Africa/Antananarivo',
  'America/Argentina/', 'America/Buenos_Aires',
  'America/Sao_Paulo', 'America/Santiago', 'America/Punta_Arenas',
  'America/Montevideo', 'America/Asuncion', 'America/La_Paz',
  'America/Campo_Grande', 'America/Cuiaba', 'America/Bahia',
  'America/Recife', 'America/Fortaleza', 'America/Maceio',
  'Indian/Mauritius', 'Indian/Reunion',
  'Antarctica/',
]

export function detectHemisphere(): Hemisphere {
  if (typeof window === 'undefined') return 'north'
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    return SOUTHERN_TZ_PREFIXES.some(p => tz.startsWith(p)) ? 'south' : 'north'
  } catch {
    return 'north'
  }
}

export { defaultTheme }
