import { describe, expect, it } from 'vitest'
import { createTodoSchema } from '@/schema/todo'

describe('createTodoSchema', () => {
  describe('title validation', () => {
    it('should accept valid title', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should reject empty title', () => {
      const result = createTodoSchema.safeParse({
        title: '',
        priority: 1,
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title is required')
      }
    })

    it('should reject title longer than 200 characters', () => {
      const longTitle = 'a'.repeat(201)
      const result = createTodoSchema.safeParse({
        title: longTitle,
        priority: 1,
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Title must be less than 200 characters'
        )
      }
    })

    it('should accept title exactly 200 characters', () => {
      const title = 'a'.repeat(200)
      const result = createTodoSchema.safeParse({
        title,
        priority: 1,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('description validation', () => {
    it('should accept valid description', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        description: 'Test Description',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should accept empty description', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        description: '',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should accept undefined description', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should reject description longer than 1000 characters', () => {
      const longDescription = 'a'.repeat(1001)
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        description: longDescription,
        priority: 1,
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Description must be less than 1000 characters'
        )
      }
    })

    it('should accept description exactly 1000 characters', () => {
      const description = 'a'.repeat(1000)
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        description,
        priority: 1,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('priority validation', () => {
    it('should accept priority 1', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should accept priority 2', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 2,
      })
      expect(result.success).toBe(true)
    })

    it('should accept priority 3', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 3,
      })
      expect(result.success).toBe(true)
    })

    it('should accept priority 4', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 4,
      })
      expect(result.success).toBe(true)
    })

    it('should reject priority 0', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 0,
      })
      expect(result.success).toBe(false)
    })

    it('should reject priority 5', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 5,
      })
      expect(result.success).toBe(false)
    })

    it('should reject string priority', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 'high' as unknown as 1,
      })
      expect(result.success).toBe(false)
    })
  })

  describe('dueDate validation', () => {
    it('should accept valid dueDate as timestamp', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
        dueDate: Date.now(),
      })
      expect(result.success).toBe(true)
    })

    it('should accept undefined dueDate', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should accept past dueDate', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
        dueDate: Date.now() - 86400000, // 1 day ago
      })
      expect(result.success).toBe(true)
    })

    it('should accept future dueDate', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
        dueDate: Date.now() + 86400000, // 1 day from now
      })
      expect(result.success).toBe(true)
    })
  })

  describe('projectId validation', () => {
    it('should accept valid projectId', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
        projectId: 1,
      })
      expect(result.success).toBe(true)
    })

    it('should accept null projectId', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
        projectId: null,
      })
      expect(result.success).toBe(true)
    })

    it('should accept undefined projectId', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('parentId validation', () => {
    it('should accept valid parentId', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
        parentId: 123,
      })
      expect(result.success).toBe(true)
    })

    it('should accept undefined parentId', () => {
      const result = createTodoSchema.safeParse({
        title: 'Test Todo',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('complete valid todo', () => {
    it('should accept a complete valid todo object', () => {
      const result = createTodoSchema.safeParse({
        title: 'Complete Todo',
        description: 'This is a complete todo',
        priority: 2,
        dueDate: Date.now() + 86400000,
        projectId: 1,
        parentId: 123,
      })
      expect(result.success).toBe(true)
    })

    it('should accept a minimal valid todo object', () => {
      const result = createTodoSchema.safeParse({
        title: 'Minimal Todo',
        priority: 1,
      })
      expect(result.success).toBe(true)
    })
  })
})
