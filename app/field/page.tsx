export const metadata = { title: 'Field Notes · Workshed' }

type SmallTagKey = 'growing' | 'watching' | 'pests' | 'reading' | 'building'
const SMALL_TAG_COLORS: Record<SmallTagKey, string> = {
  growing: 'var(--green)',
  watching: 'var(--sunflower)',
  pests: 'var(--rust)',
  reading: 'var(--ink-muted)',
  building: 'var(--rust)',
}

// Phase 1: single hardcoded entry. Phase 2: fetch from MDX files / Supabase.
const NOTES: Array<{ slug: string; title: string; date: string; excerpt: string; tag: SmallTagKey; tagLabel: string }> = [
  {
    slug: 'workshed-has-a-facebook-page-now',
    title: 'Workshed has a Facebook page now',
    date: '2026-08-16',
    excerpt: 'A place to put the other half of it. What you’re growing, what worked, what didn’t.',
    tag: 'building',
    tagLabel: 'Announcement',
  },
  {
    slug: 'a-ram-pump-for-the-stream',
    title: 'A ram pump for the stream',
    date: '2026-05-31',
    excerpt: 'There is a stream below the house and no power within reach of it. A hydraulic ram does not need any.',
    tag: 'building',
    tagLabel: 'Building',
  },
]

export default function FieldPage() {
  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '3rem 2.5rem 5rem' }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '2.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--rule)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          letterSpacing: '-0.015em',
          color: 'var(--ink)',
          fontVariationSettings: '"opsz" 96',
        }}>Field Notes</h2>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
        }}>
          {NOTES.length} {NOTES.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {NOTES.map((note) => (
          <a key={note.slug} href={`/field/${note.slug}`} style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
            padding: '1.5rem 0',
            borderBottom: '1px solid var(--rule)',
          }} className="ws-note-small">
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              color: SMALL_TAG_COLORS[note.tag],
            }}>{note.tagLabel}</div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '1.35rem',
              lineHeight: 1.25,
              color: 'var(--ink)',
              marginBottom: '0.4rem',
              letterSpacing: '-0.005em',
            }} className="ws-note-small-h">{note.title}</h3>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              color: 'var(--ink-soft)',
              marginBottom: '0.5rem',
            }}>{note.excerpt}</p>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}>
              {new Date(note.date + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </a>
        ))}
      </div>

      <style>{`.ws-note-small:hover .ws-note-small-h { color: var(--green); }`}</style>
    </div>
  )
}
