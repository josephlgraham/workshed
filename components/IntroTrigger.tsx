'use client'

import { useEffect } from 'react'

/**
 * Fires once after hydration and triggers the masthead rebuild animation.
 * The inline script in layout.tsx sets data-intro="pending" before first paint
 * (hiding elements without animating them). This component then does the
 * reliable done → reflow → play sequence — the same trick ThemeToggle uses —
 * which guarantees the browser's animation engine starts fresh.
 */
export default function IntroTrigger() {
  useEffect(() => {
    const root = document.documentElement
    if (root.getAttribute('data-intro') !== 'pending') return

    // Reset → reflow → play: forces the browser to treat this as a new animation start
    root.setAttribute('data-intro', 'done')
    void root.offsetHeight
    root.setAttribute('data-intro', 'play')

    // Mark as seen so subsequent page loads skip the animation
    setTimeout(() => localStorage.setItem('workshed-seen-intro', '1'), 1600)
  }, [])

  return null
}
