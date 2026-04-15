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

const ToDayPageList: FC = () => {
  const query = useCallback(() => {
    const { startOfDay, endOfDay } = getTodayRange()
    return db.todos.where('dueDate').between(startOfDay, endOfDay).toArray()
  }, [])

  return <TodosComponent query={query} />
}

const ToDayPage: FC = () => (
  <TodoListPageWraper title="Today">
    <OverDueTasks />
    <ToDayPageList />
  </TodoListPageWraper>
)

const Route = createFileRoute('/(todo)/today')({
  component: ToDayPage,
})

export { Route }
