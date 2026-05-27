export default function Footer() {
  return (
    <footer style={{
      borderTop: '2px solid var(--ink)',
      margin: '0 2.5rem',
      padding: '3rem 0 2.5rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '2rem',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.72rem',
      letterSpacing: '0.08em',
      color: 'var(--ink-muted)',
      lineHeight: 1.6,
      position: 'relative',
      zIndex: 1,
    }} className="ws-footer">
      <div>
        <strong style={{ display: 'block', color: 'var(--ink)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', fontSize: '0.68rem' }}>Workshed</strong>
        <a href="/about" style={linkStyle} className="ws-footer-link">About</a>
        <a href="/contact" style={linkStyle} className="ws-footer-link">Contact</a>
        <a href="/feed.xml" style={linkStyle} className="ws-footer-link">RSS</a>
      </div>
      <div>
        <strong style={{ display: 'block', color: 'var(--ink)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', fontSize: '0.68rem' }}>Sections</strong>
        <a href="/garden" style={linkStyle} className="ws-footer-link">Garden</a>
        <a href="/tools" style={linkStyle} className="ws-footer-link">Tools</a>
        <a href="/field" style={linkStyle} className="ws-footer-link">Field Notes</a>
      </div>
      <div>
        <strong style={{ display: 'block', color: 'var(--ink)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', fontSize: '0.68rem' }}>Notes</strong>
        <a href="/disclosure" style={linkStyle} className="ws-footer-link">Disclosure</a>
        <a href="/privacy" style={linkStyle} className="ws-footer-link">Privacy</a>
      </div>

      <div style={{
        gridColumn: '1 / -1',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--rule)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontSize: '0.65rem',
      }}>
        <span>© {new Date().getFullYear()} Workshed</span>
        <a href="/colophon" aria-label="About this mark" style={{
          fontSize: '0.95rem',
          letterSpacing: '0.1em',
          opacity: 0.7,
          textDecoration: 'none',
          transition: 'opacity 0.2s',
          cursor: 'pointer',
        }} className="ws-colophon-link">🌻⌛💀</a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ws-footer { grid-template-columns: 1fr 1fr !important; }
        }
        .ws-footer-link { color: var(--ink-soft) !important; }
        .ws-footer-link:hover { color: var(--green) !important; }
        .ws-colophon-link:hover { opacity: 1 !important; }
      `}</style>
    </footer>
  )
}

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  display: 'block',
  padding: '0.1rem 0',
}
