import { RiCalendarLine } from '@remixicon/react'
import { format } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC, type SubmitEvent, useMemo } from 'react'
import { toast } from 'sonner'
import { useAppForm, useFieldContext } from '@/components/form/main'
import { FormBase } from '@/components/form/ui/base'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SelectItem } from '@/components/ui/select'
import { db } from '@/lib/db'
import { cn } from '@/lib/utils'
import { type CreateTodoInputType, createTodoSchema } from '@/schema/todo'
import { addTodo, updateTodo } from '@/services/todo'
import {
  closeTodoModel,
  setTodoModelOpen,
  useTodoModel,
} from '@/stores/todo-model'
import { PrioritySelect } from './priority-select'

const DueDate: FC = () => {
  const field = useFieldContext<number | null>()

  const date = field.state.value
  const quickDueDates = useMemo(
    () => [
      { label: 'Today', date: new Date() },
      { label: 'Tomorrow', date: new Date(Date.now() + 86400000) },
      { label: 'Next week', date: new Date(Date.now() + 7 * 86400000) },
      { label: 'No date', date: null },
    ],
    []
  )

  return (
    <FormBase label={'Due Date'}>
      <Popover>
        <PopoverTrigger render={<Button variant={'outline'} />}>
          <RiCalendarLine
            className="size-4"
            type="button"
          />
          <span className={cn('text-sm', { 'text-muted-foreground': !date })}>
            {date ? format(new Date(date), 'MMM d, yyyy') : 'Pick a date'}
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto p-0"
        >
          <Calendar
            autoFocus
            mode="single"
            onSelect={(date) => field.handleChange(date?.getTime() || null)}
            selected={date ? new Date(date) : undefined}
          />

          <div className="grid grid-cols-3 gap-1">
            {quickDueDates.map((quick) => (
              <Button
                key={quick.label}
                onClick={() =>
                  field.handleChange(quick.date?.getTime() || null)
                }
                size="xs"
                type="button"
                variant="ghost"
              >
                {quick.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </FormBase>
  )
}

const TodoModal: FC = () => {
  const { open, todo } = useTodoModel()

  // Fetch all projects from database
  const projects = useLiveQuery(() => db.projects.toArray(), [])

  const {
    AppField,
    handleSubmit: submit,
    reset,
  } = useAppForm({
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || undefined,
      priority: todo?.priority || 4,
      dueDate: todo?.dueDate || undefined,
      projectId: todo?.projectId || undefined,
      parentId: todo?.parentId || undefined,
    } satisfies CreateTodoInputType as CreateTodoInputType,
    validators: {
      onSubmit: createTodoSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (todo?.id) {
          await updateTodo(todo.id, value)
        } else {
          await addTodo(value)
        }

        reset()
        closeTodoModel()
      } catch (e) {
        let err: Error = e instanceof Error ? e : new Error(String(e))
        toast.error(`Error(${err.name}): ${err.message}`)
      }
    },
  })

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <Dialog
      onOpenChange={setTodoModelOpen}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{todo?.id ? 'Update' : 'Create New'} Todo</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <AppField name="title">
            {({ Input }) => (
              <Input
                description="What needs to be done?"
                label="Todo"
                placeholder="Read Geography Chapter 2 Page 15"
              />
            )}
          </AppField>

          <AppField name="description">
            {({ Textarea }) => (
              <Textarea
                description="Add details..."
                label="Description"
                placeholder="Read Geography Page 15 make note no it"
              />
            )}
          </AppField>

          <div className="grid grid-cols-3 gap-2">
            <AppField name="priority">
              {() => <PrioritySelect label="Priority" />}
            </AppField>

            <AppField name="dueDate">{() => <DueDate />}</AppField>

            <AppField name="projectId">
              {({ Select }) => (
                <Select
                  label="Project"
                  placeholder="No Project"
                >
                  <SelectItem value={null}>No project</SelectItem>
                  {projects?.map((project) => (
                    <SelectItem
                      className="transition-colors hover:bg-accent"
                      key={project.id}
                      value={project.id}
                    >
                      <div className="flex items-center gap-2">
                        {project.icon && (
                          <span className="text-sm">{project.icon}</span>
                        )}
                        <span>{project.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              )}
            </AppField>
          </div>

          <Button type="submit">{todo?.id ? 'Update' : 'Create'} Todo</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { TodoModal }
