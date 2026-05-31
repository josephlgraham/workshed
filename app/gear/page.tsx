import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gear',
  description: 'The tools and supplies I actually use. Recommended in context, never for the sake of a placement.',
}

export default function GearPage() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '3rem 2rem 5rem' }}>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 0.9,
        letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.5rem',
      }}>GEAR</h1>

      <article style={{
        fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: 1.75,
        color: 'var(--ink-soft)', display: 'flex', flexDirection: 'column', gap: '1.25rem',
      }}>
        <p>
          This page is still being built. The plan is simple: the actual tools and
          supplies I reach for, listed with the reason I use them. Nothing here
          because someone paid for the slot.
        </p>
        <p>
          When a piece of gear comes up in a build or a field note, it will get a
          spot here with an honest line about why it earned it. If something broke
          or disappointed me, I will say that too.
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.8rem',
          letterSpacing: '0.04em', color: 'var(--ink-muted)',
        }}>
          Coming together over the season. Check back, or follow along by{' '}
          <a href="/feed.xml" style={{ color: 'var(--green)', textDecoration: 'underline', textDecorationColor: 'var(--rule)', textUnderlineOffset: '2px' }}>RSS</a>.
        </p>
      </article>
    </div>
  )
}
