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
    const socialLinks = container.querySelectorAll('a[aria-label]')

    // Should have 4 social media links (Facebook, Twitter, LinkedIn, GitHub)
    expect(socialLinks.length).toBeGreaterThanOrEqual(4)
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

    // For Services, About Us, and Contact, find the link element
    const servicesLinks = screen.getAllByText('Services')
    servicesLinks.forEach(link => {
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

  it('has correct footer styling', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')

    // Updated to match new glass morphism design
    expect(footer).toHaveClass('bg-black')
    expect(footer).toHaveClass('border-t')
    expect(footer).toHaveClass('overflow-hidden')
  })

  it('renders four main columns in grid layout', () => {
    const { container } = render(<Footer />)
    const gridContainer = container.querySelector('.grid')

    expect(gridContainer).toHaveClass('grid-cols-1')
    // Updated to match new 4-column layout
    expect(gridContainer).toHaveClass('md:grid-cols-4')
  })

  it('contact info includes SVG icons', () => {
    const { container } = render(<Footer />)
    const contactSection = screen.getByText('Contact Us').closest('div')
    const icons = contactSection.querySelectorAll('svg')

    // Should have 3 icons (location, email, phone)
    expect(icons.length).toBe(3)
  })

  it('has gradient text on company name', () => {
    render(<Footer />)
    const companyName = screen.getByText('AI Automation Shop')

    // Check for gradient text classes
    expect(companyName).toHaveClass('bg-gradient-to-r')
    expect(companyName).toHaveClass('from-primary-400')
    expect(companyName).toHaveClass('to-secondary-400')
  })

  it('renders privacy and legal links', () => {
    render(<Footer />)

    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument()
  })

  it('renders built with badge', () => {
    render(<Footer />)

    expect(screen.getByText(/Built with/i)).toBeInTheDocument()
    expect(screen.getByText(/Next.js & AI/i)).toBeInTheDocument()
  })

  it('has background gradient effects', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')

    // Check that footer is relative positioned for absolute children
    expect(footer).toHaveClass('relative')

    // Check for background gradient divs
    const gradients = footer.querySelectorAll(
      '.absolute.bg-gradient-to-b, .absolute.bg-primary-500\\/5'
    )
    expect(gradients.length).toBeGreaterThan(0)
  })
})
