import { createFileRoute } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { TodoListPageWrapper } from '@/components/layout/todo-list-page-wraper'
import { TodosComponent } from '@/components/todo/todo-render'
import { getTodayRange } from '@/lib/date'
import { db } from '@/lib/db'

const OverduePageList: FC = () => {
  const query = useCallback(() => {
    const { startOfDay } = getTodayRange()
    return db.todos
      .where('dueDate')
      .below(startOfDay)
      .and((todo) => !todo.completed)
      .toArray()
  }, [])

  return <TodosComponent query={query} />
}

const OverduePage: FC = () => (
  <TodoListPageWrapper title="OverDue">
    <OverduePageList />
  </TodoListPageWrapper>
)

const Route = createFileRoute('/(todo)/overdue')({
  component: OverduePage,
})

export { Route }
