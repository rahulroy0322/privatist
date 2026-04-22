import { RiFolderLine } from '@remixicon/react'
import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

type ProjectEmptyStatePropsType = {
  onCreateProject: () => void
}

const ProjectEmptyState: FC<ProjectEmptyStatePropsType> = ({
  onCreateProject,
}) => {
  return (
    <div className="mt-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RiFolderLine className="size-5" />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            Create your first project to start organizing your tasks
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={onCreateProject}>Create Project</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export { ProjectEmptyState }
