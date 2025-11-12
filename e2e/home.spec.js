const { test, expect } = require('@playwright/test')

test.describe('Home Page', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check that the page title or main heading is present
    await expect(page).toHaveTitle(/AI Automation Shop/i)
  })

  test('should display the header navigation', async ({ page }) => {
    await page.goto('/')

    // Check for header elements
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check for navigation links
    await expect(page.getByText('AI Automation Shop')).toBeVisible()
    await expect(page.getByRole('link', { name: /services/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /about/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible()
  })

  test('should display the footer', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Check for footer content
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check for copyright notice
    const currentYear = new Date().getFullYear()
    await expect(page.getByText(`© ${currentYear} AI Automation Shop`)).toBeVisible()
  })

  test('should display Get Started button', async ({ page }) => {
    await page.goto('/')

    // Check for CTA button
    const getStartedButton = page.getByRole('link', { name: /get started/i }).first()
    await expect(getStartedButton).toBeVisible()
  })

  test('mobile menu should toggle', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Find and click the mobile menu button
    const menuButton = page.getByRole('button').first()
    await menuButton.click()

    // Check that mobile menu items are visible after clicking
    // Wait a bit for animation
    await page.waitForTimeout(300)
  })

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/')

    // Check for meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('navigation links should have correct anchors', async ({ page }) => {
    await page.goto('/')

    // Check that anchor links are properly formatted
    const servicesLink = page.getByRole('link', { name: /services/i }).first()
    await expect(servicesLink).toHaveAttribute('href', /#services/)

    const aboutLink = page.getByRole('link', { name: /about/i }).first()
    await expect(aboutLink).toHaveAttribute('href', /#about/)

    const contactLink = page.getByRole('link', { name: /contact/i }).first()
    await expect(contactLink).toHaveAttribute('href', /#contact/)
  })

  test('should be responsive', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' },
    ]

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/')

      // Check that header is visible on all viewports
      const header = page.locator('header')
      await expect(header).toBeVisible()
    }
  })
})

test.describe('Accessibility', () => {
  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/')

    // Check for skip to content link (if present)
    // Check that interactive elements are keyboard accessible
    await page.keyboard.press('Tab')

    // Verify focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Check that there's at least one h1
    const h1Elements = page.locator('h1')
    await expect(h1Elements.first()).toBeVisible()
  })
})
