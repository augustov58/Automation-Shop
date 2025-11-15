import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer'

describe('Footer Component', () => {
  it('renders the company name', () => {
    render(<Footer />)
    const companyName = screen.getByText('AI Automation Shop')
    expect(companyName).toBeInTheDocument()
  })

  it('renders the company description', () => {
    render(<Footer />)
    const description = screen.getByText(
      /Your trusted partner for AI-powered automation solutions/i
    )
    expect(description).toBeInTheDocument()
  })

  it('renders all social media icons', () => {
    const { container } = render(<Footer />)
    const socialLinks = container.querySelectorAll('a[href="#"]')

    // Should have 3 social media links (Facebook, Twitter, LinkedIn)
    expect(socialLinks.length).toBeGreaterThanOrEqual(3)
  })

  it('renders Quick Links section', () => {
    render(<Footer />)
    const quickLinksHeading = screen.getByText('Quick Links')
    expect(quickLinksHeading).toBeInTheDocument()

    // Check for all quick links
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About Us').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('renders Contact Us section', () => {
    render(<Footer />)
    const contactHeading = screen.getByText('Contact Us')
    expect(contactHeading).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)

    // Check for address
    expect(screen.getByText(/123 Innovation Street/i)).toBeInTheDocument()

    // Check for email
    expect(screen.getByText(/info@aiautomationshop.com/i)).toBeInTheDocument()

    // Check for phone
    expect(screen.getByText(/\+1 \(555\) 123-4567/i)).toBeInTheDocument()
  })

  it('renders copyright notice with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(new RegExp(`© ${currentYear} AI Automation Shop`))
    expect(copyright).toBeInTheDocument()
  })

  it('navigation links have correct href attributes', () => {
    render(<Footer />)

    // Get all links and filter by text
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '#')

    const servicesLinks = screen.getAllByText('Services')
    const servicesLinkElement = servicesLinks.find(link => link.tagName === 'A')
    expect(servicesLinkElement).toHaveAttribute('href', '#services')

    const aboutLinks = screen.getAllByText('About Us')
    const aboutLinkElement = aboutLinks.find(link => link.tagName === 'A')
    expect(aboutLinkElement).toHaveAttribute('href', '#about')

    const contactLinks = screen.getAllByText('Contact')
    const contactLinkElement = contactLinks.find(link => link.tagName === 'A')
    expect(contactLinkElement).toHaveAttribute('href', '#contact')
  })

  it('has correct footer styling', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')

    expect(footer).toHaveClass('bg-slate-800')
    expect(footer).toHaveClass('text-white')
  })

  it('renders three main columns in grid layout', () => {
    const { container } = render(<Footer />)
    const gridContainer = container.querySelector('.grid')

    expect(gridContainer).toHaveClass('grid-cols-1')
    expect(gridContainer).toHaveClass('md:grid-cols-3')
  })

  it('contact info includes SVG icons', () => {
    const { container } = render(<Footer />)
    const contactSection = screen.getByText('Contact Us').closest('div')
    const icons = contactSection.querySelectorAll('svg')

    // Should have 3 icons (location, email, phone)
    expect(icons.length).toBe(3)
  })
})
