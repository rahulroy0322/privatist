import { type FC } from 'react'
import type { TodoType } from '@/types'
import { TodoItem, TodoItemSkeleton } from './todo-item'

type TodoFlatListPropsType = {
  todos: TodoType[]
}

const TodoFlatList: FC<TodoFlatListPropsType> = ({ todos }) => (
  <div className="space-y-2">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
      />
    ))}
  </div>
)

type TodoFlatListSkeletonPropsType = {
  count?: number
}

const TodoFlatListSkeleton: FC<TodoFlatListSkeletonPropsType> = ({
  count = 5,
}) => (
  <div className="space-y-2">
    {Array.from({ length: count }).map((_, i) => (
      <TodoItemSkeleton key={i.toString()} />
    ))}
  </div>
)

export type { TodoFlatListPropsType, TodoFlatListSkeletonPropsType }

export { TodoFlatList, TodoFlatListSkeleton }
