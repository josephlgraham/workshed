import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'
import IntroTrigger from '@/components/IntroTrigger'

const SITE_URL = 'https://workshed.garden'
const GA_ID = 'G-6RZSYJ5RL0'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Workshed · Let's plan together.",
    template: '%s · Workshed',
  },
  description: 'Calculators and tools for the serious gardener.',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Workshed',
    url: SITE_URL,
    title: "Workshed · Let's plan together.",
    description: 'Calculators and tools for the serious gardener.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Workshed' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Workshed · Let's plan together.",
    description: 'Calculators and tools for the serious gardener.',
    images: ['/og.png'],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='5' fill='%23b5470e'/%3E%3Ctext x='16' y='23' font-family='Archivo,Arial,sans-serif' font-size='20' font-weight='800' fill='%23f4f1ea' text-anchor='middle'%3EW%3C/text%3E%3C/svg%3E",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,500;0,600;0,700;0,800;1,600;1,700&family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Whisper&display=swap"
          rel="stylesheet"
        />
        {/* Resolve theme before first paint to avoid a flash. Default to dark;
            an explicit user choice saved in localStorage wins. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('workshed-theme')||'dark';document.documentElement.setAttribute('data-theme',s);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();` }} />
        {/* Intro animation: play once per browser, gate before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var seen=localStorage.getItem('workshed-seen-intro');var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;document.documentElement.setAttribute('data-intro',(seen||rm)?'done':'pending');}catch(e){document.documentElement.setAttribute('data-intro','done');}})();` }} />
      </head>
      <body>
        <IntroTrigger />
        <Masthead />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
        {/* Google Analytics 4 */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  )
}
