import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the LampDemo component since it has complex animations
jest.mock('@/components/LampDemo', () => {
  return function MockLampDemo() {
    return <div data-testid="lamp-demo">Lamp Demo Component</div>
  }
})

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({
    start: jest.fn(),
    set: jest.fn(),
  }),
}))

describe('Home Page', () => {
  // Since the page.js is very large and complex with many client-side features,
  // we'll create a simpler test that checks the basic structure

  it('should be importable without errors', async () => {
    // This test ensures the page module doesn't have syntax errors
    const HomePage = (await import('../page')).default
    expect(HomePage).toBeDefined()
    expect(typeof HomePage).toBe('function')
  })

  // Note: Full page testing would require mocking many dependencies
  // (Calendly, Embla Carousel, window APIs, etc.)
  // These tests demonstrate the testing setup is working
})
