'use client'

import { useEffect, useRef, useState } from 'react'
import { Share2, Check } from 'lucide-react'

type Props = {
  /** Optional override for the share title. Defaults to document.title at click time. */
  title?: string
  /** Optional override for the share URL. Defaults to the current page URL. */
  url?: string
}

export default function ShareButton({ title, url }: Props) {
  const [state, setState] = useState<'idle' | 'copied'>('idle')
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])

  const handleClick = async () => {
    const shareUrl = url ?? window.location.href
    const shareTitle = title ?? document.title

    // Prefer the native share sheet (mobile + some desktop). Fall back to copy.
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl })
        return
      } catch (err) {
        // AbortError = user dismissed the sheet; do nothing.
        if ((err as { name?: string })?.name === 'AbortError') return
        // Otherwise fall through to clipboard.
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setState('copied')
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setState('idle'), 1800)
    } catch {
      // Last resort: do nothing visible. (Browsers without clipboard API are rare.)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={state === 'copied' ? 'Link copied' : 'Share this page'}
      title={state === 'copied' ? 'Link copied' : 'Share'}
      className="ws-share-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.45rem 0.7rem',
        background: 'transparent',
        color: state === 'copied' ? 'var(--green)' : 'var(--ink-soft)',
        border: `1px solid ${state === 'copied' ? 'var(--green)' : 'var(--rule)'}`,
        borderRadius: 2,
        fontFamily: 'var(--font-sans)',
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s, background 0.15s',
      }}
    >
      {state === 'copied' ? <Check size={14} strokeWidth={2.25} /> : <Share2 size={14} strokeWidth={2.25} />}
      <span>{state === 'copied' ? 'Copied' : 'Share'}</span>
      <style>{`
        .ws-share-btn:hover { color: var(--green) !important; border-color: var(--green) !important; background: var(--paper-tint) !important; }
        .ws-share-btn:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
      `}</style>
    </button>
  )
}
