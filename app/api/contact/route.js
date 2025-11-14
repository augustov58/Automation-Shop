import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { z } from 'zod'

// Initialize Resend with API key from environment variables
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

/**
 * POST /api/contact
 * Handles contact form submissions
 */
export async function POST(request) {
  try {
    // Rate limiting: 5 requests per 15 minutes
    const rateLimitResult = await rateLimit(request, {
      limit: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.error, rateLimitResult.headers)
    }

    // Parse request body
    const body = await request.json()

    // Validate request data
    const validatedData = contactFormSchema.parse(body)

    // Check if Resend is configured
    if (!resend) {
      console.warn('Resend API key not configured. Email will not be sent.')

      // In development, log the form data instead
      if (process.env.NODE_ENV === 'development') {
        console.log('Contact form submission (dev mode):', validatedData)
        return NextResponse.json(
          {
            success: true,
            message: 'Form received (development mode - email not sent)',
            data: validatedData
          },
          { status: 200 }
        )
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not configured'
        },
        { status: 500 }
      )
    }

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'info@aiautomationshop.com',
      replyTo: validatedData.email,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: generateEmailHTML(validatedData),
      text: generateEmailText(validatedData),
    })

    // Check if email was sent successfully
    if (emailResult.error) {
      console.error('Failed to send email:', emailResult.error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email. Please try again later.'
        },
        { status: 500 }
      )
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We\'ll get back to you soon.',
        emailId: emailResult.data?.id
      },
      { status: 200 }
    )

  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    // Handle other errors
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    )
  }
}

/**
 * Generate HTML email content
 */
function generateEmailHTML(data) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #38BDF8 0%, #8B5CF6 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 5px;
          }
          .value {
            color: #475569;
            padding: 10px;
            background: white;
            border-radius: 5px;
            border-left: 3px solid #38BDF8;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🤖 New Contact Form Submission</h1>
          <p>AI Automation Shop</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>

          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>

          ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
            </div>
          ` : ''}

          ${data.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${escapeHtml(data.company)}</div>
            </div>
          ` : ''}

          ${data.service ? `
            <div class="field">
              <div class="label">Service of Interest:</div>
              <div class="value">${formatService(data.service)}</div>
            </div>
          ` : ''}

          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
          </div>
        </div>

        <div class="footer">
          <p>Received on ${new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short'
          })}</p>
        </div>
      </body>
    </html>
  `
}

/**
 * Generate plain text email content
 */
function generateEmailText(data) {
  let text = `
NEW CONTACT FORM SUBMISSION
AI Automation Shop

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}\n` : ''}
${data.company ? `Company: ${data.company}\n` : ''}
${data.service ? `Service: ${formatService(data.service)}\n` : ''}

Message:
${data.message}

---
Received on ${new Date().toLocaleString()}
  `
  return text.trim()
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Format service enum to readable text
 */
function formatService(service) {
  const serviceMap = {
    'ai-automation': 'AI Automation',
    'consulting': 'Consulting',
    'integration': 'Integration',
    'custom': 'Custom Solution',
    'other': 'Other'
  }
  return serviceMap[service] || service
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
