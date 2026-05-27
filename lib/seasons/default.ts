import type { SeasonTheme } from './index'

export const defaultTheme: SeasonTheme = {
  id: 'default',
  label: 'The Garden',
  dateRange: { start: '01-01', end: '12-31' },
  accent: '#a855f7',
  glow: 'rgba(168,85,247,0.35)',
  ornament: 'leaf',
  storyBeatPool: 'arc-01',
  homepageNote: null,
}
