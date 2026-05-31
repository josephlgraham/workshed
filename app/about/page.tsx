import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About · Workshed',
  description: 'What Workshed is, why it exists, and how to follow it.',
}

export default function AboutPage() {
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
        <span>About</span>
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
        About
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
          Workshed is a gardening site organized around the three things you
          actually do out there: <a href="/plan" style={linkStyle}>Plan</a> what
          goes where, <a href="/build" style={linkStyle}>Build</a> the beds and
          water systems, and <a href="/grow" style={linkStyle}>Grow</a> what you
          put in the ground. Each section holds the calculators that fit it
          alongside the writing that goes with them.
        </p>

        <p>
          The calculators started because the same math kept coming up by hand.
          How much soil fills a raised bed, when to start seeds relative to last
          frost, how much mulch a set of beds actually needs. They are the ones I
          wanted to find and could not, so I built them. They are free, there are
          no ads in the way of the answers, and the math behind them is explained
          if you want to understand what is happening rather than just take the
          number.
        </p>

        <p>
          <a href="/field" style={linkStyle}>Field Notes</a> is the slower part
          of the site. Longer writing about what is working, what is not, and
          what the garden has taught through failure and repetition. The garden
          is real and working, and the notes are written close to when things
          happen.
        </p>

        <p>
          <a href="/gear" style={linkStyle}>Gear</a> is the tools and supplies I
          actually reach for, listed with the reason I use them. It is still
          coming together. Nothing lands there because someone paid for the slot,
          and if a thing broke or disappointed me I will say so.
        </p>

        <p>
          There is a <a href="/garden" style={linkStyle}>garden page</a> with
          current conditions and what is going on in the beds, updated as the
          season moves, and a recycling game called{' '}
          <a href="/games/sort-it.html" style={linkStyle}>Sort It!</a> when you want a break
          from the math.
        </p>

        <p>
          The intended way to follow this site is{' '}
          <a href="/feed.xml" style={linkStyle}>RSS</a>. The audience for this
          kind of site tends to be people who still read feeds, and that is
          who this is written for. If you want to subscribe, the feed is at{' '}
          <a href="/feed.xml" style={linkStyle}>workshed.garden/feed.xml</a>.
        </p>

        <p>
          Questions or corrections go to{' '}
          <a href="/contact" style={linkStyle}>the contact page</a>.
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
