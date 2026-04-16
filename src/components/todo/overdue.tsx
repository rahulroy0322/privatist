import { type FC, useCallback } from 'react'
import { TodoAccordion } from '@/components/todo/todo-accordion'
import { getTodayRange } from '@/lib/date'
import { db } from '@/lib/db'

const overdueTodosQueryFn = () => {
  const { startOfDay } = getTodayRange()
  return db.todos
    .where('dueDate')
    .below(startOfDay)
    .and((todo) => !todo.completed)
    .toArray()
}

const OverDueTodos: FC = () => {
  const query = useCallback(overdueTodosQueryFn, [])

  return (
    <TodoAccordion
      query={query}
      title="Over Due"
    />
  )
}

export { OverDueTodos, overdueTodosQueryFn }
