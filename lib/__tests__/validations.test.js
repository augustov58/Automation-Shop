import { contactFormSchema, newsletterSchema, discoveryCallSchema } from '../validations'

describe('Contact Form Validation', () => {
  it('validates correct contact form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corp',
      service: 'ai-automation',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('validates minimal contact form data', () => {
    const minimalData = {
      name: 'Jo',
      email: 'jo@example.com',
      message: 'Short message here.',
    }

    const result = contactFormSchema.safeParse(minimalData)
    expect(result.success).toBe(true)
  })

  it('requires name field', () => {
    const data = {
      email: 'john@example.com',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error.issues[0].path).toContain('name')
  })

  it('requires email field', () => {
    const data = {
      name: 'John Doe',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error.issues[0].path).toContain('email')
  })

  it('requires message field', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error.issues[0].path).toContain('message')
  })

  it('rejects invalid email format', () => {
    const data = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error.issues[0].path).toContain('email')
  })

  it('rejects name that is too short', () => {
    const data = {
      name: 'J',
      email: 'john@example.com',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toContain('at least 2 characters')
  })

  it('rejects message that is too short', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Short',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toContain('at least 10 characters')
  })

  it('accepts valid phone formats', () => {
    const phoneNumbers = [
      '+1 (555) 123-4567',
      '555-123-4567',
      '5551234567',
      '+44 20 7123 4567',
    ]

    phoneNumbers.forEach(phone => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone,
        message: 'I am interested in your services.',
      }

      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  it('rejects invalid phone format', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: 'abc-def-ghij',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('accepts valid service options', () => {
    const services = ['ai-automation', 'consulting', 'integration', 'custom', 'other']

    services.forEach(service => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        service,
        message: 'I am interested in your services.',
      }

      const result = contactFormSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  it('rejects invalid service option', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      service: 'invalid-service',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('converts email to lowercase', () => {
    const data = {
      name: 'John Doe',
      email: 'JOHN@EXAMPLE.COM',
      message: 'I am interested in your services.',
    }

    const result = contactFormSchema.parse(data)
    expect(result.email).toBe('john@example.com')
  })

  it('trims whitespace from email and message', () => {
    const data = {
      name: 'John Doe',
      email: '  john@example.com  ',
      message: '  I am interested in your services.  ',
    }

    const result = contactFormSchema.parse(data)
    expect(result.email).toBe('john@example.com')
    expect(result.message).toBe('I am interested in your services.')
  })
})

describe('Newsletter Validation', () => {
  it('validates correct email', () => {
    const data = { email: 'john@example.com' }
    const result = newsletterSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('requires email field', () => {
    const data = {}
    const result = newsletterSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const data = { email: 'invalid-email' }
    const result = newsletterSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('converts email to lowercase', () => {
    const data = { email: 'JOHN@EXAMPLE.COM' }
    const result = newsletterSchema.parse(data)
    expect(result.email).toBe('john@example.com')
  })

  it('trims whitespace from email', () => {
    const data = { email: '  john@example.com  ' }
    const result = newsletterSchema.parse(data)
    expect(result.email).toBe('john@example.com')
  })
})

describe('Discovery Call Validation', () => {
  it('validates correct discovery call data', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      company: 'Acme Corp',
      preferredDate: new Date().toISOString(),
      notes: 'Looking forward to our call.',
    }

    const result = discoveryCallSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('validates minimal discovery call data', () => {
    const data = {
      name: 'Jo',
      email: 'jo@example.com',
    }

    const result = discoveryCallSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('requires name and email', () => {
    const data = {}
    const result = discoveryCallSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
