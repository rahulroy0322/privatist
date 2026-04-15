import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC } from 'react'
import { TodoListPageWraper } from '@/components/layout/todo-list-page-wraper'
import { TodoList, TodoListSkeleton } from '@/components/todo/todo-list'
import { db } from '@/lib/db'

const InboxPageList: FC = () => {
  const todos = useLiveQuery(() => db.todos.toArray())

  if (!Array.isArray(todos)) {
    return <TodoListSkeleton />
  }

  return <TodoList todos={todos} />
}

const InboxPage: FC = () => (
  <TodoListPageWraper title="Inbox">
    <InboxPageList />
  </TodoListPageWraper>
)

const Route = createFileRoute('/(todo)/inbox')({
  component: InboxPage,
})

export { Route }
