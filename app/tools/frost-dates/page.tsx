import type { Metadata } from 'next'
import FrostCalculator from '@/components/tools/FrostCalculator'
import Section from '@/components/tools/Section'

export const metadata: Metadata = {
  title: 'Frost Dates & Protection · Workshed',
  description: 'Look up your average frost dates by ZIP. Then enter tonight’s forecast low and figure out which plants survive, which need cover, and which are already writing their wills.',
}

export default function FrostDatesPage() {
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
        <span>Frost</span>
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
        Frost Dates &amp; Protection
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 640,
      }}>
        Look up your average frost dates by ZIP. Then enter tonight&rsquo;s
        forecast low and pick a cover, and the table flags which plants are
        safe, which are at risk, and which are already writing their wills.
        Frost cloth helps, but it has limits. So do cell walls.
      </p>

      {/* Calculator */}
      <FrostCalculator />

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
        Frost is honest. It does not negotiate.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="Why kill temperature is the only number that matters">
          <p>
            Every plant has a temperature below which it cannot survive. The
            number is not negotiable. It is set by the chemistry of the cell
            membrane, the sugar content of the cell fluid, and the structure
            of the cell wall. The plant did not choose it. The frost does not
            care about it. And no amount of frost cloth, watering, or
            optimism will change it.
          </p>
          <p>
            What you can change is the temperature your plant actually
            experiences. Frost cloth adds a few degrees. A south-facing wall
            adds a few more. A cold-air drainage spot in your yard subtracts
            them right back. The calculator above uses kill temperatures from
            extension service data: SDSU, Texas A&amp;M, UMass Amherst, and
            Sustainable Market Farming. They are the conservative number, the
            point at which the plant is reliably damaged or killed. Some
            plants survive a couple of degrees below. Most do not.
          </p>
        </Section>

        <Figure
          src="/photos/frost.jpg"
          alt="Frost on plant leaves"
          gradient="frost"
          caption="The forecast says 28. The ground at 4 a.m. says 24. The blanket says hope."
        />

        <Section title="Ice forms outside the cell first">
          <p>
            Plant cells live in two water compartments. There is the fluid
            inside the cell, the symplast, full of sugars, proteins, and the
            chemistry of being alive. And there is the fluid outside, the
            apoplast, which is mostly water filling the spaces between cells
            and saturating the cell wall.
          </p>
          <p>
            The apoplast freezes first. It has fewer dissolved solutes, so
            its freezing point is higher. As the temperature drops below
            32°F, ice crystals begin to form in the spaces between cells, not
            inside them. This is important. If ice only ever formed outside
            the cell, many plants could survive a freeze. Some do. That is
            what cold-hardiness is.
          </p>
        </Section>

        <Section title="The dehydration problem">
          <p>
            As extracellular ice forms, it pulls water out of the cell. Ice
            crystals grow by recruiting nearby water molecules. Since the
            inside of the cell has more liquid water than the now-frozen
            outside, a vapor pressure gradient forms across the cell
            membrane. Water moves from inside the cell to the growing ice
            crystal outside. The cell dehydrates.
          </p>
          <p>
            This is not a gentle process. The cell shrinks. The membrane,
            which is a lipid bilayer that depends on being hydrated to
            maintain its structure, begins to buckle and fold. If the
            dehydration is severe enough, membrane integrity fails. The cell
            cannot recover. It does not matter if the temperature rises
            again. The membrane is gone.
          </p>
        </Section>

        <Section title="Adhesion and the quasi-liquid layer">
          <p>
            Between the ice crystal and the cell wall, there is a
            microscopically thin film of liquid water called the quasi-liquid
            layer, or QLL. It acts as a buffer. As long as the QLL exists,
            the ice crystal and the cell wall remain separated, and the cell
            has a chance.
          </p>
          <p>
            As the temperature drops further, the QLL shrinks. Below a
            certain threshold, the ice crystal bonds directly to the cell
            wall. This is adhesion stress. The ice grips the wall. The wall
            deforms. The plasma membrane, pressed between a contracting cell
            interior and an expanding ice mass, ruptures. The cell is
            finished.
          </p>
          <p>
            Between 0°C and about negative 30°C, the kinetic energy from
            adhesion stress is actually greater than the energy from the
            freezing itself. It is not the cold that kills most garden
            plants. It is the grip of the ice on the wall.
          </p>
        </Section>

        <Section title="Why some plants survive">
          <p>
            Cold-hardy plants have evolved several defenses. They accumulate
            soluble sugars in the apoplast, which does two things: it lowers
            the freezing point of the extracellular fluid, and it expands
            the quasi-liquid layer, keeping ice from bonding to the wall.
            This is also why kale and Brussels sprouts taste sweeter after a
            frost. The sugar is not for you. It is antifreeze.
          </p>
          <p>
            Some plants stiffen their cell walls during cold acclimation,
            making them more resistant to deformation from ice adhesion.
            Others produce ice-binding proteins that adsorb to the surface
            of ice crystals and physically prevent them from growing. These
            are genuine antifreeze proteins, secreted into the apoplast, and
            they work by the same principle as antifreeze proteins in
            Arctic fish.
          </p>
          <p>
            But every defense has a floor. Below that floor, the ice wins.
            For kale, that floor is around 10°F. For garlic underground, it
            is somewhere below negative 10°F. For basil, it is 35°F. Every
            plant has a number. The plant did not choose it.
          </p>
        </Section>

        <Section title="Why frost cloth has limits">
          <p>
            Frost cloth works by trapping a thin layer of air between the
            fabric and the plant. The ground radiates heat upward at night,
            heat it absorbed during the day. The cloth holds some of that
            radiant heat near the plant instead of letting it escape into
            the sky.
          </p>
          <p>
            This is why frost cloth must touch the ground and be sealed at
            the edges. An unsealed cover lets the warm air escape and the
            cold air pour in. It becomes a tent with no campfire. The
            protection comes from the trapped air, not from the fabric
            itself. The fabric is not insulation. It is a radiant heat
            barrier.
          </p>
          <p>
            Even the heaviest consumer frost cloth only adds about 6 to 8
            degrees. That is the ceiling. Doubling up layers helps, but with
            diminishing returns and rapidly decreasing light transmission.
            At some point you are building a greenhouse, and that is a
            different tool with a different cost.
          </p>
          <p>
            Frost cloth cannot protect a plant from a temperature that is 15
            degrees below its kill point. It cannot protect a tomato from a
            hard freeze. It cannot protect basil from anything. What it can
            do is extend the shoulder seasons by a few degrees, and that is
            worth doing. Just know the limits.
          </p>
        </Section>

        <Section title="What cold acclimation means for you">
          <p>
            A plant that has experienced gradually cooling temperatures over
            several weeks is more frost-tolerant than the same plant hit by
            a sudden cold snap. This is cold acclimation. The plant
            restructures its cell membranes, increases sugar concentrations,
            stiffens cell walls, and produces cryoprotective proteins. None
            of this happens overnight.
          </p>
          <p>
            This is why the same broccoli that survives 20°F in December can
            be killed by 28°F in October. It had not acclimated yet. The
            kill temperatures in the table above assume some degree of
            acclimation. An early fall frost will do more damage at the same
            temperature than a midwinter frost on the same crop.
          </p>
          <p>
            Duration matters too. Three hours at 28°F does less damage than
            twelve hours at 28°F. A clear, still, dry night is the worst
            case: the ground loses heat fastest, cold air pools in low
            spots, and the plants sit in it for hours. Clouds, wind, and
            humidity all moderate frost severity. The forecast says 28°F,
            but the holler says 24.
          </p>
        </Section>

        <Section title="Sources">
          <p>
            The cell wall research referenced here comes from work on the
            quasi-liquid layer, adhesion stress, and freezing-induced
            dehydration published in Plant and Cell Physiology. The
            practical frost tolerance data draws from extension programs at
            SDSU, Texas A&amp;M, UMass Amherst, and Sustainable Market
            Farming. The ZIP-prefix frost date table is built from NOAA
            30-year normals for the 1991-2020 period, aggregated by 3-digit
            ZIP region. Pairs with the{' '}
            <a href="/tools/seed-starting" style={{ color: 'var(--green)', textDecoration: 'underline' }}>
              seed starting calendar
            </a>.
          </p>
        </Section>

      </article>
    </div>
  )
}

const FIGURE_GRADIENTS: Record<string, string> = {
  water:    'radial-gradient(ellipse at 50% 30%, rgba(120,160,200,0.6) 0%, transparent 60%), linear-gradient(180deg, #5a7a90 0%, #3a5a70 50%, #1a3040 100%)',
  timing:   'radial-gradient(ellipse at 60% 50%, rgba(180,140,90,0.6) 0%, transparent 60%), linear-gradient(160deg, #8a6a3a 0%, #5a4528 50%, #2a1f10 100%)',
  soil:     'radial-gradient(ellipse at 40% 60%, rgba(140,100,60,0.7) 0%, transparent 60%), linear-gradient(160deg, #6a4a2a 0%, #3a2818 50%, #1a1208 100%)',
  planning: 'radial-gradient(ellipse at 50% 40%, rgba(100,140,80,0.7) 0%, transparent 60%), linear-gradient(160deg, #5a7a3a 0%, #2a4a18 50%, #102008 100%)',
  frost:    'radial-gradient(ellipse at 35% 30%, rgba(220,235,250,0.55) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(180,200,225,0.4) 0%, transparent 60%), linear-gradient(170deg, #6a8aa0 0%, #3d5a78 45%, #1c2a3c 100%)',
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
        background: src ? `center/cover no-repeat url(${src})` : (gradient ? FIGURE_GRADIENTS[gradient] : FIGURE_GRADIENTS.frost),
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
