import { createFileRoute } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { TodoListPageWrapper } from '@/components/layout/todo-list-page-wrapper'
import { OverDueTodos } from '@/components/todo/overdue'
import { TodosComponent } from '@/components/todo/todo-render'
import { getTodayRange } from '@/lib/date'
import { db } from '@/lib/db'

const UpcomingPageList: FC = () => {
  const query = useCallback(() => {
    const { endOfDay } = getTodayRange()
    return db.todos.where('dueDate').above(endOfDay).toArray()
  }, [])

  return <TodosComponent query={query} />
}

const UpcomingPage: FC = () => (
  <TodoListPageWrapper title="Upcoming">
    <OverDueTodos />
    <UpcomingPageList />
  </TodoListPageWrapper>
)

const Route = createFileRoute('/(todo)/upcoming')({
  component: UpcomingPage,
})

export { Route }
