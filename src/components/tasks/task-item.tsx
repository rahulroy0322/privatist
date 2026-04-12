import {
  RiCalendarLine,
  RiDeleteBinLine,
  RiDragMove2Line,
  RiMoreLine,
  RiPencilLine,
} from '@remixicon/react'
import { format } from 'date-fns'
import { useState, type FC } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { TaskType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PriorityBadge } from './priority-badge'

type TaskItemPropsType = {
  task: TaskType
  onToggleComplete?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  isSelected?: boolean
  onSelect?: (id: number) => void
  showDragHandle?: boolean
  className?: string
}

const TaskItem: FC<TaskItemPropsType> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  isSelected = false,
  onSelect,
  showDragHandle = false,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleToggle = () => {
    if (onToggleComplete && task.id !== undefined) {
      onToggleComplete(task.id)
    }
  }

  const handleEdit = () => {
    if (onEdit && task.id !== undefined) {
      onEdit(task.id)
    }
  }

  const handleDelete = () => {
    if (onDelete && task.id !== undefined) {
      onDelete(task.id)
    }
  }

  const handleSelect = () => {
    if (onSelect && task.id !== undefined) {
      onSelect(task.id)
    }
  }

  const dueDateText = task.dueDate
    ? format(new Date(task.dueDate), 'MMM d')
    : null

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50',
        isSelected && 'ring-2 ring-ring',
        className
      )}
      onClick={handleSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag handle (only visible on hover) */}
      {showDragHandle && (
        <div
          className={cn(
            'cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100',
            isHovered && 'opacity-100'
          )}
        >
          <RiDragMove2Line size={16} />
        </div>
      )}

      {/* Checkbox */}
      <Checkbox
        checked={task.completed}
        className="h-5 w-5 rounded-full border-2"
        onCheckedChange={handleToggle}
        style={{
          borderColor: task.completed ? 'transparent' : undefined,
        }}
      />

      {/* Task content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              'text-sm font-medium',
              task.completed && 'line-through text-muted-foreground'
            )}
          >
            {task.title}
          </p>
          <PriorityBadge
            priority={task.priority}
            showLabel={false}
          />
        </div>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2">
          {dueDateText && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <RiCalendarLine size={12} />
                    <span>{dueDateText}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Due {format(new Date(task.dueDate!), 'PPP')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {/* Placeholder for project/label badges */}
        </div>
      </div>

      {/* Actions (visible on hover) */}
      <div
        className={cn(
          'flex items-center gap-1 opacity-0 transition-opacity',
          isHovered && 'opacity-100'
        )}
      >
        <Button
          className="h-7 w-7"
          onClick={handleEdit}
          size="icon"
          variant="ghost"
        >
          <RiPencilLine size={14} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="h-7 w-7"
                size="icon"
                variant="ghost"
              >
                <RiMoreLine size={14} />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <RiPencilLine
                className="mr-2"
                size={14}
              />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleDelete}
            >
              <RiDeleteBinLine
                className="mr-2"
                size={14}
              />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}


export {
  TaskItem
}