'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Button with Ripple Effect
 * Material Design-inspired ripple animation on click
 */
export function RippleButton({ children, onClick, className, variant = 'primary', ...props }) {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)

  const handleClick = e => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = {
      x,
      y,
      id: Date.now(),
    }

    setRipples(prev => [...prev, ripple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id))
    }, 600)

    onClick?.(e)
  }

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'glass-card border border-white/10 hover:border-white/20',
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn('relative overflow-hidden', variants[variant], className)}
      {...props}
    >
      {children}

      {/* Ripple animations */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        />
      ))}
    </button>
  )
}

/**
 * Magnetic Button
 * Button that follows mouse movement when hovered
 */
export function MagneticButton({ children, strength = 0.5, className, ...props }) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = e => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = ((e.clientX - centerX) / rect.width) * 20 * strength
    const y = ((e.clientY - centerY) / rect.height) * 20 * strength

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('transition-all', className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}

/**
 * Glow Button
 * Button with animated glow effect on hover
 */
export function GlowButton({ children, className, glowColor = 'primary', ...props }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)

  const handleMouseMove = e => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const glowColors = {
    primary: 'rgba(56, 189, 248, 0.5)',
    secondary: 'rgba(139, 92, 246, 0.5)',
    accent: 'rgba(249, 115, 22, 0.5)',
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      className={cn('btn-primary relative overflow-hidden group', className)}
      {...props}
    >
      {/* Glow effect */}
      <span
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-2xl"
        style={{
          width: '200px',
          height: '200px',
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          background: `radial-gradient(circle, ${glowColors[glowColor]} 0%, transparent 70%)`,
        }}
      />

      <span className="relative z-10">{children}</span>
    </button>
  )
}

/**
 * Progress Button
 * Button with built-in loading progress indicator
 */
export function ProgressButton({
  children,
  loading = false,
  progress = 0,
  onClick,
  className,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn('btn-primary relative overflow-hidden', loading && 'cursor-wait', className)}
      {...props}
    >
      {/* Progress bar */}
      {loading && (
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {loading && (
          <motion.div
            className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </span>
    </button>
  )
}

/**
 * Animated Counter
 * Number that animates from 0 to target value
 */
export function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '', className }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          let start = 0
          const end = parseInt(value)
          const increment = end / (duration * 60) // 60 fps

          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 1000 / 60)

          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={counterRef} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

/**
 * Reveal on Scroll
 * Container that reveals children with animation when scrolled into view
 */
export function RevealOnScroll({ children, direction = 'up', delay = 0, className, once = true }) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger Children
 * Container that staggers animation of children
 */
export function StaggerChildren({ children, stagger = 0.1, className }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

/**
 * Tooltip with Animation
 * Smooth tooltip with multiple positions
 */
export function AnimatedTooltip({ children, content, position = 'top', className }) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 px-3 py-2 text-sm text-white glass-card rounded-lg border border-white/10 whitespace-nowrap pointer-events-none',
              positions[position]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Floating Action Button
 * FAB with smooth reveal animation
 */
export function FloatingActionButton({ icon: Icon, onClick, label, className, ...props }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.button
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      onClick={onClick}
      className={cn(
        'fixed bottom-8 right-8 flex items-center gap-3 px-4 py-4 rounded-full',
        'glass-card border border-white/10 hover:border-primary-400/30',
        'shadow-lg hover:shadow-primary-400/20 transition-all duration-300',
        'z-50',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {Icon && <Icon className="h-6 w-6 text-primary-400" />}

      <AnimatePresence>
        {isExpanded && label && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-white font-semibold whitespace-nowrap overflow-hidden"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
