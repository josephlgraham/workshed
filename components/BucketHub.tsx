import Image from 'next/image'
import type { Bucket, Tool } from '@/lib/types'
import {
  getBucketMeta,
  getToolsByBucket,
  getArticlesByBucket,
  sortGame,
} from '@/lib/garden'
import WhimsyWord from '@/components/WhimsyWord'

const GRADIENTS: Record<string, string> = {
  water: 'radial-gradient(ellipse at 50% 30%, rgba(120,160,200,0.6) 0%, transparent 60%), linear-gradient(180deg, #5a7a90 0%, #3a5a70 50%, #1a3040 100%)',
  timing: 'radial-gradient(ellipse at 60% 50%, rgba(180,140,90,0.6) 0%, transparent 60%), linear-gradient(160deg, #8a6a3a 0%, #5a4528 50%, #2a1f10 100%)',
  soil: 'radial-gradient(ellipse at 40% 60%, rgba(140,100,60,0.7) 0%, transparent 60%), linear-gradient(160deg, #6a4a2a 0%, #3a2818 50%, #1a1208 100%)',
  planning: 'radial-gradient(ellipse at 50% 40%, rgba(100,140,80,0.7) 0%, transparent 60%), linear-gradient(160deg, #5a7a3a 0%, #2a4a18 50%, #102008 100%)',
  compost: 'radial-gradient(ellipse at 50% 50%, rgba(120,80,40,0.6) 0%, transparent 60%), linear-gradient(160deg, #4a3520 0%, #2a1f10 50%, #1a1208 100%)',
}

function statusBadge(status: Tool['status']) {
  if (status === 'live') return { label: 'Live', color: '#2c5530', bg: 'rgba(44,85,48,0.1)', border: 'rgba(44,85,48,0.25)' }
  if (status === 'soon') return { label: 'Soon', color: '#9a6a00', bg: 'rgba(217,148,16,0.1)', border: 'rgba(217,148,16,0.2)' }
  return { label: 'Planned', color: '#7a5a00', bg: 'rgba(217,148,16,0.07)', border: 'rgba(217,148,16,0.15)' }
}

function ToolCard({ tool }: { tool: Tool }) {
  const linked = tool.status === 'live'
  const badge = statusBadge(tool.status)
  const inner = (
    <>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/2', background: tool.photo ? '#2a3a2a' : GRADIENTS[tool.gradient ?? 'planning'] }}>
        {tool.photo && (
          <Image src={tool.photo} alt={tool.label} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
        )}
      </div>
      <div style={{ padding: '1.1rem 1.1rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: badge.color, background: badge.bg, border: `1px solid ${badge.border}`, padding: '0.15rem 0.45rem', borderRadius: 9999 }}>{badge.label}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.15, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{tool.label}</h3>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--ink-soft)', margin: 0 }}>{tool.blurb}</p>
      </div>
    </>
  )
  const style: React.CSSProperties = {
    background: 'var(--card)', textDecoration: 'none', color: 'var(--ink)',
    border: '1px solid var(--rule)', transition: 'all 0.25s', overflow: 'hidden',
    display: 'flex', flexDirection: 'column', opacity: linked ? 1 : 0.6,
  }
  return linked
    ? <a href={tool.href} style={style} className="ws-bucket-card">{inner}</a>
    : <div style={style}>{inner}</div>
}

export default function BucketHub({ bucket }: { bucket: Bucket }) {
  const meta = getBucketMeta(bucket)
  const liveTools = getToolsByBucket(bucket, 'live')
  const plannedTools = [...getToolsByBucket(bucket, 'soon'), ...getToolsByBucket(bucket, 'horizon')]
  const articles = getArticlesByBucket(bucket)

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '3rem 2.5rem 5rem', position: 'relative', zIndex: 1, ['--accent']: meta.accent } as React.CSSProperties}>

      {/* ── Bucket header ── */}
      <header style={{ marginBottom: '3.5rem', borderBottom: '2px solid var(--ink)', paddingBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem', flexWrap: 'wrap' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.75rem, 8vw, 5.5rem)', lineHeight: 0.9,
            letterSpacing: '-0.02em', color: 'var(--ink)',
          }}><WhimsyWord text={meta.word} accent={meta.accent} /></h1>
          <span style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: meta.accent,
          }}>{meta.tagline}</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: '1.1rem', lineHeight: 1.6,
          color: 'var(--ink-soft)', maxWidth: '60ch', marginTop: '1rem',
        }}>{meta.blurb}</p>
      </header>

      {/* ── Live tools ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <SectionHead title="Tools" count={liveTools.length} unit="tool" accent={meta.accent} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="ws-bucket-grid">
          {liveTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* ── Featured game (Grow only) — sits under the tools ── */}
      {bucket === 'grow' && (
        <a href={sortGame.href} className="ws-bucket-featured" style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: '0.6rem', padding: '2rem 2.25rem', marginBottom: (plannedTools.length || articles.length) ? '4rem' : 0,
          background: 'var(--paper-tint)', border: '2px solid var(--sunflower)',
          textDecoration: 'none', color: 'var(--ink)',
          transition: 'all 0.25s',
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)' }}>Featured · Play</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', lineHeight: 1.1 }}>{sortGame.title}</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--ink-soft)', maxWidth: '60ch' }}>{sortGame.blurb}</span>
        </a>
      )}

      {/* ── On the way (planned, grayed out) ── */}
      {plannedTools.length > 0 && (
        <section style={{ marginBottom: articles.length ? '4rem' : 0 }}>
          <SectionHead title="On the way" count={plannedTools.length} unit="tool" accent={meta.accent} />
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.92rem', lineHeight: 1.5, color: 'var(--ink-muted)', marginTop: '-0.75rem', marginBottom: '1.5rem' }}>
            Not live yet, but real and on the way. Each one is photographed, not vaporware.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="ws-bucket-grid">
            {plannedTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </section>
      )}

      {/* ── Articles ── */}
      {articles.length > 0 && (
        <section>
          <SectionHead title="Reading" count={articles.length} unit="piece" accent={meta.accent} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {articles.map((a) => {
              const linked = a.status === 'live'
              const body = (
                <>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: linked ? meta.accent : 'var(--ink-muted)', marginBottom: '0.5rem' }}>
                    {linked ? 'Read' : 'Planned'}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.3rem', lineHeight: 1.2, color: 'var(--ink)', marginBottom: '0.35rem', letterSpacing: '-0.005em' }} className="ws-bucket-article-h">{a.title}</h3>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--ink-soft)', maxWidth: '65ch' }}>{a.blurb}</p>
                </>
              )
              const rowStyle: React.CSSProperties = { display: 'block', padding: '1.5rem 0', borderBottom: '1px solid var(--rule)', textDecoration: 'none', color: 'inherit', opacity: linked ? 1 : 0.75 }
              return linked
                ? <a key={a.slug} href={a.href} style={rowStyle} className="ws-bucket-article">{body}</a>
                : <div key={a.slug} style={rowStyle}>{body}</div>
            })}
          </div>
        </section>
      )}

      <style>{`
        .ws-bucket-card img { transition: transform 0.5s var(--ease-default); }
        .ws-bucket-card:hover { border-color: var(--accent, var(--green)) !important; transform: translateY(-2px); box-shadow: 0 8px 20px var(--shadow); }
        .ws-bucket-card:hover img { transform: scale(1.045); }
        .ws-bucket-featured:hover { transform: translateY(-2px); box-shadow: 0 10px 24px var(--shadow); }
        .ws-bucket-article:hover .ws-bucket-article-h { color: var(--accent, var(--green)); }
        @media (max-width: 900px) { .ws-bucket-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .ws-bucket-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

function SectionHead({ title, count, unit, accent }: { title: string; count: number; unit: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--rule)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.4rem', letterSpacing: '-0.01em', color: 'var(--ink)' }}>
        <span style={{ color: accent }}>·</span> {title}
      </h2>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
        {count} {count === 1 ? unit : `${unit}s`}
      </span>
    </div>
  )
}
