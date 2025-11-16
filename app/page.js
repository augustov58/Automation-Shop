'use client'

import React, { useEffect, useState } from 'react'
import { LampDemo } from '@/components/LampDemo'
import DiscoveryCallCalendar from '@/components/DiscoveryCallCalendar'

export default function Home() {
  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  // State for mouse position (for parallax)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [showScrollTop, setShowScrollTop] = useState(false)

  // Function to handle mouse movement for parallax effect
  const handleMouseMove = e => {
    const { clientX, clientY } = e
    const x = clientX / window.innerWidth - 0.5
    const y = clientY / window.innerHeight - 0.5
    setMousePosition({ x, y })
  }

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  // Function to go to a specific slide
  const goToSlide = slideIndex => {
    setCurrentSlide(slideIndex)
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    // Add mouse move event listener for parallax
    window.addEventListener('mousemove', handleMouseMove)

    // Carousel auto-advance
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [totalSlides])

  // Add simple parallax effect on mouse move
  useEffect(() => {
    const parallaxElements = document.querySelectorAll('.parallax')
    const x = mousePosition.x * 20
    const y = mousePosition.y * 20

    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-speed') || 20
      const moveX = x * speed
      const moveY = y * speed
      el.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
  }, [mousePosition])

  // Add this useEffect for scroll animations
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll')

      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-up')
        }
      })
    }

    window.addEventListener('scroll', animateOnScroll)
    // Trigger once on load
    animateOnScroll()

    return () => {
      window.removeEventListener('scroll', animateOnScroll)
    }
  }, [])

  // Add this to your useEffect in page.js
  useEffect(() => {
    // Custom cursor
    const cursorDot = document.createElement('div')
    const cursorOutline = document.createElement('div')
    const cursorContainer = document.createElement('div')

    cursorDot.classList.add('cursor-dot')
    cursorOutline.classList.add('cursor-outline')
    cursorContainer.classList.add('custom-cursor-container')

    cursorContainer.appendChild(cursorDot)
    cursorContainer.appendChild(cursorOutline)
    document.body.appendChild(cursorContainer)

    const moveCursor = e => {
      const { clientX, clientY } = e

      // Move the dot immediately
      cursorDot.style.left = `${clientX}px`
      cursorDot.style.top = `${clientY}px`

      // Move the outline with a slight delay for a trailing effect
      cursorOutline.style.left = `${clientX}px`
      cursorOutline.style.top = `${clientY}px`
    }

    const handleMouseOver = () => {
      cursorDot.classList.add('cursor-hover')
      cursorOutline.classList.add('cursor-outline-hover')
    }

    const handleMouseOut = () => {
      cursorDot.classList.remove('cursor-hover')
      cursorOutline.classList.remove('cursor-outline-hover')
    }

    // Add event listeners
    document.addEventListener('mousemove', moveCursor)

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"]'
    )
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver)
      el.addEventListener('mouseout', handleMouseOut)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver)
        el.removeEventListener('mouseout', handleMouseOut)
      })
      document.body.removeChild(cursorContainer)
    }
  }, [])

  // Add this to your useEffect in page.js
  useEffect(() => {
    // Initialize data visualization
    const dataBarFills = document.querySelectorAll('.data-bar-fill')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Get the width from the parent's data attribute or style
            const targetWidth =
              entry.target.parentElement.getAttribute('data-width') || entry.target.style.width
            // Apply the width
            entry.target.style.width = targetWidth
            // Unobserve after animation
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    dataBarFills.forEach(fill => {
      // Reset width to 0 initially
      fill.style.width = '0'
      // Observe the element
      observer.observe(fill)
    })

    // Interactive diagram
    const diagramNodes = document.querySelectorAll('.diagram-node')
    const diagramLines = document.querySelectorAll('.diagram-line')

    diagramNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        node.classList.add('active')
        // Activate connected lines
        diagramLines.forEach(line => {
          if (
            line.getAttribute('data-from') === node.getAttribute('data-id') ||
            line.getAttribute('data-to') === node.getAttribute('data-id')
          ) {
            line.classList.add('active')
          }
        })
      })

      node.addEventListener('mouseleave', () => {
        node.classList.remove('active')
        // Deactivate lines
        diagramLines.forEach(line => {
          line.classList.remove('active')
        })
      })
    })

    return () => {
      // Existing cleanup code...

      // Cleanup for diagram
      diagramNodes.forEach(node => {
        node.removeEventListener('mouseenter', () => {})
        node.removeEventListener('mouseleave', () => {})
      })

      // Cleanup for observer
      dataBarFills.forEach(fill => {
        observer.unobserve(fill)
      })
    }
  }, [])

  // Add this to your useEffect in page.js
  useEffect(() => {
    // Scroll progress indicator
    const scrollProgress = document.createElement('div')
    scrollProgress.classList.add('scroll-progress')
    document.body.appendChild(scrollProgress)

    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
      scrollProgress.style.width = `${scrollPercentage}%`
    }

    window.addEventListener('scroll', updateScrollProgress)

    // Loading indicator for navigation
    const loadingIndicator = document.createElement('div')
    loadingIndicator.classList.add('loading-indicator')
    document.body.appendChild(loadingIndicator)

    // Show loading indicator when navigating
    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => {
      link.addEventListener('click', e => {
        // Only for internal links that aren't hash links
        if (!link.getAttribute('href').startsWith('#') && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          loadingIndicator.classList.add('visible')

          setTimeout(() => {
            window.location.href = link.getAttribute('href')
          }, 300)
        }
      })
    })

    // Enhance focus for keyboard navigation
    const handleFirstTab = e => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing')
        window.removeEventListener('keydown', handleFirstTab)
      }
    }

    window.addEventListener('keydown', handleFirstTab)

    // Smooth reveal for elements as they enter viewport
    const revealElements = document.querySelectorAll('.animate-on-scroll')

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    revealElements.forEach(element => {
      element.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700')
      revealObserver.observe(element)
    })

    return () => {
      // Existing cleanup code...

      // Cleanup for scroll progress
      window.removeEventListener('scroll', updateScrollProgress)
      if (scrollProgress.parentNode) {
        scrollProgress.parentNode.removeChild(scrollProgress)
      }

      // Cleanup for loading indicator
      links.forEach(link => {
        link.removeEventListener('click', () => {})
      })
      if (loadingIndicator.parentNode) {
        loadingIndicator.parentNode.removeChild(loadingIndicator)
      }

      // Cleanup for keyboard navigation
      window.removeEventListener('keydown', handleFirstTab)

      // Cleanup for reveal observer
      revealElements.forEach(element => {
        revealObserver.unobserve(element)
      })
    }
  }, [])

  useEffect(() => {
    // Scroll to top button visibility
    const handleScrollForButton = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScrollForButton)

    return () => {
      window.removeEventListener('scroll', handleScrollForButton)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative flex flex-col">
      {/* Pure black background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Subtle texture overlay */}
      <div
        className="fixed inset-0 opacity-5 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Stars effect */}
      <div
        className="fixed inset-0 opacity-60 z-0"
        style={{
          backgroundImage: `
               radial-gradient(circle at 25px 25px, white 1.5px, transparent 0), 
               radial-gradient(circle at 75px 75px, white 1.5px, transparent 0),
               radial-gradient(circle at 100px 50px, white 2px, transparent 0),
               radial-gradient(circle at 200px 150px, white 1.5px, transparent 0),
               radial-gradient(circle at 300px 200px, white 2px, transparent 0),
               radial-gradient(circle at 400px 250px, white 1.5px, transparent 0),
               radial-gradient(circle at 500px 100px, white 1.5px, transparent 0),
               radial-gradient(circle at 50px 300px, white 2px, transparent 0)
             `,
          backgroundSize: '550px 550px',
          animation: 'twinkle 10s ease-in-out infinite alternate',
        }}
      ></div>

      {/* Floating particles with parallax effect */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div
          className="particle particle-1"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
          }}
        ></div>
        <div
          className="particle particle-2"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`,
          }}
        ></div>
        <div
          className="particle particle-3"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          }}
        ></div>
        <div
          className="particle particle-4"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        ></div>
        <div
          className="particle particle-5"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          }}
        ></div>
      </div>

      {/* Glowing orbs with parallax effect */}
      <div
        className="fixed top-1/4 right-1/4 w-96 h-96 rounded-full bg-[rgba(56,189,248,0.03)] blur-[100px] z-0"
        style={{
          transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
        }}
      ></div>
      <div
        className="fixed bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[rgba(139,92,246,0.03)] blur-[100px] z-0"
        style={{
          transform: `translate(${mousePosition.x * 60}px, ${mousePosition.y * 60}px)`,
        }}
      ></div>

      {/* Content sections with distinct gradients */}
      <div className="relative z-10">
        {/* Hero Section - Black with subtle radial gradient */}
        <section className="min-h-[700px] w-full flex flex-col items-center justify-center py-20 bg-gradient-to-b from-black to-gray-900">
          <LampDemo />
        </section>

        {/* Services Section - Asymmetrical layout */}
        <section
          id="services"
          className="py-24 relative border-t border-b border-white/10 section-gradient-blue"
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-md -z-10"></div>

          {/* Decorative elements for asymmetry */}
          <div className="absolute top-40 left-10 w-32 h-32 border border-[rgba(56,189,248,0.1)] rounded-full opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 border border-[rgba(56,189,248,0.05)] rounded-full opacity-10"></div>

          {/* Floating UI elements */}
          <div className="floating-badge" style={{ top: '15%', right: '10%' }}>
            AI-Powered
          </div>
          <div className="floating-dot" style={{ top: '30%', left: '15%' }}></div>
          <div className="floating-dot" style={{ bottom: '25%', right: '20%' }}></div>
          <div
            className="floating-line"
            style={{ top: '40%', left: '5%', transform: 'rotate(30deg)' }}
          ></div>
          <div
            className="floating-line"
            style={{ bottom: '30%', right: '5%', transform: 'rotate(-20deg)' }}
          ></div>

          <div className="container mx-auto px-6">
            {/* Offset heading for visual interest */}
            <div className="flex justify-start md:justify-end mb-16">
              <h2 className="text-4xl font-bold text-white tracking-tight animate-on-scroll max-w-lg">
                Our AI <span className="text-gradient-primary">Automation Solutions</span>
              </h2>
            </div>

            {/* Services Carousel */}
            <div className="services-carousel relative mx-auto max-w-5xl">
              {/* Carousel Navigation */}
              <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
                <button
                  onClick={prevSlide}
                  className="carousel-nav-btn p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all btn-press hover-glow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Carousel Slides */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {/* Service 1 */}
                  <div className="min-w-full px-4">
                    <div className="feature-card h-full">
                      {/* Custom SVG Illustration */}
                      <div className="mb-6 flex justify-center">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-glow"
                        >
                          <circle
                            cx="60"
                            cy="60"
                            r="59"
                            stroke="rgba(56, 189, 248, 0.2)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="40"
                            stroke="rgba(56, 189, 248, 0.3)"
                            strokeWidth="2"
                          />
                          <path
                            d="M60 20V100"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                          <path
                            d="M20 60H100"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="15"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.5)"
                            strokeWidth="2"
                          />
                          <circle cx="60" cy="60" r="5" fill="rgba(56, 189, 248, 0.8)" />
                          <g className="svg-pulse">
                            <circle cx="60" cy="35" r="4" fill="rgba(56, 189, 248, 0.8)" />
                            <circle cx="85" cy="60" r="4" fill="rgba(56, 189, 248, 0.8)" />
                            <circle cx="60" cy="85" r="4" fill="rgba(56, 189, 248, 0.8)" />
                            <circle cx="35" cy="60" r="4" fill="rgba(56, 189, 248, 0.8)" />
                          </g>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">
                        Predictive Analytics
                      </h3>
                      <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed font-light">
                        Leverage the power of AI to predict trends and make data-driven decisions.
                        Our predictive analytics solutions help you anticipate market changes and
                        customer needs before they happen.
                      </p>
                      <div className="mt-auto">
                        <a
                          href="#contact"
                          className="inline-block px-6 py-3 bg-[rgba(139,92,246,0.1)] backdrop-blur-sm border border-[rgba(139,92,246,0.2)] rounded-lg text-white hover:bg-[rgba(139,92,246,0.15)] transition-all"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div className="min-w-full px-4">
                    <div className="feature-card h-full">
                      {/* Custom SVG Illustration */}
                      <div className="mb-6 flex justify-center">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-glow"
                        >
                          <rect
                            x="20"
                            y="20"
                            width="80"
                            height="80"
                            rx="4"
                            stroke="rgba(56, 189, 248, 0.3)"
                            strokeWidth="2"
                          />
                          <path d="M20 40H100" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2" />
                          <circle cx="30" cy="30" r="4" fill="rgba(56, 189, 248, 0.8)" />
                          <circle cx="45" cy="30" r="4" fill="rgba(56, 189, 248, 0.5)" />
                          <circle cx="60" cy="30" r="4" fill="rgba(56, 189, 248, 0.3)" />
                          <rect
                            x="30"
                            y="50"
                            width="25"
                            height="40"
                            rx="2"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                            className="svg-pulse"
                          />
                          <rect
                            x="65"
                            y="50"
                            width="25"
                            height="20"
                            rx="2"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                          />
                          <rect
                            x="65"
                            y="80"
                            width="25"
                            height="10"
                            rx="2"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">
                        Process Automation
                      </h3>
                      <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed font-light">
                        Streamline your business processes with our intelligent automation
                        solutions. Reduce manual tasks, eliminate errors, and free your team to
                        focus on high-value activities that drive growth.
                      </p>
                      <div className="mt-auto">
                        <a
                          href="#contact"
                          className="inline-block px-6 py-3 bg-[rgba(56,189,248,0.1)] backdrop-blur-sm border border-[rgba(56,189,248,0.2)] rounded-lg text-white hover:bg-[rgba(56,189,248,0.15)] transition-all"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div className="min-w-full px-4">
                    <div className="feature-card h-full">
                      {/* Custom SVG Illustration */}
                      <div className="mb-6 flex justify-center">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-glow"
                        >
                          <path
                            d="M30 90L60 30L90 90"
                            stroke="rgba(56, 189, 248, 0.5)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="60"
                            cy="30"
                            r="10"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.5)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="30"
                            cy="90"
                            r="10"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.5)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="90"
                            cy="90"
                            r="10"
                            fill="rgba(56, 189, 248, 0.1)"
                            stroke="rgba(56, 189, 248, 0.5)"
                            strokeWidth="2"
                          />
                          <circle
                            cx="60"
                            cy="60"
                            r="20"
                            fill="rgba(56, 189, 248, 0.05)"
                            stroke="rgba(56, 189, 248, 0.3)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            className="svg-rotate"
                          />
                          <path
                            className="svg-dash"
                            d="M40 60H80"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                          <path
                            className="svg-dash"
                            d="M60 40V80"
                            stroke="rgba(56, 189, 248, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 text-center">
                        Machine Learning
                      </h3>
                      <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                        Enhance customer experience with intelligent virtual assistants and
                        chatbots. Our AI-powered assistants provide 24/7 support, personalized
                        recommendations, and seamless interactions.
                      </p>
                      <div className="mt-auto">
                        <a
                          href="#contact"
                          className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section - Asymmetrical grid layout */}
        <section id="about" className="py-24 relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md -z-10"></div>
          <div className="bg-circuit -z-5"></div>

          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight mb-8">
                  Why Choose Our <span className="text-gradient-primary">AI Solutions</span>
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  With years of experience in artificial intelligence and machine learning, our team
                  delivers cutting-edge solutions that transform businesses across industries.
                </p>

                {/* Data Visualization */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-white mb-6">Performance Metrics</h3>

                  <div className="data-visualization">
                    <div className="data-label">
                      <span>Efficiency Improvement</span>
                      <span>85%</span>
                    </div>
                    <div className="data-bar">
                      <div className="data-bar-fill" style={{ width: '85%' }}></div>
                    </div>

                    <div className="data-label">
                      <span>Cost Reduction</span>
                      <span>62%</span>
                    </div>
                    <div className="data-bar">
                      <div className="data-bar-fill" style={{ width: '62%' }}></div>
                    </div>

                    <div className="data-label">
                      <span>Decision Accuracy</span>
                      <span>94%</span>
                    </div>
                    <div className="data-bar">
                      <div className="data-bar-fill" style={{ width: '94%' }}></div>
                    </div>

                    <div className="data-label">
                      <span>Implementation Speed</span>
                      <span>78%</span>
                    </div>
                    <div className="data-bar">
                      <div className="data-bar-fill" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Diagram */}
              <div className="diagram-container h-[400px] relative">
                <div
                  className="diagram-node"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}
                >
                  AI Core
                </div>
                <div className="diagram-node" style={{ top: '20%', left: '30%' }}>
                  Data
                </div>
                <div className="diagram-node" style={{ top: '20%', left: '70%' }}>
                  Analytics
                </div>
                <div className="diagram-node" style={{ top: '80%', left: '30%' }}>
                  Process
                </div>
                <div className="diagram-node" style={{ top: '80%', left: '70%' }}>
                  Output
                </div>

                {/* Connecting lines */}
                <div
                  className="diagram-line"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                  }}
                ></div>
                <div
                  className="diagram-line"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                  }}
                ></div>
                <div
                  className="diagram-line"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    transform: 'translate(-50%, -50%) rotate(-135deg)',
                  }}
                ></div>
                <div
                  className="diagram-line"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    transform: 'translate(-50%, -50%) rotate(135deg)',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Offset layout */}
        <section id="contact" className="py-24 relative">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md -z-10"></div>

          <div className="container mx-auto px-6">
            {/* Center the content properly */}
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white tracking-tight mb-8 animate-on-scroll">
                Ready to <span className="text-gradient-primary">Transform</span> Your Business?
              </h2>

              <p className="text-gray-300 mb-12 text-lg leading-relaxed animate-on-scroll">
                Schedule a discovery call with our AI experts to explore how our solutions can
                address your specific business challenges.
              </p>

              {/* Custom Calendar Component */}
              <div className="glass-card p-8 max-w-3xl mx-auto">
                <DiscoveryCallCalendar />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 btn-icon z-40 transition-all duration-300 ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  )
}
