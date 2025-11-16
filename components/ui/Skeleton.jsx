'use client'

import { cn } from '@/lib/utils'

/**
 * Skeleton Component
 * Loading placeholder for content that respects reduced motion preferences
 * Uses glass morphism design system
 */

export default function Skeleton({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-white/10',
    light: 'bg-white/5',
    medium: 'bg-white/15',
    glass: 'glass-card',
  }

  return (
    <div
      className={cn('animate-pulse rounded-md', variants[variant], className)}
      role="status"
      aria-label="Loading content"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * Skeleton Text
 * Mimics text lines with varying widths
 */
export function SkeletonText({ lines = 3, className, lastLineWidth = '60%' }) {
  return (
    <div className={cn('space-y-3', className)} role="status" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4" style={i === lines - 1 ? { width: lastLineWidth } : {}} />
      ))}
      <span className="sr-only">Loading text content...</span>
    </div>
  )
}

/**
 * Skeleton Avatar
 * Circle skeleton for profile pictures
 */
export function SkeletonAvatar({ size = 'md', className }) {
  const sizes = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  }

  return (
    <Skeleton className={cn('rounded-full', sizes[size], className)} aria-label="Loading avatar" />
  )
}

/**
 * Skeleton Card
 * Full card skeleton with header, body, and footer
 */
export function SkeletonCard({ className, hasImage = true, hasFooter = true }) {
  return (
    <div
      className={cn('glass-card p-6 space-y-4', className)}
      role="status"
      aria-label="Loading card"
    >
      {/* Image placeholder */}
      {hasImage && <Skeleton className="w-full h-48 rounded-lg" variant="glass" />}

      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Body text */}
      <SkeletonText lines={3} />

      {/* Footer */}
      {hasFooter && (
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      )}

      <span className="sr-only">Loading card content...</span>
    </div>
  )
}

/**
 * Skeleton List Item
 * Individual list item with icon/avatar and text
 */
export function SkeletonListItem({ hasAvatar = true, className }) {
  return (
    <div
      className={cn('flex items-start gap-4 p-4', className)}
      role="status"
      aria-label="Loading list item"
    >
      {hasAvatar && <SkeletonAvatar size="md" />}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <span className="sr-only">Loading list item...</span>
    </div>
  )
}

/**
 * Skeleton Table
 * Table skeleton with rows and columns
 */
export function SkeletonTable({ rows = 5, columns = 4, className }) {
  return (
    <div className={cn('w-full space-y-3', className)} role="status" aria-label="Loading table">
      {/* Header row */}
      <div className="flex gap-4 pb-3 border-b border-white/10">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`header-${i}`} className="h-4 flex-1" />
        ))}
      </div>

      {/* Body rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-8 flex-1" />
          ))}
        </div>
      ))}

      <span className="sr-only">Loading table data...</span>
    </div>
  )
}

/**
 * Skeleton Form
 * Form skeleton with labels and inputs
 */
export function SkeletonForm({ fields = 3, className }) {
  return (
    <div className={cn('space-y-6', className)} role="status" aria-label="Loading form">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}

      {/* Submit button */}
      <Skeleton className="h-12 w-32 rounded-lg" />

      <span className="sr-only">Loading form...</span>
    </div>
  )
}

/**
 * Skeleton Grid
 * Grid of skeleton cards
 */
export function SkeletonGrid({ items = 6, columns = 3, className }) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div
      className={cn('grid gap-6', gridCols[columns], className)}
      role="status"
      aria-label="Loading grid"
    >
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} hasImage={i % 2 === 0} hasFooter={i % 3 === 0} />
      ))}
      <span className="sr-only">Loading grid content...</span>
    </div>
  )
}

/**
 * Skeleton Header
 * Page header skeleton with title and description
 */
export function SkeletonHeader({ hasSubtitle = true, hasActions = true, className }) {
  return (
    <div className={cn('space-y-4', className)} role="status" aria-label="Loading header">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-2/3" />
          {hasSubtitle && <Skeleton className="h-4 w-1/2" />}
        </div>
        {hasActions && <Skeleton className="h-10 w-32 rounded-lg" />}
      </div>
      <span className="sr-only">Loading header content...</span>
    </div>
  )
}

/**
 * Skeleton Stats
 * Statistics cards skeleton
 */
export function SkeletonStats({ items = 4, className }) {
  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}
      role="status"
      aria-label="Loading statistics"
    >
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="glass-card p-6 space-y-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
      <span className="sr-only">Loading statistics...</span>
    </div>
  )
}

/**
 * Skeleton Profile
 * User profile skeleton with avatar and details
 */
export function SkeletonProfile({ className }) {
  return (
    <div
      className={cn('flex items-start gap-6', className)}
      role="status"
      aria-label="Loading profile"
    >
      <SkeletonAvatar size="xl" />
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <SkeletonText lines={2} />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      <span className="sr-only">Loading profile...</span>
    </div>
  )
}
