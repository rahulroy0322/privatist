import { RiAlarmLine, RiCheckLine, RiTimeLine } from '@remixicon/react'
import { type FC } from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { TodoType } from '@/types'

type ProjectStatsPropsType = {
  todos: TodoType[]
  className?: string
}

const ProjectStats: FC<ProjectStatsPropsType> = ({ todos, className }) => {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = todos.filter((t) => !t.completed).length
  const overdue = todos.filter(
    (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length

  const progress = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <RiTimeLine className="size-4" />
          <span>{total} tasks</span>
        </div>
        <div className="flex items-center gap-1.5 text-primary">
          <RiCheckLine className="size-4" />
          <span>{completed} done</span>
        </div>
        {overdue > 0 && (
          <div className="flex items-center gap-1.5 text-destructive">
            <RiAlarmLine className="size-4" />
            <span>{overdue} overdue</span>
          </div>
        )}
        {pending > 0 && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span>{pending} pending</span>
          </div>
        )}
      </div>
      {total > 0 && (
        <Progress
          className="h-2"
          value={progress}
        />
      )}
    </div>
  )
}

export { ProjectStats }
