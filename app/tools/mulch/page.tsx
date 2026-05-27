import type { Metadata } from 'next'
import MulchCalculator from '@/components/tools/MulchCalculator'
import Section from '@/components/tools/Section'

export const metadata: Metadata = {
  title: 'Mulch Math · Workshed',
  description: 'How much mulch you actually need for your beds, paths, or tree rings. Pick a depth, enter your area, get cubic yards, cubic feet, and bag counts. Then buy 10% more.',
}

export default function MulchPage() {
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
        <span>Mulch</span>
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
        Mulch Math
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 600,
      }}>
        How much mulch you actually need for your beds, paths, or tree rings.
        Pick a depth, enter your area, and get the number in cubic yards,
        cubic feet, and bags. Then buy 10% more, because you will use it.
      </p>

      {/* Calculator */}
      <MulchCalculator />

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
        Mulch is permission to leave the bed alone for a while.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="Why mulch matters more than most things you do in the garden">
          <p>
            Mulch is not decorative. It is one of the highest-leverage things you
            can do for your beds, and the fact that it also looks good is a bonus,
            not the point. A proper layer of mulch does at least four things at
            once: it holds moisture in the soil, it suppresses weed germination,
            it insulates roots from temperature swings, and it prevents soil from
            splashing up onto your plants during rain. That last one matters more
            than people realize. Soil splash is how many fungal diseases reach
            plant leaves. A three-inch layer of mulch between the dirt and the
            canopy is a physical barrier between your tomatoes and the blight
            spores sitting in the soil surface.
          </p>
          <p>
            Over time, organic mulch breaks down and feeds the soil from the top,
            which is exactly how a forest floor works. You are not adding a
            product. You are mimicking a process that has been running without
            interruption for a very long time.
          </p>
        </Section>

        <Section title="How deep should mulch be">
          <p>
            Three inches is the standard recommendation, and it is the standard
            for a reason. At three inches you get meaningful weed suppression
            (light cannot reach most weed seeds), good moisture retention, and
            reasonable insulation. Less than two inches and you are mostly
            decorating. More than four inches and you risk suffocating shallow
            roots, trapping excess moisture against plant stems, and creating
            habitat for voles and other rodents who enjoy the cover.
          </p>
          <p>
            The exception is tree rings and pathways, where four to six inches is
            fine because you are not mulching around plant stems and the ground
            underneath is not expected to breathe the same way. If you are
            mulching around trees, pull the mulch back from the trunk. The mulch
            volcano you see at commercial properties, where bark is mounded
            against the trunk, causes rot and invites disease into the bark
            layer. The correct shape is a donut, not a volcano.
          </p>
        </Section>

        <Section title="Cedar chips and pest deterrence">
          <p>
            Cedar contains natural oils, primarily thujone and plicatic acid,
            that repel or inhibit a range of insects. This is not garden
            folklore. It is the reason cedar is used in closets, chests, and
            outdoor furniture. In the garden, cedar mulch creates an environment
            that many soft-bodied pests find unpleasant. It will not eliminate
            every pest, but it makes the surface of your beds a less hospitable
            place for slugs, certain beetles, and some ant species. It also
            resists fungal growth better than most hardwood mulches, which means
            it holds its shape longer and does not develop the sour smell that
            poorly decomposed hardwood bark sometimes produces.
          </p>
          <p>
            Cedar chips are more expensive per yard than generic hardwood mulch.
            They also last roughly twice as long before needing a refresh.
            Whether that tradeoff makes sense depends on your priorities, but
            the math usually favors cedar on a per-year basis, especially in
            beds you want to set and forget.
          </p>
        </Section>

        <Figure
          src="/photos/mulch.jpg"
          alt="Cedar mulch freshly laid in a garden bed"
          gradient="soil"
          caption="Three inches of cedar, freshly laid. The brown is loud for a week, then it settles."
        />

        <Section title="Soil splash and disease prevention">
          <p>
            When rain hits bare soil, it throws tiny droplets of dirt into the
            air. Those droplets land on the lowest leaves of your plants and
            carry with them whatever was living in the top layer of soil. In
            most garden soils that includes fungal spores for early blight,
            septoria leaf spot, and other common diseases. The standard advice
            is to prune lower leaves to prevent contact, and that works, but it
            is treating the symptom. Mulch treats the cause. A layer of mulch
            absorbs the impact of rain and eliminates the splash. The dirt stays
            on the ground. The spores stay on the ground. Your leaves stay
            clean.
          </p>
          <p>
            This matters most for tomatoes, peppers, and other nightshades that
            are susceptible to soil-borne fungal diseases. If you have ever lost
            a tomato plant to early blight that seemed to climb from the bottom
            up, you have seen what soil splash does. Mulching alone will not
            stop blight if conditions are right for it, but it removes one of
            the primary delivery mechanisms.
          </p>
        </Section>

        <Section title="Bags versus bulk">
          <p>
            Bagged mulch at a home improvement store is convenient. It is also
            the most expensive way to buy mulch by a wide margin. A two-cubic-foot
            bag typically runs $3 to $6. A cubic yard is 27 cubic feet, which is
            13.5 bags. At $4 per bag, that is $54 for a cubic yard of mulch. A
            landscape supply yard will sell the same cubic yard for $25 to $45
            delivered, depending on your area and the type of mulch. The savings
            get larger as the volume goes up.
          </p>
          <p>
            The tradeoff is that bulk mulch arrives in a pile in your driveway
            and you move it with a wheelbarrow and a pitchfork. If you need less
            than about two cubic yards, bags might still make sense because you
            can buy exactly what you need and carry them directly to the bed.
            Over two yards, bulk is almost always the better deal. Over four
            yards, buying bags is genuinely unreasonable.
          </p>
        </Section>

        <Section title="Cubic feet versus cubic yards">
          <p>
            One cubic yard equals 27 cubic feet. Bags are sold in cubic feet.
            Bulk deliveries are sold in cubic yards. This is the conversion that
            trips people up, and it is the reason the calculator above shows
            both. A cubic yard is roughly a pile three feet wide, three feet
            long, and three feet tall. It covers about 100 square feet at three
            inches deep.
          </p>
          <p>
            If someone tells you a cubic yard does not look like much when it is
            on the ground, they are right. It spreads thinner than you expect,
            which is why the 10% extra slider exists. Between settling, edges,
            low spots, and the parts of the bed you forgot to measure, the math
            almost always comes up short. Round up.
          </p>
        </Section>

        <Section title="When to mulch">
          <p>
            Spring, after the soil has warmed and you have finished planting.
            Mulching too early in spring traps cold soil and delays root growth.
            In the South, that usually means late April through May. The second
            window is late fall, when you are putting beds to rest for winter
            and want to insulate perennial roots and suppress winter weeds.
          </p>
          <p>
            If your existing mulch has thinned to less than two inches, top it
            off. You do not need to remove old mulch before adding new mulch
            unless it has gone sour (anaerobic decomposition producing a vinegar
            or sulfur smell). In that case, rake it out, let it dry in the sun
            for a day, and either compost it or reapply it once it has aired
            out.
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
}

function Figure({ src, alt, gradient, caption }: {
  src?: string
  alt?: string
  gradient?: keyof typeof FIGURE_GRADIENTS
  caption?: string
}) {
  return (
    <figure style={{
      // Slight breakout: article column is 680, page wrap is 820
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
      <style>{`
        @media (max-width: 760px) {
          .ws-figure { margin-left: 0 !important; margin-right: 0 !important; }
        }
      `}</style>
    </figure>
  )
}
