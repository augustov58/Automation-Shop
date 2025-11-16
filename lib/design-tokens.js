/**
 * Design Tokens - Single Source of Truth
 *
 * This file contains all design system values used across the application.
 * Import these tokens in Tailwind config, components, and CSS files.
 */

// ============================================================================
// COLORS
// ============================================================================

/**
 * Primary color palette - Sky Blue
 * Used for CTAs, links, and primary actions
 */
export const primary = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  DEFAULT: '#38bdf8', // 400
  rgb: '56, 189, 248', // For rgba() usage
}

/**
 * Secondary color palette - Purple
 * Used for accents and secondary actions
 */
export const secondary = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  DEFAULT: '#8b5cf6', // Custom default
  rgb: '139, 92, 246', // For rgba() usage
}

/**
 * Accent color - Orange
 * Used for highlights and special emphasis
 */
export const accent = {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
  DEFAULT: '#f97316', // 500
  rgb: '249, 115, 22', // For rgba() usage
}

/**
 * Neutral/Slate palette - Backgrounds and text
 * Primary gray scale for the dark theme
 */
export const slate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
}

/**
 * Background colors
 */
export const backgrounds = {
  dark: '#000000',
  medium: '#1f1f1f',
  light: '#2d2d2d',
  slate: {
    dark: slate[900], // #0f172a
    medium: slate[800], // #1e293b
    light: slate[700], // #334155
  },
}

/**
 * Text colors
 */
export const text = {
  primary: '#f3f4f6', // Gray 100
  secondary: '#d1d5db', // Gray 300
  tertiary: '#9ca3af', // Gray 400
  white: '#ffffff',
  slate: {
    primary: slate[50], // Lightest
    secondary: slate[200],
    tertiary: slate[400],
  },
}

/**
 * Glass morphism effect colors
 */
export const glass = {
  highlight: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.1)',
  shadow: 'rgba(0, 0, 0, 0.3)',
  background: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
}

// ============================================================================
// TYPOGRAPHY
// ============================================================================

/**
 * Font families
 */
export const fonts = {
  heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
  body: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['Monaco', 'Courier New', 'monospace'],
}

/**
 * Font sizes - Fluid typography using clamp()
 * Scales responsively between mobile and desktop
 */
export const fontSize = {
  xs: 'clamp(0.75rem, 0.7vw, 0.875rem)',
  sm: 'clamp(0.875rem, 0.8vw, 1rem)',
  base: 'clamp(1rem, 1vw, 1.125rem)',
  lg: 'clamp(1.125rem, 1.2vw, 1.25rem)',
  xl: 'clamp(1.25rem, 1.5vw, 1.5rem)',
  '2xl': 'clamp(1.5rem, 2vw, 1.875rem)',
  '3xl': 'clamp(1.875rem, 2.5vw, 2.25rem)',
  '4xl': 'clamp(2.25rem, 3vw, 3rem)',
  '5xl': 'clamp(3rem, 4vw, 4rem)',
  '6xl': 'clamp(3.75rem, 5vw, 5rem)',
  '7xl': 'clamp(4.5rem, 7vw, 6rem)',
}

/**
 * Line heights
 */
export const lineHeight = {
  none: 1,
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
}

/**
 * Letter spacing
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

/**
 * Font weights
 */
export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

// ============================================================================
// SPACING
// ============================================================================

/**
 * Spacing scale (used for padding, margin, gap)
 * Follows Tailwind's default scale
 */
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
  40: '10rem', // 160px
  48: '12rem', // 192px
  56: '14rem', // 224px
  64: '16rem', // 256px
}

/**
 * Container padding at different breakpoints
 */
export const containerPadding = {
  mobile: '1.25rem', // 20px
  sm: '1.5rem', // 24px
  md: '2rem', // 32px
  lg: '2.5rem', // 40px
  xl: '3rem', // 48px
}

// ============================================================================
// LAYOUT
// ============================================================================

/**
 * Z-index scale - Systematic layering
 * Use these instead of arbitrary values
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  'modal-backdrop': 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  notification: 1080,
}

/**
 * Breakpoints - Should match Tailwind's defaults
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

/**
 * Container max widths
 */
export const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ============================================================================
// EFFECTS
// ============================================================================

/**
 * Border radius
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}

/**
 * Box shadows
 */
export const boxShadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  // Glass morphism shadows
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
}

/**
 * Glow effects
 */
export const glow = {
  primary: `0 0 20px rgba(${primary.rgb}, 0.5)`,
  'primary-lg': `0 0 40px rgba(${primary.rgb}, 0.6)`,
  secondary: `0 0 20px rgba(${secondary.rgb}, 0.5)`,
  'secondary-lg': `0 0 40px rgba(${secondary.rgb}, 0.6)`,
  accent: `0 0 20px rgba(${accent.rgb}, 0.5)`,
  white: '0 0 20px rgba(255, 255, 255, 0.3)',
  'white-lg': '0 0 40px rgba(255, 255, 255, 0.4)',
}

/**
 * Blur values
 */
export const blur = {
  none: '0',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
}

// ============================================================================
// ANIMATION
// ============================================================================

/**
 * Animation durations
 */
export const duration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
}

/**
 * Animation timing functions
 */
export const ease = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
}

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Combined tokens object for easy importing
 */
const tokens = {
  colors: {
    primary,
    secondary,
    accent,
    slate,
    backgrounds,
    text,
    glass,
  },
  typography: {
    fonts,
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight,
  },
  spacing: {
    scale: spacing,
    container: containerPadding,
  },
  layout: {
    zIndex,
    breakpoints,
    container,
  },
  effects: {
    borderRadius,
    boxShadow,
    glow,
    blur,
  },
  animation: {
    duration,
    ease,
  },
}

export default tokens
