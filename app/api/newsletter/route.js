import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { newsletterSchema } from '@/lib/validations'
import { rateLimit, rateLimitResponse } from '@/lib/rate-limit'
import { z } from 'zod'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

/**
 * POST /api/newsletter
 * Handles newsletter subscription
 */
export async function POST(request) {
  try {
    // Rate limiting: 3 requests per hour
    const rateLimitResult = await rateLimit(request, {
      limit: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    })

    if (!rateLimitResult.success) {
      return rateLimitResponse(rateLimitResult.error, rateLimitResult.headers)
    }

    // Parse request body
    const body = await request.json()

    // Validate request data
    const validatedData = newsletterSchema.parse(body)

    // In development mode or if Resend is not configured
    if (!resend) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Newsletter subscription (dev mode):', validatedData)
        return NextResponse.json(
          {
            success: true,
            message: 'Subscription received (development mode)',
            email: validatedData.email
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

    // Send confirmation email
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: validatedData.email,
      subject: 'Welcome to AI Automation Shop Newsletter!',
      html: generateConfirmationEmailHTML(validatedData.email),
      text: generateConfirmationEmailText(validatedData.email),
    })

    // Also notify admin about new subscription
    if (process.env.EMAIL_TO) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: process.env.EMAIL_TO,
        subject: 'New Newsletter Subscription',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `,
        text: `New Newsletter Subscription\nEmail: ${validatedData.email}\nDate: ${new Date().toLocaleString()}`
      })
    }

    if (emailResult.error) {
      console.error('Failed to send newsletter email:', emailResult.error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to process subscription. Please try again later.'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        emailId: emailResult.data?.id
      },
      { status: 200 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    console.error('Newsletter subscription error:', error)
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
 * Generate HTML confirmation email
 */
function generateConfirmationEmailHTML(email) {
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
            padding: 40px 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f9fafb;
            padding: 40px 30px;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #38BDF8;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
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
          <h1>🤖 Welcome to AI Automation Shop!</h1>
        </div>
        <div class="content">
          <h2>Thank you for subscribing!</h2>
          <p>You're now part of our community and will receive:</p>
          <ul>
            <li>Latest AI automation insights and trends</li>
            <li>Exclusive tips and best practices</li>
            <li>Early access to new features and services</li>
            <li>Special offers and announcements</li>
          </ul>
          <p>We're excited to have you on board!</p>
        </div>
        <div class="footer">
          <p>You're receiving this because you subscribed to AI Automation Shop newsletter.</p>
          <p>© ${new Date().getFullYear()} AI Automation Shop. All rights reserved.</p>
        </div>
      </body>
    </html>
  `
}

/**
 * Generate plain text confirmation email
 */
function generateConfirmationEmailText(email) {
  return `
Welcome to AI Automation Shop!

Thank you for subscribing to our newsletter!

You'll now receive:
- Latest AI automation insights and trends
- Exclusive tips and best practices
- Early access to new features and services
- Special offers and announcements

We're excited to have you on board!

---
© ${new Date().getFullYear()} AI Automation Shop. All rights reserved.
  `.trim()
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
