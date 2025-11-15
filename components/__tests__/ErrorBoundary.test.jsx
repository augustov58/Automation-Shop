import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorBoundary from '../ErrorBoundary'

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error')
}

// Component that works fine
const WorkingComponent = () => <div>Working Component</div>

// Suppress console errors for cleaner test output
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Working Component')).toBeInTheDocument()
  })

  it('renders error UI when an error is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/We're sorry for the inconvenience/i)).toBeInTheDocument()
  })

  it('shows reload and go home buttons on error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByRole('button', { name: /reload page/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument()
  })

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Check for details element
    const details = screen.getByText(/Error Details/i)
    expect(details).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('shows contact support link', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    const supportLink = screen.getByText(/contact support/i)
    expect(supportLink).toBeInTheDocument()
    expect(supportLink).toHaveAttribute('href', '#contact')
  })
})
