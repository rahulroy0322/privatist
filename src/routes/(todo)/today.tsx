import { createFileRoute } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { TodoListPageWrapper } from '@/components/layout/todo-list-page-wrapper'
import { OverDueTodos } from '@/components/todo/overdue'
import { TodosComponent } from '@/components/todo/todo-render'
import { getTodayRange } from '@/lib/date'
import { db } from '@/lib/db'

const ToDayPageList: FC = () => {
  const query = useCallback(() => {
    const { startOfDay, endOfDay } = getTodayRange()
    return db.todos.where('dueDate').between(startOfDay, endOfDay).toArray()
  }, [])

  return <TodosComponent query={query} />
}

const ToDayPage: FC = () => (
  <TodoListPageWrapper title="Today">
    <OverDueTodos />
    <ToDayPageList />
  </TodoListPageWrapper>
)

const Route = createFileRoute('/(todo)/today')({
  component: ToDayPage,
})

export { Route }
