import type { Metadata } from 'next'
import SoilVolumeCalculator from '@/components/tools/SoilVolumeCalculator'
import Section from '@/components/tools/Section'

export const metadata: Metadata = {
  title: 'Raised Bed Soil Calculator · Workshed',
  description: 'How much soil you need to fill a raised bed, what to fill it with, and what to add to it once it is in there. Pick a bed size, choose a recipe, and get the volume broken down by ingredient.',
}

export default function SoilVolumePage() {
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
        Raised Bed Soil Calculator
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 640,
      }}>
        How much soil you need to fill a raised bed, what to fill it with,
        and what to add to it once it is in there. Pick a bed size, choose a
        recipe, and get the volume broken down by ingredient. Then top-dress
        with{' '}
        <a href="/tools/mulch" style={inlineLinkStyle}>mulch math</a>{' '}
        once the bed is planted.
      </p>

      {/* Calculator */}
      <SoilVolumeCalculator />

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
        Compost is a long argument that ends in agreement.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="What goes in a raised bed and why it matters">
          <p>
            A raised bed is not a decoration. It is a controlled growing
            environment where you get to decide what the soil is made of, how
            it drains, and what nutrients are in it. That control is the
            entire point. The soil you put in a raised bed is the single
            biggest factor in what that bed produces, and it is the one
            decision you get to make before anything else happens.
          </p>
          <p>
            Most raised beds are filled with some combination of topsoil,
            compost, and a drainage agent like perlite or vermiculite. The
            ratio depends on the depth of the bed, what you are growing, and
            how much you want to spend. There is no single correct recipe,
            but there are recipes that work well and recipes that cause
            problems.
          </p>
        </Section>

        <Section title="The recipes explained">
          <p>
            Mel&rsquo;s Mix is probably the most widely known raised bed
            recipe. It comes from the Square Foot Gardening method: one-third
            blended compost, one-third peat moss, one-third coarse
            vermiculite. It works. It drains well, holds moisture, and
            provides a good nutrient base. The downside is cost. Coarse
            vermiculite is expensive, and at scale the price per cubic yard
            can get unreasonable. For a single 4×4 bed it is manageable. For
            six beds it is a conversation about the budget.
          </p>
          <p>
            The budget approach is three parts topsoil to one part compost.
            You lose the lightweight feel and the engineered drainage, but
            you gain affordability and weight. Heavy soil is not always a
            disadvantage in a raised bed. It holds temperature better, it
            resists wind erosion, and it settles into a stable structure
            that does not compact the way pure compost does when it dries
            out. If you go this route, order screened topsoil from a
            landscape supply yard. Unscreened topsoil is a gamble on rocks,
            roots, and clay clods.
          </p>
          <p>
            The premium mix in the calculator is a middle ground. Topsoil
            for body, compost for nutrients and biology, peat or coir for
            moisture retention, and perlite for drainage. It is what most
            people end up mixing after they have tried the extremes and want
            something that balances cost, weight, and performance.
          </p>
        </Section>

        <Figure
          gradient="soil"
          caption="The bulk delivery arrives in your driveway and waits, patient and inert, until you move it."
        />

        <Section title="Coffee grounds and the nitrogen question">
          <p>
            Used coffee grounds are roughly 2% nitrogen by weight, which
            makes them a useful addition to compost piles and garden soil.
            The nitrogen in spent grounds is mostly in organic form, meaning
            it releases slowly as microbes break the grounds down. This is a
            good thing. It means you are feeding the soil biology, not
            dumping a hit of synthetic nitrogen on the surface.
          </p>
          <p>
            The mistake people make is applying coffee grounds as a thick
            layer directly on the soil. Grounds are fine-textured and
            compact easily. A thick layer becomes a mat that repels water
            instead of absorbing it. The correct approach is to mix grounds
            into compost at 10-20% of the pile volume, or work them lightly
            into the top few inches of soil. In a raised bed, they are best
            mixed into the initial soil recipe, not top-dressed.
          </p>
          <p>
            The pH question comes up often. Fresh coffee grounds are mildly
            acidic. Used grounds are close to neutral, around 6.5 to 6.8.
            The brewing process extracts most of the acid. If you are
            worried about acidifying your soil, you are probably
            overestimating the effect. A soil test will tell you the truth
            faster than any amount of guessing.
          </p>
        </Section>

        <Section title="Wood ash for potatoes and other heavy feeders">
          <p>
            Wood ash from a fireplace or fire pit is a legitimate soil
            amendment. It is alkaline, which means it raises soil pH. It
            contains meaningful amounts of potassium and calcium, both of
            which potatoes, tomatoes, and brassicas want. In acidic soils,
            which cover most of the Southeast, a light application of wood
            ash can do the same job as garden lime while also adding
            potassium that lime does not provide.
          </p>
          <p>
            The rate matters. Five pounds per 100 square feet is a
            reasonable starting point. More than that and you risk pushing
            the pH too high, which locks out micronutrients like iron and
            manganese. Never apply wood ash around blueberries, azaleas, or
            anything that wants acidic soil. Never use ash from charcoal
            briquettes, painted wood, or pressure-treated lumber. Hardwood
            ash from untreated firewood is the only kind that belongs in a
            garden.
          </p>
        </Section>

        <Section title="Worms are doing the real work">
          <p>
            Earthworms are not a garden accessory. They are the primary
            engineers of soil structure. A healthy worm population aerates
            the soil, breaks down organic matter into plant-available
            nutrients, and creates channels that allow water and roots to
            penetrate. Worm castings, which is the polite way of saying
            worm manure, are one of the most nutrient-dense and biologically
            active amendments you can add to a garden bed.
          </p>
          <p>
            You do not need to buy worms for a raised bed. If the bed is
            sitting on native soil and you have added compost, worms will
            find it. They move through the ground and migrate into
            environments with organic matter. If your bed is on concrete,
            pavers, or has a hardware cloth bottom, you may need to
            introduce red wigglers or nightcrawlers manually.
          </p>
          <p>
            Worm castings as a purchased amendment are expensive. A 15-pound
            bag is $20 to $30. At scale, a worm bin is a better investment.
            A simple bin with red wigglers will process kitchen scraps into
            castings continuously and give you a supply that would cost
            hundreds of dollars a year to buy in bags. The worms do not
            require much attention. They require food scraps, moisture, and
            darkness, which is a shorter list than most pets.
          </p>
        </Section>

        <Section title="Settling and the 10% rule">
          <p>
            New soil in a raised bed will settle. There is no way around
            this. Watering compresses air pockets, organic matter
            decomposes, and gravity does what gravity does. In the first
            season, expect to lose 10-15% of the volume. This is not a
            failure. This is physics. The 10% extra slider in the calculator
            exists specifically for this reason.
          </p>
          <p>
            At the end of the first growing season, top-dress the bed with
            an inch or two of compost. This replaces what settled, feeds the
            soil biology for next year, and is a better approach than trying
            to overfill the bed at the start and dealing with soil spilling
            over the sides every time you water.
          </p>
        </Section>

        <Section title="Peat vs. coco coir">
          <p>
            Peat moss and coco coir do the same job in a soil recipe: they
            hold moisture and keep the mix light. Peat is harvested from
            bogs, primarily in Canada. It is a finite resource that
            regenerates extremely slowly. Coco coir is a byproduct of
            coconut processing and is considered renewable on a human
            timescale. Both work. Coir has a more neutral pH and rehydrates
            more easily after drying out. Peat is slightly more acidic and
            can become hydrophobic when fully dry, at which point water runs
            across the surface instead of soaking in.
          </p>
          <p>
            If you are choosing between them, coir is the more forgiving
            material to work with. If you already have peat, use it. Neither
            one is wrong. The environmental argument favors coir, and the
            practical argument is roughly a tie.
          </p>
        </Section>

        <Section title="Test your soil">
          <p>
            A soil test costs $10 to $25 through your county extension
            office and tells you exactly what your soil has and what it
            needs. It measures pH, nitrogen, phosphorus, potassium, calcium,
            magnesium, and organic matter percentage. Without a soil test,
            every amendment you add is a guess. With a soil test, every
            amendment you add is a response to data.
          </p>
          <p>
            This matters because most garden problems that get blamed on
            pests, weather, or bad luck are actually nutrient deficiencies
            or pH problems. A tomato with blossom end rot does not have a
            calcium problem because the soil lacks calcium. It has a
            calcium problem because the soil pH is too low or too high for
            the plant to access the calcium that is already there. A soil
            test catches this. A guess does not.
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
            href="/tools/mulch"
            label="Mulch Math"
            blurb="Top-dress a freshly filled bed. Cubic yards by depth, bags versus bulk."
            status="live"
          />
          <PairCard
            href="/tools/compost-ratio"
            label="Compost Ratio Calculator"
            blurb="Browns and greens, worked out so the pile actually heats up."
            status="live"
          />
          <PairCard
            href="/tools/hugelkultur"
            label="Hugelkultur Calculator"
            blurb="Filling a hugel bed? Wood goes at the bottom. This breaks down how much of each layer you need."
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
  const badge = status === 'live' ? { text: 'Live', color: 'var(--green)' }
              : status === 'soon' ? { text: 'Coming soon', color: 'var(--sunflower)' }
              :                     { text: 'Planned',     color: 'var(--ink-muted)' }
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
    <figure style={{
      margin: '2.5rem -70px 2.5rem',
      maxWidth: 820,
    }} className="ws-figure">
      <div style={{
        aspectRatio: '4/3',
        background: src ? `center/cover no-repeat url(${src})` : (gradient ? FIGURE_GRADIENTS[gradient] : FIGURE_GRADIENTS.soil),
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

const inlineLinkStyle: React.CSSProperties = {
  color: 'var(--green)',
  textDecoration: 'underline',
  textDecorationColor: 'var(--rule)',
  textDecorationThickness: '1px',
  textUnderlineOffset: '2px',
}
