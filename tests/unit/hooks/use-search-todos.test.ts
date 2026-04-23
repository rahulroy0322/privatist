import { renderHook } from '@testing-library/react'
import * as dexieReactHooks from 'dexie-react-hooks'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSearchTodos } from '@/hooks/use-search-todos'
import type { TodoType } from '@/types'

// Mock dexie-react-hooks
vi.mock('dexie-react-hooks', () => ({
  useLiveQuery: vi.fn(),
}))

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    todos: {
      toArray: vi.fn(),
    },
  },
}))

describe('useSearchTodos', () => {
  const mockTodos: TodoType[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      priority: 1,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      syncedAt: null,
    },
    {
      id: 2,
      title: 'Complete project',
      description: 'Finish the testing strategy',
      priority: 2,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      syncedAt: null,
    },
    {
      id: 3,
      title: 'Call mom',
      description: 'Weekly check-in',
      priority: 3,
      completed: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      syncedAt: null,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return empty array when search query is empty', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos(''))

    expect(result.current).toEqual([])
    expect(dexieReactHooks.useLiveQuery).toHaveBeenCalledTimes(1)
  })

  it('should return empty array when search query is only whitespace', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('   '))

    expect(result.current).toEqual([])
  })

  it('should filter todos by title (case-insensitive)', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('groceries'))

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Buy groceries')
  })

  it('should filter todos by description (case-insensitive)', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('milk'))

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Buy groceries')
  })

  it('should filter todos by both title and description', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('project'))

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Complete project')
  })

  it('should return multiple matching todos', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('the'))

    expect(result.current.length).toBeGreaterThan(0)
  })

  it('should handle uppercase search query', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('GROCERIES'))

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Buy groceries')
  })

  it('should handle mixed case search query', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('PrOjEcT'))

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Complete project')
  })

  it('should return empty array when no todos match', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('nonexistent'))

    expect(result.current).toEqual([])
  })

  it('should handle undefined todos array', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(undefined)

    const { result } = renderHook(() => useSearchTodos('test'))

    expect(result.current).toEqual([])
  })

  it('should handle empty todos array', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue([])

    const { result } = renderHook(() => useSearchTodos('test'))

    expect(result.current).toEqual([])
  })

  it('should match partial words in title', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('gro'))

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Buy groceries')
  })

  it('should match partial words in description', () => {
    vi.mocked(dexieReactHooks.useLiveQuery).mockReturnValue(mockTodos)

    const { result } = renderHook(() => useSearchTodos('mil'))

    expect(result.current).toHaveLength(1)
    expect(result.current[0].title).toBe('Buy groceries')
  })
})
