import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ErrorState, {
  ErrorMessage,
  WarningMessage,
  InfoMessage,
  Error404,
  Error500,
  EmptyState,
} from '../ErrorState'

describe('ErrorState Component', () => {
  it('renders with default error variant', () => {
    render(<ErrorState />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders custom title and message', () => {
    render(<ErrorState title="Custom Error" message="This is a custom error message" />)
    expect(screen.getByText('Custom Error')).toBeInTheDocument()
    expect(screen.getByText('This is a custom error message')).toBeInTheDocument()
  })

  it('renders warning variant', () => {
    const { container } = render(<ErrorState variant="warning" />)
    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(container.querySelector('.border-amber-500\\/30')).toBeInTheDocument()
  })

  it('renders info variant', () => {
    const { container } = render(<ErrorState variant="info" />)
    expect(screen.getByText('Information')).toBeInTheDocument()
    expect(container.querySelector('.border-blue-500\\/30')).toBeInTheDocument()
  })

  it('calls action handler when clicked', () => {
    const handleAction = jest.fn()
    render(<ErrorState action={handleAction} actionLabel="Retry" />)

    const button = screen.getByText('Retry')
    fireEvent.click(button)

    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('renders secondary action', () => {
    const handleSecondary = jest.fn()
    render(
      <ErrorState
        action={() => {}}
        secondaryAction={handleSecondary}
        secondaryActionLabel="Go Back"
      />
    )

    const button = screen.getByText('Go Back')
    fireEvent.click(button)

    expect(handleSecondary).toHaveBeenCalledTimes(1)
  })

  it('renders custom icon', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />
    render(<ErrorState icon={CustomIcon} />)
    const icons = screen.getAllByTestId('custom-icon')
    expect(icons.length).toBe(2) // Rendered twice (blur + normal)
  })

  it('has proper accessibility attributes', () => {
    render(<ErrorState />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAttribute('aria-live', 'polite')
  })
})

describe('ErrorMessage Component', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="This is an error" />)
    expect(screen.getByText('This is an error')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('does not render when message is empty', () => {
    const { container } = render(<ErrorMessage message="" />)
    expect(container.firstChild).toBeNull()
  })

  it('has correct styling', () => {
    const { container } = render(<ErrorMessage message="Error" />)
    const message = container.querySelector('[role="alert"]')
    expect(message).toHaveClass('border-red-500/30')
    expect(message).toHaveClass('bg-red-500/10')
  })
})

describe('WarningMessage Component', () => {
  it('renders warning message', () => {
    render(<WarningMessage message="This is a warning" />)
    expect(screen.getByText('This is a warning')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('does not render when message is empty', () => {
    const { container } = render(<WarningMessage message="" />)
    expect(container.firstChild).toBeNull()
  })

  it('has correct styling', () => {
    const { container } = render(<WarningMessage message="Warning" />)
    const message = container.querySelector('[role="alert"]')
    expect(message).toHaveClass('border-amber-500/30')
    expect(message).toHaveClass('bg-amber-500/10')
  })
})

describe('InfoMessage Component', () => {
  it('renders info message', () => {
    render(<InfoMessage message="This is info" />)
    expect(screen.getByText('This is info')).toBeInTheDocument()
  })

  it('does not render when message is empty', () => {
    const { container } = render(<InfoMessage message="" />)
    expect(container.firstChild).toBeNull()
  })

  it('has correct styling', () => {
    const { container } = render(<InfoMessage message="Info" />)
    const message = container.querySelector('[role="status"]')
    expect(message).toHaveClass('border-blue-500/30')
    expect(message).toHaveClass('bg-blue-500/10')
  })
})

describe('Error404 Component', () => {
  it('renders 404 text', () => {
    render(<Error404 />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<Error404 />)
    expect(screen.getByText('Go Home')).toBeInTheDocument()
    expect(screen.getByText('Go Back')).toBeInTheDocument()
  })

  it('has gradient styling on 404 text', () => {
    render(<Error404 />)
    const heading = screen.getByText('404')
    expect(heading).toHaveClass('bg-gradient-to-r')
    expect(heading).toHaveClass('from-primary-400')
    expect(heading).toHaveClass('to-secondary-400')
  })

  it('go back button triggers history.back', () => {
    const mockBack = jest.fn()
    window.history.back = mockBack

    render(<Error404 />)
    const backButton = screen.getByText('Go Back')
    fireEvent.click(backButton)

    expect(mockBack).toHaveBeenCalled()
  })
})

describe('Error500 Component', () => {
  it('renders 500 text', () => {
    render(<Error500 />)
    expect(screen.getByText('500')).toBeInTheDocument()
    expect(screen.getByText('Server Error')).toBeInTheDocument()
  })

  it('renders retry button when onRetry provided', () => {
    const handleRetry = jest.fn()
    render(<Error500 onRetry={handleRetry} />)

    const retryButton = screen.getByText('Try Again')
    expect(retryButton).toBeInTheDocument()

    fireEvent.click(retryButton)
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  it('does not render retry button when onRetry not provided', () => {
    render(<Error500 />)
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument()
  })

  it('has gradient styling on 500 text', () => {
    render(<Error500 />)
    const heading = screen.getByText('500')
    expect(heading).toHaveClass('bg-gradient-to-r')
    expect(heading).toHaveClass('from-red-400')
    expect(heading).toHaveClass('to-orange-400')
  })
})

describe('EmptyState Component', () => {
  it('renders default empty state', () => {
    render(<EmptyState />)
    expect(screen.getByText('No data found')).toBeInTheDocument()
    expect(screen.getByText('There is nothing to display here yet.')).toBeInTheDocument()
  })

  it('renders custom title and message', () => {
    render(<EmptyState title="No results" message="Try adjusting your search" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your search')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    const handleAction = jest.fn()
    render(<EmptyState action={handleAction} actionLabel="Create New" />)

    const button = screen.getByText('Create New')
    fireEvent.click(button)

    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  it('does not render action when not provided', () => {
    render(<EmptyState />)
    expect(screen.queryByText('Get Started')).not.toBeInTheDocument()
  })

  it('renders custom icon', () => {
    const CustomIcon = () => <svg data-testid="custom-empty-icon" />
    render(<EmptyState icon={CustomIcon} />)
    const icons = screen.getAllByTestId('custom-empty-icon')
    expect(icons.length).toBe(2) // Rendered twice (blur + normal)
  })
})

describe('Accessibility', () => {
  it('ErrorState has alert role', () => {
    render(<ErrorState />)
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite')
  })

  it('inline messages have appropriate roles', () => {
    render(
      <>
        <ErrorMessage message="Error" />
        <WarningMessage message="Warning" />
        <InfoMessage message="Info" />
      </>
    )

    const alerts = screen.getAllByRole('alert')
    expect(alerts.length).toBe(2) // Error and Warning

    const status = screen.getByRole('status')
    expect(status).toBeInTheDocument() // Info
  })

  it('action buttons are keyboard accessible', () => {
    const handleAction = jest.fn()
    render(<ErrorState action={handleAction} />)

    const button = screen.getByText('Try Again')
    button.focus()
    expect(button).toHaveFocus()
  })
})
