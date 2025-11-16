/**
 * Tailwind CSS Configuration
 *
 * Uses centralized design tokens from lib/design-tokens.js
 */
const tokens = require('./lib/design-tokens')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors from design tokens
      colors: {
        primary: tokens.primary,
        secondary: tokens.secondary,
        accent: tokens.accent,
        slate: tokens.slate,
      },

      // Typography from design tokens
      fontFamily: {
        sans: tokens.fonts.body,
        heading: tokens.fonts.heading,
        mono: tokens.fonts.mono,
      },

      // Spacing (uses Tailwind defaults, but can be extended)
      spacing: tokens.spacing.scale,

      // Z-index scale from design tokens
      zIndex: tokens.zIndex,

      // Border radius from design tokens
      borderRadius: tokens.borderRadius,

      // Box shadows with glass effects
      boxShadow: tokens.boxShadow,

      // Blur values
      backdropBlur: tokens.blur,
      blur: tokens.blur,

      // Animation configurations
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Add more from design tokens as needed
      },

      // Keyframes
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },

      // Background images
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },

      // Transition durations from design tokens
      transitionDuration: tokens.duration,

      // Transition timing functions from design tokens
      transitionTimingFunction: tokens.ease,
    },
  },
  plugins: [require('tailwindcss-animate')],
}
