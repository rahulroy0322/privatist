import { RiDeleteBinLine, RiEditLine } from '@remixicon/react'
import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProjectType, TodoType } from '@/types'
import { ProjectStats } from './project-stats'

type ProjectHeaderPropsType = {
  project: ProjectType
  todos: TodoType[]
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

const ProjectHeader: FC<ProjectHeaderPropsType> = ({
  project,
  todos,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-40 bg-background border-b border-border px-5 py-4',
        className
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {project.icon && (
                <span
                  aria-label="Project icon"
                  className="text-2xl"
                  role="img"
                >
                  {project.icon}
                </span>
              )}
              <h1 className="text-2xl font-semibold truncate">
                {project.name}
              </h1>
            </div>
            <ProjectStats todos={todos} />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onEdit && (
              <Button
                aria-label="Edit project"
                onClick={onEdit}
                size="icon"
                variant="ghost"
              >
                <RiEditLine className="size-5" />
              </Button>
            )}
            {onDelete && (
              <Button
                aria-label="Delete project"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onDelete}
                size="icon"
                variant="ghost"
              >
                <RiDeleteBinLine className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProjectHeader }
