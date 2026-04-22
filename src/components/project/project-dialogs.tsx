import { type FC } from 'react'
import type { ProjectType } from '@/types'
import { ProjectCreateDialog } from './project-create-dialog'
import { ProjectDeleteDialog } from './project-delete-dialog'
import { ProjectEditDialog } from './project-edit-dialog'

type ProjectDialogsPropsType = {
  createDialogOpen: boolean
  editDialogOpen: boolean
  deleteDialogOpen: boolean
  selectedProject: ProjectType | null
  onCreateSuccess: () => void
  onDeleteSuccess: () => void
  onCreateOpenChange: (open: boolean) => void
  onEditOpenChange: (open: boolean) => void
  onDeleteOpenChange: (open: boolean) => void
}

const ProjectDialogs: FC<ProjectDialogsPropsType> = ({
  createDialogOpen,
  editDialogOpen,
  deleteDialogOpen,
  selectedProject,
  onCreateSuccess,
  onDeleteSuccess,
  onCreateOpenChange,
  onEditOpenChange,
  onDeleteOpenChange,
}) => {
  return (
    <>
      <ProjectCreateDialog
        onCreateSuccess={onCreateSuccess}
        onOpenChange={onCreateOpenChange}
        open={createDialogOpen}
      />
      {selectedProject && (
        <>
          <ProjectEditDialog
            onOpenChange={onEditOpenChange}
            open={editDialogOpen}
            project={selectedProject}
          />
          <ProjectDeleteDialog
            onDeleteSuccess={onDeleteSuccess}
            onOpenChange={onDeleteOpenChange}
            open={deleteDialogOpen}
            project={selectedProject}
          />
        </>
      )}
    </>
  )
}

export { ProjectDialogs }
