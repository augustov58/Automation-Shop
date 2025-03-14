'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            AI Automation Shop
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="block md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-primary-600 transition">
              Services
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600 transition">
              About Us
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-primary-600 transition">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition">
              Contact
            </Link>
          </nav>
          
          {/* Contact button (desktop) */}
          <div className="hidden md:block">
            <Link href="/contact" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition">
              Get Started
            </Link>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition">
                Home
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-primary-600 transition">
                Services
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-primary-600 transition">
                About Us
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-primary-600 transition">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition">
                Contact
              </Link>
              <Link href="/contact" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition inline-block w-full text-center">
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}