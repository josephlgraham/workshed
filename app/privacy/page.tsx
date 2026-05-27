import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy — Workshed',
  description: 'Privacy policy for Workshed.',
}

export default function PrivacyPage() {
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
        <span>Privacy</span>
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
        Privacy
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
          This site does not collect personal information. The calculators run
          entirely in your browser. No inputs you enter are sent to a server or
          stored anywhere.
        </p>

        <p>
          There is no account system, no newsletter signup, and no email
          capture. The only data this site stores in your browser is a theme
          preference (light or dark) and whether you have seen the intro
          animation, both in <code style={codeStyle}>localStorage</code>, both
          cleared when you clear your browser data.
        </p>

        <p>
          This site may use basic analytics to understand traffic (page views and referrer information). No personally identifiable information is
          collected or stored. No data is sold or shared with third parties for
          advertising.
        </p>

        <p>
          If you contact me directly, your email address is used only to reply
          to your message and is not added to any list.
        </p>

        <p style={{ fontSize: '0.88rem', color: 'var(--ink-muted)' }}>
          Questions can go to the{' '}
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

const codeStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: '0.88em',
  background: 'var(--paper-tint)',
  border: '1px solid var(--rule)',
  borderRadius: 3,
  padding: '0.1em 0.35em',
  color: 'var(--ink)',
}
