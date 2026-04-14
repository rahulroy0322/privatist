import { type FC } from 'react'
import type { TaskType } from '@/lib/types'
import { TaskItem } from './task-item'

type TaskFlatListPropsType = {
  tasks: TaskType[]
  onToggleComplete?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const TaskFlatList: FC<TaskFlatListPropsType> = ({
  tasks,
  onDelete,
  onEdit,
  onToggleComplete,
}) => (
  <div className="space-y-2">
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggleComplete={onToggleComplete}
        task={task}
      />
    ))}
  </div>
)

export type { TaskFlatListPropsType }

export { TaskFlatList }
