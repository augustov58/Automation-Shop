# 🤖 AI Automation Shop

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

A modern, interactive marketing website for AI automation services. Built with Next.js 14, featuring smooth animations, responsive design, and comprehensive testing infrastructure.

![AI Automation Shop](https://via.placeholder.com/800x400/1e293b/38bdf8?text=AI+Automation+Shop)

## ✨ Features

- 🎨 **Modern Design** - Dark theme with glass-morphism effects
- 🎭 **Rich Animations** - Framer Motion powered interactions
- 📱 **Fully Responsive** - Mobile-first design approach
- ⚡ **Fast Performance** - Optimized Next.js App Router
- 🧪 **Comprehensive Testing** - Jest + Playwright test suites
- ♿ **Accessible** - WCAG compliant components
- 🚀 **Easy Deployment** - One-click Vercel deployment

## 🎯 Project Overview

This website showcases AI automation services and solutions:

- 💼 **Services Showcase** - Detailed service offerings
- 📊 **Data Visualizations** - Interactive progress indicators
- 💬 **Client Testimonials** - Social proof section
- 📅 **Discovery Call Scheduling** - Integrated Calendly widget
- 📧 **Contact Forms** - Multiple contact points
- ❓ **FAQ Section** - Common questions answered

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Testing
- **[Jest](https://jestjs.io/)** - Unit & integration testing
- **[React Testing Library](https://testing-library.com/react)** - Component testing
- **[Playwright](https://playwright.dev/)** - E2E testing

### Development Tools
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[ESLint](https://eslint.org/)** - Code linting
- **PostCSS** - CSS processing

### Deployment
- **[Vercel](https://vercel.com/)** - Hosting & deployment

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 10.x or higher (comes with Node.js)
- **Git** for version control

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/augustov58/Automation-Shop.git
cd Automation-Shop
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables** (optional)

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys (if needed):
- Calendly API keys
- Analytics IDs
- Other third-party services

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

🎉 **You're all set!** The app is now running locally.

## 📦 Available Scripts

### Development

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Testing

```bash
# Unit & Integration Tests
npm test                  # Run all Jest tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report

# E2E Tests
npm run playwright:install    # Install browser binaries (first time)
npm run test:e2e             # Run Playwright tests
npm run test:e2e:ui          # Run with interactive UI
npm run test:e2e:headed      # Run with visible browser
npm run test:e2e:debug       # Run in debug mode

# All Tests
npm run test:all         # Run all tests (Jest + Playwright)
```

## 📁 Project Structure

```
Automation-Shop/
├── app/                      # Next.js App Router
│   ├── page.js              # Homepage
│   ├── layout.js            # Root layout
│   ├── client-layout.js     # Client components wrapper
│   ├── globals.css          # Global styles
│   └── __tests__/           # App tests
├── components/              # React components
│   ├── Header.js            # Navigation header
│   ├── Footer.js            # Site footer
│   ├── LampDemo.tsx         # Hero section
│   ├── ui/                  # Reusable UI components
│   └── __tests__/           # Component tests
├── lib/                     # Utility functions
│   ├── utils.js             # Helper functions
│   └── __tests__/           # Utility tests
├── e2e/                     # E2E test files
├── __tests__/               # Shared test utilities
├── public/                  # Static assets
├── docs/                    # Documentation
│   ├── TESTING.md          # Testing guide
│   ├── DEPLOYMENT.md       # Deployment guide
│   ├── ARCHITECTURE.md     # Architecture docs
│   └── CONTRIBUTING.md     # Contribution guide
├── jest.config.js          # Jest configuration
├── playwright.config.js    # Playwright configuration
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies & scripts
```

## 🧪 Testing

This project has comprehensive test coverage:

- **30+ unit tests** for components and utilities
- **E2E tests** covering critical user flows
- **Accessibility tests** ensuring WCAG compliance

For detailed testing information, see [TESTING.md](TESTING.md).

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy:

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click **Deploy**

Your site will be live in ~2 minutes!

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Other Platforms

This Next.js app can be deployed to:
- **Netlify** - [Guide](https://docs.netlify.com/frameworks/next-js/)
- **AWS Amplify** - [Guide](https://docs.amplify.aws/nextjs/)
- **Railway** - [Guide](https://docs.railway.app/guides/nextjs)
- **Self-hosted** - Use `npm run build && npm start`

## 🎨 Customization

### Update Branding

1. **Colors** - Edit `tailwind.config.js`
2. **Fonts** - Modify `app/layout.js`
3. **Logo** - Replace in `components/Header.js`
4. **Content** - Update `app/page.js` and component files

### Add New Pages

```bash
# Create a new route
mkdir app/about
touch app/about/page.js
```

See [Next.js Routing Docs](https://nextjs.org/docs/app/building-your-application/routing) for more.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Documentation

- **[Testing Guide](TESTING.md)** - How to write and run tests
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to production
- **[Architecture Overview](ARCHITECTURE.md)** - System design & structure
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute

## 🐛 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill the process or use a different port
PORT=3001 npm run dev
```

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build failures:**
```bash
# Check for TypeScript errors
npm run build

# Check for linting errors
npm run lint
```

For more help, check the [Issues](https://github.com/augustov58/Automation-Shop/issues) page.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - [GitHub](https://github.com/augustov58)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel](https://vercel.com) for hosting

## 📞 Contact

- **Website**: [Your Website URL]
- **Email**: info@aiautomationshop.com
- **GitHub**: [@augustov58](https://github.com/augustov58)

## 🗺️ Roadmap

- [ ] Add blog section
- [ ] Implement case studies page
- [ ] Add multi-language support (i18n)
- [ ] Integrate CMS for content management
- [ ] Add analytics dashboard
- [ ] Implement SEO optimizations
- [ ] Add newsletter subscription

---

**Built with ❤️ using Next.js**

⭐ Star this repo if you find it helpful!
