import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC } from 'react'
import { Fab } from '@/components/fab'
import { TaskList } from '@/components/tasks/task-list'
import { db } from '@/lib/db'
import { openTodoModel } from '@/stores/todo-model'

const TodosPageList: FC = () => {
  const todos = useLiveQuery(() => db.todos?.toArray())

  if (!todos) {
    // ! TODO as scaliton
    return null
  }

  return <TaskList todos={todos} />
}

const TodosPage: FC = () => (
  <div className="border-t">
    <h2 className="sticky z-40 top-0 bg-background container mx-auto px-5 py-2">
      Inbox
    </h2>
    <div className="container mx-auto p-5">
      <TodosPageList />
    </div>
    <Fab onClick={openTodoModel} />
  </div>
)

const Route = createFileRoute('/(base)/todos')({
  component: TodosPage,
})

export { Route }
