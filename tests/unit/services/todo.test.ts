import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CreateTodoInputType } from '@/schema/todo'
import { addTodo, deleteTodo, toggleTodo, updateTodo } from '@/services/todo'
import type { TodoType } from '@/types'

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    todos: {
      add: vi.fn(),
      update: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

describe('Todo Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('addTodo', () => {
    it('should add a new todo with correct structure', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.add).mockResolvedValue(1234567890)

      const todoData: CreateTodoInputType = {
        title: 'Test Todo',
        description: 'Test Description',
        priority: 1,
        dueDate: Date.now(),
        projectId: 1,
      }

      await addTodo(todoData)

      expect(db.todos.add).toHaveBeenCalledTimes(1)
      const addedTodo = vi.mocked(db.todos.add).mock.calls[0][0] as TodoType

      expect(addedTodo.title).toBe(todoData.title)
      expect(addedTodo.description).toBe(todoData.description)
      expect(addedTodo.priority).toBe(todoData.priority)
      expect(addedTodo.dueDate).toBe(todoData.dueDate)
      expect(addedTodo.projectId).toBe(todoData.projectId)
      expect(addedTodo.completed).toBe(false)
      expect(addedTodo.syncedAt).toBe(null)
      expect(typeof addedTodo.id).toBe('number')
      expect(typeof addedTodo.createdAt).toBe('number')
      expect(typeof addedTodo.updatedAt).toBe('number')
    })

    it('should add a todo with minimal required fields', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.add).mockResolvedValue(1234567890)

      const todoData: CreateTodoInputType = {
        title: 'Minimal Todo',
        priority: 2,
      }

      await addTodo(todoData)

      expect(db.todos.add).toHaveBeenCalledTimes(1)
      const addedTodo = vi.mocked(db.todos.add).mock.calls[0][0] as TodoType

      expect(addedTodo.title).toBe(todoData.title)
      expect(addedTodo.priority).toBe(todoData.priority)
      expect(addedTodo.description).toBeUndefined()
      expect(addedTodo.dueDate).toBeUndefined()
      expect(addedTodo.projectId).toBeUndefined()
    })
  })

  describe('updateTodo', () => {
    it('should update a todo with provided fields', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.update).mockResolvedValue(1)

      const updates: Partial<TodoType> = {
        title: 'Updated Title',
        completed: true,
      }

      await updateTodo(123, updates)

      expect(db.todos.update).toHaveBeenCalledTimes(1)
      expect(db.todos.update).toHaveBeenCalledWith(123, {
        title: 'Updated Title',
        completed: true,
        updatedAt: expect.any(Number),
      })
    })

    it('should update only the updatedAt timestamp when no other fields provided', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.update).mockResolvedValue(1)

      await updateTodo(123, {})

      expect(db.todos.update).toHaveBeenCalledTimes(1)
      expect(db.todos.update).toHaveBeenCalledWith(123, {
        updatedAt: expect.any(Number),
      })
    })
  })

  describe('toggleTodo', () => {
    it('should toggle completed status from false to true', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.get).mockResolvedValue({
        id: 123,
        title: 'Test Todo',
        completed: false,
      } as TodoType)
      vi.mocked(db.todos.update).mockResolvedValue(1)

      await toggleTodo(123)

      expect(db.todos.get).toHaveBeenCalledWith(123)
      expect(db.todos.update).toHaveBeenCalledWith(123, {
        completed: true,
        updatedAt: expect.any(Number),
      })
    })

    it('should toggle completed status from true to false', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.get).mockResolvedValue({
        id: 123,
        title: 'Test Todo',
        completed: true,
      } as TodoType)
      vi.mocked(db.todos.update).mockResolvedValue(1)

      await toggleTodo(123)

      expect(db.todos.get).toHaveBeenCalledWith(123)
      expect(db.todos.update).toHaveBeenCalledWith(123, {
        completed: false,
        updatedAt: expect.any(Number),
      })
    })

    it('should return undefined when todo does not exist', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.get).mockResolvedValue(undefined)

      const result = await toggleTodo(123)

      expect(db.todos.get).toHaveBeenCalledWith(123)
      expect(db.todos.update).not.toHaveBeenCalled()
      expect(result).toBeUndefined()
    })
  })

  describe('deleteTodo', () => {
    it('should delete a todo by id', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.todos.delete).mockResolvedValue(undefined)

      await deleteTodo(123)

      expect(db.todos.delete).toHaveBeenCalledTimes(1)
      expect(db.todos.delete).toHaveBeenCalledWith(123)
    })
  })
})
