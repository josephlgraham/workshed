import { sortGame } from '@/lib/garden'

/** Decorative background emojis drawn from the actual game items —
 *  mostly organic (compost) with a couple of odd ones (battery, bulb). */
const EMOJIS = [
  { ch: '🍌', top: '12%', left: '5%', size: '2.6rem', dur: '7s', delay: '0s', rot: '-14deg' },
  { ch: '🍎', top: '58%', left: '11%', size: '2.1rem', dur: '6.2s', delay: '1.1s', rot: '9deg' },
  { ch: '🌿', top: '30%', left: '22%', size: '2.4rem', dur: '8s', delay: '0.5s', rot: '-6deg' },
  { ch: '🥚', top: '72%', left: '31%', size: '1.9rem', dur: '6.6s', delay: '2s', rot: '12deg' },
  { ch: '🍕', top: '16%', left: '44%', size: '2.5rem', dur: '7.4s', delay: '0.8s', rot: '7deg' },
  { ch: '🔋', top: '66%', left: '52%', size: '1.9rem', dur: '6s', delay: '1.5s', rot: '-11deg' },
  { ch: '🌿', top: '24%', left: '63%', size: '2.2rem', dur: '7.8s', delay: '0.3s', rot: '14deg' },
  { ch: '🍎', top: '70%', left: '72%', size: '2rem', dur: '6.4s', delay: '1.8s', rot: '-8deg' },
  { ch: '💡', top: '14%', left: '82%', size: '2.1rem', dur: '7.2s', delay: '0.6s', rot: '10deg' },
  { ch: '🍌', top: '56%', left: '90%', size: '2.5rem', dur: '8.2s', delay: '1.3s', rot: '-13deg' },
]

export default function SortItCallout({ marginBottom = 0 }: { marginBottom?: string | number }) {
  return (
    <a href={sortGame.href} className="ws-sortit" style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '2rem 2.25rem', marginBottom,
      background: 'var(--paper-tint)', border: '2px solid var(--sunflower)',
      textDecoration: 'none', color: 'var(--ink)', transition: 'all 0.25s',
    }}>
      <span aria-hidden="true" className="ws-sortit-bg">
        {EMOJIS.map((e, i) => (
          <span key={i} style={{
            top: e.top, left: e.left, fontSize: e.size,
            animationDuration: e.dur, animationDelay: e.delay,
            ['--r']: e.rot,
          } as React.CSSProperties}>{e.ch}</span>
        ))}
      </span>
      <span className="ws-sortit-content">
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)' }}>Featured · Play</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', lineHeight: 1.1 }}>{sortGame.title}</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--ink-soft)', maxWidth: '60ch' }}>{sortGame.blurb}</span>
      </span>
      <style>{`
        .ws-sortit { position: relative; overflow: hidden; }
        .ws-sortit:hover { transform: translateY(-2px); box-shadow: 0 10px 24px var(--shadow); }
        .ws-sortit-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        .ws-sortit-bg span {
          position: absolute; opacity: 0.18; line-height: 1;
          transform: rotate(var(--r, 0deg));
          animation-name: ws-sortit-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }
        .ws-sortit-content { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0.6rem; }
        @keyframes ws-sortit-float {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--r, 0deg)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ws-sortit-bg span { animation: none; }
        }
      `}</style>
    </a>
  )
}
