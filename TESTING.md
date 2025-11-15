# Testing Guide

This document provides comprehensive guidelines for testing the AI Automation Shop application.

## Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Unit & Integration Tests](#unit--integration-tests)
- [E2E Tests](#e2e-tests)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Continuous Integration](#continuous-integration)

---

## Overview

The project uses a multi-layered testing strategy:

1. **Unit Tests** - Test individual components and utilities in isolation
2. **Integration Tests** - Test component interactions and data flow
3. **E2E Tests** - Test complete user workflows across the application

## Testing Stack

### Unit & Integration Testing

- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM
- **@testing-library/user-event** - User interaction simulation

### E2E Testing

- **Playwright** - Browser automation and E2E testing
- Supports Chromium, Firefox, WebKit, and mobile browsers

---

## Running Tests

### All Test Commands

```bash
# Unit & Integration Tests
npm test                  # Run all Jest tests
npm run test:watch        # Run Jest in watch mode
npm run test:coverage     # Run Jest with coverage report

# E2E Tests
npm run test:e2e          # Run all Playwright tests
npm run test:e2e:ui       # Run Playwright with interactive UI
npm run test:e2e:headed   # Run Playwright with visible browser
npm run test:e2e:debug    # Run Playwright in debug mode

# All Tests
npm run test:all          # Run both Jest and Playwright tests
```

### First-Time Setup for E2E Tests

Before running E2E tests for the first time, install browser binaries:

```bash
npm run playwright:install
```

---

## Unit & Integration Tests

### Directory Structure

```
project-root/
├── components/
│   ├── Header.js
│   └── __tests__/
│       └── Header.test.js
├── lib/
│   ├── utils.js
│   └── __tests__/
│       └── utils.test.js
└── app/
    ├── page.js
    └── __tests__/
        └── page.test.js
```

### Test File Naming

- Unit tests: `ComponentName.test.js` or `ComponentName.spec.js`
- Place tests in `__tests__` directory next to the code being tested

### Example Component Test

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles user interaction', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('Clicked')).toBeInTheDocument()
  })
})
```

### Test Utilities

Custom test utilities are available in `__tests__/utils/`:

- **test-utils.jsx** - Custom render function with providers
- **test-helpers.js** - Common testing helpers and mocks

Example usage:

```javascript
import { render, screen } from '@/__tests__/utils/test-utils'
import { createMockRouter } from '@/__tests__/utils/test-helpers'
```

---

## E2E Tests

### Directory Structure

```
e2e/
├── home.spec.js
└── [other-page].spec.js
```

### Example E2E Test

```javascript
const { test, expect } = require('@playwright/test')

test('should navigate to about page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /about/i }).click()
  await expect(page).toHaveURL(/#about/)
})
```

### Running Specific Tests

```bash
# Run tests in a specific file
npx playwright test e2e/home.spec.js

# Run tests matching a pattern
npx playwright test --grep "navigation"

# Run tests in a specific browser
npx playwright test --project=chromium
```

### Browser Configuration

Playwright is configured to test on:

- Desktop: Chromium, Firefox, WebKit
- Mobile: Chrome (Pixel 5), Safari (iPhone 12)

Edit `playwright.config.js` to modify browser configurations.

---

## Writing Tests

### Component Testing Guidelines

1. **Test user behavior, not implementation**

   ```javascript
   // ✅ Good - tests user-visible behavior
   expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()

   // ❌ Bad - tests implementation details
   expect(component.state.isSubmitting).toBe(false)
   ```

2. **Use semantic queries**

   ```javascript
   // Priority order:
   screen.getByRole() // Preferred
   screen.getByLabelText() // Forms
   screen.getByPlaceholderText()
   screen.getByText() // Non-interactive elements
   screen.getByTestId() // Last resort
   ```

3. **Test accessibility**

   ```javascript
   it('is keyboard accessible', () => {
     render(<MyComponent />)
     const button = screen.getByRole('button')
     button.focus()
     fireEvent.keyDown(button, { key: 'Enter' })
     expect(screen.getByText('Success')).toBeInTheDocument()
   })
   ```

4. **Mock external dependencies**
   ```javascript
   jest.mock('next/navigation', () => ({
     useRouter: () => ({
       push: jest.fn(),
       pathname: '/',
     }),
   }))
   ```

### E2E Testing Guidelines

1. **Test critical user flows**
   - User registration/login
   - Main feature workflows
   - Checkout/payment flows
   - Form submissions

2. **Test across devices**

   ```javascript
   test('works on mobile', async ({ page }) => {
     await page.setViewportSize({ width: 375, height: 667 })
     // ... test mobile-specific behavior
   })
   ```

3. **Use data-testid sparingly**
   - Prefer user-visible text and roles
   - Only use data-testid when necessary

4. **Wait for dynamic content**
   ```javascript
   await expect(page.getByText('Loaded')).toBeVisible()
   ```

---

## Best Practices

### General

- ✅ Write tests before fixing bugs (TDD)
- ✅ Keep tests simple and focused
- ✅ One assertion per test (when possible)
- ✅ Use descriptive test names
- ✅ Clean up after tests (unmount, clear mocks)

### Performance

- ⚡ Mock expensive operations
- ⚡ Use `beforeEach` for common setup
- ⚡ Avoid unnecessary re-renders
- ⚡ Run tests in parallel when possible

### Maintainability

- 📝 Keep tests close to the code they test
- 📝 Avoid testing implementation details
- 📝 Use test utilities for common patterns
- 📝 Update tests when requirements change

---

## Code Coverage

### Viewing Coverage

```bash
npm run test:coverage
```

Coverage reports are generated in `/coverage` directory.

### Coverage Thresholds

Current thresholds (configured in `jest.config.js`):

- Branches: 50%
- Functions: 50%
- Lines: 50%
- Statements: 50%

### Viewing HTML Coverage Report

```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

---

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

---

## Troubleshooting

### Common Issues

**Jest tests failing with module import errors**

- Ensure `jest.config.js` has correct `moduleNameMapper`
- Check that `@/` path alias matches `tsconfig.json`

**Playwright browser not found**

- Run `npm run playwright:install`

**Tests timeout**

- Increase timeout in test file: `test.setTimeout(60000)`
- Or in config: `timeout: 60 * 1000`

**React hooks error in tests**

- Ensure you're using `render()` from `@testing-library/react`
- Mock `'use client'` directives if needed

---

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Getting Help

If you encounter issues:

1. Check this documentation
2. Review existing tests for examples
3. Check the testing library documentation
4. Ask the team in Slack #testing channel
