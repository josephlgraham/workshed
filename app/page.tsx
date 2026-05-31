import Image from 'next/image'
import type { Bucket, Tool } from '@/lib/types'
import { BUCKETS, getToolsByBucket } from '@/lib/garden'
import IntentSearch from '@/components/IntentSearch'
import WhimsyWord from '@/components/WhimsyWord'
import SortItCallout from '@/components/SortItCallout'

export const metadata = { title: "Workshed · Plan, build, grow." }

const GRADIENTS: Record<string, string> = {
  water: 'radial-gradient(ellipse at 50% 30%, rgba(120,160,200,0.6) 0%, transparent 60%), linear-gradient(180deg, #5a7a90 0%, #3a5a70 50%, #1a3040 100%)',
  timing: 'radial-gradient(ellipse at 60% 50%, rgba(180,140,90,0.6) 0%, transparent 60%), linear-gradient(160deg, #8a6a3a 0%, #5a4528 50%, #2a1f10 100%)',
  soil: 'radial-gradient(ellipse at 40% 60%, rgba(140,100,60,0.7) 0%, transparent 60%), linear-gradient(160deg, #6a4a2a 0%, #3a2818 50%, #1a1208 100%)',
  planning: 'radial-gradient(ellipse at 50% 40%, rgba(100,140,80,0.7) 0%, transparent 60%), linear-gradient(160deg, #5a7a3a 0%, #2a4a18 50%, #102008 100%)',
  compost: 'radial-gradient(ellipse at 50% 50%, rgba(120,80,40,0.6) 0%, transparent 60%), linear-gradient(160deg, #4a3520 0%, #2a1f10 50%, #1a1208 100%)',
}

/** Up to three tools for a bucket snippet — live first, then the rest. */
function snippetTools(bucket: Bucket): Tool[] {
  const all = getToolsByBucket(bucket)
  const live = all.filter((t) => t.status === 'live')
  const rest = all.filter((t) => t.status !== 'live')
  return [...live, ...rest].slice(0, 3)
}

function SnippetCard({ tool, priority }: { tool: Tool; priority?: boolean }) {
  const linked = tool.status === 'live'
  const inner = (
    <>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/2', background: tool.photo ? '#2a3a2a' : GRADIENTS[tool.gradient ?? 'planning'] }}>
        {tool.photo && <Image src={tool.photo} alt={tool.label} fill priority={priority} sizes="(max-width: 600px) 100vw, 33vw" style={{ objectFit: 'cover' }} />}
      </div>
      <div style={{ padding: '1rem 1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.15, color: 'var(--ink)', letterSpacing: '-0.01em', textWrap: 'pretty' }}>{tool.label}</h3>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--ink-soft)', margin: 0, textWrap: 'pretty' }}>{tool.blurb}</p>
      </div>
    </>
  )
  const style: React.CSSProperties = {
    background: 'var(--card)', textDecoration: 'none', color: 'var(--ink)',
    border: '1px solid var(--rule)', transition: 'all 0.25s', overflow: 'hidden',
    display: 'flex', flexDirection: 'column', opacity: linked ? 1 : 0.6,
  }
  return linked
    ? <a href={tool.href} style={style} className="ws-home-card">{inner}</a>
    : <div style={style}>{inner}</div>
}

export default function HomePage() {
  return (
    <>
      {/* ============ INTENT SEARCH HERO ============ */}
      <section style={{ maxWidth: 1300, margin: '0 auto', padding: '3.5rem 2.5rem 2.5rem', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 400,
          fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', lineHeight: 1.05,
          letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '0.6rem',
        }}>
          Whatever you&rsquo;re trying to do out there, there&rsquo;s probably a{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--green)' }}>tool</em> for it.
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)', fontSize: '1rem', lineHeight: 1.55,
          color: 'var(--ink-soft)', maxWidth: '52ch', margin: '0 auto 2rem',
        }}>
          Plan it, build it, grow it. Tell me what you&rsquo;re after and I&rsquo;ll point you at the right calculator or write-up.
        </p>
        <IntentSearch />
      </section>

      {/* ============ PLAN / BUILD / GROW SNIPPETS ============ */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '1.5rem 2.5rem 2rem' }}>
        {BUCKETS.map((b, bIndex) => {
          const tools = snippetTools(b.id)
          return (
            <section key={b.id} style={{ marginBottom: '4rem', ['--accent']: b.accent } as React.CSSProperties}>
              <div style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem',
                paddingBottom: '1rem', borderBottom: `2px solid ${b.accent}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={`/${b.id}`} style={{ textDecoration: 'none' }}>
                    <h2 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800,
                      fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 0.9,
                      letterSpacing: '-0.02em', color: 'var(--ink)',
                    }}><WhimsyWord text={b.word} accent={b.accent} /></h2>
                  </a>
                  <span style={{
                    fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                    fontSize: '1.1rem', color: b.accent,
                  }}>{b.tagline}</span>
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1rem', lineHeight: 1.55,
                color: 'var(--ink-soft)', maxWidth: '60ch', marginBottom: '1.75rem', textWrap: 'pretty',
              }}>{b.blurb}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="ws-home-grid">
                {tools.map((t, tIndex) => <SnippetCard key={t.slug} tool={t} priority={bIndex === 0 && tIndex === 0} />)}
              </div>
            </section>
          )
        })}
      </div>

      {/* ============ GAME CALLOUT ============ */}
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 2.5rem 4.5rem' }}>
        <SortItCallout />
      </div>

      {/* ============ PHOTO BREAK ============ */}
      <section style={{ background: '#0a0907', color: '#f4f1ea', padding: '5rem 2.5rem' }} className="ws-photo-break">
        <div style={{
          maxWidth: 1300, margin: '0 auto', display: 'grid',
          gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center',
        }} className="ws-photo-break-inner">
          <div style={{ aspectRatio: '4/5', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            <Image src="/photos/sunflower.jpg" alt="Sunflower" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rust)', marginBottom: '1.5rem' }}>From the Garden · May</div>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              lineHeight: 1.15, letterSpacing: '-0.015em', color: '#f4f1ea', marginBottom: '1.5rem',
            }}>
              The bean trellis <em style={{ fontStyle: 'italic', fontWeight: 300 }}>leans</em>, and so does the gardener.
            </h2>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '0.03em', color: 'rgba(244, 241, 234, 0.7)', lineHeight: 1.6 }}>
              A sunflower that came up where I didn&rsquo;t plant anything. Sometimes the best stuff shows up uninvited.
            </div>
          </div>
        </div>
      </section>

      {/* ============ FIELD NOTES TEASER ============ */}
      <section style={{ maxWidth: 1300, margin: '0 auto', padding: '5rem 2.5rem' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--rule)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.75rem', letterSpacing: '-0.01em', color: 'var(--ink)' }}>From the field notes</h2>
          <a href="/field" className="ws-home-more" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none' }}>All notes <span className="ws-arrow">→</span></a>
        </div>
        <a href="/field/a-ram-pump-for-the-stream" className="ws-home-note" style={{ display: 'block', textDecoration: 'none', color: 'inherit', borderTop: '2px solid var(--ink)', paddingTop: '1.5rem', maxWidth: '70ch' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--paper)', background: 'var(--green)', padding: '0.3rem 0.6rem', marginBottom: '1rem' }}>Field Note · Build</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', lineHeight: 1.1, color: 'var(--ink)', marginBottom: '0.75rem', letterSpacing: '-0.015em' }} className="ws-home-note-h">A ram pump for the stream</h3>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            No electricity, no fuel. Just the weight of falling water pushing a little of it uphill. Building one from brass fittings and testing it on the creek.
          </p>
        </a>
      </section>

      <style>{`
        .ws-home-card { }
        .ws-home-card img { transition: transform 0.5s var(--ease-default); }
        .ws-home-card:hover { border-color: var(--accent, var(--green)) !important; transform: translateY(-2px); box-shadow: 0 8px 20px var(--shadow); }
        .ws-home-card:hover img { transform: scale(1.045); }
        .ws-home-more { border-bottom: 2px solid var(--accent, var(--rust)); padding-bottom: 0.2rem; }
        .ws-home-more:hover { color: var(--accent, var(--green)) !important; }
        .ws-home-note:hover .ws-home-note-h { color: var(--green); }
        @media (max-width: 900px) {
          .ws-home-grid { grid-template-columns: 1fr 1fr !important; }
          .ws-photo-break-inner { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 600px) { .ws-home-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
