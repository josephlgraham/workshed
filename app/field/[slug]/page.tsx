import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ShareButton from '@/components/ShareButton'

// Add new notes here as they publish. Matches the slugs in /field/page.tsx and feed.xml.
const NOTES: Record<string, {
  title: string
  date: string
  tag: string
  tagLabel: string
  body: React.ReactNode
}> = {
  'a-ram-pump-for-the-stream': {
    title: 'A ram pump for the stream',
    date: '2026-05-31',
    tag: 'building',
    tagLabel: 'Building',
    body: (
      <>
        <p>
          There is a stream below the house. There is also no power within a
          few hundred feet of it, and no reason there ever will be. For most of
          the year that water just runs past on its way somewhere else. I want
          some of it in my garden instead.
        </p>
        <p>
          Right now my whole water setup is a 55-gallon drum off the porch
          downspout. It catches enough rain to keep the porch pots and a few
          other plants going, and when it runs dry I wait for the sky or I
          carry water. That works until it doesn&rsquo;t. The garden has
          outgrown a barrel.
        </p>
        <p>
          A hydraulic ram pump is the old answer to this, and it is a good one.
          No electricity, no fuel, almost nothing that moves except two valves.
          You feed it a steady fall of water down a pipe. The water picks up
          speed, a valve slams shut, and that sudden stop (the same water
          hammer that bangs the pipes in your walls) shoves a small fraction of
          the flow up a much narrower line to somewhere much higher. Then it
          resets and does it again, a couple of times a second, all day and all
          night. You trade a lot of water falling a little for a little water
          climbing a lot.
        </p>
        <p>
          I have not built one yet. What I know so far I owe to Seth at Land to
          House, who has put up more clear, practical ram pump footage than
          anyone I have found. This is the build I keep coming back to.
        </p>

        <figure style={{ margin: '0.25rem 0', width: '100%', alignSelf: 'stretch' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
            borderRadius: 2,
            background: '#000',
          }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/_8Xmhq06SKg"
              title="Land to House — building a hydraulic ram pump"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            />
          </div>
          <figcaption style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            lineHeight: 1.5,
            color: 'var(--ink-muted)',
            marginTop: '0.6rem',
          }}>
            Seth&rsquo;s ram pump build at{' '}
            <a
              href="https://www.youtube.com/watch?v=_8Xmhq06SKg"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--rust)' }}
            >Land to House</a>. Credit where it is due. I am working from his footage.
          </figcaption>
        </figure>

        <p>
          The plan, roughly: set the ram at the stream where I can get a few
          feet of fall on the drive pipe, then run the output line uphill to an
          IBC tote (one of those 275-gallon caged plastic totes) on a stand near
          the garden. That tote is the water tower. Once it is full and up high,
          gravity does the rest, and I can run soaker hoses through the beds off
          the bottom of it. Seth builds a tote tower in another video, and it is
          basically the shape of what I want.
        </p>
        <p>
          The parts I still have to work out are the unglamorous ones. How much
          fall I can actually get at the stream, and how that fall compares to
          the lift up to the tote, because that ratio matters more than anything
          else. What the flow looks like in August and not just in spring. How
          to keep leaves and grit out of the drive pipe. And what happens the
          first hard freeze, because a ram pump full of ice is just an expensive
          length of pipe.
        </p>
        <p>
          For now it is a barrel and a plan. But a machine that lifts water all
          day on nothing but more water is the kind of thing I would build just
          to stand there and watch it work.
        </p>
      </>
    ),
  },
}

const TAG_COLORS: Record<string, string> = {
  growing:  'var(--green)',
  watching: 'var(--sunflower)',
  pests:    'var(--rust)',
  reading:  'var(--ink-muted)',
  building: 'var(--rust)',
}

export function generateStaticParams() {
  return Object.keys(NOTES).map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const note = NOTES[slug]
  if (!note) return { title: 'Not Found · Workshed' }
  return {
    title: `${note.title} · Workshed`,
    description: note.title,
  }
}

export default async function FieldNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = NOTES[slug]
  if (!note) notFound()

  const dateFormatted = new Date(note.date + 'T12:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
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
        <a href="/field" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Field Notes</a>
        <span>·</span>
        <span style={{ color: TAG_COLORS[note.tag] ?? 'var(--ink-muted)' }}>{note.tagLabel}</span>
      </nav>
      <ShareButton title={`${note.title} · Workshed`} />
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--ink)',
        marginBottom: '1rem',
      }}>
        {note.title}
      </h1>

      <div style={{
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '0.68rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ink-muted)',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--rule)',
      }}>
        {dateFormatted}
      </div>

      <article style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        lineHeight: 1.8,
        color: 'var(--ink-soft)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>
        {note.body}
      </article>

      <div style={{
        marginTop: '3rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--rule)',
      }}>
        <a href="/field" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          letterSpacing: '0.08em',
          color: 'var(--ink-muted)',
          textDecoration: 'none',
        }}>
          &larr; All field notes
        </a>
      </div>

    </div>
  )
}
