'use client'

import { useEffect, useState } from 'react'
import { detectHemisphere, getActiveTheme } from '@/lib/seasons'

type Props = {
  fallbackDate: string
  fallbackLabel: string
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function LiveSeasonLabel({ fallbackDate, fallbackLabel }: Props) {
  // Initial state matches SSR exactly so hydration is clean. The useEffect
  // below replaces it with the truly current, hemisphere-aware value.
  const [date, setDate] = useState(fallbackDate)
  const [label, setLabel] = useState(fallbackLabel)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const theme = getActiveTheme(now, detectHemisphere())
      setDate(formatDate(now))
      setLabel(theme.label)
    }
    tick()
    // Re-check every minute so a tab left open across midnight catches the new day.
    const interval = window.setInterval(tick, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return <>{date} · {label}</>
}
