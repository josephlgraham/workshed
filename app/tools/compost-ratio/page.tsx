import type { Metadata } from 'next'
import CompostRatioCalculator from '@/components/tools/CompostRatioCalculator'
import Section from '@/components/tools/Section'

export const metadata: Metadata = {
  title: 'Compost Ratio Calculator — Workshed',
  description: 'Get the browns-to-greens ratio right so your pile actually heats up. Add your materials, see your estimated C:N ratio, and get a plain recommendation.',
}

export default function CompostRatioPage() {
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

      {/* Breadcrumb */}
      <nav style={{
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
      }}>
        <a href="/tools" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Tool Shed</a>
        <span>·</span>
        <span>Soil</span>
      </nav>

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
        Compost Ratio Calculator
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 640,
      }}>
        Browns and greens, worked out so the pile actually heats up. Add your
        materials in parts, get your estimated C:N ratio, and see what to add
        if the balance is off. End-of-season cutbacks and regular in-season
        trimmings pile up fast. Most of it goes straight in as greens.
      </p>

      {/* Calculator */}
      <CompostRatioCalculator />

      {/* Pull quote */}
      <blockquote style={{
        borderLeft: '3px solid var(--green)',
        paddingLeft: '1.25rem',
        margin: '2rem 0 3rem',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        lineHeight: 1.6,
        color: 'var(--ink-soft)',
        maxWidth: 600,
      }}>
        A pile that does not heat is not broken. It is just waiting on the carbon.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="What makes a pile heat up">
          <p>
            The microorganisms that break down organic matter need carbon for
            energy and nitrogen to build protein. When the ratio between the
            two is right, they multiply fast enough to generate heat. A hot
            pile (one that reaches 130 to 160 degrees) breaks down faster,
            kills weed seeds, and produces a more finished product. A cold
            pile is still composting. It will get there. It just takes longer,
            often a year or more.
          </p>
          <p>
            The target C:N range for a hot pile is roughly 25:1 to 35:1. Below
            that and you have too much nitrogen. The pile may smell of ammonia
            and will not heat efficiently. Above that and you have too much
            carbon. Decomposition slows to a crawl because the microbes do not
            have enough nitrogen to reproduce. Most of the common mistakes on
            both ends are fixable just by adjusting what goes in.
          </p>
        </Section>

        <Section title="Keep trimming, keep feeding">
          <p>
            During peak growing season, regular trimming is part of managing a
            productive garden. Deadheading, suckering, removing yellowing
            leaves, pinching back overgrown stems. All of it happens on a
            weekly to biweekly schedule when plants are growing fast. Fast growers
            like vertical zucchini generate a steady supply of removed leaves
            and pruned laterals throughout summer, sometimes every week when
            the vine is running hard. That material goes straight to the pile
            as greens.
          </p>
          <p>
            Fresh trimmings from healthy plants have a C:N ratio in the range
            of 15 to 25, depending on how woody the stems are. Most fall
            squarely in the greens category. The exception is end-of-season
            cutbacks, when stalks have dried and hardened. Those lean toward
            browns. A simple check: fresh and pliable is green, dried and
            brittle is brown. Large woody stems from tomatoes or peppers should
            be chipped or left to dry before adding, or they will take a long
            time to break down whole.
          </p>
          <p>
            Regular trimming also matters for plant health. Removing crowded
            or interior growth improves airflow through the canopy, which is
            one of the primary ways to reduce fungal disease pressure. The
            trimming habit and the compost habit reinforce each other: the
            garden produces the raw material, and the pile turns it back into
            something the garden can use.
          </p>
        </Section>

        <Figure
          src="/photos/compost.jpg"
          alt="Active compost pile with layered greens and browns"
          gradient="soil"
          caption="Fresh trimmings counted as greens, dried stalks counted as browns. The pile does not care about the distinction as long as you do."
        />

        <Section title="What not to put in">
          <p>
            Most things that come out of a vegetable garden or kitchen are fair
            game. A few categories cause real problems.
          </p>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <strong>Meat, fish, and bones.</strong> Attract pests and create
              serious odor. Even small amounts are enough to draw animals to the
              pile.
            </li>
            <li>
              <strong>Dairy and cooking fats.</strong> Same result. Fats and
              proteins slow decomposition and make the pile smell before they
              break down.
            </li>
            <li>
              <strong>Diseased plant material.</strong> Disease spores can survive
              a pile that never gets fully hot. If the plant had powdery mildew,
              late blight, or anything that spread fast, do not compost it.
              Bag it.
            </li>
            <li>
              <strong>Plants that have gone to seed.</strong> Unless the pile
              reliably hits 130°F or higher, seeds may survive and sprout
              wherever you spread the finished compost.
            </li>
            <li>
              <strong>Pet waste from dogs and cats.</strong> Pathogens. Chicken
              manure is fine and composted quickly; cat and dog waste is not.
            </li>
            <li>
              <strong>Treated wood or sawdust from treated lumber.</strong>{' '}
              Preservatives are toxic to soil organisms and persist in the
              finished compost. Sawdust from untreated wood is a high-carbon
              brown and works well.
            </li>
            <li>
              <strong>Invasive plants.</strong> Some species can re-establish
              from root fragments or stem nodes even after dying. If you are not
              confident the pile heats consistently, do not risk it.
            </li>
          </ul>
        </Section>

        <Section title="Pile size and heat retention">
          <p>
            A compost pile needs mass to hold heat. The minimum for reliable hot
            composting is roughly 3 feet by 3 feet by 3 feet, about 1 cubic
            yard. Smaller than that and the pile loses heat faster than it
            generates it. Larger piles can work but require more turning to
            move air to the center.
          </p>
          <p>
            The pile should be as damp as a wrung-out sponge. Squeeze a handful
            and you should get a few drops, not a stream. Too dry and microbial
            activity stalls. Too wet and the pile goes anaerobic (airless) and starts to smell. In dry weather, water the pile when you turn
            it. In wet weather, cover it or build it under a simple roof.
          </p>
        </Section>

        <Section title="Turning and time">
          <p>
            Turning introduces oxygen, which the aerobic microorganisms need to
            stay active. In an active hot pile, turn every three to five days
            and the pile will reheat after each turn as the microbes get fresh
            air and unexposed material. A pile managed this way can produce
            finished compost in six to eight weeks. A pile that is never turned
            will still break down but may take a year or more.
          </p>
          <p>
            Finished compost looks like dark, crumbly soil and smells like
            earth, not rot. If you can still identify what went in (if there are recognizable stems, peels, or chunks), it is not done. Sift it
            and put the unfinished pieces back in the next pile.
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
            blurb="Compost is one of the key ingredients. Figure out how much fill you need first."
            status="live"
          />
          <PairCard
            href="/tools/mulch"
            label="Mulch Math"
            blurb="Finished compost makes an excellent top-dress. Cubic yards by bed, bags versus bulk."
            status="live"
          />
          <PairCard
            href="/tools/worm-bin"
            label="Worm Bin Sizer"
            blurb="Vermicomposting handles the kitchen scraps year-round, no outdoor pile required."
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
    status === 'live'    ? { text: 'Live',        color: 'var(--green)' }
    : status === 'soon'  ? { text: 'Coming soon', color: 'var(--sunflower)' }
    :                      { text: 'Planned',      color: 'var(--ink-muted)' }

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
