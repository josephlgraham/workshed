import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact · Workshed',
  description: 'Get in touch.',
}

export default function ContactPage() {
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
        <span>Contact</span>
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
        Contact
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
          For corrections to a calculator, questions about a method, or anything
          else. Email is the right way to reach me.
        </p>

        <p>
          <a
            href="mailto:josephlgraham@gmail.com"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.95rem',
              letterSpacing: '0.03em',
              color: 'var(--green)',
              textDecoration: 'underline',
              textDecorationColor: 'var(--rule)',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
            }}
          >
            josephlgraham@gmail.com
          </a>
        </p>

        <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
          I read everything but cannot promise a fast reply during the growing
          season.
        </p>
      </article>

    </div>
  )
}
