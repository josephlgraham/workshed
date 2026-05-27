import type { SiteData } from '@/lib/types'

// Phase 1: all hardcoded. Swap implementations in lib/garden.ts when live data arrives.
const data: SiteData = {
  conditions: {
    tempF: 72,
    soilPct: 42,
    windMph: 6,
    uvIndex: 7,
    uvLabel: 'high',
    narration: 'The soil is thirsty. Hat weather. The basil approves.',
  },

  recap: {
    headline: "It's been a still week.",
    body: `Wind hasn't bothered to show up since Sunday. The soil is <em>holding</em> on what fell last Wednesday, but it won't last past the weekend if the sky keeps acting smug. The basil is up in the brick circle. The artichokes are reluctant. Three peppers have tiny flowers, which is either a brag or a threat.`,
    days: 7,
    rainInches: 0.4,
    avgTempF: 71,
    dayLabel: 'posted Tuesday',
  },

  poll: {
    question: 'What climbs the tripod trellis?',
    totalVotes: 142,
    closes: 'closes Sunday',
    options: [
      { emoji: '🫘', label: 'Scarlet runner', pct: 48 },
      { emoji: '🌺', label: 'Sweet peas', pct: 27 },
      { emoji: '🥒', label: 'Lemon cucumbers', pct: 15 },
      { emoji: '🎃', label: 'Mini pumpkins', pct: 10 },
    ],
  },

  tools: [
    { emoji: '🌱', label: 'Soil volume', href: '/tools/soil-volume' },
    { emoji: '🌧', label: 'Rainwater', href: '/tools/rainwater' },
    { emoji: '❄️', label: 'Frost protection', href: '/tools/frost-dates' },
    { emoji: '🌱', label: 'Seed starting calendar', href: '/tools/seed-starting' },
    { emoji: '🪵', label: 'Mulch calculator', href: '/tools/mulch' },
    { emoji: '📐', label: 'Square foot planner', href: '/tools/square-foot' },
  ],

  latestNote: {
    slug: 'artichokes-from-seed-week-3',
    title: 'Starting artichokes from seed, three weeks in',
    date: '2026-04-22',
  },
  totalNotes: 12,

  marqueeItems: [
    { emoji: '🌅', text: 'Morning' },
    { emoji: '🌡', text: '72°F, clear' },
    { emoji: '💧', text: 'Soil at 42%' },
    { emoji: '🍅', text: '8 San Marzanos in the ground' },
    { emoji: '🌿', text: 'Basil up in the brick circle' },
    { emoji: '🗳', text: 'Greenhouse vote: tripod trellis' },
    { emoji: '🌱', text: 'Artichokes, week 3' },
  ],
}

export default data
