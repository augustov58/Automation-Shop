import { cn } from '../utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('filters out falsy values', () => {
    const result = cn('class-1', false, 'class-2', null, 'class-3', undefined)
    expect(result).toBe('class-1 class-2 class-3')
  })

  it('handles Tailwind class conflicts correctly', () => {
    // twMerge should resolve conflicting Tailwind classes
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4') // Last one wins
  })

  it('handles arrays of classes', () => {
    const result = cn(['class-1', 'class-2'], 'class-3')
    expect(result).toBe('class-1 class-2 class-3')
  })

  it('handles objects with boolean values', () => {
    const result = cn({
      'class-1': true,
      'class-2': false,
      'class-3': true,
    })
    expect(result).toBe('class-1 class-3')
  })

  it('handles complex combinations', () => {
    const isActive = true
    const isDisabled = false
    const result = cn(
      'base-class',
      {
        'active-class': isActive,
        'disabled-class': isDisabled,
      },
      isActive && 'extra-active',
      ['array-class-1', 'array-class-2']
    )
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
    expect(result).toContain('extra-active')
    expect(result).toContain('array-class-1')
    expect(result).not.toContain('disabled-class')
  })

  it('handles empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('merges responsive and state variants correctly', () => {
    const result = cn('hover:text-red-500', 'hover:text-blue-500')
    expect(result).toBe('hover:text-blue-500')
  })
})
