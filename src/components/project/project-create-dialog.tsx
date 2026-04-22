import { type FC, type SubmitEvent } from 'react'
import { toast } from 'sonner'
import { useAppForm, useFieldContext } from '@/components/form/main'
import { FormBase } from '@/components/form/ui/base'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { addProject } from '@/services/project'

type ProjectCreateDialogPropsType = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateSuccess?: () => void
}

const emojiOptions = [
  '🎯',
  '📽️',
  '🏡',
  '💼',
  '🎨',
  '📚',
  '🏃',
  '🍳',
  '🎮',
  '🎵',
  '💻',
  '📱',
  '🚀',
  '⭐',
  '🔥',
  '💡',
  '🌟',
  '🎉',
  '📊',
  '🔧',
]

const IconSelector: FC = () => {
  const field = useFieldContext<string>()

  return (
    <FormBase label="Icon">
      <div className="grid grid-cols-10 gap-2">
        {emojiOptions.map((emoji) => (
          <Button
            className={cn(
              'h-10 w-10 text-xl p-0',
              field.state.value === emoji && 'ring-2 ring-primary'
            )}
            key={emoji}
            onClick={() => field.handleChange(emoji)}
            type="button"
            variant="outline"
          >
            {emoji}
          </Button>
        ))}
      </div>
    </FormBase>
  )
}

const ProjectCreateDialog: FC<ProjectCreateDialogPropsType> = ({
  open,
  onOpenChange,
  onCreateSuccess,
}) => {
  const {
    AppField,
    handleSubmit: submit,
    reset,
  } = useAppForm({
    defaultValues: {
      name: '',
      icon: '🎯',
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.name || value.name.trim().length === 0) {
          return {
            name: 'Project name is required',
          }
        }
        if (value.name.length > 50) {
          return {
            name: 'Project name must be less than 50 characters',
          }
        }
        return undefined
      },
    },
    onSubmit: async ({ value }) => {
      try {
        await addProject({
          name: value.name,
          icon: value.icon,
        })
        reset()
        onOpenChange(false)
        toast.success('Project created successfully')
        onCreateSuccess?.()
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
      onOpenChange={onOpenChange}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <AppField name="name">
            {({ Input }) => (
              <Input
                description="Give your project a name"
                label="Project Name"
                placeholder="My Project"
              />
            )}
          </AppField>

          <AppField name="icon">{() => <IconSelector />}</AppField>

          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { ProjectCreateDialog }
