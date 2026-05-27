import { NextResponse } from 'next/server'

const SITE_URL = 'https://workshed.garden'

// Source of truth for RSS items. Add new Field Notes here as they publish.
const FIELD_NOTES = [
  {
    slug: 'artichokes-from-seed-week-3',
    title: 'Starting artichokes from seed, three weeks in',
    date: '2026-04-22',
    excerpt: 'They are alive. Reluctantly.',
    category: 'Field Notes',
  },
]

function rfc822(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00Z').toUTCString()
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const items = FIELD_NOTES
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((note) => `
    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${SITE_URL}/field/${note.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/field/${note.slug}</guid>
      <pubDate>${rfc822(note.date)}</pubDate>
      <description>${escapeXml(note.excerpt)}</description>
      <category>${escapeXml(note.category)}</category>
    </item>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Workshed</title>
    <link>${SITE_URL}</link>
    <description>Calculators and field notes for the obsessive gardener.</description>
    <language>en-us</language>
    <copyright>Workshed</copyright>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
