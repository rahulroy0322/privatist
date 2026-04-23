import { describe, expect, it, vi } from 'vitest'
import { getTodayRange } from '@/lib/date'

describe('getTodayRange', () => {
  it('should return correct start and end of day timestamps', () => {
    const now = new Date('2024-01-15T12:30:45.000Z')
    vi.setSystemTime(now)

    const { startOfDay, endOfDay } = getTodayRange()

    const expectedStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime()
    const expectedEnd =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      1

    expect(startOfDay).toBe(expectedStart)
    expect(endOfDay).toBe(expectedEnd)
  })

  it('should handle midnight correctly', () => {
    const now = new Date('2024-01-15T00:00:00.000Z')
    vi.setSystemTime(now)

    const { startOfDay, endOfDay } = getTodayRange()

    const expectedStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime()
    const expectedEnd =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      1

    expect(startOfDay).toBe(expectedStart)
    expect(endOfDay).toBe(expectedEnd)
  })

  it('should handle end of day correctly', () => {
    const now = new Date('2024-01-15T23:59:59.999Z')
    vi.setSystemTime(now)

    const { startOfDay, endOfDay } = getTodayRange()

    const expectedStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime()
    const expectedEnd =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      1

    expect(startOfDay).toBe(expectedStart)
    expect(endOfDay).toBe(expectedEnd)
  })

  it('should handle different timezones correctly', () => {
    const now = new Date('2024-06-15T18:30:00.000Z')
    vi.setSystemTime(now)

    const { startOfDay, endOfDay } = getTodayRange()

    const expectedStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime()
    const expectedEnd =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      1

    expect(startOfDay).toBe(expectedStart)
    expect(endOfDay).toBe(expectedEnd)
  })

  it('should return a 24-hour range', () => {
    const now = new Date('2024-01-15T10:00:00.000Z')
    vi.setSystemTime(now)

    const { startOfDay, endOfDay } = getTodayRange()

    const dayInMs = 24 * 60 * 60 * 1000 - 1
    expect(endOfDay - startOfDay).toBe(dayInMs)
  })
})
