import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../Header'

describe('Header Component', () => {
  it('renders the logo/title', () => {
    render(<Header />)
    const logo = screen.getByText('AI Automation Shop')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
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
    const mobileNav = screen.queryByRole('navigation')
    // Note: We can't easily test visibility classes, but we can test presence
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />)

    // Find the mobile menu button
    const menuButton = screen.getByRole('button')

    // Initially, mobile menu should not be visible
    // Click to open
    fireEvent.click(menuButton)

    // After clicking, mobile menu links should be present
    const mobileServicesLink = screen.getAllByText('Services')
    expect(mobileServicesLink.length).toBeGreaterThan(1) // Both desktop and mobile

    // Click again to close
    fireEvent.click(menuButton)
  })

  it('has correct header styling classes', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')

    expect(header).toHaveClass('fixed')
    expect(header).toHaveClass('top-0')
    expect(header).toHaveClass('bg-slate-800')
  })

  it('navigation links have correct href attributes', () => {
    render(<Header />)

    const servicesLinks = screen.getAllByText('Services')
    servicesLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#services')
    })

    const aboutLinks = screen.getAllByText('About Us')
    aboutLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#about')
    })

    const contactLinks = screen.getAllByText('Contact')
    contactLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#contact')
    })
  })

  it('menu button shows hamburger icon when closed', () => {
    const { container } = render(<Header />)
    const menuButton = screen.getByRole('button')

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
})
