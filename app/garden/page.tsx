import { getSeasonalTasks } from '@/lib/garden'

export const metadata = { title: 'Garden · Workshed' }

export default function GardenPage() {
  const season = getSeasonalTasks()

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: '3rem 2.5rem 5rem' }}>

      {/* Page header */}
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
        }}>The Garden</h2>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
        }}>{season.label}</span>
      </div>

      {/* Primary section: What I'm doing now */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--green)',
          marginBottom: '1rem',
        }}>What I&rsquo;m doing now</h3>

        {season.intro && (
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            lineHeight: 1.55,
            color: 'var(--ink-soft)',
            marginBottom: '2rem',
            maxWidth: 640,
          }}>
            {season.intro}
          </p>
        )}

        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {season.tasks.map((t, i) => (
            <li
              key={i}
              style={{
                paddingTop: '1.25rem',
                paddingBottom: '1.25rem',
                borderTop: i === 0 ? '2px solid var(--ink)' : '1px solid var(--rule)',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontSize: '1.1rem',
                lineHeight: 1.35,
                color: 'var(--ink)',
                letterSpacing: '-0.005em',
                marginBottom: t.note ? '0.4rem' : 0,
              }}>{t.task}</div>
              {t.note && (
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.95rem',
                  lineHeight: 1.55,
                  color: 'var(--ink-soft)',
                  maxWidth: 640,
                }}>{t.note}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}
