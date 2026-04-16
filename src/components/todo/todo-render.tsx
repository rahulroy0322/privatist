import { useLiveQuery } from 'dexie-react-hooks'
import type { FC } from 'react'
import type { TodoType } from '@/lib/types'
import { TodoFlatList } from './todo-flat-list'
import { TodoListSkeleton } from './todo-list'

type TodosComponentPropsType = {
  query: () => Promise<TodoType[] | undefined>
}

const TodosComponent: FC<TodosComponentPropsType> = ({ query }) => {
  const todos = useLiveQuery(query)

  if (!Array.isArray(todos)) {
    return <TodoListSkeleton />
  }

  return <TodoFlatList todos={todos} />
}

export { TodosComponent }
