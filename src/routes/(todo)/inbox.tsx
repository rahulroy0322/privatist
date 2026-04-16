import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC, useCallback } from 'react'
import { TodoListPageWrapper } from '@/components/layout/todo-list-page-wrapper'
import { TodoAccordion } from '@/components/todo/todo-accordion'
import { TodoList, TodoListSkeleton } from '@/components/todo/todo-list'
import { db } from '@/lib/db'

const CompletedTodos: FC = () => {
  const query = useCallback(
    () => db.todos.filter((todo) => todo.completed).toArray(),
    []
  )

  return (
    <TodoAccordion
      query={query}
      title="Completed"
    />
  )
}

const InboxPageList: FC = () => {
  const todos = useLiveQuery(() =>
    db.todos.filter((todo) => !todo.completed).toArray()
  )

  if (!Array.isArray(todos)) {
    return <TodoListSkeleton />
  }

  return <TodoList todos={todos} />
}

const InboxPage: FC = () => (
  <TodoListPageWrapper title="Inbox">
    <CompletedTodos />
    <InboxPageList />
  </TodoListPageWrapper>
)

const Route = createFileRoute('/(todo)/inbox')({
  component: InboxPage,
})

export { Route }
