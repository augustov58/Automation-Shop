import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Loading, { LoadingContainer, LoadingOverlay, ButtonLoading } from '../Loading'

describe('Loading Component', () => {
  describe('Spinner variant', () => {
    it('renders spinner by default', () => {
      render(<Loading />)
      expect(screen.getByRole('status')).toBeInTheDocument()
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('applies correct size classes', () => {
      const { container, rerender } = render(<Loading variant="spinner" size="sm" />)
      let spinner = container.querySelector('.animate-spin')
      expect(spinner).toHaveClass('h-4', 'w-4')

      rerender(<Loading variant="spinner" size="lg" />)
      spinner = container.querySelector('.animate-spin')
      expect(spinner).toHaveClass('h-12', 'w-12')
    })

    it('applies correct color classes', () => {
      const { container } = render(<Loading variant="spinner" color="primary" />)
      const spinner = container.querySelector('.animate-spin')
      expect(spinner).toHaveClass('border-primary-400')
    })
  })

  describe('Dots variant', () => {
    it('renders three dots', () => {
      const { container } = render(<Loading variant="dots" />)
      const dots = container.querySelectorAll('[role="status"] > div')
      expect(dots.length).toBe(3)
    })

    it('applies staggered animation delays', () => {
      const { container } = render(<Loading variant="dots" />)
      const dots = container.querySelectorAll('[role="status"] > div')

      expect(dots[0]).toHaveStyle({ animationDelay: '0ms' })
      expect(dots[1]).toHaveStyle({ animationDelay: '150ms' })
      expect(dots[2]).toHaveStyle({ animationDelay: '300ms' })
    })
  })

  describe('Pulse variant', () => {
    it('renders pulse circles', () => {
      const { container } = render(<Loading variant="pulse" />)
      const circles = container.querySelectorAll('div[class*="rounded-full"]')
      expect(circles.length).toBeGreaterThan(0)
    })
  })

  describe('Bar variant', () => {
    it('renders progress bar', () => {
      const { container } = render(<Loading variant="bar" />)
      const bar = container.querySelector('[role="status"]')
      expect(bar).toBeInTheDocument()
      expect(bar).toHaveClass('glass-card')
    })
  })

  describe('Full screen mode', () => {
    it('renders full screen loading', () => {
      const { container } = render(<Loading fullScreen />)
      const fullScreen = container.querySelector('.fixed')
      expect(fullScreen).toHaveClass('inset-0')
      expect(fullScreen).toHaveClass('z-[var(--z-modal)]')
    })
  })

  describe('Loading text', () => {
    it('displays custom loading text', () => {
      render(<Loading text="Loading data..." />)
      expect(screen.getByText('Loading data...')).toBeInTheDocument()
    })

    it('applies pulse animation to text', () => {
      render(<Loading text="Please wait" />)
      const text = screen.getByText('Please wait')
      expect(text).toHaveClass('animate-pulse')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<Loading />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has screen reader text', () => {
      render(<Loading />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
      expect(screen.getByText('Loading...')).toHaveClass('sr-only')
    })
  })
})

describe('LoadingContainer Component', () => {
  it('shows children when not loading', () => {
    render(
      <LoadingContainer isLoading={false}>
        <div>Content</div>
      </LoadingContainer>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('shows loader when loading', () => {
    render(
      <LoadingContainer isLoading={true}>
        <div>Content</div>
      </LoadingContainer>
    )
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('accepts custom loader', () => {
    render(
      <LoadingContainer isLoading={true} loader={<div>Custom Loader</div>}>
        <div>Content</div>
      </LoadingContainer>
    )
    expect(screen.getByText('Custom Loader')).toBeInTheDocument()
  })
})

describe('LoadingOverlay Component', () => {
  it('shows children always', () => {
    render(
      <LoadingOverlay isLoading={false}>
        <div>Content</div>
      </LoadingOverlay>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('shows overlay when loading', () => {
    const { container } = render(
      <LoadingOverlay isLoading={true}>
        <div>Content</div>
      </LoadingOverlay>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()

    const overlay = container.querySelector('.absolute.inset-0')
    expect(overlay).toBeInTheDocument()
  })
})

describe('ButtonLoading Component', () => {
  it('renders small spinner by default', () => {
    const { container } = render(<ButtonLoading />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toHaveClass('h-4', 'w-4')
  })

  it('applies white color by default', () => {
    const { container } = render(<ButtonLoading />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toHaveClass('border-white')
  })
})
