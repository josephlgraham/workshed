import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: "Workshed · Let's plan together." }

/* Gradients shared with /tools page */
const GRADIENTS = {
  water: 'radial-gradient(ellipse at 30% 40%, rgba(140,180,220,0.6) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(100,130,100,0.7) 0%, transparent 55%), linear-gradient(160deg, #4a6580 0%, #2a4a3a 50%, #1a2818 100%)',
  timing: 'radial-gradient(ellipse at 60% 50%, rgba(180,140,90,0.6) 0%, transparent 60%), linear-gradient(160deg, #8a6a3a 0%, #5a4528 50%, #2a1f10 100%)',
  soil: 'radial-gradient(ellipse at 40% 60%, rgba(140,100,60,0.7) 0%, transparent 60%), linear-gradient(160deg, #6a4a2a 0%, #3a2818 50%, #1a1208 100%)',
  planning: 'radial-gradient(ellipse at 50% 40%, rgba(100,140,80,0.7) 0%, transparent 60%), linear-gradient(160deg, #5a7a3a 0%, #2a4a18 50%, #102008 100%)',
  compost: 'radial-gradient(ellipse at 50% 50%, rgba(120,80,40,0.6) 0%, transparent 60%), linear-gradient(160deg, #4a3520 0%, #2a1f10 50%, #1a1208 100%)',
}


type SmallTagKey = 'growing' | 'watching' | 'pests' | 'reading'
const SMALL_TAG_COLORS: Record<SmallTagKey, string> = {
  growing: 'var(--green)',
  watching: 'var(--sunflower)',
  pests: 'var(--eggplant)',
  reading: 'var(--ink-muted)',
}

function ToolCardImg({ gradient, photo }: { gradient: keyof typeof GRADIENTS; photo?: string }) {
  return (
    <div style={{
      aspectRatio: '3/2',
      position: 'relative',
      overflow: 'hidden',
      background: GRADIENTS[gradient],
    }}>
      {photo && <Image src={photo} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" style={{ objectFit: 'cover' }} />}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '3rem 2.5rem 5rem' }}>

      {/* ============ FEATURED TOOL ============ */}
      <div style={{ marginBottom: '4rem' }}>
        <Link href="/tools/rainwater" style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          background: 'var(--card)',
          textDecoration: 'none',
          color: 'var(--ink)',
          border: '1px solid var(--rule)',
          transition: 'all 0.25s',
          overflow: 'hidden',
        }} className="ws-featured">
          <div style={{
            minHeight: 320,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <Image src="/photos/rainbarrel_filling.jpg" alt="Rain barrel filling" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--green)',
              marginBottom: '1rem',
            }}>Most Used · Water</div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '2rem',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: 'var(--ink)',
              marginBottom: '1rem',
              fontVariationSettings: '"opsz" 96',
            }}>Rainwater Harvest Calculator</h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              lineHeight: 1.55,
              color: 'var(--ink-soft)',
              marginBottom: '1.5rem',
              flex: 1,
            }}>
              How much water you can capture from your roof, by month. Pick your conditions, get the answer, and see what size cistern actually makes sense for your setup.
            </p>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>Open the calculator →</span>
          </div>
        </Link>
      </div>

      {/* ============ TOOLS HEAD ============ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '4rem',
        alignItems: 'end',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--rule)',
      }} className="ws-tools-head">
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          fontVariationSettings: '"opsz" 144',
        }}>
          Tools for your garden that{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--green)' }}>work</em>.
        </h1>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          lineHeight: 1.55,
          color: 'var(--ink-soft)',
        }}>
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--green)',
            marginBottom: '0.75rem',
            padding: '0.25rem 0.5rem',
            background: 'var(--paper-tint)',
            borderLeft: '2px solid var(--green)',
          }}>Tool Shed</span>
          <p>Calculators and planners I built because I needed them. Real numbers, clear answers, no fluff.</p>
        </div>
      </div>

      {/* ============ TOOLS GRID ============ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
      }} className="ws-tools-grid">

        <Link href="/tools/seed-starting" style={toolCardStyle} className="ws-tool-card">
          <ToolCardImg gradient="timing" photo="/photos/seed-starting.jpg" />
          <div style={toolCardBody}>
            <div style={toolNum}>02 · Timing</div>
            <h3 style={toolCardH3}>Seed Starting Calendar</h3>
            <p style={toolCardP}>Backed out from your last frost. Honest about the margin.</p>
          </div>
        </Link>

        <Link href="/tools/mulch" style={toolCardStyle} className="ws-tool-card">
          <ToolCardImg gradient="soil" photo="/photos/mulch.jpg" />
          <div style={toolCardBody}>
            <div style={toolNum}>03 · Soil</div>
            <h3 style={toolCardH3}>Mulch Math</h3>
            <p style={toolCardP}>Cubic yards by bed. Bags versus bulk, settled.</p>
          </div>
        </Link>

        <Link href="/tools/square-foot" style={toolCardStyle} className="ws-tool-card">
          <ToolCardImg gradient="planning" photo="/photos/square-foot.jpg" />
          <div style={toolCardBody}>
            <div style={toolNum}>04 · Planning</div>
            <h3 style={toolCardH3}>Square Foot Planner</h3>
            <p style={toolCardP}>What fits where, without the spreadsheet headache.</p>
          </div>
        </Link>

        <Link href="/tools/compost-ratio" style={toolCardStyle} className="ws-tool-card">
          <ToolCardImg gradient="compost" photo="/photos/compost.jpg" />
          <div style={toolCardBody}>
            <div style={toolNum}>07 · Soil</div>
            <h3 style={toolCardH3}>Compost Ratio</h3>
            <p style={toolCardP}>Greens, browns, and how much of each. Worked out for you.</p>
          </div>
        </Link>

      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/tools" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink)',
          textDecoration: 'none',
          borderBottom: '2px solid var(--rust)',
          paddingBottom: '0.25rem',
        }}>See all tools →</Link>
      </div>

    </div>

      {/* ============ PHOTO BREAK ============ */}
      <section style={{
        background: '#0a0907',
        color: '#f4f1ea',
        padding: '5rem 2.5rem',
      }} className="ws-photo-break">
        <div style={{
          maxWidth: 1300,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }} className="ws-photo-break-inner">
          <div style={{
            aspectRatio: '4/5',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}>
            <Image src="/photos/sunflower.jpg" alt="Sunflower" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--rust)',
              marginBottom: '1.5rem',
            }}>From the Garden · May</div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              color: '#f4f1ea',
              marginBottom: '1.5rem',
              fontVariationSettings: '"opsz" 144',
            }}>
              The bean trellis <em style={{ fontStyle: 'italic', fontWeight: 300 }}>leans</em>, and so does the gardener.
            </h2>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              letterSpacing: '0.03em',
              color: 'rgba(244, 241, 234, 0.7)',
              lineHeight: 1.6,
            }}>
              A sunflower that came up where I didn&rsquo;t plant anything. Sometimes the best stuff shows up uninvited.
            </div>
          </div>
        </div>
      </section>

      {/* ============ FIELD NOTES ============ */}
      <section style={{ maxWidth: 1300, margin: '0 auto', padding: '5rem 2.5rem' }}>
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
            fontSize: '2rem',
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
            fontVariationSettings: '"opsz" 96',
          }}>From the field notes</h2>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}>Recent writing</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '4rem',
        }} className="ws-notes-grid">

          <div style={{ borderTop: '2px solid var(--ink)', paddingTop: '1.5rem' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--paper)',
              background: 'var(--green)',
              padding: '0.3rem 0.6rem',
              marginBottom: '1rem',
            }}>Project · In Progress</span>
            <h4 style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontSize: '2.25rem',
              lineHeight: 1.05,
              color: 'var(--ink)',
              marginBottom: '1rem',
              letterSpacing: '-0.015em',
            }}>The greenhouse build. Patience, scrap lumber, and a storm door</h4>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'var(--ink-soft)',
              maxWidth: '55ch',
            }}>
              I&rsquo;m waiting on a few things before I break ground. New back storm door needs to happen first (the old one becomes the greenhouse door). Then I&rsquo;ll pull the salvaged lumber from the kids&rsquo; old playhouse. The plan: crushed rock floor, a workbench, my hammock set up permanently, a potbelly stove for cold mornings, and eventually solar-powered everything. There&rsquo;s a tree to come down and an AC install to finish first. Always something. But here&rsquo;s the full plan and how I&rsquo;m sequencing it.
            </p>
            <div style={{
              marginTop: '1.5rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
            }}>May 12, 2026 · 12 min read</div>
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--rule)',
            }}>More to read</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <NoteSmall tag="growing" tagLabel="What's Growing" title="Growing zucchini up, not out" excerpt="Vertical zucchini saves space and stops the squash bugs cold. Plus when to cut the bottom leaves." />
              <NoteSmall tag="watching" tagLabel="Worth Watching" title="Ram pumps, explained simply" excerpt="A short video that finally made these click. Moving water uphill, no electricity. Pinning it here." />
              <NoteSmall tag="pests" tagLabel="Pest Watch" title="Squash vine borers. The early signs" excerpt="By the time you see the damage, it's usually too late. Here's what to look for in week one." />
              <NoteSmall tag="reading" tagLabel="Reading" title="Old manuals are gold" excerpt="Pre-internet engineering documents are still some of the clearest writing on basic systems." />
            </div>
          </div>

        </div>
      </section>

      {/* ============ COMMUNITY ============ */}
      <section style={{
        background: 'var(--paper-tint)',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        padding: '4rem 2.5rem',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--rust)',
            marginBottom: '1.5rem',
          }}>Let&rsquo;s plan together</div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: 'var(--ink)',
            marginBottom: '1rem',
          }}>Get the next piece in your inbox.</h3>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            lineHeight: 1.55,
            color: 'var(--ink-soft)',
            marginBottom: '2rem',
          }}>
            Monthly-ish. New tools, what&rsquo;s working in the garden, and the occasional weird old manual worth your time.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: 460, margin: '0 auto' }}>
            <input type="email" placeholder="you@somewhere.com" aria-label="Email address" style={{
              flex: 1,
              padding: '0.85rem 1rem',
              border: '1px solid var(--rule)',
              background: 'var(--paper)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              borderRadius: 2,
            }} className="ws-email-input" />
            <button type="button" style={{
              padding: '0.85rem 1.5rem',
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: '1px solid var(--ink)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: 2,
              transition: 'background 0.2s',
            }} className="ws-email-btn">Subscribe</button>
          </div>
          <div style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}>Free · No spam · Unsubscribe anytime</div>
        </div>
      </section>

      <style>{`
        .ws-featured:hover { border-color: var(--green) !important; transform: translateY(-2px); box-shadow: 0 12px 28px var(--shadow); }
        .ws-tool-card { background: var(--card); text-decoration: none; color: inherit; }
        .ws-tool-card:hover { border-color: var(--green) !important; transform: translateY(-2px); box-shadow: 0 8px 20px var(--shadow); }
        .ws-email-input:focus { outline: none; border-color: var(--green); }
        .ws-email-btn:hover { background: var(--green) !important; border-color: var(--green) !important; }
        @media (max-width: 900px) {
          .ws-tools-head { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .ws-tools-grid { grid-template-columns: 1fr 1fr !important; }
          .ws-featured { grid-template-columns: 1fr !important; }
          .ws-photo-break-inner { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .ws-notes-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </>
  )
}

const toolCardStyle: React.CSSProperties = {
  background: 'var(--card)',
  textDecoration: 'none',
  color: 'inherit',
  border: '1px solid var(--rule)',
  transition: 'all 0.25s',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}

const toolCardBody: React.CSSProperties = {
  padding: '1.25rem 1.25rem 1.5rem',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}

const toolNum: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  fontWeight: 500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--ink-muted)',
  marginBottom: '0.5rem',
}

const toolCardH3: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontSize: '1.25rem',
  lineHeight: 1.15,
  color: 'var(--ink)',
  marginBottom: '0.5rem',
  letterSpacing: '-0.01em',
}

const toolCardP: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '0.9rem',
  lineHeight: 1.5,
  color: 'var(--ink-soft)',
}

function NoteSmall({ tag, tagLabel, title, excerpt }: { tag: SmallTagKey; tagLabel: string; title: string; excerpt: string }) {
  return (
    <a href="#" style={{
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      padding: '1.5rem 0',
      borderBottom: '1px solid var(--rule)',
    }} className="ws-note-small">
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.62rem',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '0.5rem',
        color: SMALL_TAG_COLORS[tag],
      }}>{tagLabel}</div>
      <h5 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 500,
        fontSize: '1.15rem',
        lineHeight: 1.25,
        color: 'var(--ink)',
        marginBottom: '0.4rem',
      }} className="ws-note-small-h">{title}</h5>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '0.9rem',
        lineHeight: 1.5,
        color: 'var(--ink-soft)',
      }}>{excerpt}</p>
      <style>{`.ws-note-small:hover .ws-note-small-h { color: var(--green); }`}</style>
    </a>
  )
}
