import type { Metadata } from 'next'
import HugelkulturCalculator from '@/components/tools/HugelkulturCalculator'
import Section from '@/components/tools/Section'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'Hugelkultur Calculator · Workshed',
  description: 'Wood, soil, and compost ratios for a raised hugelkultur bed. How much of each material you need, how deep to bury the wood, and what to expect as it decomposes.',
}

export default function HugelkulturPage() {
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

      {/* Breadcrumb + share */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      <nav style={{
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
      }}>
        <a href="/tools" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Tool Shed</a>
        <span>·</span>
        <span>Soil</span>
      </nav>
      <ShareButton />
      </div>

      {/* Header */}
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 700,
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        lineHeight: 1.05,
        letterSpacing: '-0.02em',
        color: 'var(--ink)',
        marginBottom: '1rem',
      }}>
        Hugelkultur Calculator
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 640,
      }}>
        Wood, soil, and compost ratios for a hugelkultur raised bed. Enter your
        bed dimensions and wood layer depth to get the volume of each material.
        The wood is the structure. Everything else fills in around and above it.
      </p>

      {/* Calculator */}
      <HugelkulturCalculator />

      {/* Pull quote */}
      <blockquote style={{
        border: '2px solid var(--green)',
        padding: '1.25rem 1.5rem',
        margin: '2rem 0 3rem',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        lineHeight: 1.6,
        color: 'var(--ink-soft)',
        maxWidth: 600,
      }}>
        The wood is not filler. It is a slow-release sponge that will still be
        working ten years from now when you have forgotten it is there.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="What hugelkultur actually is">
          <p>
            Hugelkultur is a raised bed method where you bury wood at the base
            before filling with soil. The wood acts as a long-term sponge,
            absorbing and holding water, then releasing it slowly as the
            surrounding soil dries out. As it decomposes over years, it also
            feeds soil biology and releases nutrients. A well-built hugel bed
            can dramatically reduce irrigation needs once the wood is saturated
            and the bed is established.
          </p>
          <p>
            The name is German, roughly translated as "mound culture," and
            traditionally refers to a raised mound built directly on the ground
            without a frame. In a raised bed context it works the same way. Wood goes at the bottom, soil and compost go on top, plants go in
            the soil. The bed is taller and needs more initial fill than a
            conventional raised bed, but requires less water and fewer soil
            inputs over time.
          </p>
        </Section>

        <Section title="What wood to use">
          <p>
            Hardwoods that are already partially rotted are the best choice.
            Logs, chunks, and large branches from apple, oak, maple, alder,
            cottonwood, or birch work well. Partially rotted wood is preferred
            because it has already begun the decomposition process and will
            absorb water more readily from the start.
          </p>
          <p>
            Avoid cedar, black walnut, and black locust. Cedar is allelopathic
            and will suppress plant growth. Black walnut produces juglone, which
            is toxic to many plants. Black locust is very slow to decompose and
            contains compounds that persist in soil.
          </p>
          <p>
            Never use pressure-treated lumber or painted wood. The preservatives
            leach into the soil and persist for years. If you are not certain
            what the wood was treated with, do not use it.
          </p>
          <p>
            Fresh green wood works but decomposes more slowly and will tie up
            nitrogen for the first season or two as it breaks down. If you use
            fresh wood, add extra compost and plan for a slower first year.
          </p>
        </Section>

        <Figure
          src="/photos/hugelkultur.jpg"
          alt="A half-rotted log breaking down in the grass"
          gradient="soil"
          caption="A punky, half-rotted log like this is the engine of a hugel bed. Buried deep, it holds water and feeds the soil for years."
        />

        <Section title="How to build it">
          <p>
            Start with the largest logs at the bottom. Fill gaps with smaller
            branches and sticks. The goal is a dense wood layer with as little
            air space as possible. Air gaps dry out and slow decomposition.
            Pack smaller material into the spaces between logs.
          </p>
          <p>
            On top of the wood, add a layer of nitrogen-rich material: fresh
            grass clippings, kitchen scraps, coffee grounds, or manure. This
            provides the nitrogen the decomposing wood needs and jump-starts the
            microbial activity. Then add compost, and finally fill to grade with
            your soil mix.
          </p>
          <p>
            Water the bed thoroughly before planting. The wood layer needs to
            be saturated to start working. In the first season, you may need
            to water more than usual while the wood absorbs. Once it is saturated,
            irrigation needs drop significantly, especially in a second-year
            bed where decomposition is active and the sponge effect is
            established.
          </p>
        </Section>

        <Section title="Settling and the long game">
          <p>
            Hugel beds settle. Significantly. In the first season, expect 20 to
            30 percent volume loss as the wood begins to compress and the soil
            settles into the gaps. Plan the initial fill height accordingly.
            A bed intended to be 12 inches tall at maturity should start at 15
            to 16 inches.
          </p>
          <p>
            The decomposition process takes years. A hardwood log buried in a
            well-managed bed will break down over five to ten years. During that
            time it is continuously releasing nutrients and improving soil
            structure. In the first two years, the bed may be slightly
            nitrogen-deficient as the decomposing wood ties up available
            nitrogen. Supplement with compost top-dressing and nitrogen-rich
            mulch until the bed finds its equilibrium.
          </p>
          <p>
            At the end of the wood's useful life, what remains is a deep,
            biologically rich column of aged compost. You can either leave it
            and let the bed revert to a standard raised bed, or start over
            with new wood at the bottom.
          </p>
        </Section>

        <Section title="Nitrogen and the first-year adjustment">
          <p>
            The carbon-to-nitrogen ratio of fresh wood is extremely high, between 200:1 and 500:1 for most species. The microbes breaking
            down that wood need nitrogen to do their work, and they will draw
            it from the surrounding soil if it is available. This is called
            nitrogen drawdown, and it is the primary reason hugel beds can
            underperform in the first season.
          </p>
          <p>
            The fix is to plant heavy nitrogen-fixers nearby or add compost
            generously. Beans and clover in or around the bed help. A thick
            compost top-dress in early spring feeds the soil without requiring
            synthetic inputs. By the second or third year, as the outer layers
            of wood break down and release their stored nutrients, the nitrogen
            situation usually reverses and the bed becomes very productive.
          </p>
        </Section>

      </article>

      {/* Pairs with */}
      <section style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--rule)' }}>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          marginBottom: '1rem',
        }}>Pairs with</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }} className="ws-pairs-grid">
          <PairCard
            href="/tools/soil-volume"
            label="Raised Bed Soil Calculator"
            blurb="Calculate the soil fill needed above the wood layer. Has a built-in hugelkultur mode."
            status="live"
          />
          <PairCard
            href="/tools/compost-ratio"
            label="Compost Ratio Calculator"
            blurb="The nitrogen layer between the wood and soil is essentially a hot compost layer."
            status="live"
          />
          <PairCard
            href="/tools/mulch"
            label="Mulch Math"
            blurb="Top-dress the established bed each season to maintain the soil layer as it settles."
            status="live"
          />
        </div>
        <style>{`@media (max-width: 800px) { .ws-pairs-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

    </div>
  )
}

function PairCard({ href, label, blurb, status }: {
  href: string
  label: string
  blurb: string
  status: 'live' | 'soon' | 'planned'
}) {
  const isLive = status === 'live'
  const badge =
    status === 'live'   ? { text: 'Live',        color: 'var(--green)' }
    : status === 'soon' ? { text: 'Coming soon', color: 'var(--sunflower)' }
    :                     { text: 'Planned',      color: 'var(--ink-muted)' }

  const inner = (
    <>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.62rem',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: badge.color,
        marginBottom: '0.4rem',
      }}>{badge.text}</div>
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 600,
        fontSize: '1.1rem',
        lineHeight: 1.2,
        color: 'var(--ink)',
        letterSpacing: '-0.01em',
        marginBottom: '0.4rem',
      }}>{label}</h3>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '0.88rem',
        lineHeight: 1.5,
        color: 'var(--ink-soft)',
      }}>{blurb}</p>
    </>
  )

  const cardStyle: React.CSSProperties = {
    background: 'var(--card)',
    border: '1px solid var(--rule)',
    padding: '1rem 1.1rem',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    transition: 'all 0.15s',
    cursor: isLive ? 'pointer' : 'default',
    opacity: isLive ? 1 : 0.65,
  }

  if (isLive) {
    return <a href={href} style={cardStyle} className="ws-pair-card">{inner}</a>
  }
  return (
    <div style={cardStyle} title="Not built yet">
      {inner}
      <style>{`.ws-pair-card:hover { border-color: var(--green) !important; transform: translateY(-1px); }`}</style>
    </div>
  )
}

const FIGURE_GRADIENTS: Record<string, string> = {
  water:    'radial-gradient(ellipse at 50% 30%, rgba(120,160,200,0.6) 0%, transparent 60%), linear-gradient(180deg, #5a7a90 0%, #3a5a70 50%, #1a3040 100%)',
  timing:   'radial-gradient(ellipse at 60% 50%, rgba(180,140,90,0.6) 0%, transparent 60%), linear-gradient(160deg, #8a6a3a 0%, #5a4528 50%, #2a1f10 100%)',
  soil:     'radial-gradient(ellipse at 40% 60%, rgba(140,100,60,0.7) 0%, transparent 60%), linear-gradient(160deg, #6a4a2a 0%, #3a2818 50%, #1a1208 100%)',
  planning: 'radial-gradient(ellipse at 50% 40%, rgba(100,140,80,0.7) 0%, transparent 60%), linear-gradient(160deg, #5a7a3a 0%, #2a4a18 50%, #102008 100%)',
}

function Figure({ src, alt, gradient, caption }: {
  src?: string
  alt?: string
  gradient?: keyof typeof FIGURE_GRADIENTS
  caption?: string
}) {
  return (
    <figure style={{ margin: '2.5rem -70px 2.5rem', maxWidth: 820 }} className="ws-figure">
      <div style={{
        aspectRatio: '4/3',
        background: src
          ? `center/cover no-repeat url(${src})`
          : (gradient ? FIGURE_GRADIENTS[gradient] : FIGURE_GRADIENTS.soil),
        border: '1px solid var(--rule)',
      }} role={src ? 'img' : undefined} aria-label={src ? alt : undefined} />
      {caption && (
        <figcaption style={{
          marginTop: '0.625rem',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '0.85rem',
          lineHeight: 1.5,
          color: 'var(--ink-muted)',
        }}>{caption}</figcaption>
      )}
      <style>{`@media (max-width: 760px) { .ws-figure { margin-left: 0 !important; margin-right: 0 !important; } }`}</style>
    </figure>
  )
}
