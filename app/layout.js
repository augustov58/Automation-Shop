import './globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'
import Script from 'next/script'
import ClientLayout from './client-layout'

// Primary heading font - Space Grotesk has a modern, slightly futuristic feel
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
})

// Body text font - Inter provides excellent readability
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'AI Automation Shop',
  description: 'Advanced AI automation solutions for businesses',
  themeColor: '#0f172a',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-automation-shop.com',
    title: 'AI Automation Shop',
    description: 'Advanced AI automation solutions for businesses',
    siteName: 'AI Automation Shop',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Shop',
    description: 'Advanced AI automation solutions for businesses',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="dark" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-black text-white px-4 py-2 rounded">
          Skip to content
        </a>
        
        <ClientLayout>
          <main id="main-content">
            {children}
          </main>
        </ClientLayout>
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </body>
    </html>
  )
}