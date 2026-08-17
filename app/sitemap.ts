import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const SITE_URL = 'https://workshed.garden'

const STATIC_ROUTES = [
  '',
  '/about',
  '/build',
  '/colophon',
  '/contact',
  '/disclosure',
  '/field',
  '/garden',
  '/gear',
  '/grow',
  '/plan',
  '/privacy',
  '/tools',
  '/tools/compost-ratio',
  '/tools/frost-dates',
  '/tools/hugelkultur',
  '/tools/mulch',
  '/tools/rainwater',
  '/tools/seed-starting',
  '/tools/soil-volume',
  '/tools/square-foot',
  '/tools/worm-bin',
]

// Keep in sync with NOTES in app/field/[slug]/page.tsx
const FIELD_NOTE_SLUGS = ['workshed-has-a-facebook-page-now', 'a-ram-pump-for-the-stream']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/tools/') ? 0.8 : 0.6,
  }))
  const noteEntries: MetadataRoute.Sitemap = FIELD_NOTE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/field/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  return [...staticEntries, ...noteEntries]
}
