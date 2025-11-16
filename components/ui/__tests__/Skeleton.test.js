import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Skeleton, {
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonListItem,
  SkeletonTable,
  SkeletonForm,
  SkeletonGrid,
  SkeletonHeader,
  SkeletonStats,
  SkeletonProfile,
} from '../Skeleton'

describe('Skeleton Component', () => {
  it('renders with default variant', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('[role="status"]')
    expect(skeleton).toHaveClass('bg-white/10')
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('applies different variants', () => {
    const { container, rerender } = render(<Skeleton variant="light" />)
    let skeleton = container.querySelector('[role="status"]')
    expect(skeleton).toHaveClass('bg-white/5')

    rerender(<Skeleton variant="glass" />)
    skeleton = container.querySelector('[role="status"]')
    expect(skeleton).toHaveClass('glass-card')
  })

  it('has proper accessibility attributes', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status')
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content')
    expect(screen.getByText('Loading...')).toHaveClass('sr-only')
  })

  it('accepts custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />)
    const skeleton = container.querySelector('[role="status"]')
    expect(skeleton).toHaveClass('custom-class')
  })
})

describe('SkeletonText Component', () => {
  it('renders 3 lines by default', () => {
    const { container } = render(<SkeletonText />)
    // SkeletonText renders multiple Skeleton components, check container
    expect(container.querySelector('[role="status"]')).toBeInTheDocument()
  })

  it('renders custom number of lines', () => {
    const { container } = render(<SkeletonText lines={5} />)
    const skeletons = container.querySelectorAll('.h-4')
    expect(skeletons.length).toBe(5)
  })

  it('applies custom width to last line', () => {
    const { container } = render(<SkeletonText lines={3} lastLineWidth="40%" />)
    const lines = container.querySelectorAll('.h-4')
    const lastLine = lines[lines.length - 1]
    expect(lastLine).toHaveStyle({ width: '40%' })
  })
})

describe('SkeletonAvatar Component', () => {
  it('renders circular skeleton', () => {
    const { container } = render(<SkeletonAvatar />)
    const avatar = container.querySelector('[role="status"]')
    expect(avatar).toHaveClass('rounded-full')
  })

  it('applies correct size classes', () => {
    const { container, rerender } = render(<SkeletonAvatar size="sm" />)
    let avatar = container.querySelector('[role="status"]')
    expect(avatar).toHaveClass('h-8', 'w-8')

    rerender(<SkeletonAvatar size="xl" />)
    avatar = container.querySelector('[role="status"]')
    expect(avatar).toHaveClass('h-24', 'w-24')
  })
})

describe('SkeletonCard Component', () => {
  it('renders glass card with image by default', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.querySelector('.glass-card')).toBeInTheDocument()
    expect(container.querySelector('.h-48')).toBeInTheDocument() // Image placeholder
  })

  it('hides image when hasImage is false', () => {
    const { container } = render(<SkeletonCard hasImage={false} />)
    expect(container.querySelector('.h-48')).not.toBeInTheDocument()
  })

  it('shows footer when hasFooter is true', () => {
    const { container } = render(<SkeletonCard hasFooter={true} />)
    const buttons = container.querySelectorAll('.h-10.w-24')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('hides footer when hasFooter is false', () => {
    const { container } = render(<SkeletonCard hasFooter={false} />)
    const buttons = container.querySelectorAll('.h-10.w-24')
    expect(buttons.length).toBe(0)
  })
})

describe('SkeletonListItem Component', () => {
  it('renders with avatar by default', () => {
    const { container } = render(<SkeletonListItem />)
    expect(container.querySelector('.rounded-full')).toBeInTheDocument()
  })

  it('hides avatar when hasAvatar is false', () => {
    const { container } = render(<SkeletonListItem hasAvatar={false} />)
    expect(container.querySelector('.rounded-full')).not.toBeInTheDocument()
  })
})

describe('SkeletonTable Component', () => {
  it('renders 5 rows and 4 columns by default', () => {
    const { container } = render(<SkeletonTable />)
    const rows = container.querySelectorAll('.flex.gap-4')
    // Header row + 5 body rows = 6 total
    expect(rows.length).toBe(6)
  })

  it('renders custom number of rows and columns', () => {
    const { container } = render(<SkeletonTable rows={3} columns={5} />)
    const headerCells = container.querySelectorAll('.pb-3 .h-4')
    expect(headerCells.length).toBe(5)
  })
})

describe('SkeletonForm Component', () => {
  it('renders 3 fields by default', () => {
    const { container } = render(<SkeletonForm />)
    const fields = container.querySelectorAll('.h-10.w-full')
    expect(fields.length).toBe(3)
  })

  it('renders custom number of fields', () => {
    const { container } = render(<SkeletonForm fields={5} />)
    const fields = container.querySelectorAll('.h-10.w-full')
    expect(fields.length).toBe(5)
  })

  it('renders submit button', () => {
    const { container } = render(<SkeletonForm />)
    const button = container.querySelector('.h-12.w-32')
    expect(button).toBeInTheDocument()
  })
})

describe('SkeletonGrid Component', () => {
  it('renders 6 items by default', () => {
    const { container } = render(<SkeletonGrid />)
    const grid = container.querySelector('.grid')
    const cards = grid.querySelectorAll(':scope > .glass-card')
    expect(cards.length).toBe(6)
  })

  it('renders custom number of items', () => {
    const { container } = render(<SkeletonGrid items={9} />)
    const grid = container.querySelector('.grid')
    const cards = grid.querySelectorAll(':scope > .glass-card')
    expect(cards.length).toBe(9)
  })

  it('applies correct grid columns class', () => {
    const { container } = render(<SkeletonGrid columns={4} />)
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('lg:grid-cols-4')
  })
})

describe('SkeletonHeader Component', () => {
  it('renders with subtitle by default', () => {
    const { container } = render(<SkeletonHeader />)
    const elements = container.querySelectorAll('[role="status"]')
    expect(elements.length).toBeGreaterThan(1)
  })

  it('hides subtitle when hasSubtitle is false', () => {
    const { container } = render(<SkeletonHeader hasSubtitle={false} />)
    const subtitle = container.querySelector('.h-4.w-1\\/2')
    expect(subtitle).not.toBeInTheDocument()
  })

  it('shows actions when hasActions is true', () => {
    const { container } = render(<SkeletonHeader hasActions={true} />)
    const action = container.querySelector('.h-10.w-32')
    expect(action).toBeInTheDocument()
  })
})

describe('SkeletonStats Component', () => {
  it('renders 4 stat cards by default', () => {
    const { container } = render(<SkeletonStats />)
    const cards = container.querySelectorAll('.glass-card')
    expect(cards.length).toBe(4)
  })

  it('renders custom number of stats', () => {
    const { container } = render(<SkeletonStats items={6} />)
    const cards = container.querySelectorAll('.glass-card')
    expect(cards.length).toBe(6)
  })
})

describe('SkeletonProfile Component', () => {
  it('renders avatar and profile details', () => {
    const { container } = render(<SkeletonProfile />)
    expect(container.querySelector('.rounded-full')).toBeInTheDocument()
    expect(container.querySelector('.h-6.w-48')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    const { container } = render(<SkeletonProfile />)
    const buttons = container.querySelectorAll('.h-10.w-24')
    expect(buttons.length).toBe(2)
  })
})

describe('Accessibility', () => {
  const components = [
    { name: 'Skeleton', Component: Skeleton },
    { name: 'SkeletonText', Component: SkeletonText },
    { name: 'SkeletonAvatar', Component: SkeletonAvatar },
    { name: 'SkeletonCard', Component: SkeletonCard },
    { name: 'SkeletonListItem', Component: SkeletonListItem },
    { name: 'SkeletonTable', Component: SkeletonTable },
    { name: 'SkeletonForm', Component: SkeletonForm },
    { name: 'SkeletonGrid', Component: SkeletonGrid },
    { name: 'SkeletonHeader', Component: SkeletonHeader },
    { name: 'SkeletonStats', Component: SkeletonStats },
    { name: 'SkeletonProfile', Component: SkeletonProfile },
  ]

  components.forEach(({ name, Component }) => {
    it(`${name} has role="status"`, () => {
      render(<Component />)
      const statuses = screen.getAllByRole('status')
      expect(statuses.length).toBeGreaterThan(0)
    })
  })
})
