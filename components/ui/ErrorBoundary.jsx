'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components
 * Shows fallback UI instead of crashing the entire app
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // You can also log to an error reporting service here
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })

    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset)
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="glass-card p-8 rounded-xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Error Icon */}
                <div className="relative text-red-400">
                  <div className="absolute inset-0 blur-xl opacity-50">
                    <AlertTriangle className="h-16 w-16" />
                  </div>
                  <AlertTriangle className="h-16 w-16 relative z-10" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-heading font-bold text-white">
                    {this.props.title || 'Oops! Something went wrong'}
                  </h2>
                  <p className="text-slate-300">
                    {this.props.message ||
                      'An unexpected error occurred. Please try refreshing the page.'}
                  </p>
                </div>

                {/* Error details (only in development) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="w-full text-left">
                    <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300 transition-colors">
                      Error details (development only)
                    </summary>
                    <div className="mt-4 p-4 rounded-lg bg-black/50 border border-white/10 overflow-auto">
                      <p className="text-xs text-red-300 font-mono mb-2">
                        {this.state.error.toString()}
                      </p>
                      {this.state.errorInfo && (
                        <pre className="text-xs text-slate-400 font-mono whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 w-full">
                  <button
                    onClick={this.handleReset}
                    className="btn-primary flex-1 px-4 py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 group"
                  >
                    <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
                    Try Again
                  </button>
                  <Link
                    href="/"
                    className="btn-secondary flex-1 px-4 py-2.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 glass-card border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Simplified Error Boundary for specific sections
 */
export function SectionErrorBoundary({ children, fallback, onError, onReset, className }) {
  return (
    <ErrorBoundary
      fallback={
        fallback ||
        ((error, reset) => (
          <div className={className}>
            <div className="glass-card p-6 rounded-lg border border-red-500/30">
              <div className="flex flex-col items-center text-center space-y-4">
                <AlertTriangle className="h-12 w-12 text-red-400" />
                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-white">
                    Something went wrong
                  </h3>
                  <p className="text-sm text-slate-300">
                    This section failed to load. Please try again.
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        ))
      }
      onError={onError}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundary
