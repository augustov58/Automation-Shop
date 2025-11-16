export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative bg-black border-t border-white/5 overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/10 to-black pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary-400/30 rounded-full animate-float-slow" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary-400/20 rounded-full animate-float" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-primary-300/25 rounded-full animate-float-slow" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              AI Automation Shop
            </h3>
            <p className="mb-6 text-slate-300 leading-relaxed max-w-md">
              Your trusted partner for AI-powered automation solutions that transform businesses and
              drive innovation.
            </p>

            {/* Social links - Min 44px touch targets */}
            <div className="flex gap-4" role="navigation" aria-label="Social media links">
              <a
                href="#"
                className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-white/5 border border-white/10 hover:border-primary-400/50 transition-all duration-300"
                aria-label="Visit our Facebook page"
              >
                <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400 group-hover:text-primary-400 transition-colors relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>

              <a
                href="#"
                className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-white/5 border border-white/10 hover:border-primary-400/50 transition-all duration-300"
                aria-label="Follow us on Twitter"
              >
                <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400 group-hover:text-primary-400 transition-colors relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              <a
                href="#"
                className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-white/5 border border-white/10 hover:border-primary-400/50 transition-all duration-300"
                aria-label="Connect with us on LinkedIn"
              >
                <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400 group-hover:text-primary-400 transition-colors relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="#"
                className="group relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-white/5 border border-white/10 hover:border-primary-400/50 transition-all duration-300"
                aria-label="View our GitHub repositories"
              >
                <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-400 group-hover:text-primary-400 transition-colors relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-white">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary-400 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary-400 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary-400 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-slate-400 hover:text-primary-400 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary-400 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:border-primary-400/50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 text-sm leading-relaxed">
                  123 Innovation Street
                  <br />
                  Tech City, 12345
                </span>
              </li>

              <li className="flex items-center group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:border-primary-400/50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <a
                  href="mailto:info@aiautomationshop.com"
                  className="text-slate-400 hover:text-primary-400 transition-colors text-sm"
                >
                  info@aiautomationshop.com
                </a>
              </li>

              <li className="flex items-center group">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mr-3 group-hover:border-primary-400/50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <a
                  href="tel:+15551234567"
                  className="text-slate-400 hover:text-primary-400 transition-colors text-sm"
                >
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative pt-8 border-t border-white/5">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} AI Automation Shop. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Built with badge */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-xs inline-flex items-center gap-2">
              <span>Built with</span>
              <span className="text-red-400 animate-pulse">♥</span>
              <span>using Next.js & AI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
