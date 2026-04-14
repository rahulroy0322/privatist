import { db } from '@/lib/db'
import type { TodoType } from '@/lib/types'
import type { CreateTaskInputType } from '@/schema/task'

const addTodo = async (taskData: CreateTaskInputType) => {
    const now = Date.now()
    const newTask: TodoType = {
      ...taskData,
      createdAt: now,
      updatedAt: now,
      syncedAt: null,
      completed: false,
      // labelIds: taskData.labelIds || [],
      // order: taskData.order ?? 0,
    }
    return db.todos.add(newTask)
  },
  updateTodo = async (id: number, updates: Partial<TodoType>) => {
    const now = Date.now()
    const updatedTask = {
      ...updates,
      updatedAt: now,
    }
    return db.todos.update(id, updatedTask)
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
