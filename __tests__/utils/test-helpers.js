/**
 * Wait for a condition to be true
 * @param {Function} condition - Function that returns boolean
 * @param {number} timeout - Maximum time to wait in ms
 * @param {number} interval - Check interval in ms
 */
export async function waitForCondition(condition, timeout = 5000, interval = 100) {
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return true
    }
    await new Promise(resolve => setTimeout(resolve, interval))
  }

  throw new Error('Timeout waiting for condition')
}

/**
 * Create a mock IntersectionObserver callback
 */
export function createIntersectionObserverMock(isIntersecting = true) {
  return class {
    constructor(callback) {
      this.callback = callback
    }

    observe(element) {
      this.callback([{ isIntersecting, target: element }])
    }

    unobserve() {}
    disconnect() {}
  }
}

/**
 * Mock fetch response
 */
export function mockFetch(data, ok = true) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    })
  )
}

/**
 * Create mock router object for Next.js
 */
export function createMockRouter(overrides = {}) {
  return {
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
    ...overrides,
  }
}

/**
 * Suppress console errors/warnings in tests
 */
export function suppressConsole(methods = ['error', 'warn']) {
  const originalMethods = {}

  beforeAll(() => {
    methods.forEach(method => {
      originalMethods[method] = console[method]
      console[method] = jest.fn()
    })
  })

  afterAll(() => {
    methods.forEach(method => {
      console[method] = originalMethods[method]
    })
  })
}
