import { type FC } from 'react'
import type { TodoType } from '@/lib/types'
import { TodoItem } from './task-item'

type TaskFlatListPropsType = {
  todos: TodoType[]
}

const TaskFlatList: FC<TaskFlatListPropsType> = ({ todos }) => (
  <div className="space-y-2">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ))}
  </div>
)

export type { TaskFlatListPropsType }

export { TaskFlatList }
