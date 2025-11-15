# API Documentation

This document describes the available API endpoints for the AI Automation Shop application.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.vercel.app/api
```

## Authentication

Currently, all API endpoints are public. Future versions may include authentication for certain endpoints.

## Rate Limiting

All API endpoints are rate-limited to prevent abuse:

- **Contact Form**: 5 requests per 15 minutes per IP
- **Newsletter**: 3 requests per hour per IP

Rate limit information is returned in response headers:

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit resets (ISO 8601)
- `Retry-After`: Seconds to wait before retrying (only when rate limited)

---

## Endpoints

### 1. Contact Form Submission

Submit a contact form with user inquiries.

**Endpoint**: `POST /api/contact`

#### Request Headers

```
Content-Type: application/json
```

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "company": "Acme Corp",
  "service": "ai-automation",
  "message": "I'm interested in your AI automation services..."
}
```

#### Request Body Fields

| Field     | Type   | Required | Description                                                                          |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------ |
| `name`    | string | ✅ Yes   | Full name (2-100 characters, letters only)                                           |
| `email`   | string | ✅ Yes   | Valid email address                                                                  |
| `phone`   | string | ❌ No    | Phone number (digits, spaces, +, -, (, ) allowed)                                    |
| `company` | string | ❌ No    | Company name (2-100 characters)                                                      |
| `service` | string | ❌ No    | Service of interest: `ai-automation`, `consulting`, `integration`, `custom`, `other` |
| `message` | string | ✅ Yes   | Message content (10-5000 characters)                                                 |

#### Success Response

**Status Code**: `200 OK`

```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon.",
  "emailId": "abc123..."
}
```

#### Error Responses

**Validation Error** - `400 Bad Request`

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

**Rate Limit Exceeded** - `429 Too Many Requests`

```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

**Server Error** - `500 Internal Server Error`

```json
{
  "success": false,
  "error": "An unexpected error occurred. Please try again later."
}
```

#### Example Request

```bash
curl -X POST https://your-domain.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to learn more about your services."
  }'
```

#### Example Response

```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon.",
  "emailId": "re_abc123xyz"
}
```

---

### 2. Newsletter Subscription

Subscribe to the newsletter for updates and insights.

**Endpoint**: `POST /api/newsletter`

#### Request Headers

```
Content-Type: application/json
```

#### Request Body

```json
{
  "email": "john@example.com"
}
```

#### Request Body Fields

| Field   | Type   | Required | Description                            |
| ------- | ------ | -------- | -------------------------------------- |
| `email` | string | ✅ Yes   | Valid email address (5-255 characters) |

#### Success Response

**Status Code**: `200 OK`

```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "emailId": "re_abc123..."
}
```

#### Error Responses

**Validation Error** - `400 Bad Request`

```json
{
  "success": false,
  "error": "Invalid email address",
  "details": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

**Rate Limit Exceeded** - `429 Too Many Requests`

```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

**Server Error** - `500 Internal Server Error`

```json
{
  "success": false,
  "error": "An unexpected error occurred. Please try again later."
}
```

#### Example Request

```bash
curl -X POST https://your-domain.vercel.app/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

#### Example Response

```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "emailId": "re_xyz789abc"
}
```

---

## Development Mode

When running in development mode (`NODE_ENV=development`) without a configured email service:

- Form submissions are logged to console
- No emails are actually sent
- Success responses are returned for testing

Example development response:

```json
{
  "success": true,
  "message": "Form received (development mode - email not sent)",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }
}
```

---

## Environment Variables

Required environment variables for API functionality:

```bash
# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email Addresses
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=info@yourdomain.com

# Application
NODE_ENV=production
```

See `.env.example` for complete configuration.

---

## Error Codes

| Status Code | Description                               |
| ----------- | ----------------------------------------- |
| 200         | Success                                   |
| 400         | Bad Request - Invalid input data          |
| 429         | Too Many Requests - Rate limit exceeded   |
| 500         | Internal Server Error - Server-side error |

---

## CORS

Currently, CORS is configured to allow requests from any origin (`*`). For production, consider restricting to your domain:

```javascript
headers: {
  'Access-Control-Allow-Origin': 'https://yourdomain.com'
}
```

---

## Validation Rules

### Email Validation

- Must be a valid email format
- Min length: 5 characters
- Max length: 255 characters
- Automatically converted to lowercase
- Trimmed of whitespace

### Name Validation

- Min length: 2 characters
- Max length: 100 characters
- Only letters, spaces, hyphens, and apostrophes allowed
- Pattern: `/^[a-zA-Z\s'-]+$/`

### Phone Validation (Optional)

- Only digits, spaces, +, -, (, ) allowed
- Pattern: `/^[\d\s\-\+\(\)]+$/`

### Message Validation

- Min length: 10 characters
- Max length: 5000 characters
- Trimmed of leading/trailing whitespace

---

## Best Practices

### Client-Side Implementation

1. **Always validate on client-side** before sending to API
2. **Handle loading states** while request is processing
3. **Show clear error messages** from API responses
4. **Respect rate limits** - don't retry immediately on 429
5. **Use debouncing** for real-time validation

### Example React Implementation

```jsx
const handleSubmit = async data => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (response.ok && result.success) {
      // Success
      showSuccessMessage(result.message)
    } else {
      // Error
      showErrorMessage(result.error)
    }
  } catch (error) {
    // Network error
    showErrorMessage('Failed to send. Please check your connection.')
  }
}
```

---

## Testing

### Using curl

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message."
  }'

# Test newsletter
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Using JavaScript (Browser Console)

```javascript
// Test contact form
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message.',
  }),
})
  .then(r => r.json())
  .then(console.log)

// Test newsletter
fetch('/api/newsletter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com' }),
})
  .then(r => r.json())
  .then(console.log)
```

---

## Future Enhancements

Planned API improvements:

- [ ] Authentication and API keys
- [ ] Webhook support for form submissions
- [ ] File upload support
- [ ] Advanced analytics endpoints
- [ ] GraphQL API option
- [ ] WebSocket support for real-time features

---

## Support

For API issues or questions:

- GitHub Issues: [Link to repo issues]
- Email: dev@aiautomationshop.com
- Documentation: [Link to docs]

---

**Last Updated**: November 2025
**API Version**: 1.0.0
