import { beforeEach, describe, expect, it, vi } from 'vitest'
import { addProject, deleteProject, updateProject } from '@/services/project'
import type { ProjectType } from '@/types'

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    projects: {
      add: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

describe('Project Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('addProject', () => {
    it('should add a new project with correct structure', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.add).mockResolvedValue(1234567890)

      const projectData = {
        name: 'Test Project',
        icon: '📁',
      }

      await addProject(projectData)

      expect(db.projects.add).toHaveBeenCalledTimes(1)
      const addedProject = vi.mocked(db.projects.add).mock
        .calls[0][0] as ProjectType

      expect(addedProject.name).toBe(projectData.name)
      expect(addedProject.icon).toBe(projectData.icon)
      expect(typeof addedProject.id).toBe('number')
      expect(typeof addedProject.createdAt).toBe('number')
      expect(typeof addedProject.updatedAt).toBe('number')
    })

    it('should add a project with different icon types', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.add).mockResolvedValue(1234567890)

      const projectData = {
        name: 'Work Project',
        icon: '💼',
      }

      await addProject(projectData)

      expect(db.projects.add).toHaveBeenCalledTimes(1)
      const addedProject = vi.mocked(db.projects.add).mock
        .calls[0][0] as ProjectType

      expect(addedProject.name).toBe(projectData.name)
      expect(addedProject.icon).toBe(projectData.icon)
    })

    it('should add a project with emoji icon', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.add).mockResolvedValue(1234567890)

      const projectData = {
        name: 'Personal',
        icon: '🏠',
      }

      await addProject(projectData)

      expect(db.projects.add).toHaveBeenCalledTimes(1)
      const addedProject = vi.mocked(db.projects.add).mock
        .calls[0][0] as ProjectType

      expect(addedProject.name).toBe(projectData.name)
      expect(addedProject.icon).toBe(projectData.icon)
    })
  })

  describe('updateProject', () => {
    it('should update a project with provided fields', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.update).mockResolvedValue(1)

      const updates: Partial<ProjectType> = {
        name: 'Updated Project Name',
        icon: '📊',
      }

      await updateProject(123, updates)

      expect(db.projects.update).toHaveBeenCalledTimes(1)
      expect(db.projects.update).toHaveBeenCalledWith(123, {
        name: 'Updated Project Name',
        icon: '📊',
        updatedAt: expect.any(Number),
      })
    })

    it('should update only the name', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.update).mockResolvedValue(1)

      const updates: Partial<ProjectType> = {
        name: 'New Name',
      }

      await updateProject(123, updates)

      expect(db.projects.update).toHaveBeenCalledTimes(1)
      expect(db.projects.update).toHaveBeenCalledWith(123, {
        name: 'New Name',
        updatedAt: expect.any(Number),
      })
    })

    it('should update only the icon', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.update).mockResolvedValue(1)

      const updates: Partial<ProjectType> = {
        icon: '🎯',
      }

      await updateProject(123, updates)

      expect(db.projects.update).toHaveBeenCalledTimes(1)
      expect(db.projects.update).toHaveBeenCalledWith(123, {
        icon: '🎯',
        updatedAt: expect.any(Number),
      })
    })

    it('should update only the updatedAt timestamp when no other fields provided', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.update).mockResolvedValue(1)

      await updateProject(123, {})

      expect(db.projects.update).toHaveBeenCalledTimes(1)
      expect(db.projects.update).toHaveBeenCalledWith(123, {
        updatedAt: expect.any(Number),
      })
    })
  })

  describe('deleteProject', () => {
    it('should delete a project by id', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.delete).mockResolvedValue(undefined)

      await deleteProject(123)

      expect(db.projects.delete).toHaveBeenCalledTimes(1)
      expect(db.projects.delete).toHaveBeenCalledWith(123)
    })

    it('should delete a project with different id', async () => {
      const { db } = await import('@/lib/db')
      vi.mocked(db.projects.delete).mockResolvedValue(undefined)

      await deleteProject(456)

      expect(db.projects.delete).toHaveBeenCalledTimes(1)
      expect(db.projects.delete).toHaveBeenCalledWith(456)
    })
  })
})
