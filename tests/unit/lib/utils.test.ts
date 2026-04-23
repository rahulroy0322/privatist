import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-4 py-2', 'bg-blue-500', 'text-white')
    expect(result).toBe('px-4 py-2 bg-blue-500 text-white')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const isDisabled = false
    const result = cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    )
    expect(result).toBe('base-class active-class')
  })

  it('should deduplicate Tailwind classes', () => {
    const result = cn('px-4 py-2', 'py-4')
    // tailwind-merge should keep the last one
    expect(result).toBe('px-4 py-4')
  })

  it('should handle empty strings and null/undefined', () => {
    const result = cn('class-a', '', null, undefined, 'class-b')
    expect(result).toBe('class-a class-b')
  })

  it('should handle arrays and objects', () => {
    const result = cn(['class-a', 'class-b'], {
      'class-c': true,
      'class-d': false,
    })
    expect(result).toBe('class-a class-b class-c')
  })
})
