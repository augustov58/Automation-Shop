'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for enhanced effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled ? 'glass-header shadow-lg' : 'bg-transparent border-b border-white/5'
      }`}
      style={{ zIndex: 'var(--z-fixed)' }}
      role="banner"
      aria-label="Site header"
    >
      {/* Subtle glow effect on scroll */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-secondary-500/5 pointer-events-none" />
      )}

      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading font-bold text-white relative group">
            <span className="relative z-10 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              AI Automation Shop
            </span>
            {/* Glow effect on hover */}
            <span
              className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, rgba(56,189,248,0.5), rgba(139,92,246,0.5))',
              }}
            />
          </Link>

          {/* Mobile menu button - Min 44px touch target */}
          <button
            className="block md:hidden text-white hover:text-primary-400 focus:outline-none transition-colors relative group min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 relative z-10 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <nav
            className="hidden md:flex space-x-8 items-center"
            role="navigation"
            aria-label="Main navigation"
          >
            <a
              href="#services"
              className="text-slate-200 hover:text-primary-400 transition-colors relative group font-medium"
            >
              <span className="relative z-10">Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#about"
              className="text-slate-200 hover:text-primary-400 transition-colors relative group font-medium"
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#contact"
              className="text-slate-200 hover:text-primary-400 transition-colors relative group font-medium"
            >
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* CTA button (desktop) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="btn-primary px-6 py-2.5 rounded-lg font-semibold inline-flex items-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </a>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            className="md:hidden py-4 border-t border-white/10 animate-slide-up"
            id="mobile-navigation"
          >
            <nav
              className="flex flex-col space-y-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <a
                href="#services"
                className="text-slate-200 hover:text-primary-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-slate-200 hover:text-primary-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="#contact"
                className="text-slate-200 hover:text-primary-400 transition-colors py-3 px-4 rounded-lg hover:bg-white/5 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="#contact"
                className="btn-primary px-4 py-2.5 rounded-lg font-semibold text-center inline-flex items-center justify-center gap-2 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Get Started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Decorative bottom border with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
    </header>
  )
}
