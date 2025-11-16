'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

/**
 * Tooltip Component
 * Accessible tooltip using Radix UI with glass morphism design
 */

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 8, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'glass-card border-white/20',
      dark: 'bg-slate-900/95 backdrop-blur-md border-white/10',
      light: 'bg-white/20 backdrop-blur-md border-white/30',
      primary: 'glass-card border-primary-400/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]',
      secondary: 'glass-card border-secondary-400/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]',
    }

    return (
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--z-tooltip)] overflow-hidden rounded-lg border px-3 py-2 text-sm shadow-lg',
          'animate-fade-in',
          'data-[state=closed]:animate-fade-out',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const TooltipArrow = React.forwardRef(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow ref={ref} className={cn('fill-white/10', className)} {...props} />
))
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName

/**
 * Simple Tooltip Component
 * All-in-one tooltip for easy usage
 */
export function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  variant = 'default',
  delayDuration = 200,
  arrow = true,
  asChild = true,
  ...props
}) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} variant={variant} {...props}>
          <span className="text-white">{content}</span>
          {arrow && <TooltipArrow />}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

/**
 * Rich Tooltip Component
 * Supports title, description, and custom content
 */
export function RichTooltip({
  children,
  title,
  description,
  content,
  side = 'top',
  align = 'center',
  variant = 'default',
  delayDuration = 200,
  arrow = true,
  asChild = true,
  className,
  ...props
}) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          variant={variant}
          className={cn('max-w-xs', className)}
          {...props}
        >
          {content ? (
            content
          ) : (
            <div className="space-y-1.5">
              {title && <p className="font-semibold text-white text-sm">{title}</p>}
              {description && (
                <p className="text-slate-300 text-xs leading-relaxed">{description}</p>
              )}
            </div>
          )}
          {arrow && <TooltipArrow />}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

/**
 * Info Tooltip
 * Quick info icon with tooltip
 */
export function InfoTooltip({ content, className, iconClassName }) {
  return (
    <Tooltip content={content} side="top">
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-full hover:bg-white/10 transition-colors',
          className
        )}
        aria-label="More information"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('h-4 w-4 text-slate-400', iconClassName)}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>
    </Tooltip>
  )
}

/**
 * Keyboard Shortcut Tooltip
 * Shows keyboard shortcuts
 */
export function KeyboardTooltip({ children, keys, description, ...props }) {
  return (
    <RichTooltip
      content={
        <div className="space-y-2">
          {description && <p className="text-white text-sm">{description}</p>}
          <div className="flex gap-1">
            {keys.map((key, index) => (
              <React.Fragment key={index}>
                <kbd className="px-2 py-1 text-xs font-mono bg-black/50 border border-white/20 rounded text-slate-300">
                  {key}
                </kbd>
                {index < keys.length - 1 && <span className="text-slate-400 text-xs">+</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      }
      {...props}
    >
      {children}
    </RichTooltip>
  )
}

/**
 * Copy Tooltip
 * Shows "Copied!" message when triggered
 */
export function CopyTooltip({ children, onCopy, defaultContent = 'Click to copy', ...props }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    if (onCopy) {
      await onCopy()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tooltip
      content={copied ? 'Copied!' : defaultContent}
      variant={copied ? 'primary' : 'default'}
      {...props}
    >
      <button onClick={handleCopy} className="inline-flex">
        {children}
      </button>
    </Tooltip>
  )
}

// Export primitives for advanced usage
export { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent, TooltipArrow }

export default Tooltip
