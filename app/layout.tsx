import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'DataCatalogue — Browse & Explore Curated Datasets',
  description:
    'Browse, search, and explore detailed profiles of curated datasets. Schema documentation, code examples, and empirical statistics.',
  keywords: [
    'data catalogue',
    'dataset profiles',
    'data discovery',
    'API data access',
    'data documentation',
  ],
  authors: [{ name: 'DataCatalogue' }],
  generator: 'Next.js',
  metadataBase: new URL('https://alt-data-catalogue.fly.dev'),
  openGraph: {
    type: 'website',
    title: 'DataCatalogue — Browse & Explore Curated Datasets',
    description:
      'Browse, search, and explore detailed profiles of curated datasets.',
    siteName: 'DataCatalogue',
    images: [
      { url: '/og-default.png', width: 1200, height: 630, alt: 'DataCatalogue' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataCatalogue — Browse & Explore Curated Datasets',
    description:
      'Browse, search, and explore detailed profiles of curated datasets.',
    images: ['/og-default.png'],
  },
  alternates: { canonical: 'https://alt-data-catalogue.fly.dev' },
}

export const viewport: Viewport = {
  themeColor: '#B91C1C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-primary focus:text-primary-foreground focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
