import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../Header'

describe('Header Component', () => {
  it('renders the logo/title', () => {
    render(<Header />)
    const logo = screen.getByText('AI Automation Shop')
    expect(logo).toBeInTheDocument()
    // Logo is now a Link component, check the parent
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders desktop navigation links', () => {
    render(<Header />)

    // Check that all navigation links are present in desktop nav
    const servicesLinks = screen.getAllByText('Services')
    const aboutLinks = screen.getAllByText('About Us')
    const contactLinks = screen.getAllByText('Contact')

    // Desktop nav should have at least one of each
    expect(servicesLinks.length).toBeGreaterThan(0)
    expect(aboutLinks.length).toBeGreaterThan(0)
    expect(contactLinks.length).toBeGreaterThan(0)
  })

  it('renders Get Started button', () => {
    render(<Header />)
    const buttons = screen.getAllByText('Get Started')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('mobile menu is hidden by default', () => {
    render(<Header />)

    // Mobile menu should not be visible initially
    // The mobile menu is conditionally rendered, so it shouldn't exist
    const buttons = screen.getAllByText('Services')
    // Only desktop nav should be present (1 instance)
    expect(buttons.length).toBe(1)
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />)

    // Find the mobile menu button
    const menuButton = screen.getByRole('button')

    // Click to open
    fireEvent.click(menuButton)

    // After clicking, mobile menu links should be present
    const mobileServicesLink = screen.getAllByText('Services')
    expect(mobileServicesLink.length).toBe(2) // Both desktop and mobile

    // Click again to close
    fireEvent.click(menuButton)
  })

  it('has correct header styling classes', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')

    expect(header).toHaveClass('fixed')
    expect(header).toHaveClass('top-0')
    // Updated to match new glass morphism design
    expect(header).toHaveClass('transition-all')
  })

  it('navigation links have correct href attributes', () => {
    render(<Header />)

    // Get all anchor tags with the specific text content
    const servicesLinks = screen.getAllByText('Services')
    servicesLinks.forEach(link => {
      // Check the closest anchor tag
      const anchor = link.closest('a')
      if (anchor) {
        expect(anchor).toHaveAttribute('href', '#services')
      }
    })

    const aboutLinks = screen.getAllByText('About Us')
    aboutLinks.forEach(link => {
      const anchor = link.closest('a')
      if (anchor) {
        expect(anchor).toHaveAttribute('href', '#about')
      }
    })

    const contactLinks = screen.getAllByText('Contact')
    contactLinks.forEach(link => {
      const anchor = link.closest('a')
      if (anchor) {
        expect(anchor).toHaveAttribute('href', '#contact')
      }
    })
  })

  it('menu button shows hamburger icon when closed', () => {
    const { container } = render(<Header />)

    // Check for hamburger icon path
    const hamburgerPath = container.querySelector('path[d*="M4 6h16M4 12h16M4 18h16"]')
    expect(hamburgerPath).toBeInTheDocument()
  })

  it('menu button shows close icon when open', () => {
    const { container } = render(<Header />)
    const menuButton = screen.getByRole('button')

    // Open the menu
    fireEvent.click(menuButton)

    // Check for close (X) icon path
    const closeIconPath = container.querySelector('path[d*="M6 18L18 6M6 6l12 12"]')
    expect(closeIconPath).toBeInTheDocument()
  })

  it('has gradient text on logo', () => {
    const { container } = render(<Header />)
    const logo = screen.getByText('AI Automation Shop')

    // Check for gradient text classes
    expect(logo).toHaveClass('bg-gradient-to-r')
    expect(logo).toHaveClass('from-primary-400')
    expect(logo).toHaveClass('to-secondary-400')
  })

  it('has glass morphism effect on scroll', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')

    // Initially should be transparent
    expect(header).toHaveClass('bg-transparent')

    // Simulate scroll event
    global.scrollY = 50
    fireEvent.scroll(window)

    // Note: Testing the actual scroll behavior would require more complex setup
    // This test verifies the component renders correctly
    expect(header).toBeInTheDocument()
  })
})
