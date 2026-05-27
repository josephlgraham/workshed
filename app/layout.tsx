import type { Metadata } from 'next'
import './globals.css'
import Masthead from '@/components/Masthead'
import Footer from '@/components/Footer'
import IntroTrigger from '@/components/IntroTrigger'

export const metadata: Metadata = {
  title: "Workshed · Let's plan together.",
  description: 'Calculators and tools for the obsessive gardener.',
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
        {/* Prevent theme flash — reads localStorage before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('workshed-theme');if(s)document.documentElement.setAttribute('data-theme',s);})();` }} />
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
      </body>
    </html>
  )
}
