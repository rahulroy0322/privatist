import { RiDeleteBinLine, RiEditLine } from '@remixicon/react'
import { Link } from '@tanstack/react-router'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ProjectType, TodoType } from '@/types'
import { ProjectStats } from './project-stats'

type ProjectCardPropsType = {
  project: ProjectType
  todos: TodoType[]
  onEdit: (project: ProjectType) => void
  onDelete: (project: ProjectType) => void
}

const ProjectCard: FC<ProjectCardPropsType> = ({
  project,
  todos,
  onEdit,
  onDelete,
}) => (
  <Link
    params={{ id: String(project.id) }}
    to="/project/$id"
  >
    <Card className="hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          {project.icon && <span className="text-3xl">{project.icon}</span>}
          <CardTitle>{project.name}</CardTitle>
        </div>
        <CardAction>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(project)
            }}
            size="icon-sm"
            variant="ghost"
          >
            <RiEditLine />
          </Button>
          <Button
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(project)
            }}
            size="icon-sm"
            variant="ghost"
          >
            <RiDeleteBinLine />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ProjectStats todos={todos} />
      </CardContent>
    </Card>
  </Link>
)

export { ProjectCard }
