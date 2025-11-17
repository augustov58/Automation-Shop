'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Mobile Swipe Carousel
 * Touch-friendly carousel with swipe gestures
 */
export function SwipeCarousel({ children, className, onSlideChange }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const slideCount = Array.isArray(children) ? children.length : 1

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    const newSlide = currentSlide + newDirection
    if (newSlide >= 0 && newSlide < slideCount) {
      setDirection(newDirection)
      setCurrentSlide(newSlide)
      onSlideChange?.(newSlide)
    }
  }

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1)
    }
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        key={currentSlide}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={handleDragEnd}
        className="cursor-grab active:cursor-grabbing"
      >
        {Array.isArray(children) ? children[currentSlide] : children}
      </motion.div>

      {/* Slide indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1)
              setCurrentSlide(index)
              onSlideChange?.(index)
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentSlide
                ? 'bg-primary-400 w-8'
                : 'bg-white/30 hover:bg-white/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Touch-friendly Bottom Sheet
 * Mobile drawer that slides up from bottom
 */
export function BottomSheet({ children, isOpen, onClose, className }) {
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (isOpen) {
      controls.start({ y: 0 })
    } else {
      controls.start({ y: '100%' })
    }
  }, [isOpen, controls])

  const handleDragEnd = (e, info) => {
    setIsDragging(false)

    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose()
    } else {
      controls.start({ y: 0 })
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
      />

      {/* Sheet */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ y: '100%' }}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'glass-card border-t border-white/10 rounded-t-3xl',
          'max-h-[90vh] overflow-y-auto',
          className
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-4 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-white/30 rounded-full" />
        </div>

        {children}
      </motion.div>
    </>
  )
}

/**
 * Responsive Container
 * Auto-adjusts padding based on screen size
 */
export function ResponsiveContainer({ children, className, size = 'default' }) {
  const sizes = {
    sm: 'max-w-3xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Responsive Grid
 * Automatically responsive grid system
 */
export function ResponsiveGrid({ children, columns = { mobile: 1, tablet: 2, desktop: 3 }, gap = 6, className }) {
  const gridClasses = `grid gap-${gap} grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`

  return (
    <div className={cn(gridClasses, className)}>
      {children}
    </div>
  )
}

/**
 * Mobile Navigation Menu
 * Slide-in mobile menu with smooth animations
 */
export function MobileMenu({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm glass-card border-l border-white/10 z-50 overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 pt-16">
          {children}
        </div>
      </motion.div>
    </>
  )
}

/**
 * useMediaQuery Hook
 * Detect screen size breakpoints
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

/**
 * Responsive Show/Hide
 * Show or hide content based on screen size
 */
export function ShowOn({ breakpoint = 'md', children }) {
  const breakpoints = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  }

  const matches = useMediaQuery(breakpoints[breakpoint])

  return matches ? <>{children}</> : null
}

export function HideOn({ breakpoint = 'md', children }) {
  const breakpoints = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  }

  const matches = useMediaQuery(breakpoints[breakpoint])

  return !matches ? <>{children}</> : null
}

/**
 * Pull to Refresh
 * Mobile pull-to-refresh functionality
 */
export function PullToRefresh({ onRefresh, threshold = 80, children, className }) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && !isRefreshing) {
      const currentY = e.touches[0].clientY
      const distance = currentY - startY.current

      if (distance > 0) {
        setPullDistance(Math.min(distance, threshold * 1.5))
      }
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
    setPullDistance(0)
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn('relative', className)}
    >
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center"
        style={{ height: pullDistance }}
        animate={{ opacity: pullDistance > 20 ? 1 : 0 }}
      >
        {isRefreshing ? (
          <motion.div
            className="h-6 w-6 border-2 border-primary-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <motion.div
            animate={{ rotate: pullDistance >= threshold ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        style={{ y: isRefreshing ? threshold : pullDistance }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
