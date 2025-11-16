import { cn } from '@/lib/utils'

/**
 * GlassCard Component
 *
 * A reusable card component with glass morphism effect.
 * Provides consistent styling across the application.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {('light'|'medium'|'dark')} props.variant - Glass effect intensity
 * @param {boolean} props.hover - Enable hover effects
 * @param {boolean} props.glow - Enable glow effect
 * @param {string} props.glowColor - Glow color ('primary'|'secondary'|'accent')
 */
export default function GlassCard({
  children,
  className,
  variant = 'medium',
  hover = false,
  glow = false,
  glowColor = 'primary',
  ...props
}) {
  const variants = {
    light: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/10',
    dark: 'bg-slate-900/60 backdrop-blur-lg border-white/10',
  }

  const glowColors = {
    primary: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.3)]',
    secondary: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    accent: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]',
  }

  return (
    <div
      className={cn(
        // Base styles
        'relative rounded-xl border transition-all duration-300',
        // Variant styles
        variants[variant],
        // Hover effects
        hover && 'hover:-translate-y-1 hover:border-white/20',
        // Glow effects
        glow && glowColors[glowColor],
        // Custom className
        className
      )}
      {...props}
    >
      {/* Inner glow highlight */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/**
 * GlassCardHeader - Header section for GlassCard
 */
export function GlassCardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-b border-white/5', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * GlassCardBody - Body section for GlassCard
 */
export function GlassCardBody({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * GlassCardFooter - Footer section for GlassCard
 */
export function GlassCardFooter({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4 border-t border-white/5', className)} {...props}>
      {children}
    </div>
  )
}
