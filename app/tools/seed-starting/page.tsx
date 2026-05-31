import type { Metadata } from 'next'
import SeedStartingCalendar, { SpecialCasesGrid } from '@/components/tools/SeedStartingCalendar'
import Section from '@/components/tools/Section'
import ShareButton from '@/components/ShareButton'

export const metadata: Metadata = {
  title: 'Seed Starting Calendar · Workshed',
  description: 'Pick your last frost date. Get a schedule for every common warm- and cool-season crop. Direct sow leads where it should, indoor starts show up only where they earn their keep.',
}

export default function SeedStartingPage() {
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
        <span>Timing</span>
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
        Seed Starting Calendar
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        lineHeight: 1.65,
        color: 'var(--ink-soft)',
        marginBottom: '2.5rem',
        maxWidth: 640,
      }}>
        Pick your last frost date. Get a schedule for every common warm- and
        cool-season crop. The calendar leads with what to direct sow and when.
        Indoor-start dates show up only where they actually earn their keep.
      </p>

      {/* Calculator */}
      <SeedStartingCalendar />

      {/* Pull quote */}
      <blockquote style={{
        border: '2px solid var(--green)',
        padding: '1.25rem 1.5rem',
        margin: '0 0 3rem',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.05rem',
        lineHeight: 1.6,
        color: 'var(--ink-soft)',
        maxWidth: 600,
      }}>
        The gardener who wants proof too early digs up the seed.
      </blockquote>

      {/* Editorial prose */}
      <article style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink)', maxWidth: 680, margin: '0 auto' }}>

        <Section title="How seed-starting timing actually works">
          <p>
            Every seed packet quotes weeks before last frost because last frost
            is the only useful anchor point for a gardening calendar. It is not
            a perfect signal, but it is better than calendar dates alone. April
            1 in zone 8a is not the same garden week as April 1 in zone 6,
            even though the calendar pretends otherwise. Your last frost date
            is the real start of your warm-season garden.
          </p>
          <p>
            Once you know your frost date, the math is simple subtraction. A
            pepper packet says start indoors 8 weeks before last frost. Count
            back 8 weeks from your date and you have your sowing day. The
            calculator above does this for every crop in one shot.
          </p>
        </Section>

        <Section title="Why direct sowing usually wins">
          <p>
            Most home gardeners overuse indoor starts. The seed-starting
            industry sells flats and heat mats and grow lights because starting
            kits are profitable, not because every crop benefits from one.
            Beans, squash, cucumbers, melons, corn, okra, southern peas, and
            root crops like carrots and beets all do better when seeded directly
            into warm garden soil.
          </p>
          <p>
            The reasons are simple. Many of these plants have sensitive root
            systems that resent disturbance. Their stems develop better wind
            tolerance and disease resistance from being outdoors from day one.
            They catch up to and usually pass transplants within two weeks of
            germination. And direct sowing means no hardening off, no tray
            cleaning, no grow lights, no juggling space on a sunny windowsill.
          </p>
        </Section>

        <Figure
          src="/photos/seed-starting.jpg"
          alt="Seed starting trays under grow lights"
          gradient="timing"
          caption="The first transplant of the season. The light is wrong and the wind is wrong, and they survive anyway."
        />

        <Section title="When indoor starting actually helps">
          <p>
            The crops that genuinely benefit from a head start indoors are the
            long-season warm-weather ones: tomatoes, peppers, eggplant, and a
            few brassicas. These plants need 70 to 100+ days of warm weather to
            produce fruit, and the South does not always cooperate. Starting
            them indoors 6 to 10 weeks before your last frost gives them a
            fighting chance to mature and crop before the first fall cold snap.
          </p>
          <p>
            Cauliflower, brussels sprouts, and artichokes also need indoor
            starting because of their long maturity windows. Beyond those,
            indoor starting is mostly optional, sometimes counterproductive,
            and rarely required.
          </p>
        </Section>

        <Section title="If you started seeds indoors, harden them off">
          <p>
            Indoor seedlings have spent their entire lives in still air, gentle
            light, and a steady temperature. Throw them straight outside and
            you will lose plants. Or worse, watch them limp through their first
            month and never really recover.
          </p>
          <p>
            The shorthand: 7 to 10 days of gradual exposure. Start with a couple
            of hours in shade. Add wind, sun, and time each day. Bring them in
            (or cover them) on cold nights. The wind matters as much as the
            temperature. Indoor seedlings have spindly stems that have not
            earned their stiffness yet, and a few breezy afternoons fix that
            fast.
          </p>
          <p>
            Watch the forecast. A late cold snap after you have already moved
            your tomatoes outside is the fastest way to learn this lesson the
            hard way. Even after they are hardened off, throw a sheet over them
            if a freak frost is coming. The forecast does not always know about
            a holler microclimate.
          </p>
        </Section>

        <Section title="Common mistakes">
          <p>
            Planting too early is the most common one. Spring fever is real
            and patience is hard. Tomatoes set out two weeks early in cold soil
            do not get a head start, they get stunted. Peppers go on hunger
            strike. The calendar is a guide. Your soil thermometer is the truth.
            Beans, corn, and squash all want soil at 60°F or above. Seeds in
            colder soil rot before they germinate.
          </p>
          <p>
            The second mistake is skipping hardening off. Indoor seedlings get
            killed or set back by direct exposure to wind and sun, and seven to
            ten days of gradual transition is non-negotiable. Related: cucumbers,
            squash, melons, and pumpkins outgrow their pots fast. Two to three
            weeks before transplant date is plenty. Any earlier and they get
            root-bound, set back, or both.
          </p>
          <p>
            The last one is treating your frost date as permanent. Average last
            frost is an average. A holler microclimate can be a week off in
            either direction. Track your own actual last frost over a few years
            and adjust. The best gardeners are the ones who keep notes.
          </p>
        </Section>

        <Section title="Zone 8a and the Deep South">
          <p>
            The Deep South has a peculiar growing calendar. Spring is short.
            Summer is long, hot, and sometimes hostile. Fall is the second
            spring most gardeners up north never get. This shapes everything
            about seed starting here.
          </p>
          <p>
            Cool-season crops in zone 8a are mostly fall crops, not spring
            crops. Lettuce, spinach, broccoli, cabbage, kale, collards,
            mustard, and turnips all do better seeded in late summer for fall
            and winter harvest than they do in February for a sprint before
            the heat. The schedule above shows spring dates for these because
            that is the seed-packet convention, but if you have got space in
            August and September, those plantings will outyield a spring
            planting almost every year.
          </p>
          <p>
            Warm-season crops, on the other hand, get a long runway here.
            Tomatoes can produce for months. Peppers will set fruit until the
            first frost. Southern peas and okra hit their stride when northern
            gardens are giving up. Lean into what the climate gives you instead
            of fighting it.
          </p>
        </Section>

      </article>

      {/* Special cases — separate full-width section, like a sidebar article */}
      <section style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--rule)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
          }}>
            Plant on a different schedule
          </h2>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}>
            Sets · slips · crowns · rhizomes
          </span>
        </div>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
          marginBottom: '1.5rem',
          maxWidth: 680,
        }}>
          These do not follow the standard seed-starting calendar. Some are
          fall-planted. Some grow from sets, slips, rhizomes, or crowns. Some
          are perennials that get planted once and stay put.
        </p>
        <SpecialCasesGrid />
      </section>

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
        background: src ? `center/cover no-repeat url(${src})` : (gradient ? FIGURE_GRADIENTS[gradient] : FIGURE_GRADIENTS.timing),
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

