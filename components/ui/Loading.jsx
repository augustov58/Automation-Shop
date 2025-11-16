'use client'

import { cn } from '@/lib/utils'

/**
 * Loading Component
 * Displays loading states with multiple variants
 * Supports glass morphism design and accessibility
 */

// Spinner variant
const Spinner = ({ size, color }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  }

  const colorClasses = {
    primary: 'border-primary-400 border-t-transparent',
    secondary: 'border-secondary-400 border-t-transparent',
    accent: 'border-accent-400 border-t-transparent',
    white: 'border-white border-t-transparent',
  }

  return (
    <div
      className={cn('animate-spin rounded-full', sizeClasses[size], colorClasses[color])}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Dots variant
const Dots = ({ size, color }) => {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2.5 w-2.5',
    lg: 'h-3.5 w-3.5',
    xl: 'h-5 w-5',
  }

  const colorClasses = {
    primary: 'bg-primary-400',
    secondary: 'bg-secondary-400',
    accent: 'bg-accent-400',
    white: 'bg-white',
  }

  return (
    <div className="flex items-center gap-2" role="status" aria-label="Loading">
      <div
        className={cn('rounded-full animate-pulse', sizeClasses[size], colorClasses[color])}
        style={{ animationDelay: '0ms' }}
      />
      <div
        className={cn('rounded-full animate-pulse', sizeClasses[size], colorClasses[color])}
        style={{ animationDelay: '150ms' }}
      />
      <div
        className={cn('rounded-full animate-pulse', sizeClasses[size], colorClasses[color])}
        style={{ animationDelay: '300ms' }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Pulse variant (pulsing circle)
const Pulse = ({ size, color }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  }

  const colorClasses = {
    primary: 'bg-primary-400/30 border-primary-400/50',
    secondary: 'bg-secondary-400/30 border-secondary-400/50',
    accent: 'bg-accent-400/30 border-accent-400/50',
    white: 'bg-white/30 border-white/50',
  }

  return (
    <div className="relative" role="status" aria-label="Loading">
      {/* Outer pulse ring */}
      <div
        className={cn(
          'absolute inset-0 rounded-full border-2 animate-ping',
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      {/* Inner circle */}
      <div
        className={cn(
          'relative rounded-full border-2 animate-pulse',
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Bar variant (progress bar style)
const Bar = ({ size, color }) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
    xl: 'h-3',
  }

  const colorClasses = {
    primary: 'bg-primary-400',
    secondary: 'bg-secondary-400',
    accent: 'bg-accent-400',
    white: 'bg-white',
  }

  return (
    <div
      className={cn('w-full glass-card overflow-hidden rounded-full', sizeClasses[size])}
      role="status"
      aria-label="Loading"
    >
      <div className={cn('h-full animate-loading-bar origin-left', colorClasses[color])} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Main Loading component
export default function Loading({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  fullScreen = false,
  text = '',
  className,
  ...props
}) {
  const variants = {
    spinner: Spinner,
    dots: Dots,
    pulse: Pulse,
    bar: Bar,
  }

  const LoadingVariant = variants[variant] || Spinner

  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        fullScreen && 'min-h-screen',
        className
      )}
      {...props}
    >
      <LoadingVariant size={size} color={color} />
      {text && <p className="text-slate-300 text-sm font-medium animate-pulse">{text}</p>}
    </div>
  )

  // Full screen with glass backdrop
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[var(--z-modal)] glass-card backdrop-blur-lg flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

// Loading container for sections
export function LoadingContainer({ children, isLoading, loader, ...props }) {
  if (isLoading) {
    return loader || <Loading {...props} />
  }

  return <>{children}</>
}

// Loading overlay for specific elements
export function LoadingOverlay({ isLoading, children, ...props }) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 glass-card backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <Loading {...props} />
        </div>
      )}
    </div>
  )
}

// Button loading state
export function ButtonLoading({ size = 'sm', color = 'white', className }) {
  return <Spinner size={size} color={color} className={cn('inline-block', className)} />
}
