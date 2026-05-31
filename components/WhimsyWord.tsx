import type { CSSProperties } from 'react'

/**
 * Renders a word as individual letters so it can do a staggered hover "hop"
 * (see .ws-whimsy in globals.css). On hover the letters rise in sequence and
 * bloom into the bucket accent. Purely decorative — the word still reads
 * normally to screen readers since the spans carry no spacing.
 */
export default function WhimsyWord({ text, accent }: { text: string; accent?: string }) {
  const wrapStyle = accent
    ? ({ '--whimsy-accent': accent } as CSSProperties)
    : undefined
  return (
    <span className="ws-whimsy" style={wrapStyle}>
      {[...text].map((ch, i) => (
        <span key={i} className="ws-whimsy-l" style={{ transitionDelay: `${i * 28}ms` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}
