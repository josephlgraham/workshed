import type { Article } from '@/lib/types'

// How-to writing organized by bucket. Distinct from the chronological Field
// Notes journal (content lives in app/field). Phase 1: a small hand-listed set.
// `planned` entries render as un-linked cards so there are no dead links.
export const articles: Article[] = [
  {
    slug: 'ram-pumps',
    href: '/build/ram-pumps',
    title: 'Ram pumps, explained simply',
    blurb: 'Moving water uphill with no electricity. How the hydraulic ram actually works, and when it is worth building one.',
    bucket: 'build',
    status: 'planned',
    intents: ['move water uphill', 'pump without power', 'hydraulic ram', 'ram pump', 'water with no electricity'],
  },
  {
    slug: 'vertical-zucchini',
    href: '/grow/vertical-zucchini',
    title: 'Growing zucchini up, not out',
    blurb: 'Vertical zucchini saves space and stops the squash bugs cold. Plus when to cut the bottom leaves.',
    bucket: 'grow',
    status: 'planned',
    intents: ['grow zucchini', 'save space', 'vertical gardening', 'squash bugs', 'grow vertically'],
  },
  {
    slug: 'garden-pests',
    href: '/grow/garden-pests',
    title: 'Reading the early signs of a pest problem',
    blurb: 'By the time you see the damage, it is usually too late. What to look for in week one, before it spreads.',
    bucket: 'grow',
    status: 'planned',
    intents: ['garden pests', 'bugs on my plants', 'pest damage', 'what is eating my plants', 'squash vine borer'],
  },
]
