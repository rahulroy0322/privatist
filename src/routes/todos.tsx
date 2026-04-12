import { createFileRoute } from '@tanstack/react-router'
import type { FC } from 'react'

const TodosPage: FC = () => <div>Hello "/todos"!</div>

const Route = createFileRoute('/todos')({
  component: TodosPage,
})

export { Route }
