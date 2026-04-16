import { createFileRoute } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { TodoListPageWrapper } from '@/components/layout/todo-list-page-wraper'
import { TodoAccordion } from '@/components/todo/todo-accordion'
import { TodosComponent } from '@/components/todo/todo-render'
import { getTodayRange } from '@/lib/date'
import { db } from '@/lib/db'

const OverDueTasks: FC = () => {
  const query = useCallback(() => {
    const { startOfDay } = getTodayRange()
    return db.todos
      .where('dueDate')
      .below(startOfDay)
      .and((todo) => !todo.completed)
      .toArray()
  }, [])

  return (
    <TodoAccordion
      query={query}
      title="Over Due"
    />
  )
}

const UpcomingPageList: FC = () => {
  const query = useCallback(() => {
    const { endOfDay } = getTodayRange()
    return db.todos.where('dueDate').above(endOfDay).toArray()
  }, [])

  return <TodosComponent query={query} />
}

const UpcomingPage: FC = () => (
  <TodoListPageWrapper title="Upcoming">
    <OverDueTasks />
    <UpcomingPageList />
  </TodoListPageWrapper>
)

const Route = createFileRoute('/(todo)/upcoming')({
  component: UpcomingPage,
})

export { Route }
