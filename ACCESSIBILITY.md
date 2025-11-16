# Accessibility Guide

This document outlines the accessibility features implemented in the AI Automation Shop website and provides guidance for maintaining and testing accessibility.

## Table of Contents

1. [Overview](#overview)
2. [Implemented Features](#implemented-features)
3. [WCAG Compliance](#wcag-compliance)
4. [Testing Guide](#testing-guide)
5. [Best Practices](#best-practices)
6. [Known Limitations](#known-limitations)

---

## Overview

We are committed to making our website accessible to all users, including those with disabilities. This site implements WCAG 2.1 Level AA accessibility standards.

### Core Principles

- **Perceivable**: Information and UI components are presentable to users in ways they can perceive
- **Operable**: UI components and navigation are operable by all users
- **Understandable**: Information and UI operation are understandable
- **Robust**: Content can be interpreted by a wide variety of user agents, including assistive technologies

---

## Implemented Features

### 1. Keyboard Navigation

**Full keyboard support** for all interactive elements:

- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and mobile menu

**Skip Navigation Link**:

- Press `Tab` on page load to reveal "Skip to main content" link
- Jumps directly to main content, bypassing navigation
- Styled with glass morphism effect matching site design

### 2. Screen Reader Support

**ARIA Labels and Landmarks**:

- `role="banner"` on header
- `role="main"` on main content
- `role="contentinfo"` on footer
- `role="navigation"` on all nav elements
- Descriptive `aria-label` attributes on all interactive elements

**Mobile Menu**:

- `aria-expanded` indicates menu state (open/closed)
- `aria-controls` links button to menu element
- Dynamic aria-label: "Open navigation menu" / "Close navigation menu"

**Icon-only Buttons**:

- All social media icons have descriptive aria-labels
- Decorative icons marked with `aria-hidden="true"`

### 3. Focus Management

**Enhanced Focus Indicators**:

- 3px solid outline in primary color
- 3px offset for visibility
- Additional box-shadow for depth
- High contrast focus ring on buttons (white outline)
- Smooth transitions for better UX

**Focus Styles** (from `globals.css`):

```css
*:focus-visible {
  outline: 3px solid rgba(var(--color-primary), 0.9);
  outline-offset: 3px;
}

.btn-primary:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 4px;
  box-shadow: 0 0 0 6px rgba(var(--color-primary), 0.3);
}
```

### 4. Touch Target Optimization

**Minimum Touch Target Size**: 44x44px (exceeds WCAG 2.1 AA requirement of 24x24px)

**Implemented on**:

- Mobile menu button: `min-w-[44px] min-h-[44px]`
- Mobile navigation links: `min-h-[44px]`
- Social media icons: `min-w-[44px] min-h-[44px]`
- All primary buttons: Generous padding ensures 44px+ height

### 5. Reduced Motion Support

**Respects user preferences** for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Benefits**:

- Prevents motion sickness
- Improves experience for users with vestibular disorders
- Respects system-level accessibility preferences

### 6. Semantic HTML

**Proper HTML5 structure**:

- `<header>`, `<nav>`, `<main>`, `<footer>` landmarks
- Heading hierarchy (h1 → h2 → h3)
- Lists (`<ul>`, `<ol>`) for navigation and content groups
- `<button>` for interactive actions
- `<a>` for navigation

### 7. Color and Contrast

**Design System Colors**:

- Primary: Sky Blue (#38BDF8)
- Secondary: Purple (#8B5CF6)
- Accent: Orange (#F97316)
- Text: Light grays on dark backgrounds

**Contrast Ratios**:

- Body text: ~15:1 (white on black) - WCAG AAA
- Links: ~12:1 - WCAG AAA
- Interactive elements: Minimum 4.5:1 - WCAG AA

### 8. Form Accessibility

**Form elements** (Contact forms, Newsletter):

- Associated labels with inputs
- Error messages announced to screen readers
- Required fields clearly marked
- Validation feedback with sufficient contrast
- Focus management on form submission

---

## WCAG Compliance

### Level A (Basic)

✅ **1.1.1 Non-text Content**: All images and icons have alt text or aria-labels
✅ **2.1.1 Keyboard**: All functionality available via keyboard
✅ **2.4.1 Bypass Blocks**: Skip navigation link provided
✅ **3.1.1 Language of Page**: HTML lang attribute set to "en"
✅ **4.1.1 Parsing**: Valid HTML5 markup

### Level AA (Mid-range)

✅ **1.4.3 Contrast (Minimum)**: Text contrast exceeds 4.5:1
✅ **1.4.5 Images of Text**: Minimal use of text images, using CSS text with gradients
✅ **2.4.5 Multiple Ways**: Navigation, skip links, semantic structure
✅ **2.4.6 Headings and Labels**: Descriptive headings and labels
✅ **2.4.7 Focus Visible**: Enhanced focus indicators on all interactive elements
✅ **2.5.5 Target Size**: Minimum 44x44px touch targets
✅ **3.2.3 Consistent Navigation**: Navigation order consistent throughout

### Level AAA (Enhanced)

✅ **1.4.6 Contrast (Enhanced)**: Most text achieves 7:1 contrast
⚠️ **2.5.1 Pointer Gestures**: Single-pointer operation (partial - some animations)

---

## Testing Guide

### Manual Testing

#### Keyboard Navigation Test

1. **Load the homepage**
2. **Press Tab** - Skip link should appear
3. **Continue tabbing** - Should move through all interactive elements in logical order
4. **Verify focus indicators** - Should be highly visible
5. **Test mobile menu** - Should open/close with Enter/Space
6. **Test forms** - Should be fully navigable

#### Screen Reader Testing

**Recommended tools**:

- **macOS**: VoiceOver (Cmd + F5)
- **Windows**: NVDA (free) or JAWS
- **Linux**: Orca

**Test checklist**:

- [ ] Page title is announced
- [ ] Landmarks are identified (banner, navigation, main, contentinfo)
- [ ] Headings are announced with levels
- [ ] Links are announced with descriptive text
- [ ] Images have appropriate alt text
- [ ] Form labels are associated with inputs
- [ ] Button purposes are clear

#### Touch Target Test (Mobile)

1. **Open on mobile device** or use device emulation
2. **Tap all interactive elements**
3. **Verify**: No mis-taps, all targets easy to hit
4. **Check spacing**: Adequate space between clickable elements

### Automated Testing Tools

#### Browser Extensions

1. **axe DevTools** (Free)

   ```
   - Install from Chrome/Firefox store
   - Run on each page
   - Fix all critical and serious issues
   ```

2. **WAVE** (WebAIM)

   ```
   - Highlights accessibility issues visually
   - Shows ARIA usage
   - Identifies contrast problems
   ```

3. **Lighthouse** (Built into Chrome)
   ```
   - Open DevTools → Lighthouse tab
   - Run accessibility audit
   - Aim for 90+ score
   ```

#### Command Line Tools

**Pa11y** - Automated testing:

```bash
# Install
npm install -g pa11y

# Test homepage
pa11y http://localhost:3000

# Test with specific standard
pa11y --standard WCAG2AA http://localhost:3000
```

**axe-core** - Automated testing in tests:

```javascript
// Install
npm install --save-dev @axe-core/react

// Use in tests
import { axe } from 'jest-axe'

test('should have no accessibility violations', async () => {
  const { container } = render(<App />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Color Contrast Testing

**Online tools**:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrastratio.com/)

**Test combinations**:

- Primary blue (#38BDF8) on black → Pass AAA
- White text on black → Pass AAA
- Slate-400 text (#94a3b8) on black → Pass AA

---

## Best Practices

### When Adding New Features

1. **Test keyboard navigation** immediately
2. **Add ARIA labels** to icon-only buttons
3. **Ensure focus indicators** are visible
4. **Verify color contrast** before committing
5. **Test with screen reader** if adding complex interactions
6. **Maintain semantic HTML** structure
7. **Respect reduced motion** preferences

### Code Examples

**Accessible Button**:

```jsx
<button
  className="btn-primary min-h-[44px] min-w-[44px]"
  aria-label="Submit contact form"
  onClick={handleSubmit}
>
  Submit
</button>
```

**Accessible Icon Button**:

```jsx
<button aria-label="Close menu" className="min-w-[44px] min-h-[44px]">
  <svg aria-hidden="true">{/* Icon path */}</svg>
</button>
```

**Accessible Link**:

```jsx
<a
  href="#services"
  aria-label="Navigate to services section"
  className="hover:text-primary-400 focus:outline-primary-400"
>
  Services
</a>
```

**Accessible Navigation**:

```jsx
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li>
      <a href="#home">Home</a>
    </li>
    <li>
      <a href="#about">About</a>
    </li>
  </ul>
</nav>
```

---

## Known Limitations

### Current Limitations

1. **No Light Mode**: Dark mode only (planned for future)
2. **Animation Heavy**: Some users may prefer even less motion (future enhancement: motion toggle)
3. **No High Contrast Mode**: Windows High Contrast not specially optimized (planned)
4. **Limited Language Support**: English only (i18n planned)

### Planned Improvements

- [ ] Add theme toggle (light/dark mode)
- [ ] Add animation preference toggle
- [ ] Add high contrast mode
- [ ] Improve error handling and announcements
- [ ] Add more comprehensive keyboard shortcuts
- [ ] Add breadcrumb navigation for multi-page sections

---

## Resources

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Pa11y](https://pa11y.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Community

- [A11y Project](https://www.a11yproject.com/)
- [WebAIM Forums](https://webaim.org/discussion/)
- [Accessibility Slack](https://web-a11y.slack.com/)

---

## Support

If you encounter any accessibility issues, please:

1. **Open an issue** on our GitHub repository
2. **Include details**: Browser, screen reader, specific problem
3. **Provide steps** to reproduce the issue

We are committed to maintaining and improving accessibility for all users.

---

**Last Updated**: November 2025
**WCAG Level**: AA (with some AAA features)
**Review Schedule**: Quarterly accessibility audits
