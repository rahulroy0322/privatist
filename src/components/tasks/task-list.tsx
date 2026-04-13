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
import type { TaskType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { TaskFlatList } from './task-flat-list'

type TaskListFilterType =
  | 'all'
  | 'today'
  | 'tomorrow'
  | 'upcoming'
  | 'completed'
  | 'no-date'

type TaskListPropsType = {
  tasks: TaskType[]
  onToggleComplete?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  className?: string
  emptyMessage?: string
  filter?: TaskListFilterType
}

const TaskList: FC<TaskListPropsType> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  className,
  emptyMessage = 'No tasks yet',
  filter = 'all',
}) => {
  const hasTasks = tasks.length > 0

  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="space-y-6 p-4">
        {!hasTasks ? (
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
                Create your first task to get started
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Add data</Button>
            </EmptyContent>
          </Empty>
        ) : filter === 'all' ? (
          <TaskFlatList
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleComplete={onToggleComplete}
            tasks={tasks}
          />
        ) : (
          <TaskFlatList
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleComplete={onToggleComplete}
            tasks={tasks}
          />
        )}
      </div>
    </ScrollArea>
  )
}

export { TaskList }
