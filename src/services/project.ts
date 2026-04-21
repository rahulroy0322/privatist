import { db } from '@/lib/db'
import type { ProjectType } from '@/types'

const addProject = async (projectData: Pick<ProjectType, 'name' | 'icon'>) => {
    const now = Date.now()
    const newProject: ProjectType = {
      ...projectData,
      id: now,
      createdAt: now,
      updatedAt: now,
    }
    return db.projects.add(newProject)
  },
  updateProject = async (id: number, updates: Partial<ProjectType>) => {
    const now = Date.now()
    const updatedProject = {
      ...updates,
      updatedAt: now,
    }
    return db.projects.update(id, updatedProject)
  },
  deleteProject = async (id: number) => db.projects.delete(id)

export { addProject, deleteProject, updateProject }
