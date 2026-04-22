import { type FC } from 'react'
import type { ProjectType, TodoType } from '@/types'
import { ProjectCard } from './project-card'

type ProjectsGridPropsType = {
  projects: Array<{ project: ProjectType; todos: TodoType[] }>
  onEdit: (project: ProjectType) => void
  onDelete: (project: ProjectType) => void
}

const ProjectsGrid: FC<ProjectsGridPropsType> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map(({ project, todos: projectTodos }) => (
        <ProjectCard
          key={project.id}
          onDelete={onDelete}
          onEdit={onEdit}
          project={project}
          todos={projectTodos}
        />
      ))}
    </div>
  )
}

export { ProjectsGrid }
