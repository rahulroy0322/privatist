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

const ToDayPageList: FC = () => {
  const query = useCallback(() => {
    const { startOfDay, endOfDay } = getTodayRange()
    return db.todos.where('dueDate').between(startOfDay, endOfDay).toArray()
  }, [])

  return <TodosComponent query={query} />
}

const ToDayPage: FC = () => (
  <TodoListPageWrapper title="Today">
    <OverDueTasks />
    <ToDayPageList />
  </TodoListPageWrapper>
)

const Route = createFileRoute('/(todo)/today')({
  component: ToDayPage,
})

export { Route }
