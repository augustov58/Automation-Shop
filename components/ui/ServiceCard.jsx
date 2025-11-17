'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Enhanced Service Card with 3D tilt effect
 * Includes glass morphism, hover animations, and magnetic interactions
 */
export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href = '#',
  index = 0,
  className,
  ...props
}) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth animation
  const springConfig = { damping: 25, stiffness: 300 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig)

  // Handle mouse move for tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = (e.clientX - centerX) / rect.width
    const mouseY = (e.clientY - centerY) / rect.height

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  // Stagger animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn('group relative', className)}
      {...props}
    >
      <a
        href={href}
        className="block glass-card p-8 rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/20 relative overflow-hidden"
      >
        {/* Background glow effect */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
            'bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10'
          )}
        />

        {/* Shine effect on hover */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none',
            'bg-gradient-to-tr from-transparent via-white/5 to-transparent',
            '-translate-x-full group-hover:translate-x-full'
          )}
          style={{ transitionProperty: 'transform, opacity' }}
        />

        {/* Icon with glow */}
        <div className="relative mb-6 flex justify-center" style={{ transform: 'translateZ(50px)' }}>
          <div className="relative">
            {/* Glow effect */}
            <div
              className={cn(
                'absolute inset-0 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500',
                'bg-primary-400'
              )}
            />

            {/* Icon container */}
            <div className="relative glass-card p-4 rounded-xl border border-white/10 group-hover:border-primary-400/30 transition-colors duration-300">
              {Icon && (
                <Icon
                  className="h-12 w-12 text-primary-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-heading font-bold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-secondary-400 group-hover:bg-clip-text transition-all duration-300"
          style={{ transform: 'translateZ(40px)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-slate-300 text-center leading-relaxed mb-6"
          style={{ transform: 'translateZ(30px)' }}
        >
          {description}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center" style={{ transform: 'translateZ(40px)' }}>
          <span
            className={cn(
              'inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold',
              'glass-card border border-white/10',
              'group-hover:border-primary-400/30 group-hover:bg-primary-400/10',
              'transition-all duration-300',
              'text-white'
            )}
          >
            Learn More
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        {/* Floating indicator */}
        {isHovered && (
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-400"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </a>
    </motion.div>
  )
}

/**
 * Service Grid Container
 * Responsive grid with stagger animations
 */
export function ServiceGrid({ children, className, columns = 3 }) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-8', gridCols[columns], className)} style={{ perspective: '1000px' }}>
      {children}
    </div>
  )
}

/**
 * Flip Card Service Component
 * Card that flips to reveal more details
 */
export function FlipServiceCard({ front, back, index = 0, className }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const flipVariants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
      },
    },
  }

  return (
    <motion.div
      variants={flipVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn('relative h-96', className)}
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass-card rounded-2xl p-8 border border-white/10"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass-card rounded-2xl p-8 border border-white/10"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </motion.div>

      {/* Flip indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-slate-400 flex items-center gap-1">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Click to flip
      </div>
    </motion.div>
  )
}
