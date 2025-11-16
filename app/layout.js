import './globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import ClientLayout from './client-layout'

// Primary heading font - Space Grotesk has a modern, slightly futuristic feel
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

// Body text font - Inter provides excellent readability
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://aiautomationshop.com'),
  title: {
    default: 'AI Automation Shop - Transform Your Business with AI',
    template: '%s | AI Automation Shop',
  },
  description:
    'Transform your business with cutting-edge AI automation solutions. Expert consulting, custom integrations, and AI-powered workflows that save time and boost productivity.',
  keywords: [
    'AI automation',
    'business automation',
    'AI solutions',
    'workflow automation',
    'AI consulting',
    'machine learning',
    'AI integration',
    'process automation',
    'intelligent automation',
    'AI transformation',
  ],
  authors: [{ name: 'AI Automation Shop' }],
  creator: 'AI Automation Shop',
  publisher: 'AI Automation Shop',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#38bdf8' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'AI Automation Shop - Transform Your Business with AI',
    description:
      'Transform your business with cutting-edge AI automation solutions. Expert consulting, custom integrations, and AI-powered workflows.',
    siteName: 'AI Automation Shop',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Automation Shop - Transform Your Business with AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Shop - Transform Your Business with AI',
    description:
      'Transform your business with cutting-edge AI automation solutions. Expert consulting and custom integrations.',
    images: ['/og-image.png'],
    creator: '@aiautomationshop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

export default function RootLayout({ children }) {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Automation Shop',
    description: 'Advanced AI automation solutions for businesses',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://aiautomationshop.com',
    logo: '/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/aiautomationshop',
      // 'https://www.linkedin.com/company/aiautomationshop',
      // 'https://www.facebook.com/aiautomationshop',
    ],
  }

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta name="color-scheme" content="dark" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased">
        {/* Skip to content link for accessibility - Enhanced with glass morphism */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[var(--z-tooltip)] glass-card px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 focus:ring-4 focus:ring-primary-400/50 focus:outline-none"
        >
          Skip to main content
        </a>

        <ClientLayout>
          <main id="main-content" role="main" aria-label="Main content">
            {children}
          </main>
        </ClientLayout>

        {/* Vercel Analytics */}
        <Analytics />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </body>
    </html>
  )
}
