import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Colophon · Workshed',
  // Easter egg: don't surface this page in search results.
  robots: { index: false, follow: false },
}

export default function ColophonPage() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '5rem 2.5rem 4rem' }}>

      {/* The mark — big, the reason for the page */}
      <div
        style={{
          fontSize: 'clamp(3rem, 8vw, 4rem)',
          letterSpacing: '0.1em',
          marginBottom: '2.5rem',
          lineHeight: 1,
          textAlign: 'center',
        }}
        aria-label="Sunflower, hourglass, skull"
      >
        🌻⌛💀
      </div>

      <h1 className="ws-flourish" style={{
        fontWeight: 400,
        fontSize: 'clamp(2.4rem, 6vw, 3.4rem)',
        lineHeight: 1.1,
        letterSpacing: '0',
        color: 'var(--ink)',
        marginBottom: '0.5rem',
        textAlign: 'center',
      }}>
        Het is een mooie dag om te leven.
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        color: 'var(--ink-soft)',
        marginBottom: '3rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--rule)',
        textAlign: 'center',
      }}>
        &ldquo;It is a beautiful day to live.&rdquo;
      </p>

      {/* First movement — explaining the mark */}
      <article style={proseStyle}>
        <p>
          An old Dutch saying. The full thought is something like:{' '}
          <em style={{ fontStyle: 'italic' }}>
            it is a beautiful day to live, and someday it will not be.
          </em>
        </p>

        <p>
          The three marks at the top of this page are a quiet version of the
          same idea. The{' '}
          <em style={accentSun}>sun</em>. The{' '}
          <em style={accentHourglass}>hourglass</em>. The{' '}
          <em style={accentEnd}>end</em>.
        </p>

        <p>
          It&rsquo;s a reminder I keep for myself. The garden is the same: a
          thing that&rsquo;s alive, a thing that takes time, a thing that
          doesn&rsquo;t last. That&rsquo;s the whole point of tending it.
        </p>

        <p style={{ fontStyle: 'italic', color: 'var(--ink-muted)' }}>
          If you&rsquo;ve found your way here, you noticed. Welcome.
        </p>
      </article>

      {/* Quiet divider — the page exhales */}
      <hr style={{
        border: 'none',
        borderTop: '1px solid var(--rule)',
        margin: '4rem auto 2.75rem',
        width: '60px',
      }} />

      {/* The sticker */}
      <figure style={{ margin: '0 0 2rem' }}>
        <img
          src="/photos/we_all_die.png"
          alt="A sticker that reads &ldquo;we all die,&rdquo; photographed."
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto',
            margin: '0 auto',
            border: '1px solid var(--rule)',
            background: 'var(--card)',
          }}
        />
        <figcaption style={{
          marginTop: '0.875rem',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '0.88rem',
          lineHeight: 1.5,
          color: 'var(--ink-muted)',
          textAlign: 'center',
        }}>
          A sticker by Sammy Winston, AKA Gloomer. I took this photo a long time ago, and it has stayed with me since.
        </figcaption>
      </figure>


    </div>
  )
}

const proseStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: 'var(--ink-soft)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}

const accentBase: React.CSSProperties = {
  fontStyle: 'italic',
  fontWeight: 500,
}
const accentSun: React.CSSProperties       = { ...accentBase, color: 'var(--rust)' }
const accentHourglass: React.CSSProperties = { ...accentBase, color: 'var(--green)' }
const accentEnd: React.CSSProperties       = { ...accentBase, color: 'var(--rust)' }
