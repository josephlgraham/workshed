'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function toggle() {
    const root = document.documentElement
    const current = root.getAttribute('data-theme')
    let next: string
    if (!current) {
      next = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark'
    } else {
      next = current === 'dark' ? 'light' : 'dark'
    }
    root.setAttribute('data-theme', next)
    localStorage.setItem('workshed-theme', next)

    // Re-run the rebuild animation unless the user prefers reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.setAttribute('data-intro', 'done')
      void root.offsetHeight          // force reflow so the browser sees the state reset
      root.setAttribute('data-intro', 'play')
    }
  }

  if (!mounted) return <span style={{ width: '1.75rem', height: '1.75rem', display: 'inline-block' }} />

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{
        background: 'none',
        border: '1px solid var(--rule)',
        color: 'var(--ink-muted)',
        width: '1.75rem',
        height: '1.75rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderRadius: '50%',
        padding: 0,
      }}
      className="ws-theme-btn"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" style={{ width: '0.85rem', height: '0.85rem' }}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <style>{`.ws-theme-btn:hover { border-color: var(--green) !important; color: var(--ink) !important; }`}</style>
    </button>
  )
}
