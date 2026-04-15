import { createFileRoute } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { TodoListPageWraper } from '@/components/layout/todo-list-page-wraper'
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
  <TodoListPageWraper title="OverDue">
    <UpcomingPageList />
  </TodoListPageWraper>
)

const Route = createFileRoute('/(todo)/overdue')({
  component: UpcomingPage,
})

export { Route }
