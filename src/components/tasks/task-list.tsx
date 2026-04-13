import { RiInboxLine } from '@remixicon/react'
import { useMemo, type FC } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { TaskType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { TaskItem } from './task-item'

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
  onSelect?: (id: number) => void
  selectedTaskIds?: number[]
  showDragHandle?: boolean
  className?: string
  emptyMessage?: string
  filter?: TaskListFilterType
}

const TaskList: FC<TaskListPropsType> = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onSelect,
  selectedTaskIds = [],
  showDragHandle = false,
  className,
  emptyMessage = 'No tasks yet',
  filter = 'all',
}) => {
  const sections = useMemo(() => {
    const todayStart = new Date().setHours(0, 0, 0, 0)
    const todayEnd = todayStart + 86400000
    const tomorrowStart = todayStart + 86400000
    const tomorrowEnd = tomorrowStart + 86400000

    const today: TaskType[] = []
    const tomorrow: TaskType[] = []
    const upcoming: TaskType[] = []
    const noDate: TaskType[] = []
    const completed: TaskType[] = []

    tasks.forEach((task) => {
      if (task.completed) {
        completed.push(task)
        return
      }
      if (!task.dueDate) {
        noDate.push(task)
        return
      }
      const due = task.dueDate
      if (due >= todayStart && due < todayEnd) {
        today.push(task)
      } else if (due >= tomorrowStart && due < tomorrowEnd) {
        tomorrow.push(task)
      } else if (due > todayEnd) {
        upcoming.push(task)
      } else {
        // Past due but not completed
        today.push(task)
      }
    })

    return { today, tomorrow, upcoming, noDate, completed }
  }, [tasks])

  const hasTasks = tasks.length > 0

  const renderSection = (title: string, tasks: TaskType[], key: string) => {
    if (tasks.length === 0) return null
    return (
      <div
        className="space-y-2"
        key={key}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title} ({tasks.length})
        </h3>
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              isSelected={selectedTaskIds.includes(task.id!)}
              key={task.id}
              onDelete={onDelete}
              onEdit={onEdit}
              onSelect={onSelect}
              onToggleComplete={onToggleComplete}
              showDragHandle={showDragHandle}
              task={task}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderFlatList = (tasks: TaskType[]) => {
    if (tasks.length === 0) return null
    return (
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            isSelected={selectedTaskIds.includes(task.id!)}
            key={task.id}
            onDelete={onDelete}
            onEdit={onEdit}
            onSelect={onSelect}
            onToggleComplete={onToggleComplete}
            showDragHandle={showDragHandle}
            task={task}
          />
        ))}
      </div>
    )
  }

  return (
    <ScrollArea className={cn('h-full', className)}>
      <div className="space-y-6 p-4">
        {!hasTasks ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <RiInboxLine className="mb-4 size-12 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Create your first task to get started
            </p>
          </div>
        ) : filter === 'all' ? (
          <>
            {renderSection('Today', sections.today, 'today')}
            {renderSection('Tomorrow', sections.tomorrow, 'tomorrow')}
            {renderSection('Upcoming', sections.upcoming, 'upcoming')}
            {renderSection('No Date', sections.noDate, 'no-date')}
            {renderSection('Completed', sections.completed, 'completed')}
          </>
        ) : (
          renderFlatList(tasks)
        )}
      </div>
    </ScrollArea>
  )
}

export {
  TaskList
}