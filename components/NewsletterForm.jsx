'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema } from '@/lib/validations'
import { cn } from '@/lib/utils'

/**
 * Newsletter Subscription Form Component
 */
export default function NewsletterForm({ className }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Successfully subscribed to newsletter!',
        })
        reset()
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to subscribe. Please try again.',
        })
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              {...register('email')}
              className={cn(
                'w-full px-4 py-3 rounded-lg bg-slate-800 border text-white',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                'transition-all duration-200 placeholder:text-slate-400',
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-700 focus:border-primary'
              )}
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'px-6 py-3 rounded-lg font-medium whitespace-nowrap',
              'bg-gradient-to-r from-primary to-secondary',
              'text-white transition-all duration-200',
              'hover:shadow-lg hover:shadow-primary/50',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>

        {submitStatus && (
          <div
            className={cn(
              'p-3 rounded-lg text-sm',
              submitStatus.type === 'success'
                ? 'bg-green-900/20 border border-green-500 text-green-300'
                : 'bg-red-900/20 border border-red-500 text-red-300'
            )}
          >
            {submitStatus.message}
          </div>
        )}
      </form>

      <p className="mt-2 text-xs text-slate-400">
        Join our newsletter to stay updated with the latest AI automation insights.
      </p>
    </div>
  )
}
