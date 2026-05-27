import type { Metadata } from 'next'
import SquareFootPlanner from '@/components/tools/SquareFootPlanner'
import Section from '@/components/tools/Section'

export const metadata: Metadata = {
  title: 'Square Foot Planner · Workshed',
  description: 'Plan what goes where in a raised bed using square foot spacing. Pick a crop, click squares to place it, and the planner flags companion and antagonist pairings so the right plants end up next to each other.',
}

export default function SquareFootPage() {
  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

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
        <span>Planning</span>
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
        Square Foot Planner
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 640,
      }}>
        Plan what goes where in a raised bed using square foot spacing. Pick
        a crop, click squares to place it, and the planner will flag
        companion and antagonist pairings so the right plants end up next to
        each other.
      </p>

      {/* Planner */}
      <SquareFootPlanner />

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
        Some plants want to be left alone. Some want a little fuss. The hard
        part is asking.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="What square foot gardening actually is">
          <p>
            Square foot gardening is a method of growing food in raised beds
            divided into a grid of one-foot squares. Each square gets a
            specific number of plants based on the mature size of the crop.
            A tomato gets one square to itself. Carrots fit sixteen in a
            single square. The grid eliminates the guesswork of row spacing
            and makes it possible to grow a surprising amount of food in a
            small area.
          </p>
          <p>
            The method was popularized by Mel Bartholomew in the 1980s. The
            core insight is that traditional row gardening wastes enormous
            amounts of space on walkways between rows. In a 4×8 raised bed
            with a grid, every square inch is growing space. The walkways
            are around the bed, not inside it. A 4×8 bed using square foot
            spacing can outproduce a 10×20 row garden because more of the
            area is actually planted.
          </p>
        </Section>

        <Section title="The grid template and why it helps">
          <p>
            A physical grid template that sits on top of the bed is the
            single most useful tool for square foot gardening. You can make
            one from wood strips, PVC pipe, venetian blinds, or string, but
            the hard plastic commercial grids are worth the money if you
            plan to use the method across multiple seasons. They do not
            rot, they snap together, and they stay square.
          </p>
          <p>
            The grid does two things. First, it physically marks where each
            square is so you are not eyeballing spacing. Second, and more
            importantly, it changes how you think about the bed. Without a
            grid, a raised bed is one big planting area and the temptation
            is to crowd things in. With a grid, each square is a decision.
            One tomato here. Four lettuce there. Nine onions in that corner.
            It forces you to plan, and planning is the difference between a
            bed that produces and a bed that turns into a tangle by July.
          </p>
        </Section>

        <Figure
          src="/photos/square-foot.jpg"
          alt="Raised bed marked into a square foot grid"
          gradient="planning"
          caption="Four feet by eight, marked off with twine. The grid does the thinking before the planting does."
        />

        <Section title="Companion planting: what the research actually says">
          <p>
            Companion planting has a reputation problem. Most of what
            circulates on the internet is folklore passed from one blog to
            the next without citation. &ldquo;Plant basil with tomatoes&rdquo;
            is everywhere. The reason why, and whether it is actually
            supported by research, is usually missing.
          </p>
          <p>
            The truth is that some companion planting relationships are
            well documented and others are not. French marigolds suppress
            root-knot nematodes in soil. This is not folklore. It has been
            demonstrated in controlled studies at multiple universities.
            The active compounds in marigold roots are lethal to nematodes,
            and the effect persists in the soil after the marigolds are
            removed. That is real.
          </p>
          <p>
            The Three Sisters planting, corn, beans, and squash, is also
            well supported. Beans fix atmospheric nitrogen and make it
            available in the soil. Corn provides a physical structure for
            beans to climb. Squash shades the ground, suppressing weeds and
            retaining moisture. Each plant contributes something the others
            need. This is intercropping, and it works for documented
            reasons.
          </p>
          <p>
            On the antagonist side, alliums (onions, garlic) inhibiting
            legume growth is consistent across sources and is attributed
            to allelopathic compounds. Potatoes and tomatoes sharing
            disease pressure is basic plant pathology: they are the same
            family and host the same pathogens. Dill inhibiting tomato
            growth when mature is documented, though dill at the seedling
            stage may actually benefit tomatoes by attracting beneficial
            insects. Context matters.
          </p>
          <p>
            The companion data in the planner above is limited to pairings
            that have research or strong extension-service support. If a
            pairing is not listed, it means the evidence was not strong
            enough to include, not that the pairing is neutral. The absence
            of data is not the same as the presence of proof.
          </p>
        </Section>

        <Section title="How to think about spacing in small beds">
          <p>
            The spacing numbers in the planner come from the square foot
            gardening method and are based on mature plant size. One tomato
            per square foot is tight. It works, but only if you are
            aggressive about pruning suckers and using a cage or stake to
            keep the plant vertical. If you let a tomato sprawl, it will
            take over three or four squares and shade everything around
            it.
          </p>
          <p>
            Vertical growing changes the math. Pole beans at eight per
            square foot is dense, but on a trellis the canopy is vertical
            and the ground footprint stays small. Cucumbers trellised
            vertically fit two per square instead of one. Any vining crop
            benefits from growing up instead of out, and in a small bed it
            is often the difference between fitting three crops and fitting
            six.
          </p>
          <p>
            Succession planting is the other lever. Radishes are done in
            three weeks. Lettuce in six. When a fast crop finishes, that
            square is open for something new. A single 4×4 bed can produce
            three rotations of fast crops in a season if you replant
            promptly. The grid makes this obvious: when a square is empty,
            it is asking for something.
          </p>
        </Section>

        <Section title="Why companion planting matters more in small spaces">
          <p>
            In a row garden with wide spacing, companion planting is a
            nice-to-have. The plants are far enough apart that
            antagonistic effects are diluted by distance. In a 4×4 raised
            bed, every plant is a neighbor. The root zones overlap. The
            canopies touch. Allelopathic effects that would be negligible
            across a ten-foot row become significant across a twelve-inch
            square.
          </p>
          <p>
            This is why the planner flags both good and bad pairings at
            the neighbor level. If your tomato and your potato share an
            edge in a square foot grid, they share disease pressure in a
            way that two plants twenty feet apart in a row garden would
            not. The tighter the space, the more your planting decisions
            matter.
          </p>
        </Section>

        <Section title="Common mistakes with square foot beds">
          <p>
            The first mistake is ignoring height and shade. A corn square
            on the south side of a 4×4 bed will shade everything north of
            it for most of the day. Put tall crops on the north side or
            the trellis end so they do not block sun from shorter
            neighbors. This is basic geometry, but it is easy to forget
            when you are focused on spacing numbers.
          </p>
          <p>
            The second mistake is underestimating squash. Summer squash and
            zucchini at one per square foot is technically correct, but a
            healthy zucchini plant will sprawl well beyond its square by
            midsummer. If you are planting squash in a 4×4 bed, put it on a
            corner so it can spill over the edge instead of smothering the
            carrots.
          </p>
          <p>
            The third mistake is treating the bed like a permanent
            installation. A square foot bed is a living system. Crops
            finish, squares open up, and new things go in. If you plant
            the whole bed on the same day and harvest everything at the
            same time, you are leaving months of growing season unused.
            Stagger planting dates, replant empty squares, and treat the
            bed as an ongoing project, not a single event.
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
      margin: '2.5rem -70px 2.5rem',
      maxWidth: 820,
    }} className="ws-figure">
      <div style={{
        aspectRatio: '4/3',
        background: src ? `center/cover no-repeat url(${src})` : (gradient ? FIGURE_GRADIENTS[gradient] : FIGURE_GRADIENTS.planning),
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
