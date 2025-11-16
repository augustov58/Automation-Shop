'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '@/lib/validations'
import { cn } from '@/lib/utils'

/**
 * Contact Form Component
 * Fully featured contact form with validation and API integration
 */
export default function ContactForm({ className }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async data => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
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
          message: result.message || "Thank you for contacting us! We'll get back to you soon.",
        })
        reset() // Clear form on success
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-slate-800 border text-white',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'transition-all duration-200',
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-700 focus:border-primary'
          )}
          placeholder="John Doe"
          disabled={isSubmitting}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-slate-800 border text-white',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'transition-all duration-200',
            errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-700 focus:border-primary'
          )}
          placeholder="john@example.com"
          disabled={isSubmitting}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-slate-800 border text-white',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'transition-all duration-200',
            errors.phone
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-700 focus:border-primary'
          )}
          placeholder="+1 (555) 000-0000"
          disabled={isSubmitting}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      {/* Company Field (Optional) */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          {...register('company')}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-slate-800 border text-white',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'transition-all duration-200',
            errors.company
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-700 focus:border-primary'
          )}
          placeholder="Acme Corp"
          disabled={isSubmitting}
        />
        {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>}
      </div>

      {/* Service Selection (Optional) */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
          Service of Interest
        </label>
        <select
          id="service"
          {...register('service')}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-slate-800 border text-white',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'transition-all duration-200',
            errors.service
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-700 focus:border-primary'
          )}
          disabled={isSubmitting}
        >
          <option value="">Select a service...</option>
          <option value="ai-automation">AI Automation</option>
          <option value="consulting">Consulting</option>
          <option value="integration">Integration</option>
          <option value="custom">Custom Solution</option>
          <option value="other">Other</option>
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-slate-800 border text-white',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'transition-all duration-200 resize-none',
            errors.message
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-700 focus:border-primary'
          )}
          placeholder="Tell us about your project or inquiry..."
          disabled={isSubmitting}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      {/* Submit Status Messages */}
      {submitStatus && (
        <div
          className={cn(
            'p-4 rounded-lg',
            submitStatus.type === 'success'
              ? 'bg-green-900/20 border border-green-500 text-green-300'
              : 'bg-red-900/20 border border-red-500 text-red-300'
          )}
        >
          <p className="text-sm">{submitStatus.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full px-6 py-3 rounded-lg font-medium',
          'bg-gradient-to-r from-primary to-secondary',
          'text-white transition-all duration-200',
          'hover:shadow-lg hover:shadow-primary/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'disabled:hover:shadow-none'
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
