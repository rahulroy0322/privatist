import { db } from '@/lib/db'
import type { CreateTodoInputType } from '@/schema/todo'
import type { TodoType } from '@/types'

const addTodo = async (todoData: CreateTodoInputType) => {
    const now = Date.now()
    const newTodo: TodoType = {
      ...todoData,
      id: now,
      createdAt: now,
      updatedAt: now,
      syncedAt: null,
      completed: false,
    }
    return db.todos.add(newTodo)
  },
  updateTodo = async (id: number, updates: Partial<TodoType>) => {
    const now = Date.now()
    const updatedTodo = {
      ...updates,
      updatedAt: now,
    }
    return db.todos.update(id, updatedTodo)
  },
  toggleTodo = async (id: number) => {
    const prev = await db.todos.get(id)

    if (!prev) {
      return
    }

    return updateTodo(id, {
      completed: !prev.completed,
    })
  },
  deleteTodo = async (id: number) => db.todos.delete(id)

export { addTodo, deleteTodo, toggleTodo, updateTodo }
