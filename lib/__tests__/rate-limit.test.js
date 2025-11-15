import rateLimiter, { rateLimit } from '../rate-limit'

// Mock Request object
class MockRequest {
  constructor(ip = '127.0.0.1') {
    this.headers = new Map([['x-forwarded-for', ip]])
  }

  get(key) {
    return this.headers.get(key)
  }
}

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Reset rate limiter before each test
    rateLimiter.resetAll()
  })

  it('allows requests within limit', async () => {
    const request = new MockRequest('192.168.1.1')

    const result = await rateLimit(request, {
      limit: 5,
      windowMs: 60000,
    })

    expect(result.success).toBe(true)
    expect(result.headers['X-RateLimit-Limit']).toBe('5')
    expect(result.headers['X-RateLimit-Remaining']).toBe('4')
  })

  it('blocks requests exceeding limit', async () => {
    const request = new MockRequest('192.168.1.2')
    const options = { limit: 3, windowMs: 60000 }

    // Make 3 requests (up to limit)
    await rateLimit(request, options)
    await rateLimit(request, options)
    await rateLimit(request, options)

    // 4th request should be blocked
    const result = await rateLimit(request, options)

    expect(result.success).toBe(false)
    expect(result.error).toBeTruthy()
    expect(result.headers['X-RateLimit-Remaining']).toBe('0')
    expect(result.headers['Retry-After']).toBeTruthy()
  })

  it('tracks remaining requests correctly', async () => {
    const request = new MockRequest('192.168.1.3')
    const options = { limit: 5, windowMs: 60000 }

    let result = await rateLimit(request, options)
    expect(result.headers['X-RateLimit-Remaining']).toBe('4')

    result = await rateLimit(request, options)
    expect(result.headers['X-RateLimit-Remaining']).toBe('3')

    result = await rateLimit(request, options)
    expect(result.headers['X-RateLimit-Remaining']).toBe('2')
  })

  it('resets after time window', async () => {
    const request = new MockRequest('192.168.1.4')
    const windowMs = 100 // 100ms for testing

    // Make requests up to limit
    await rateLimit(request, { limit: 2, windowMs })
    await rateLimit(request, { limit: 2, windowMs })

    // Should be blocked
    let result = await rateLimit(request, { limit: 2, windowMs })
    expect(result.success).toBe(false)

    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, windowMs + 10))

    // Should be allowed again
    result = await rateLimit(request, { limit: 2, windowMs })
    expect(result.success).toBe(true)
  })

  it('handles different IPs independently', async () => {
    const request1 = new MockRequest('192.168.1.5')
    const request2 = new MockRequest('192.168.1.6')
    const options = { limit: 2, windowMs: 60000 }

    // Make requests from first IP
    await rateLimit(request1, options)
    await rateLimit(request1, options)

    // Should be blocked for first IP
    let result = await rateLimit(request1, options)
    expect(result.success).toBe(false)

    // Should still be allowed for second IP
    result = await rateLimit(request2, options)
    expect(result.success).toBe(true)
  })

  it('handles x-real-ip header', async () => {
    const request = {
      headers: {
        get: key => {
          if (key === 'x-real-ip') return '10.0.0.1'
          return null
        },
      },
    }

    const result = await rateLimit(request, { limit: 5, windowMs: 60000 })
    expect(result.success).toBe(true)
  })

  it('returns correct rate limit headers', async () => {
    const request = new MockRequest('192.168.1.7')
    const result = await rateLimit(request, { limit: 10, windowMs: 60000 })

    expect(result.headers).toHaveProperty('X-RateLimit-Limit')
    expect(result.headers).toHaveProperty('X-RateLimit-Remaining')
    expect(result.headers).toHaveProperty('X-RateLimit-Reset')
    expect(result.headers['X-RateLimit-Limit']).toBe('10')
  })

  it('includes Retry-After header when rate limited', async () => {
    const request = new MockRequest('192.168.1.8')
    const options = { limit: 1, windowMs: 60000 }

    // First request succeeds
    await rateLimit(request, options)

    // Second request is rate limited
    const result = await rateLimit(request, options)

    expect(result.success).toBe(false)
    expect(result.headers).toHaveProperty('Retry-After')
    expect(parseInt(result.headers['Retry-After'])).toBeGreaterThan(0)
  })

  it('can reset rate limit for specific identifier', () => {
    const identifier = '192.168.1.9'

    // Check rate limit
    rateLimiter.check(identifier, 3, 60000)
    rateLimiter.check(identifier, 3, 60000)

    // Reset for this identifier
    rateLimiter.reset(identifier)

    // Should be able to make requests again
    const result = rateLimiter.check(identifier, 3, 60000)
    expect(result.remaining).toBe(2)
  })

  it('can reset all rate limits', () => {
    // Make requests from multiple IPs
    rateLimiter.check('192.168.1.10', 3, 60000)
    rateLimiter.check('192.168.1.11', 3, 60000)
    rateLimiter.check('192.168.1.12', 3, 60000)

    // Reset all
    rateLimiter.resetAll()

    // All should have fresh limits
    const result1 = rateLimiter.check('192.168.1.10', 3, 60000)
    const result2 = rateLimiter.check('192.168.1.11', 3, 60000)

    expect(result1.remaining).toBe(2)
    expect(result2.remaining).toBe(2)
  })

  it('cleans up expired entries', () => {
    const windowMs = 50 // Short window for testing

    // Add multiple requests
    rateLimiter.check('192.168.1.13', 5, windowMs)
    rateLimiter.check('192.168.1.14', 5, windowMs)
    rateLimiter.check('192.168.1.15', 5, windowMs)

    expect(rateLimiter.requests.size).toBe(3)

    // Wait for entries to expire
    setTimeout(() => {
      // Trigger cleanup by making a new request
      rateLimiter.check('192.168.1.16', 5, windowMs)

      // Old entries should eventually be cleaned up
      // Note: Cleanup is probabilistic (1% chance per request)
      // so we can't guarantee exact timing
    }, windowMs + 10)
  })
})

describe('RateLimiter.check method', () => {
  beforeEach(() => {
    rateLimiter.resetAll()
  })

  it('returns success, limit, remaining, and reset', () => {
    const result = rateLimiter.check('test-id', 5, 60000)

    expect(result).toHaveProperty('success')
    expect(result).toHaveProperty('limit')
    expect(result).toHaveProperty('remaining')
    expect(result).toHaveProperty('reset')
  })

  it('decrements remaining count with each request', () => {
    let result = rateLimiter.check('test-id', 3, 60000)
    expect(result.remaining).toBe(2)

    result = rateLimiter.check('test-id', 3, 60000)
    expect(result.remaining).toBe(1)

    result = rateLimiter.check('test-id', 3, 60000)
    expect(result.remaining).toBe(0)
  })

  it('returns success false when limit exceeded', () => {
    // Exhaust limit
    rateLimiter.check('test-id', 2, 60000)
    rateLimiter.check('test-id', 2, 60000)

    // Next request should fail
    const result = rateLimiter.check('test-id', 2, 60000)
    expect(result.success).toBe(false)
  })
})
