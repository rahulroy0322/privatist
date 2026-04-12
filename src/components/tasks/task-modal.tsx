import {
  RiCalendarLine,
  RiCloseLine,
  RiFolderLine,
  RiHashtag,
} from '@remixicon/react'
import { format } from 'date-fns'
import { useEffect, useState, type FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { TaskType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { PriorityBadge } from './priority-badge'

type TaskModalPropsType= {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: TaskType | null
  onSubmit: (data: TaskFormDataType) => void
}

type TaskFormDataType = {
  title: string
  description: string
  priority: 1 | 2 | 3 | 4
  dueDate: Date | null
  projectId: string | null
  labelIds: string[]
}

const priorityOptions = [
  { value: 1, label: 'P1 - Critical', color: 'destructive' },
  { value: 2, label: 'P2 - Alert', color: 'warning' },
  { value: 3, label: 'P3 - Elevated', color: 'primary' },
  { value: 4, label: 'P4 - Standby', color: 'muted' },
]

const mockProjects = [
  { id: 'personal', name: 'Personal', color: 'bg-blue-500' },
  { id: 'work', name: 'Work', color: 'bg-green-500' },
  { id: 'shopping', name: 'Shopping', color: 'bg-purple-500' },
]

const mockLabels = [
  { id: 'important', name: 'Important', color: 'bg-red-500' },
  { id: 'waiting', name: 'Waiting', color: 'bg-orange-500' },
  { id: 'meeting', name: 'Meeting', color: 'bg-indigo-500' },
]

const  TaskModal:FC<TaskModalPropsType>=({
  open,
  onOpenChange,
  task,
  onSubmit,
})=> {
  const [formData, setFormData] = useState<TaskFormDataType>({
    title: '',
    description: '',
    priority: 4,
    dueDate: null,
    projectId: null,
    labelIds: [],
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        projectId: task.projectId || null,
        labelIds: task.labelIds || [],
      })
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 4,
        dueDate: null,
        projectId: null,
        labelIds: [],
      })
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
  }

  const handlePriorityChange = (value: string | null) => {
    if (value) {
      setFormData({ ...formData, priority: parseInt(value) as 1 | 2 | 3 | 4 })
    }
  }

  const handleProjectChange = (value: string | null) => {
    setFormData({ ...formData, projectId: value || null })
  }

  const toggleLabel = (labelId: string) => {
    setFormData((prev) => ({
      ...prev,
      labelIds: prev.labelIds.includes(labelId)
        ? prev.labelIds.filter((id) => id !== labelId)
        : [...prev.labelIds, labelId],
    }))
  }

  const quickDueDates = [
    { label: 'Today', date: new Date() },
    { label: 'Tomorrow', date: new Date(Date.now() + 86400000) },
    { label: 'Next week', date: new Date(Date.now() + 7 * 86400000) },
    { label: 'No date', date: null },
  ]

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                autoFocus
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="What needs to be done?"
                required
                value={formData.title}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add details (optional)"
                rows={3}
                value={formData.description}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  onValueChange={handlePriorityChange}
                  value={formData.priority.toString()}
                >
                  <SelectTrigger>
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority={formData.priority} />
                        <span>
                          {
                            priorityOptions.find(
                              (p) => p.value === formData.priority
                            )?.label
                          }
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        <div className="flex items-center gap-2">
                          <PriorityBadge
                            priority={option.value as 1 | 2 | 3 | 4}
                          />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <div className="flex flex-col gap-2">
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        className="justify-start"
                        variant="outline"
                      >
                        <RiCalendarLine className="mr-2 size-4" />
                        {formData.dueDate ? (
                          format(formData.dueDate, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                    >
                      <Calendar
                        autoFocus
                        mode="single"
                        onSelect={(date) =>
                          setFormData({ ...formData, dueDate: date || null })
                        }
                        selected={formData.dueDate || undefined}
                      />
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-wrap gap-2">
                    {quickDueDates.map((quick) => (
                      <Button
                        key={quick.label}
                        onClick={() =>
                          setFormData({ ...formData, dueDate: quick.date })
                        }
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        {quick.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Project</label>
                <Select
                  onValueChange={handleProjectChange}
                  value={formData.projectId || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="No project">
                      {formData.projectId ? (
                        <div className="flex items-center gap-2">
                          <RiFolderLine className="size-4" />
                          <span>
                            {
                              mockProjects.find(
                                (p) => p.id === formData.projectId
                              )?.name
                            }
                          </span>
                        </div>
                      ) : (
                        'No project'
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No project</SelectItem>
                    {mockProjects.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={project.id}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`size-2 rounded-full ${project.color}`}
                          />
                          <span>{project.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Labels */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Labels</label>
                <div className="flex flex-wrap gap-2">
                  {mockLabels.map((label) => {
                    const isSelected = formData.labelIds.includes(label.id)
                    return (
                      <Badge
                        className={cn(
                          'cursor-pointer gap-1',
                          isSelected && 'border-transparent'
                        )}
                        key={label.id}
                        onClick={() => toggleLabel(label.id)}
                        style={{
                          backgroundColor: isSelected
                            ? label.color.replace('bg-', '')
                            : undefined,
                        }}
                        variant={isSelected ? 'default' : 'outline'}
                      >
                        <RiHashtag className="size-3" />
                        {label.name}
                        {isSelected && (
                          <RiCloseLine
                            className="ml-1 size-3"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLabel(label.id)
                            }}
                          />
                        )}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export{
  TaskModal
}