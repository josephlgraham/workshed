import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ShareButton from '@/components/ShareButton'

// Add new notes here as they publish. Matches the slugs in /field/page.tsx and feed.xml.
const NOTES: Record<string, {
  title: string
  date: string
  tag: string
  tagLabel: string
  body: React.ReactNode
}> = {
  'artichokes-from-seed-week-3': {
    title: 'Starting artichokes from seed, three weeks in',
    date: '2026-04-22',
    tag: 'growing',
    tagLabel: "What's Growing",
    body: (
      <>
        <p>
          Three weeks since the artichoke seeds went into the flat. Seven of
          the twelve are up. The other five may still be thinking about it, or
          they are not coming. Either way is fine. Seven plants is more than
          enough for the space.
        </p>
        <p>
          They are alive. Reluctantly. The seedlings are at the stage where
          they look like something went wrong even when nothing did. Pale,
          slightly stretched, one true leaf each. Normal for this point in the
          process. Artichokes germinate slowly and grow slowly and do not hurry
          for anyone.
        </p>
        <p>
          Temperature has been the main variable. The heat mat is holding the
          flat at around 72 degrees overnight, which is close to the lower end
          of the ideal range. Daytime temps under the lights get warmer. The
          seedlings seem to prefer the stability over the warmth. Every time
          the temperature has swung more than ten degrees in a day, growth
          slows visibly for two or three days after.
        </p>
        <p>
          Next milestone is the second true leaf, which should trigger enough
          root development to justify moving to individual cells. Until then,
          the flat stays put. Artichokes resent being disturbed before they are
          ready, and there is no benefit to rushing a plant that is already
          taking its time.
        </p>
      </>
    ),
  },
}

const TAG_COLORS: Record<string, string> = {
  growing:  'var(--green)',
  watching: 'var(--sunflower)',
  pests:    'var(--rust)',
  reading:  'var(--ink-muted)',
}

export function generateStaticParams() {
  return Object.keys(NOTES).map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = NOTES[slug]
  if (!note) return { title: 'Not Found · Workshed' }
  return {
    title: `${note.title} · Workshed`,
    description: note.title,
  }
}

export default async function FieldNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = NOTES[slug]
  if (!note) notFound()

  const dateFormatted = new Date(note.date + 'T12:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
      <nav style={{
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
      }}>
        <a href="/field" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Field Notes</a>
        <span>·</span>
        <span style={{ color: TAG_COLORS[note.tag] ?? 'var(--ink-muted)' }}>{note.tagLabel}</span>
      </nav>
      <ShareButton title={`${note.title} · Workshed`} />
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--ink)',
        marginBottom: '1rem',
      }}>
        {note.title}
      </h1>

      <div style={{
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.68rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--rule)',
      }}>
        {dateFormatted}
      </div>

      <article style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        lineHeight: 1.8,
        color: 'var(--ink-soft)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        {note.body}
      </article>

      <div style={{
        marginTop: '3rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--rule)',
      }}>
        <a href="/field" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          color: 'var(--ink-muted)',
          textDecoration: 'none',
        }}>
          &larr; All field notes
        </a>
      </div>

    </div>
  )
}
