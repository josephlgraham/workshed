import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclosure — Workshed',
  description: 'Affiliate and editorial disclosure for Workshed.',
}

export default function DisclosurePage() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

      <nav style={{
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        marginBottom: '2rem',
      }}>
        <a href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Workshed</a>
        <span style={{ margin: '0 0.5rem' }}>·</span>
        <span>Disclosure</span>
      </nav>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        color: 'var(--ink)',
        marginBottom: '2.5rem',
      }}>
        Disclosure
      </h1>

      <article style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        lineHeight: 1.75,
        color: 'var(--ink-soft)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        <p>
          Some links on this site are affiliate links. If you click one and
          make a purchase, I may receive a small commission at no added cost to
          you. Affiliate relationships do not influence what gets recommended or
          how tools and methods are described.
        </p>

        <p>
          The calculators produce math. The editorial sections describe what
          works in practice. Neither is shaped by who sells what. If something
          is worth buying, it gets a link. If it is not, it does not appear on
          this site at all.
        </p>

        <p>
          This site is a participant in the Amazon Services LLC Associates
          Program, an affiliate advertising program designed to provide a means
          to earn fees by linking to Amazon.com and affiliated sites.
        </p>

        <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)' }}>
          Questions about a specific link or recommendation can go to the{' '}
          <a href="/contact" style={linkStyle}>contact page</a>.
        </p>
      </article>

    </div>
  )
}

const linkStyle: React.CSSProperties = {
  color: 'var(--green)',
  textDecoration: 'underline',
  textDecorationColor: 'var(--rule)',
  textDecorationThickness: '1px',
  textUnderlineOffset: '2px',
}
