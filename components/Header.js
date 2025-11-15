'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-800 shadow-md z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-white">
            AI Automation Shop
          </Link>

          {/* Mobile menu button */}
          <button
            className="block md:hidden text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <nav className="hidden md:flex space-x-10">
            <a href="#services" className="text-white hover:text-gray-300 transition">
              Services
            </a>
            <a href="#about" className="text-white hover:text-gray-300 transition">
              About Us
            </a>
            <a href="#contact" className="text-white hover:text-gray-300 transition">
              Contact
            </a>
          </nav>

          {/* Contact button (desktop) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="bg-white text-slate-900 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-white hover:text-gray-300 transition">
                Services
              </a>
              <a href="#about" className="text-white hover:text-gray-300 transition">
                About Us
              </a>
              <a href="#contact" className="text-white hover:text-gray-300 transition">
                Contact
              </a>
              <a
                href="#contact"
                className="bg-white text-slate-900 px-4 py-2 rounded hover:bg-gray-200 transition inline-block w-full text-center"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
