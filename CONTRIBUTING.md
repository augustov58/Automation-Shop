# Contributing to AI Automation Shop

Thank you for your interest in contributing to AI Automation Shop! We welcome contributions from the community and are grateful for your support.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

---

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

**In short:**

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect differing viewpoints

---

## 🚀 Getting Started

### Prerequisites

Ensure you have:

- **Node.js** 18.x or higher
- **npm** 10.x or higher
- **Git** installed

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork locally:**

```bash
git clone https://github.com/YOUR_USERNAME/Automation-Shop.git
cd Automation-Shop
```

3. **Add upstream remote:**

```bash
git remote add upstream https://github.com/augustov58/Automation-Shop.git
```

4. **Install dependencies:**

```bash
npm install
```

5. **Create a feature branch:**

```bash
git checkout -b feature/your-feature-name
```

---

## 🔄 Development Workflow

### 1. Sync with Upstream

Before starting work, sync with the main repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Create a Feature Branch

Use descriptive branch names:

```bash
# Feature branches
git checkout -b feature/add-dark-mode
git checkout -b feature/contact-form-validation

# Bug fix branches
git checkout -b fix/header-mobile-menu
git checkout -b fix/carousel-navigation

# Documentation branches
git checkout -b docs/update-readme
git checkout -b docs/add-api-examples
```

### 3. Make Your Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add tests for new features
- Update documentation as needed

### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Check code quality
npm run lint
```

### 5. Commit Your Changes

Write clear, descriptive commit messages (see [Commit Messages](#commit-messages)):

```bash
git add .
git commit -m "feat: add dark mode toggle to settings"
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

Go to GitHub and open a Pull Request from your fork to the main repository.

---

## 💻 Coding Standards

### JavaScript/TypeScript

- Use **ES6+** syntax
- Use **const** and **let** instead of **var**
- Prefer **arrow functions** for callbacks
- Use **async/await** over promises when possible
- Add **JSDoc comments** for functions

**Example:**

```javascript
/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
```

### React Components

- Use **functional components** with hooks
- Keep components **small and focused**
- Extract reusable logic into **custom hooks**
- Use **TypeScript** for new components when possible
- Add **prop types** or **TypeScript types**

**Example:**

```jsx
/**
 * Button component with loading state
 * @param {Object} props
 * @param {string} props.children - Button text
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onClick - Click handler
 */
export function Button({ children, loading, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
```

### Styling

- Use **Tailwind CSS** utility classes
- Use the **cn()** utility for conditional classes
- Follow the existing **design system** (colors, spacing)
- Ensure **mobile-first** responsive design
- Test on multiple screen sizes

**Example:**

```jsx
import { cn } from '@/lib/utils'

export function Card({ className, children }) {
  return <div className={cn('rounded-lg border bg-card p-6 shadow-sm', className)}>{children}</div>
}
```

### File Naming

- **Components**: PascalCase (e.g., `Header.js`, `ContactForm.jsx`)
- **Utilities**: camelCase (e.g., `utils.js`, `formatDate.js`)
- **Tests**: Same as source + `.test` or `.spec` (e.g., `Header.test.js`)
- **Types**: Same as source + `.d.ts` (e.g., `types.d.ts`)

### Directory Structure

Place files in appropriate directories:

```
app/          # Pages and routes
components/   # Reusable components
lib/          # Utility functions
hooks/        # Custom React hooks
types/        # TypeScript type definitions
```

---

## 🧪 Testing Guidelines

### Writing Tests

Every new feature should include tests:

- **Unit tests** for utilities and pure functions
- **Component tests** for React components
- **Integration tests** for feature workflows
- **E2E tests** for critical user journeys

### Test Structure

Use the **Arrange-Act-Assert** pattern:

```javascript
describe('formatDate', () => {
  it('formats ISO date to readable format', () => {
    // Arrange
    const isoDate = '2024-01-15T10:30:00Z'

    // Act
    const result = formatDate(isoDate)

    // Assert
    expect(result).toBe('January 15, 2024')
  })
})
```

### Component Testing

Test user behavior, not implementation:

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Coverage Requirements

- Aim for **80%+ code coverage** for new code
- All critical paths must be tested
- Don't sacrifice quality for coverage numbers

---

## 📝 Commit Messages

We follow the **Conventional Commits** specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
# Feature
feat(auth): add login functionality

# Bug fix
fix(header): resolve mobile menu not closing

# Documentation
docs(readme): update installation instructions

# Breaking change
feat(api): redesign contact form API

BREAKING CHANGE: Contact form now requires email validation
```

### Best Practices

- Use **imperative mood** ("add" not "added")
- Keep subject line **under 72 characters**
- Reference **issue numbers** when applicable
- Provide **context** in the body for complex changes

---

## 🔍 Pull Request Process

### Before Submitting

1. ✅ Run all tests and ensure they pass
2. ✅ Run linter and fix any issues
3. ✅ Update documentation if needed
4. ✅ Add/update tests for your changes
5. ✅ Rebase on latest main branch
6. ✅ Write a clear PR description

### PR Title

Follow the same format as commit messages:

```
feat(component): add dark mode support
fix(auth): resolve login redirect issue
docs(api): update API documentation
```

### PR Description Template

```markdown
## Description

Brief description of what this PR does

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- List key changes
- Another change
- etc.

## Testing

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing performed

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally

## Related Issues

Closes #123
Related to #456
```

### Review Process

1. **Automated checks** run (tests, linting)
2. **Maintainers review** your code
3. **Address feedback** if requested
4. **Approval** from at least one maintainer
5. **Merge** by maintainer

### After Merge

- Delete your feature branch
- Sync your fork with upstream
- Close related issues

---

## 🐛 Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for known solutions
3. **Update to latest version** if possible

### Bug Reports

Include the following:

```markdown
## Description

Clear description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Screenshots

If applicable

## Environment

- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., 18.17.0]
- npm: [e.g., 9.8.1]

## Additional Context

Any other relevant information
```

### Feature Requests

Include the following:

```markdown
## Feature Description

Clear description of the feature

## Problem it Solves

What problem does this solve?

## Proposed Solution

How would you implement this?

## Alternatives Considered

Other ways to solve this

## Additional Context

Mockups, examples, references
```

---

## 🏆 Recognition

Contributors will be:

- Listed in the project's contributors
- Mentioned in release notes for significant contributions
- Credited in the README for major features

---

## 💡 Tips for First-Time Contributors

- **Start small**: Look for issues labeled `good first issue`
- **Ask questions**: Don't hesitate to ask for help
- **Be patient**: Reviews may take time
- **Learn from feedback**: Use it to improve

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Documentation](https://testing-library.com)
- [Conventional Commits](https://www.conventionalcommits.org)

---

## 🆘 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Discord/Slack**: [Add link if available]

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

**Thank you for contributing to AI Automation Shop!** 🎉

Every contribution, no matter how small, makes a difference!
