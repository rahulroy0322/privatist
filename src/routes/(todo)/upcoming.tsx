import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC, useCallback, useMemo } from 'react'
import { TodoListPageWraper } from '@/components/layout/todo-list-page-wraper'
import { TodoFlatList } from '@/components/todo/todo-flat-list'
import { TodoListSkeleton } from '@/components/todo/todo-list'
import { TodosComponent } from '@/components/todo/todo-render'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getTodayRange } from '@/lib/date'
import { db } from '@/lib/db'

const OverDueTasks: FC = () => {
  const { startOfDay } = useMemo(() => getTodayRange(), [])
  const todos = useLiveQuery(() =>
    db.todos.where('dueDate').below(startOfDay).toArray()
  )

  return (
    <Accordion className="border-0 py-0">
      <AccordionItem className="bg-transparent!">
        <AccordionTrigger>Over Due ({todos?.length})</AccordionTrigger>
        <AccordionContent>
          {!Array.isArray(todos) ? (
            <TodoListSkeleton />
          ) : (
            <TodoFlatList todos={todos} />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
  <TodoListPageWraper title="Upcoming">
    <OverDueTasks />
    <UpcomingPageList />
  </TodoListPageWraper>
)

const Route = createFileRoute('/(todo)/upcoming')({
  component: UpcomingPage,
})

export { Route }
