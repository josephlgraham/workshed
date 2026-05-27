import type { Metadata } from 'next'
import RainwaterCalculator from '@/components/tools/RainwaterCalculator'
import Section from '@/components/tools/Section'

export const metadata: Metadata = {
  title: 'Rainwater Harvest Calculator · Workshed',
  description: 'How much water can you capture from your roof? Enter your catchment area and a rainfall amount to size a rain barrel, plan overflow, and understand how far the water actually goes.',
}

export default function RainwaterPage() {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

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
        <span>Rainwater</span>
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
        Rainwater Harvest Calculator
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 600,
      }}>
        How much water you can actually catch off a roof, a porch, or a shed,
        given a particular rainfall. Useful for sizing a barrel, planning overflow,
        and getting honest about how far the water will go.
      </p>

      {/* Calculator */}
      <RainwaterCalculator />

      {/* Pull quote */}
      <blockquote style={{
        borderLeft: '3px solid var(--green)',
        paddingLeft: '1.25rem',
        margin: '0 0 3rem',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        lineHeight: 1.6,
        color: 'var(--ink-soft)',
      }}>
        Water finds the lowest place without being told. The gardener takes longer.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="How the math works">
          <p>
            An inch of rain over a square foot of roof is roughly 0.623 gallons.
            That's the theoretical ceiling. Real catchment runs lower because some
            water splashes off, some evaporates on hot shingles, and some gets lost
            at the gutter, the elbow, the first-flush diverter if you have one. A
            reasonable efficiency for a typical asphalt shingle roof in good repair
            is 85%. Metal roofs run a little higher. A patchy roof with leaf-clogged
            gutters runs lower.
          </p>
          <p>
            The "catchment area" you want is the roof's footprint, not the slope
            length. If you stood directly above the section of roof you're harvesting
            from and looked down, the rectangle you'd see is the number to use. A
            steeper roof does not catch more rain than a flatter roof of the same
            footprint. Rain falls vertically.
          </p>
        </Section>

        <Section title="What a 55-gallon barrel actually does">
          <p>
            The first thing to know: 55 gallons of water weighs about 460 pounds.
            That changes a lot of decisions, and it's the reason a barrel that looked
            light when you carried it home is now effectively a permanent installation.
          </p>
          <p>
            The second thing: a barrel fills faster than people expect. A modest 24 sq
            ft section of porch roof at 85% efficiency produces about 2.5 gallons from
            just two-tenths of an inch of rain. A half-inch storm off that same section
            gives you 6+ gallons. A full inch off a 200 sq ft roof section fills the
            barrel and overflows. Plan for the overflow now, not after the first storm.
          </p>
        </Section>

        <Section title="Height, pressure, and the hose problem">
          <p>
            Rain barrels are gravity-fed. Every foot of elevation above the spigot
            gives you about 0.43 PSI. A barrel sitting on cinder blocks two feet up
            produces under 1 PSI, enough to fill a watering can, not enough to run
            a sprinkler.
          </p>
          <p>Three honest options:</p>
          <ul style={ulStyle}>
            <li><strong>Fill a watering can from the spigot.</strong> This is what most rain barrels actually get used for. Slow but it works.</li>
            <li><strong>Run a short soaker hose.</strong> Works at gravity pressure if the barrel is slightly higher than the bed. A standard garden hose to a spray head will disappoint you.</li>
            <li><strong>Add a pump.</strong> A small submersible or 12V transfer pump gives real hose pressure. Plan for the pump and a power source.</li>
          </ul>
        </Section>

        <Section title="Raising a barrel safely">
          <p>
            A 460-pound barrel tipping off cinder blocks is the kind of thing that
            breaks a foot. If you raise it: fully level base, wider than the barrel,
            on solid ground, tied back to the wall. Two blocks high is a sane upper
            limit. More pressure than that. Use a pump instead.
          </p>
        </Section>

        <Section title="The other essentials">
          <ul style={ulStyle}>
            <li><strong>Mosquito screen.</strong> Fine mesh at every opening (inlet, overflow, lid). Hardware cloth is too coarse. Window screen is the standard.</li>
            <li><strong>Overflow routing.</strong> Route it away from the foundation. A hose to a spot in the yard that won't mind being wet is the move.</li>
            <li><strong>First-flush diverter.</strong> Optional but worth it if you're watering edibles. Routes the initial dirty runoff away before filling the barrel.</li>
            <li><strong>Daisy-chaining.</strong> Link a second barrel with a short hose between matching bulkhead fittings. They equalize. More capacity without raising anything.</li>
            <li><strong>Winter.</strong> In any climate that freezes: drain it, disconnect the downspout, leave the spigot open, flip or cover. A sealed full barrel cracks.</li>
            <li><strong>Drinking water.</strong> Don't. Roof runoff is not potable without serious filtration. Fine for the garden, not for people.</li>
          </ul>
        </Section>

        <Section title="When the calculator is most useful">
          <p>
            Most home rain barrel setups are catchment-limited, not rain-limited. In
            most growing seasons, there's enough rain. The bottleneck is how much roof
            area is feeding the barrel and how much storage you have. Run the calculator
            against your actual catchment section and a typical local rainfall (a tenth of an inch, half an inch, an inch), and you'll see how often the barrel
            overflows. That tells you whether to add a second barrel, route the overflow
            somewhere useful, or accept the loss.
          </p>
        </Section>

      </article>
    </div>
  )
}

const ulStyle: React.CSSProperties = {
  paddingLeft: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
  margin: 0,
}
