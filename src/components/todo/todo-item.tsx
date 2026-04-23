import {
  RiCalendarLine,
  RiDeleteBinLine,
  RiMoreLine,
  RiPencilLine,
} from '@remixicon/react'
import {
  differenceInCalendarDays,
  format,
  isPast,
  isToday,
  isTomorrow,
  startOfDay,
} from 'date-fns'
import { type FC, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { deleteTodo, toggleTodo } from '@/services/todo'
import { setTodoModelOpen, setTodotoEdit } from '@/stores/todo-model'
import type { TodoType } from '@/types'

type TodoDatePropsType = Pick<TodoType, 'dueDate'>

const TodoDate: FC<TodoDatePropsType> = ({ dueDate }) => {
  const dateInfo = useMemo((): null | {
    text: string
    type: 'toDay' | 'tomorrow' | 'upComming' | 'overdue'
    date: Date
  } => {
    if (!dueDate) {
      return null
    }
    const date = new Date(dueDate)
    const dueStart = startOfDay(date)

    if (isToday(date)) {
      return {
        text: 'Today',
        type: 'toDay',
        date,
      }
    }
    if (isTomorrow(date)) {
      return { text: 'Tomorrow', type: 'tomorrow', date }
    }

    const diffDays = differenceInCalendarDays(date, new Date())
    if (diffDays >= 0 && diffDays < 7) {
      // Within next week, show day name
      return { text: format(date, 'EEEE'), type: 'upComming', date }
    }
    // Further future or past
    const isOverdue = isPast(dueStart) && !isToday(date)
    return {
      text: format(date, 'MMM d'),
      type: isOverdue ? 'overdue' : 'upComming',
      date,
    }
  }, [dueDate])

  if (!dateInfo) {
    return null
  }

  const { date, text, type } = dateInfo

  return (
    <time
      aria-label={text}
      className={cn('text-xs flex gap-1 items-center', {
        'text-teal-600': type === 'toDay',
        'text-amber-600': type === 'tomorrow',
        'text-cyan-600': type === 'upComming',
        'text-destructive': type === 'overdue',
      })}
      dateTime={date.toISOString()}
    >
      <RiCalendarLine className="size-3" />
      <span>{text}</span>
    </time>
  )
}

type TodoItemPropsType = {
  todo: TodoType
}

const TodoItem: FC<TodoItemPropsType> = ({ todo }) => {
  const { dueDate, id, completed, priority, description, title } = todo

  const handleToggle = () => {
    if (id !== undefined) {
      toggleTodo(id)
    }
  }

  const handleEdit = () => {
    setTodoModelOpen(true)
    setTodotoEdit(todo)
  }

  const handleDelete = () => {
    if (id !== undefined) {
      deleteTodo(id)
    }
  }

  return (
    <article
      className={cn(
        'group flex gap-2 p-1 pl-2 w-full border-b last:border-b-0 border-l-3',
        {
          'border-l-destructive': priority === 1,
          'border-l-amber-500': priority === 2,
          'border-l-primary': priority === 3,
          'border-l-muted': priority === 4,
        }
      )}
      onDoubleClick={handleEdit}
    >
      <Checkbox
        aria-label={`toggle ${todo.title}`}
        checked={completed}
        className={cn('size-3 rounded-full bg-transparent ring', {
          'text-destructive data-checked:bg-destructive!': priority === 1,
          'text-amber-500 data-checked:bg-amber-500!': priority === 2,
          'text-primary data-checked:bg-primary!': priority === 3,
          'text-muted data-checked:bg-muted!': priority === 4,
        })}
        onCheckedChange={handleToggle}
      />
      <div className="grow">
        <h3
          className={cn('text-sm font-medium line-clamp-1', {
            'line-through': completed,
          })}
        >
          {title}
        </h3>
        {description ? (
          <h4 className="text-xs text-muted-foreground line-clamp-1">
            {description}
          </h4>
        ) : null}
        <TodoDate dueDate={dueDate} />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              aria-label={`Action ${todo.title}`}
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
    </article>
  )
}

const TodoItemSkeleton: FC = () => (
  <div className="flex gap-2 p-1 pl-2 w-full border-b last:border-b-0 border-l-3">
    <Skeleton className="size-4 rounded-full" />
    <div className="grow space-y-1">
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-2 w-2/4" />
      <Skeleton className="h-1.5 w-4" />
    </div>
  </div>
)

export { TodoItem, TodoItemSkeleton }
