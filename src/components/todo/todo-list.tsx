import { RiInboxLine } from '@remixicon/react'
import { type FC } from 'react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { TodoType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { setTodoModelOpen } from '@/stores/todo-model'
import { Button } from '../ui/button'
import {
  TodoFlatList,
  TodoFlatListSkeleton,
  type TodoFlatListSkeletonPropsType,
} from './todo-flat-list'

type TodoListPropsType = {
  todos: TodoType[]
  className?: string
  emptyMessage?: string
}

const TodoList: FC<TodoListPropsType> = ({
  todos,
  className,
  emptyMessage = 'No todos yet',
}) => {
  const hasTodos = todos.length > 0

  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="space-y-6 p-4">
        {!hasTodos ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia
                className="bg-transparent"
                variant="icon"
              >
                <RiInboxLine className="size-12" />
              </EmptyMedia>
              <EmptyTitle>{emptyMessage}</EmptyTitle>
              <EmptyDescription>
                Create your first todo to get started
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => setTodoModelOpen(true)}>Add data</Button>
            </EmptyContent>
          </Empty>
        ) : (
          <TodoFlatList todos={todos} />
        )}
      </div>
    </ScrollArea>
  )
}

const TodoListSkeleton: FC<TodoFlatListSkeletonPropsType> = (props) => (
  <div className="space-y-6 p-4">
    <TodoFlatListSkeleton {...props} />
  </div>
)

export { TodoList, TodoListSkeleton }
