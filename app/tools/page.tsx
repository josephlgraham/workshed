import Image from 'next/image'
import type { Tool, Bucket } from '@/lib/types'
import { getFeaturedTool, getToolsByStatus } from '@/lib/garden'

export const metadata = { title: 'Tools · Workshed' }

/* Each tool hovers to its own bucket's accent, for cross-site consistency. */
const BUCKET_ACCENT: Record<Bucket, string> = {
  plan: 'var(--sunflower)',
  build: 'var(--rust)',
  grow: 'var(--green)',
}

/* ── Gradient palette matching index.html ─────────────────────────────── */
const GRADIENTS: Record<string, string> = {
  water: 'radial-gradient(ellipse at 50% 30%, rgba(120,160,200,0.6) 0%, transparent 60%), linear-gradient(180deg, #5a7a90 0%, #3a5a70 50%, #1a3040 100%)',
  timing: 'radial-gradient(ellipse at 60% 50%, rgba(180,140,90,0.6) 0%, transparent 60%), linear-gradient(160deg, #8a6a3a 0%, #5a4528 50%, #2a1f10 100%)',
  soil: 'radial-gradient(ellipse at 40% 60%, rgba(140,100,60,0.7) 0%, transparent 60%), linear-gradient(160deg, #6a4a2a 0%, #3a2818 50%, #1a1208 100%)',
  planning: 'radial-gradient(ellipse at 50% 40%, rgba(100,140,80,0.7) 0%, transparent 60%), linear-gradient(160deg, #5a7a3a 0%, #2a4a18 50%, #102008 100%)',
  compost: 'radial-gradient(ellipse at 50% 50%, rgba(120,80,40,0.6) 0%, transparent 60%), linear-gradient(160deg, #4a3520 0%, #2a1f10 50%, #1a1208 100%)',
}

function CardImg({ tool, minHeight, aspectRatio = '3/2' }: { tool: Tool; minHeight?: number; aspectRatio?: string }) {
  const base: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    background: '#2a3a2a',
    minHeight: minHeight,
    aspectRatio: minHeight ? undefined : aspectRatio,
  }

  if (tool.photo) {
    return (
      <div style={base}>
        <Image
          src={tool.photo}
          alt={tool.label}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
    )
  }
  return <div style={{ ...base, background: GRADIENTS[tool.gradient ?? 'planning'] }} />
}

function SectionHead({ title, count }: { title: string; count: number }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: '1rem',
      marginBottom: '1.5rem', paddingBottom: '0.75rem',
      borderBottom: '1px solid var(--rule)',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '1.5rem',
        letterSpacing: '-0.01em', color: 'var(--ink)', fontVariationSettings: '"opsz" 96',
      }}>{title}</h2>
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)',
      }}>{count} {count === 1 ? 'tool' : 'tools'}</span>
    </div>
  )
}

function ToolCard({ tool, dimmed = false }: { tool: Tool; dimmed?: boolean }) {
  const isLinked = tool.status === 'live'
  const badge =
    tool.status === 'live'   ? { label: 'Live',    color: '#2c5530',  bg: 'rgba(44,85,48,0.1)',    border: 'rgba(44,85,48,0.25)' }
    : tool.status === 'soon' ? { label: 'Soon',    color: '#9a6a00',  bg: 'rgba(217,148,16,0.1)',  border: 'rgba(217,148,16,0.2)' }
    :                          { label: 'Planned', color: '#7a5a00',  bg: 'rgba(217,148,16,0.07)', border: 'rgba(217,148,16,0.15)' }

  const inner = (
    <>
      <CardImg tool={tool} />
      <div style={{ padding: '1.25rem 1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '0.25rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: badge.color, background: badge.bg,
            border: `1px solid ${badge.border}`, padding: '0.15rem 0.45rem', borderRadius: 9999,
          }}>{badge.label}</span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '1.2rem',
          lineHeight: 1.15, color: 'var(--ink)', letterSpacing: '-0.01em',
        }}>{tool.label}</h3>
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: '0.9rem', lineHeight: 1.5,
          color: 'var(--ink-soft)', margin: 0,
        }}>{tool.blurb}</p>
      </div>
    </>
  )

  const cardStyle = {
    background: 'var(--card)', textDecoration: 'none', color: 'var(--ink)',
    border: '1px solid var(--rule)', transition: 'all 0.25s', overflow: 'hidden',
    display: 'flex', flexDirection: 'column', opacity: dimmed ? 0.55 : 1,
    cursor: isLinked ? 'pointer' : 'default',
    ['--accent']: BUCKET_ACCENT[tool.bucket],
  } as React.CSSProperties

  if (isLinked) {
    return <a href={tool.href} style={cardStyle} className="ws-tool-card-live">{inner}</a>
  }
  return <div style={cardStyle}>{inner}</div>
}

export default function ToolsPage() {
  const featured = getFeaturedTool()
  const live = getToolsByStatus('live').filter((t) => !t.featured)
  const soon = getToolsByStatus('soon')
  const horizon = getToolsByStatus('horizon')
  const liveCount = live.length + (featured ? 1 : 0)

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '3rem 2.5rem 5rem', position: 'relative', zIndex: 1 }}>

      {/* Featured tool */}
      {featured && (
        <div style={{ marginBottom: '4rem' }}>
          <a href={featured.href} style={{
            display: 'grid', gridTemplateColumns: '1.3fr 1fr',
            background: 'var(--card)', textDecoration: 'none', color: 'var(--ink)',
            border: '1px solid var(--rule)', transition: 'all 0.25s', overflow: 'hidden',
            ['--accent']: BUCKET_ACCENT[featured.bucket],
          } as React.CSSProperties} className="ws-featured">
            <CardImg tool={featured} minHeight={320} />
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)',
              }}>Most Used · Water</span>
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '2rem',
                lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--ink)',
                fontVariationSettings: '"opsz" 96',
              }}>{featured.label}</h2>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1rem', lineHeight: 1.55,
                color: 'var(--ink-soft)', flex: 1,
              }}>{featured.blurb}</p>
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              }}>Open the calculator →</span>
            </div>
          </a>
        </div>
      )}

      {/* Headline */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem',
        alignItems: 'end', marginBottom: '2.5rem', paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--rule)',
      }} className="ws-tools-head">
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400,
          fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', lineHeight: 1.0,
          letterSpacing: '-0.025em', color: 'var(--ink)', fontVariationSettings: '"opsz" 144',
        }}>
          Tools for your garden that{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--green)' }}>work</em>.
        </h1>
        <div>
          <span style={{
            display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
            fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--green)', marginBottom: '0.75rem', padding: '0.25rem 0.5rem',
            background: 'var(--paper-tint)', borderLeft: '2px solid var(--green)',
          }}>Tool Shed</span>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: '1rem', lineHeight: 1.55,
            color: 'var(--ink-soft)', margin: 0,
          }}>Calculators and planners I built because I needed them. Real numbers, clear answers, no fluff.</p>
        </div>
      </div>

      {/* Live now */}
      <section style={{ marginBottom: '3.5rem' }}>
        <SectionHead title="Live now" count={liveCount} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="ws-tools-grid">
          {live.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </section>

      {/* Coming soon */}
      <section style={{ marginBottom: '3.5rem' }}>
        <SectionHead title="Coming soon" count={soon.length} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="ws-tools-grid">
          {soon.map((tool) => <ToolCard key={tool.slug} tool={tool} dimmed />)}
        </div>
      </section>

      {/* On the horizon */}
      <section>
        <SectionHead title="On the horizon" count={horizon.length} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="ws-tools-grid">
          {horizon.map((tool) => <ToolCard key={tool.slug} tool={tool} dimmed />)}
        </div>
      </section>

      <style>{`
        .ws-tool-card-live:hover { border-color: var(--accent, var(--green)) !important; transform: translateY(-2px); box-shadow: 0 8px 20px var(--shadow); }
        .ws-featured:hover { border-color: var(--accent, var(--green)) !important; transform: translateY(-2px); box-shadow: 0 12px 28px var(--shadow); }
        @media (max-width: 900px) {
          .ws-tools-head { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .ws-tools-grid { grid-template-columns: 1fr 1fr !important; }
          .ws-featured { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) { .ws-tools-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
