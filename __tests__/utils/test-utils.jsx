import { render } from '@testing-library/react'
import { ReactNode } from 'react'

/**
 * Custom render function that wraps components with common providers
 * Add any global providers here (theme, context, etc.)
 */
export function renderWithProviders(ui, options = {}) {
  const AllProviders = ({ children }) => {
    // Add your providers here when needed
    // Example: <ThemeProvider><YourProvider>{children}</YourProvider></ThemeProvider>
    return <>{children}</>
  }

  return render(ui, { wrapper: AllProviders, ...options })
}

/**
 * Re-export everything from React Testing Library
 */
export * from '@testing-library/react'

/**
 * Override render method
 */
export { renderWithProviders as render }
