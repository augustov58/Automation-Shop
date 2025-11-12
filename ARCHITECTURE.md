# Architecture Overview

This document provides a comprehensive overview of the AI Automation Shop architecture, design decisions, and technical implementation.

## 📑 Table of Contents

- [System Architecture](#system-architecture)
- [Directory Structure](#directory-structure)
- [Design Patterns](#design-patterns)
- [Component Architecture](#component-architecture)
- [Styling System](#styling-system)
- [State Management](#state-management)
- [Routing](#routing)
- [Performance Optimizations](#performance-optimizations)
- [Testing Strategy](#testing-strategy)
- [Deployment Architecture](#deployment-architecture)

---

## 🏗️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                        Client                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Next.js Frontend (SSR/SSG)            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌───────────┐  │  │
│  │  │   Pages    │  │ Components │  │   Hooks   │  │  │
│  │  └────────────┘  └────────────┘  └───────────┘  │  │
│  │  ┌────────────┐  ┌────────────┐  ┌───────────┐  │  │
│  │  │   Styles   │  │    Utils   │  │   State   │  │  │
│  │  └────────────┘  └────────────┘  └───────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   CDN (Vercel Edge)                      │
│              Static Assets & Edge Functions              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Third-Party Services                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Calendly │  │ Analytics│  │   Email  │             │
│  └──────────┘  └──────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend Framework
- **Next.js 14** with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes (for future backend needs)
  - Image optimization
  - Code splitting

#### UI Libraries
- **React 18** - Component library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Radix UI** - Accessible primitives

#### Development
- **TypeScript** - Type safety
- **ESLint** - Code quality
- **Jest** - Unit testing
- **Playwright** - E2E testing

---

## 📁 Directory Structure

### Detailed Breakdown

```
Automation-Shop/
│
├── app/                          # Next.js App Router (v13+)
│   ├── layout.js                 # Root layout (HTML, fonts, metadata)
│   ├── page.js                   # Homepage route
│   ├── client-layout.js          # Client component wrapper
│   ├── globals.css               # Global styles & CSS variables
│   └── __tests__/                # Route-level tests
│       └── page.test.js
│
├── components/                   # React components
│   ├── Header.js                 # Navigation header
│   ├── Footer.js                 # Site footer
│   ├── LampDemo.tsx              # Hero section with animations
│   ├── ContactDialog.jsx         # Contact modal
│   ├── DiscoveryCallCalendar.jsx # Calendar integration
│   ├── Testimonials.jsx          # Client testimonials
│   ├── FAQ.jsx                   # FAQ accordion
│   ├── CalendlyWidget.jsx        # Calendly embed
│   ├── ui/                       # Reusable UI primitives
│   │   ├── accordion.jsx         # Accordion component
│   │   ├── carousel.jsx          # Carousel component
│   │   ├── dialog.jsx            # Dialog/modal component
│   │   └── lamp.tsx              # Lamp effect component
│   └── __tests__/                # Component tests
│       ├── Header.test.js
│       └── Footer.test.js
│
├── lib/                          # Utility libraries
│   ├── utils.js                  # Helper functions (cn, etc.)
│   ├── utils.ts                  # TypeScript utilities
│   └── __tests__/                # Utility tests
│       └── utils.test.js
│
├── __tests__/                    # Shared test utilities
│   └── utils/
│       ├── test-utils.jsx        # Custom render functions
│       └── test-helpers.js       # Test helper functions
│
├── e2e/                          # End-to-end tests
│   └── home.spec.js              # Homepage E2E tests
│
├── public/                       # Static assets
│   ├── images/                   # Images
│   ├── fonts/                    # Custom fonts
│   └── favicon.ico               # Favicon
│
├── config/                       # Configuration files
│   ├── jest.config.js            # Jest configuration
│   ├── playwright.config.js     # Playwright configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── next.config.js            # Next.js configuration
│   ├── postcss.config.js         # PostCSS configuration
│   └── tsconfig.json             # TypeScript configuration
│
└── docs/                         # Documentation
    ├── TESTING.md                # Testing guide
    ├── DEPLOYMENT.md             # Deployment guide
    ├── ARCHITECTURE.md           # This file
    └── CONTRIBUTING.md           # Contribution guide
```

### File Organization Principles

1. **Co-location**: Tests live next to the code they test
2. **Separation of concerns**: Components, utilities, and routes are separated
3. **Scalability**: Structure supports growth without major refactoring
4. **Convention**: Follows Next.js and React best practices

---

## 🎨 Design Patterns

### Component Patterns

#### 1. Presentational vs Container Components

**Presentational** (Dumb components):
```jsx
// Presentational - Pure UI, no logic
export function Button({ children, onClick, variant }) {
  return (
    <button
      onClick={onClick}
      className={cn('btn', `btn-${variant}`)}
    >
      {children}
    </button>
  )
}
```

**Container** (Smart components):
```jsx
// Container - Handles logic, data fetching
export function ContactForm() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    // Handle form logic
  }

  return <ContactFormUI data={formData} onSubmit={handleSubmit} />
}
```

#### 2. Compound Components

Used for flexible, composable UI:

```jsx
<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### 3. Render Props & Custom Hooks

Reusable logic extraction:

```jsx
// Custom hook
function useScroll() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

// Usage
function Header() {
  const scrollY = useScroll()
  const isHidden = scrollY > 100

  return <header className={isHidden ? 'hidden' : 'visible'}>...</header>
}
```

---

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── Layout (Server Component)
│   ├── Metadata
│   ├── Fonts
│   └── ClientLayout (Client Component)
│       ├── Header
│       │   ├── Logo
│       │   ├── Navigation
│       │   └── MobileMenu
│       ├── Page Content
│       │   ├── LampDemo (Hero)
│       │   ├── Services Section
│       │   ├── About Section
│       │   ├── Testimonials
│       │   ├── FAQ
│       │   └── Contact Section
│       └── Footer
│           ├── Company Info
│           ├── Quick Links
│           └── Contact Info
```

### Component Types

#### Server Components (Default in Next.js 14)
- Static content
- Data fetching
- SEO metadata
- No interactivity

#### Client Components (`'use client'`)
- Interactive features
- Browser APIs
- Event handlers
- State management

**Example:**

```jsx
// layout.js - Server Component
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

// client-layout.js - Client Component
'use client'
export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
```

---

## 🎨 Styling System

### Tailwind CSS Architecture

#### Design Tokens

Defined in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#38BDF8',    // Sky blue
        secondary: '#8B5CF6',  // Purple
        accent: '#F97316',     // Orange
      },
      spacing: {
        // Custom spacing scale
      },
      animation: {
        // Custom animations
      }
    }
  }
}
```

#### CSS Variables

Defined in `globals.css`:

```css
:root {
  --primary: 200 98% 61%;
  --secondary: 258 90% 66%;
  --accent: 25 95% 53%;
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

#### Utility Class Organization

```jsx
// Recommended order
<div
  className={cn(
    // Layout
    'flex items-center justify-between',
    // Spacing
    'px-4 py-2 gap-4',
    // Sizing
    'w-full h-12',
    // Colors
    'bg-slate-800 text-white',
    // Typography
    'text-lg font-bold',
    // Effects
    'shadow-md rounded-lg',
    // States
    'hover:bg-slate-700 active:scale-95',
    // Responsive
    'md:px-6 lg:px-8',
    // Conditional
    isActive && 'bg-primary'
  )}
/>
```

#### cn() Utility

Merges class names and resolves Tailwind conflicts:

```javascript
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Usage
cn('px-2', 'px-4')  // Result: 'px-4' (last one wins)
```

---

## 📊 State Management

### Current Approach

**Local State** - Using React hooks:

```jsx
// useState for simple state
const [isOpen, setIsOpen] = useState(false)

// useReducer for complex state
const [state, dispatch] = useReducer(reducer, initialState)
```

### Future Considerations

For larger apps, consider:

- **Zustand** - Lightweight global state
- **React Query** - Server state management
- **Jotai** - Atomic state management
- **Context API** - Shared state without prop drilling

---

## 🚀 Routing

### Next.js App Router

File-based routing system:

```
app/
├── page.js                    # → /
├── about/
│   └── page.js               # → /about
├── services/
│   ├── page.js               # → /services
│   └── [slug]/
│       └── page.js           # → /services/:slug
└── api/
    └── contact/
        └── route.js          # → /api/contact
```

### Navigation

```jsx
import Link from 'next/link'

// Client-side navigation (no page reload)
<Link href="/about">About Us</Link>

// Programmatic navigation
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/about')
```

---

## ⚡ Performance Optimizations

### 1. Image Optimization

```jsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority  // For above-the-fold images
  placeholder="blur"
/>
```

### 2. Code Splitting

Automatic in Next.js:
- Each route is a separate bundle
- Components are lazy-loaded

Manual code splitting:

```jsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false  // Client-side only
})
```

### 3. Font Optimization

```jsx
// app/layout.js
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
```

### 4. Animation Performance

Using Framer Motion with GPU acceleration:

```jsx
<motion.div
  animate={{ x: 100 }}
  transition={{ type: 'spring' }}
  style={{ willChange: 'transform' }}  // GPU hint
/>
```

---

## 🧪 Testing Strategy

### Test Pyramid

```
       ╱╲
      ╱E2E╲            Few, slow, expensive
     ╱─────╲
    ╱ Integ.╲          Some, medium speed
   ╱─────────╲
  ╱   Unit    ╲        Many, fast, cheap
 ╱─────────────╲
```

### 1. Unit Tests (Jest + RTL)

Test individual components and functions:

```javascript
// lib/__tests__/utils.test.js
import { cn } from '../utils'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})
```

### 2. Integration Tests

Test component interactions:

```javascript
// components/__tests__/Header.test.js
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

test('mobile menu toggles', () => {
  render(<Header />)
  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(screen.getByRole('navigation')).toBeVisible()
})
```

### 3. E2E Tests (Playwright)

Test complete user flows:

```javascript
// e2e/home.spec.js
test('user can navigate to contact', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Contact')
  await expect(page).toHaveURL(/#contact/)
})
```

---

## 🚀 Deployment Architecture

### Vercel Platform

```
┌─────────────────────────────────────────┐
│           Vercel Edge Network            │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │ Region │  │ Region │  │ Region │    │
│  │   US   │  │   EU   │  │  ASIA  │    │
│  └────────┘  └────────┘  └────────┘    │
│              Global CDN                  │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│        Next.js Build Outputs             │
│  ┌─────────────┐  ┌──────────────┐     │
│  │   Static    │  │  Serverless  │     │
│  │   Assets    │  │  Functions   │     │
│  └─────────────┘  └──────────────┘     │
└─────────────────────────────────────────┘
```

### Build Process

1. **Install dependencies** - `npm install`
2. **Run linting** - `npm run lint`
3. **Run tests** - `npm test`
4. **Build application** - `npm run build`
5. **Deploy to edge** - Vercel handles this

### Environment Variables

Managed in Vercel dashboard:
- Development
- Preview (branch deployments)
- Production

---

## 🔮 Future Enhancements

### Planned Additions

1. **Backend API Routes**
   - Contact form submission
   - Newsletter signup
   - Analytics tracking

2. **CMS Integration**
   - Contentful or Sanity
   - Blog posts
   - Case studies

3. **Authentication**
   - NextAuth.js
   - Client portal

4. **Database**
   - PostgreSQL via Vercel Postgres
   - Prisma ORM

5. **Advanced Features**
   - Real-time chat
   - A/B testing
   - Personalization

---

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Testing Library](https://testing-library.com)

---

**Last Updated**: November 2025
