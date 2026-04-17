import { create } from 'zustand'
import type { TodoType } from '@/types'

type TodoModelStoreType = {
  open: boolean
  todo: TodoType | null
}

const useTodoModel = create<TodoModelStoreType>(() => ({
  open: false,
  todo: null,
}))

const { setState: set } = useTodoModel

const setTodotoEdit = (todo: TodoModelStoreType['todo']) =>
  set({
    todo,
  })

const setTodoModelOpen = (open: boolean) =>
  set({
    open,
  })

const closeTodoModel = () =>
  set({
    open: false,
    todo: null,
  })

const openTodoModel = () => setTodoModelOpen(true)

export {
  closeTodoModel,
  openTodoModel,
  setTodoModelOpen,
  setTodotoEdit,
  useTodoModel,
}
