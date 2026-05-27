'use client'

import { useEffect } from 'react'

interface Props {
  accent: string
  glow: string
}

export default function SeasonStyles({ accent, glow }: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty('--season-accent', accent)
    document.documentElement.style.setProperty('--season-glow', glow)
  }, [accent, glow])

  return null
}
