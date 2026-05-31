'use client'

import { useEffect, useRef, useState } from 'react'
import { Share2, Link, Check, Mail } from 'lucide-react'

type Props = {
  title?: string
  url?: string
}

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const ThreadsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 192 192" fill="currentColor" aria-hidden>
    <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.643 32.788 28.054 19.882 44.511 13.223 67.616 13 96v.04c.223 28.424 6.882 51.429 19.788 68.233 14.504 18.411 36.094 27.859 64.275 28.053h.113c25.21-.173 42.98-6.765 57.603-21.38 19.009-19.004 18.428-42.713 12.17-57.23-4.522-10.538-13.029-19.053-25.412-24.728z" />
  </svg>
)

const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
)

const PLATFORMS = [
  {
    id: 'facebook',
    label: 'Facebook',
    Icon: FacebookIcon,
    href: (u: string, _t: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    id: 'x',
    label: 'X',
    Icon: XIcon,
    href: (u: string, t: string) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
  },
  {
    id: 'threads',
    label: 'Threads',
    Icon: ThreadsIcon,
    href: (u: string, t: string) =>
      `https://www.threads.net/intent/post?text=${encodeURIComponent(`${t} ${u}`)}`,
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    Icon: PinterestIcon,
    href: (u: string, t: string) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(u)}&description=${encodeURIComponent(t)}`,
  },
] as const

export default function ShareButton({ title, url }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onMouse = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouse)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouse)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])

  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title ?? (typeof document !== 'undefined' ? document.title : '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {}
    setOpen(false)
  }

  const emailHref = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Share this page"
        title="Share"
        className="ws-share-btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.45rem 0.7rem',
          background: 'transparent',
          color: open ? 'var(--green)' : 'var(--ink-soft)',
          border: `1px solid ${open ? 'var(--green)' : 'var(--rule)'}`,
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
        <Share2 size={14} strokeWidth={2.25} />
        <span>Share</span>
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            minWidth: 160,
            zIndex: 50,
            overflow: 'hidden',
          }}
        >
          {PLATFORMS.map(({ id, label, Icon, href }) => (
            <a
              key={id}
              href={href(shareUrl, shareTitle)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="ws-share-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.55rem 0.85rem',
                color: 'var(--ink)',
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
              }}
            >
              <Icon />
              {label}
            </a>
          ))}

          <a
            href={emailHref}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="ws-share-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.55rem 0.85rem',
              borderTop: '1px solid var(--rule)',
              color: 'var(--ink)',
              textDecoration: 'none',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
            }}
          >
            <Mail size={16} strokeWidth={1.75} />
            Email
          </a>

          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="ws-share-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.55rem 0.85rem',
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderTop: '1px solid var(--rule)',
              color: copied ? 'var(--green)' : 'var(--ink)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              textAlign: 'left',
              cursor: 'pointer',
            }}
          >
            {copied ? <Check size={16} strokeWidth={1.75} /> : <Link size={16} strokeWidth={1.75} />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      )}

      <style>{`
        .ws-share-btn:hover { color: var(--green) !important; border-color: var(--green) !important; background: var(--paper-tint) !important; }
        .ws-share-btn:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
        .ws-share-item { transition: background 0.1s, color 0.1s; }
        .ws-share-item:hover { background: var(--paper-tint) !important; color: var(--green) !important; }
        .ws-share-item:focus-visible { outline: 2px solid var(--green); outline-offset: 2px; }
      `}</style>
    </div>
  )
}
