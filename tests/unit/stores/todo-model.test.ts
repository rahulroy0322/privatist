import { beforeEach, describe, expect, it } from 'vitest'
import {
  closeTodoModel,
  openTodoModel,
  setTodoModelOpen,
  setTodotoEdit,
  useTodoModel,
} from '@/stores/todo-model'
import type { TodoType } from '@/types'

describe('Todo Model Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    closeTodoModel()
  })

  describe('initial state', () => {
    it('should have open set to false initially', () => {
      const state = useTodoModel.getState()
      expect(state.open).toBe(false)
    })

    it('should have todo set to null initially', () => {
      const state = useTodoModel.getState()
      expect(state.todo).toBe(null)
    })
  })

  describe('setTodotoEdit', () => {
    it('should set the todo to edit', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodotoEdit(mockTodo)

      const state = useTodoModel.getState()
      expect(state.todo).toEqual(mockTodo)
    })

    it('should set todo to null', () => {
      setTodotoEdit(null)

      const state = useTodoModel.getState()
      expect(state.todo).toBe(null)
    })

    it('should not change open state', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodoModelOpen(true)
      setTodotoEdit(mockTodo)

      const state = useTodoModel.getState()
      expect(state.open).toBe(true)
    })
  })

  describe('setTodoModelOpen', () => {
    it('should set open to true', () => {
      setTodoModelOpen(true)

      const state = useTodoModel.getState()
      expect(state.open).toBe(true)
    })

    it('should set open to false', () => {
      setTodoModelOpen(true)
      setTodoModelOpen(false)

      const state = useTodoModel.getState()
      expect(state.open).toBe(false)
    })

    it('should not change todo state', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodotoEdit(mockTodo)
      setTodoModelOpen(true)

      const state = useTodoModel.getState()
      expect(state.todo).toEqual(mockTodo)
    })
  })

  describe('openTodoModel', () => {
    it('should set open to true', () => {
      openTodoModel()

      const state = useTodoModel.getState()
      expect(state.open).toBe(true)
    })

    it('should not change todo state', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodotoEdit(mockTodo)
      openTodoModel()

      const state = useTodoModel.getState()
      expect(state.todo).toEqual(mockTodo)
    })
  })

  describe('closeTodoModel', () => {
    it('should set open to false', () => {
      openTodoModel()
      closeTodoModel()

      const state = useTodoModel.getState()
      expect(state.open).toBe(false)
    })

    it('should set todo to null', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodotoEdit(mockTodo)
      closeTodoModel()

      const state = useTodoModel.getState()
      expect(state.todo).toBe(null)
    })

    it('should reset both open and todo state', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodotoEdit(mockTodo)
      openTodoModel()
      closeTodoModel()

      const state = useTodoModel.getState()
      expect(state.open).toBe(false)
      expect(state.todo).toBe(null)
    })
  })

  describe('state transitions', () => {
    it('should handle opening modal with todo', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodotoEdit(mockTodo)
      openTodoModel()

      const state = useTodoModel.getState()
      expect(state.open).toBe(true)
      expect(state.todo).toEqual(mockTodo)
    })

    it('should handle closing modal after editing', () => {
      const mockTodo: TodoType = {
        id: 1,
        title: 'Test Todo',
        priority: 1,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        syncedAt: null,
      }

      setTodotoEdit(mockTodo)
      openTodoModel()
      closeTodoModel()

      const state = useTodoModel.getState()
      expect(state.open).toBe(false)
      expect(state.todo).toBe(null)
    })

    it('should handle opening modal without todo (create mode)', () => {
      openTodoModel()

      const state = useTodoModel.getState()
      expect(state.open).toBe(true)
      expect(state.todo).toBe(null)
    })
  })
})
