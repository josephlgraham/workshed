export default function Section({
  title,
  children,
  defaultOpen,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details className="ws-section" open={defaultOpen || undefined} style={{ marginBottom: '2.5rem' }}>
      <summary>
        <h2 style={{
          fontWeight: 700,
          fontSize: '1.5rem',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: 'var(--ink)',
          margin: 0,
        }}>{title}</h2>
      </summary>
      <div style={{
        fontSize: '1rem',
        lineHeight: 1.7,
        color: 'var(--ink-soft)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}>
        {children}
      </div>
    </details>
  )
}
