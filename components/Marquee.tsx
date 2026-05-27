import type { MarqueeItem } from '@/lib/types'

interface Props {
  items: MarqueeItem[]
}

export default function Marquee({ items }: Props) {
  // Duplicate the list so the seamless loop works (translateX -50%)
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        position: 'relative', zIndex: 10, overflow: 'hidden',
        padding: '0.625rem 0',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--color-border)',
        background: `linear-gradient(90deg,
          rgba(124,58,237,0.35) 0%,
          rgba(236,72,153,0.35) 50%,
          rgba(52,211,153,0.35) 100%)`,
      }}
      className="marquee-bar"
    >
      <div
        style={{
          display: 'flex', gap: '3rem', whiteSpace: 'nowrap',
          animation: 'marquee 50s linear infinite',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem', letterSpacing: '0.02em',
          color: 'var(--color-text)', fontWeight: 500,
        }}
        className="marquee-track"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            className="marquee-item"
          >
            {item.emoji} {item.text}
          </span>
        ))}
      </div>

      <style>{`
        .marquee-bar:hover .marquee-track { animation-play-state: paused; }
        .marquee-item::after {
          content: '⁕';
          margin-left: 3rem;
          color: var(--color-purple-light);
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}
