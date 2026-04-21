import { RiAlertLine } from '@remixicon/react'
import { type FC } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { deleteProject } from '@/services/project'
import type { ProjectType } from '@/types'

type ProjectDeleteDialogPropsType = {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: ProjectType
  onDeleteSuccess?: () => void
}

const ProjectDeleteDialog: FC<ProjectDeleteDialogPropsType> = ({
  open,
  onOpenChange,
  project,
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    try {
      await deleteProject(project.id)
      onOpenChange(false)
      toast.success('Project deleted successfully')
      onDeleteSuccess?.()
    } catch (e) {
      let err: Error = e instanceof Error ? e : new Error(String(e))
      toast.error(`Error(${err.name}): ${err.message}`)
    }
  }

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{project.name}"? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <RiAlertLine className="size-5 text-destructive shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-destructive mb-1">
              Warning: This will delete all tasks in this project
            </p>
            <p className="text-muted-foreground">
              All todos associated with this project will be permanently
              removed.
            </p>
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
          <Button
            onClick={handleDelete}
            variant="destructive"
          >
            Delete Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProjectDeleteDialog }
