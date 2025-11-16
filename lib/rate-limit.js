/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or Upstash
 */

class RateLimiter {
  constructor() {
    this.requests = new Map()
  }

  /**
   * Check if a request should be rate limited
   * @param {string} identifier - Unique identifier (IP address, user ID, etc.)
   * @param {number} limit - Maximum requests allowed
   * @param {number} windowMs - Time window in milliseconds
   * @returns {{success: boolean, limit: number, remaining: number, reset: number}}
   */
  check(identifier, limit = 10, windowMs = 60000) {
    const now = Date.now()
    const userRequests = this.requests.get(identifier) || []

    // Remove requests outside the time window
    const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs)

    // Check if limit exceeded
    if (validRequests.length >= limit) {
      const oldestRequest = Math.min(...validRequests)
      const resetTime = oldestRequest + windowMs

      return {
        success: false,
        limit,
        remaining: 0,
        reset: resetTime,
      }
    }

    // Add new request
    validRequests.push(now)
    this.requests.set(identifier, validRequests)

    // Clean up old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup(windowMs)
    }

    return {
      success: true,
      limit,
      remaining: limit - validRequests.length,
      reset: now + windowMs,
    }
  }

  /**
   * Clean up expired entries
   */
  cleanup(windowMs) {
    const now = Date.now()
    for (const [identifier, requests] of this.requests.entries()) {
      const validRequests = requests.filter(timestamp => now - timestamp < windowMs)
      if (validRequests.length === 0) {
        this.requests.delete(identifier)
      } else {
        this.requests.set(identifier, validRequests)
      }
    }
  }

  /**
   * Reset rate limit for a specific identifier
   */
  reset(identifier) {
    this.requests.delete(identifier)
  }

  /**
   * Clear all rate limits
   */
  resetAll() {
    this.requests.clear()
  }
}

// Create singleton instance
const rateLimiter = new RateLimiter()

/**
 * Rate limit middleware for Next.js API routes
 * @param {Request} request - Next.js request object
 * @param {Object} options - Rate limit options
 * @returns {Promise<{success: boolean, headers: Object, error?: string}>}
 */
export async function rateLimit(request, options = {}) {
  const { limit = 10, windowMs = 60000, skipFailedRequests = false } = options

  // Get client identifier (IP address)
  const identifier = getIdentifier(request)

  // Check rate limit
  const result = rateLimiter.check(identifier, limit, windowMs)

  // Prepare response headers
  const headers = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  }

  if (!result.success) {
    headers['Retry-After'] = Math.ceil((result.reset - Date.now()) / 1000).toString()

    return {
      success: false,
      headers,
      error: 'Too many requests. Please try again later.',
    }
  }

  return {
    success: true,
    headers,
  }
}

/**
 * Get client identifier from request
 */
function getIdentifier(request) {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const real = request.headers.get('x-real-ip')
  if (real) {
    return real
  }

  // Fallback to a generic identifier
  return 'unknown'
}

/**
 * Create rate limit response
 */
export function rateLimitResponse(error, headers) {
  return new Response(
    JSON.stringify({
      success: false,
      error,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
  )
}

export default rateLimiter
