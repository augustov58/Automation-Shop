'use client'

import { AlertCircle, AlertTriangle, XCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * Error State Component
 * Displays various error states with glass morphism design
 * Includes action buttons and icons
 */

export default function ErrorState({
  variant = 'error',
  title,
  message,
  icon: CustomIcon,
  action,
  actionLabel = 'Try Again',
  secondaryAction,
  secondaryActionLabel = 'Go Home',
  className,
  ...props
}) {
  const variants = {
    error: {
      icon: XCircle,
      iconColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      glowColor: 'shadow-[0_0_30px_rgba(239,68,68,0.2)]',
      title: title || 'Something went wrong',
      message: message || 'An unexpected error occurred. Please try again.',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      glowColor: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]',
      title: title || 'Warning',
      message: message || 'Please review the following information.',
    },
    info: {
      icon: AlertCircle,
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      glowColor: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
      title: title || 'Information',
      message: message || 'Please note the following information.',
    },
  }

  const config = variants[variant] || variants.error
  const Icon = CustomIcon || config.icon

  return (
    <div
      className={cn(
        'glass-card p-8 rounded-xl border max-w-md mx-auto',
        config.borderColor,
        config.glowColor,
        className
      )}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div className={cn('relative', config.iconColor)}>
          <div className="absolute inset-0 blur-xl opacity-50">
            <Icon className="h-16 w-16" />
          </div>
          <Icon className="h-16 w-16 relative z-10" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-white">{config.title}</h3>

        {/* Message */}
        <p className="text-slate-300 leading-relaxed">{config.message}</p>

        {/* Actions */}
        {(action || secondaryAction) && (
          <div className="flex gap-3 pt-4 w-full">
            {action && (
              <button
                onClick={action}
                className="btn-primary flex-1 px-4 py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 group"
              >
                <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
                {actionLabel}
              </button>
            )}
            {secondaryAction && (
              <button
                onClick={secondaryAction}
                className="btn-secondary flex-1 px-4 py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 glass-card border border-white/10 hover:border-white/20 transition-colors"
              >
                <Home className="h-4 w-4" />
                {secondaryActionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Inline Error Message
 * Small error message for forms and inline errors
 */
export function ErrorMessage({ message, className, ...props }) {
  if (!message) return null

  return (
    <div
      className={cn(
        'flex items-start gap-2 p-3 rounded-lg glass-card border border-red-500/30 bg-red-500/10',
        className
      )}
      role="alert"
      {...props}
    >
      <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-200">{message}</p>
    </div>
  )
}

/**
 * Warning Message
 * Small warning message for forms and inline warnings
 */
export function WarningMessage({ message, className, ...props }) {
  if (!message) return null

  return (
    <div
      className={cn(
        'flex items-start gap-2 p-3 rounded-lg glass-card border border-amber-500/30 bg-amber-500/10',
        className
      )}
      role="alert"
      {...props}
    >
      <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-200">{message}</p>
    </div>
  )
}

/**
 * Info Message
 * Small info message for forms and inline information
 */
export function InfoMessage({ message, className, ...props }) {
  if (!message) return null

  return (
    <div
      className={cn(
        'flex items-start gap-2 p-3 rounded-lg glass-card border border-blue-500/30 bg-blue-500/10',
        className
      )}
      role="status"
      {...props}
    >
      <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-blue-200">{message}</p>
    </div>
  )
}

/**
 * 404 Error Page Component
 */
export function Error404({ className }) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4', className)}>
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl font-heading font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary-400 to-secondary-400" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-bold text-white">Page Not Found</h2>
          <p className="text-slate-300 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 group"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="glass-card border border-white/10 hover:border-white/20 px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * 500 Error Page Component
 */
export function Error500({ className, onRetry }) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center p-4', className)}>
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Animated 500 */}
        <div className="relative">
          <h1 className="text-9xl font-heading font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            500
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-red-400 to-orange-400" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-bold text-white">Server Error</h2>
          <p className="text-slate-300 text-lg">
            Something went wrong on our end. We're working to fix it.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 group"
            >
              <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </button>
          )}
          <Link
            href="/"
            className="glass-card border border-white/10 hover:border-white/20 px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

/**
 * Empty State Component
 * For when there's no data to display
 */
export function EmptyState({
  icon: CustomIcon,
  title = 'No data found',
  message = 'There is nothing to display here yet.',
  action,
  actionLabel = 'Get Started',
  className,
}) {
  const Icon = CustomIcon || AlertCircle

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 space-y-4',
        className
      )}
    >
      <div className="relative text-slate-500">
        <div className="absolute inset-0 blur-xl opacity-30">
          <Icon className="h-16 w-16" />
        </div>
        <Icon className="h-16 w-16 relative z-10" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-heading font-semibold text-slate-300">{title}</h3>
        <p className="text-sm text-slate-400 max-w-md">{message}</p>
      </div>

      {action && (
        <button onClick={action} className="btn-primary px-6 py-2.5 rounded-lg font-semibold mt-4">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
