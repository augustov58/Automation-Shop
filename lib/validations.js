import { z } from 'zod'

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .min(5, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),

  phone: z
    .string()
    .optional()
    .refine(val => !val || /^[\d\s\-\+\(\)]+$/.test(val), 'Please enter a valid phone number'),

  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),

  service: z.enum(['ai-automation', 'consulting', 'integration', 'custom', 'other']).optional(),
})

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .min(5, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),
})

/**
 * Discovery call booking schema
 */
export const discoveryCallSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),

  phone: z.string().optional(),

  company: z.string().optional(),

  preferredDate: z.string().datetime().optional(),

  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
})
