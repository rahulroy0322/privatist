import * as dexieReactHooks from 'dexie-react-hooks'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from '@/hooks/use-theme'
import type { ThemeType } from '@/types'

// Mock dexie-react-hooks
vi.mock('dexie-react-hooks', () => ({
  useLiveQuery: vi.fn(),
}))

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    settings: {
      get: vi.fn(),
    },
  },
}))

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return system theme when no theme setting exists', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(undefined)

    const { theme } = useTheme()

    expect(theme).toBe('system')
    expect(dexieReactHooks.useLiveQuery).toHaveBeenCalledTimes(1)
  })

  it('should return light theme when light is set', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue({
      key: 'theme',
      value: 'light' as ThemeType,
    })

    const { theme } = useTheme()

    expect(theme).toBe('light')
  })

  it('should return dark theme when dark is set', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue({
      key: 'theme',
      value: 'dark' as ThemeType,
    })

    const { theme } = useTheme()

    expect(theme).toBe('dark')
  })

  it('should return system theme when system is set', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue({
      key: 'theme',
      value: 'system' as ThemeType,
    })

    const { theme } = useTheme()

    expect(theme).toBe('system')
  })

  it('should return system theme when setting key is not theme', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue({
      key: 'other',
      value: 'light' as ThemeType,
    })

    const { theme } = useTheme()

    expect(theme).toBe('system')
  })

  it('should return null when setting value is null', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue({
      key: 'theme',
      value: null,
    })

    const { theme } = useTheme()

    expect(theme).toBe(null)
  })
})
