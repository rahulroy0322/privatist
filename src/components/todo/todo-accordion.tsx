import { useLiveQuery } from 'dexie-react-hooks'
import { type FC } from 'react'
import { TodoFlatList } from '@/components/todo/todo-flat-list'
import { TodoListSkeleton } from '@/components/todo/todo-list'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { TodoType } from '@/lib/types'

type TodoAccordionPropsType = {
  title: string
  query: () => Promise<TodoType[] | undefined>
}

const TodoAccordion: FC<TodoAccordionPropsType> = ({ title, query }) => {
  const todos = useLiveQuery(query)

  return (
    <Accordion className="border-0 py-0">
      <AccordionItem className="bg-transparent!">
        <AccordionTrigger>
          {title} ({todos?.length})
        </AccordionTrigger>
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

export { TodoAccordion }
