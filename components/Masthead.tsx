import Link from 'next/link'
import { getActiveTheme } from '@/lib/seasons'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { href: '/',       label: 'Home'        },
  { href: '/garden', label: 'Garden'      },
  { href: '/tools',  label: 'Tools'       },
  { href: '/field',  label: 'Field Notes' },
]

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Masthead() {
  const theme = getActiveTheme()
  const dateStr = getFormattedDate()

  return (
    <header style={{ borderBottom: '1px solid var(--rule)', position: 'relative', zIndex: 10 }}>
      {/* Topbar */}
      <div className="ws-topbar" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0.75rem 2.5rem',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
      }}>
        <div>
          <ThemeToggle />
        </div>
        <div style={{ fontFeatureSettings: '"tnum" 1' }}>
          {dateStr} · {theme.label}
        </div>
        <div />{/* right slot intentionally empty — weather lives on /garden, not in chrome */}
      </div>

      {/* Wordmark */}
      <div style={{ textAlign: 'center', padding: '1.75rem 2.5rem 0' }}>
        <Link href="/" style={{ textDecoration: 'none' }} aria-label="Workshed home">
          <div className="ws-wordmark" aria-hidden="true" style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(3.25rem, 9.5vw, 6.5rem)',
            lineHeight: 0.85,
            color: 'var(--ink)',
            display: 'inline-block',
          }}>
            {'WORKSHED'.split('').map((ch, i) => (
              <span
                key={i}
                className={`ws-letter ws-letter-${i + 1}`}
                style={{ display: 'inline-block', letterSpacing: i < 7 ? '-0.035em' : '0' }}
              >
                {ch}
              </span>
            ))}
          </div>
        </Link>

        {/* Accent dash */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0.6rem 0 0.5rem' }}>
          <span className="ws-masthead-dash" style={{ width: 240, height: 4, borderRadius: 2, background: 'var(--rust)', display: 'block' }} />
        </div>

        <div className="ws-tagline" style={{
          fontFamily: 'var(--font-flourish)',
          fontWeight: 400,
          fontSize: '2.4rem',
          lineHeight: 1,
          color: 'var(--ink-soft)',
          letterSpacing: '0',
        }}>
          Let&rsquo;s plan together.
        </div>
      </div>

      {/* Primary nav */}
      <nav aria-label="Primary" style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        padding: '1.25rem 2.5rem 1.5rem',
        borderBottom: '2px solid var(--ink)',
      }}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href as '/' | '/garden' | '/tools' | '/field'} style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
            position: 'relative',
            padding: '0.25rem 0',
          }} className="ws-nav-link">
            {label}
          </Link>
        ))}
      </nav>

      <style>{`
        .ws-nav-link:hover { color: var(--green) !important; }
      `}</style>
    </header>
  )
}
