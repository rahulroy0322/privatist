import { createFileRoute } from '@tanstack/react-router'
import { type FC, useCallback } from 'react'
import { TodoListPageWrapper } from '@/components/layout/todo-list-page-wrapper'
import { overdueTodosQueryFn } from '@/components/todo/overdue'
import { TodosComponent } from '@/components/todo/todo-render'

const OverduePageList: FC = () => {
  const query = useCallback(overdueTodosQueryFn, [])

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
