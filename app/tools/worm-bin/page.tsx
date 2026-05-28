import type { Metadata } from 'next'
import WormBinSizer from '@/components/tools/WormBinSizer'
import Section from '@/components/tools/Section'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'Worm Bin Sizer · Workshed',
  description: 'How big a worm bin you need, how many red wigglers to buy, and how much bedding to start with. Based on your household size and how many scraps you produce each week.',
}

export default function WormBinPage() {
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
        Worm Bin Sizer
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 640,
      }}>
        Household size to bin size to feeding rate. How big the bin needs to be,
        how many red wigglers to buy, and how much bedding to start with. The
        worms handle the rest.
      </p>

      {/* Calculator */}
      <WormBinSizer />

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
        A pound of red wigglers is between five hundred and a thousand animals
        working your kitchen scraps into something the garden can use. It is a
        reasonable trade.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="Red wigglers, not earthworms">
          <p>
            The worm you want is <em>Eisenia fetida</em>, sold as red wigglers
            or red worms. They are surface feeders that evolved to live in
            decomposing organic matter, which is exactly what a worm bin is.
            The earthworms you dig up in the garden, <em>Lumbricus terrestris</em>,
            are soil dwellers that tunnel deep into mineral earth. They do not
            thrive in a bin and will not process food scraps efficiently.
          </p>
          <p>
            Most garden centers do not stock red wigglers. Order from a reputable
            supplier online. One pound of worms is a reasonable starting quantity
            for most households. The population will double every 60 to 90 days
            in good conditions, so the bin will catch up to your scraps volume
            even if you start a little short.
          </p>
        </Section>

        <Section title="Temperature and where to keep the bin">
          <p>
            Red wigglers work best between 55 and 77 degrees Fahrenheit. Below
            50, activity drops off sharply. Above 85, the worms will try to
            leave the bin. Sustained heat above 90 can kill them outright. This
            matters more than most new worm keepers expect.
          </p>
          <p>
            A basement, laundry room, or climate-controlled garage is ideal. A
            bin left in a hot shed or outbuilding in midsummer is a risk. In
            winter, an unheated garage in a cold climate will go dormant at best.
            The bin does not smell if it is managed correctly, which makes indoor
            keeping more feasible than people assume. A well-run bin smells like
            soil, not garbage.
          </p>
        </Section>

        <Section title="Bedding and moisture">
          <p>
            Start with shredded newspaper, cardboard, or coconut coir. Avoid
            glossy paper. The bedding should be moist before the worms go in. Same wrung-out sponge rule as a compost pile. Worms live in and on
            the bedding and use it as a carbon source. Add more as the pile
            compacts and gets wet.
          </p>
          <p>
            A layer of damp cardboard or burlap over the surface keeps moisture
            in and light out. Worms avoid light and will stay near the surface
            as long as it is dark and damp. If you open the bin and they
            immediately retreat downward, the surface is probably too dry or too
            bright.
          </p>
          <p>
            Crushed eggshells are worth adding at every feeding. Worms use the
            grit for digestion and the calcium helps keep the bin pH from going
            acidic. Rinse the shells, dry them, and crush them before adding.
          </p>
        </Section>

        <Figure
          gradient="soil"
          caption="Dark, crumbly, and smelling of earth. Finished castings look nothing like what went in."
        />

        <Section title="What to feed and what to skip">
          <p>
            Fruit and vegetable scraps are the foundation. Coffee grounds and
            unbleached filters compost quickly and the worms move toward them.
            Tea bags work if you remove any staples. Shredded cardboard and
            paper round out the carbon side.
          </p>
          <p>
            Go easy on citrus. A peel here and there is not a problem, but a
            heavy load of orange rinds pushes the bin acidic faster than the
            worms can buffer it. Same with onions and garlic. Worms will
            eventually process them, but a bin loaded with alliums is not a
            happy bin.
          </p>
          <p>
            Skip meat, fish, dairy, and anything oily or greasy. In a closed
            bin these create odor problems quickly and attract pests. Salty
            foods (chips, pickles, anything heavily salted) are toxic to
            worms at the concentrations that form when salt concentrates in the
            bin. Bread and grains are tolerable in small amounts but tend to
            attract fruit flies, so bury them well.
          </p>
        </Section>

        <Section title="Fruit flies and other problems">
          <p>
            Fruit flies are the most common complaint and almost always come
            from food scraps left exposed on the surface. The fix is to bury
            food under the bedding rather than laying it on top. A layer of
            damp cardboard over the surface helps further. Apple cider vinegar
            in a jar with a paper funnel works as a trap for the adults. The
            population will come down within a week or two once you stop
            surface-feeding.
          </p>
          <p>
            If the bin smells like rot or ammonia, it is either too wet, too
            acidic, or overloaded with nitrogen-rich material. Add dry bedding,
            reduce feeding for a week, and turn the material gently to introduce
            air. A healthy bin smells like soil. Any other smell is information
            about what to adjust.
          </p>
          <p>
            If worms are escaping, something in the bin is driving them out.
            Check temperature first. A warm bin in a warm room will send them
            looking for cooler ground. Also check moisture and pH. A bin that
            goes acidic from citrus or protein overload will cause mass
            migration. Adding crushed eggshells and dry bedding usually resolves
            it within a few days.
          </p>
        </Section>

        <Section title="Harvesting castings">
          <p>
            Every three to six months, depending on how actively you feed. The
            easiest method: push all the material to one side of the bin and
            add fresh bedding and food only to the other side. Over two to three
            weeks, most of the worms will migrate toward the food. Scoop out
            the worm-free side. Finished castings look like dark crumbly soil
            and smell like earth. If you can still identify what went in, leave
            it longer.
          </p>
          <p>
            Castings will not burn plants even at high application rates, which
            makes them more forgiving than most amendments. A tablespoon per
            transplant hole, a thin top-dress on established beds, or brewed
            into compost tea. A six-month yield from a well-managed 4-square-foot
            bin is roughly a five-gallon bucket of castings, worth significantly
            more by weight than the scraps that went in.
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
            href="/tools/compost-ratio"
            label="Compost Ratio Calculator"
            blurb="For the outdoor pile. Browns and greens, worked out so it heats up."
            status="live"
          />
          <PairCard
            href="/tools/soil-volume"
            label="Raised Bed Soil Calculator"
            blurb="Work castings into your bed fill. Figure out how much soil you need first."
            status="live"
          />
          <PairCard
            href="/tools/mulch"
            label="Mulch Math"
            blurb="Top-dress with castings or finished compost. Cubic yards by bed."
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
