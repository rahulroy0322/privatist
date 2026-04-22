import { createFileRoute } from '@tanstack/react-router'
import { isPast, isToday } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC, useCallback, useMemo, useState } from 'react'
import { ProjectDialogs } from '@/components/project/project-dialogs'
import { ProjectEmptyState } from '@/components/project/project-empty-state'
import { ProjectLoadingState } from '@/components/project/project-loading-state'
import { ProjectNoResultsState } from '@/components/project/project-no-results-state'
import { ProjectSearchBar } from '@/components/project/project-search-bar'
import { ProjectsGrid } from '@/components/project/projects-grid'
import { db } from '@/lib/db'
import type { ProjectType } from '@/types'

type ProjectFilterType = 'all' | 'active' | 'completed' | 'overdue'

const ProjectsPage: FC = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<ProjectFilterType>('all')

  // Fetch all projects (real-time updates)
  const projects = useLiveQuery(() => db.projects.toArray(), [])

  // Fetch all todos for statistics (real-time updates)
  const todos = useLiveQuery(() => db.todos.toArray(), [])

  // Calculate stats for each project
  const projectsWithStats = useMemo(() => {
    if (!projects || !todos) return []

    return projects.map((project) => {
      const projectTodos = todos.filter((todo) => todo.projectId === project.id)
      const total = projectTodos.length
      const completed = projectTodos.filter((t) => t.completed).length
      const pending = projectTodos.filter((t) => !t.completed).length
      const overdue = projectTodos.filter(
        (t) =>
          !t.completed &&
          t.dueDate &&
          isPast(new Date(t.dueDate)) &&
          !isToday(new Date(t.dueDate))
      ).length

      return {
        project,
        todos: projectTodos,
        stats: { total, completed, pending, overdue },
      }
    })
  }, [projects, todos])

  // Filter projects based on search and filter type
  const filteredProjects = useMemo(() => {
    let filtered = projectsWithStats

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(({ project }) =>
        project.name.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    switch (filterType) {
      case 'active':
        filtered = filtered.filter(({ stats }) => stats.pending > 0)
        break
      case 'completed':
        filtered = filtered.filter(
          ({ stats }) => stats.total > 0 && stats.completed === stats.total
        )
        break
      case 'overdue':
        filtered = filtered.filter(({ stats }) => stats.overdue > 0)
        break
      default:
        // 'all' - no filter
        break
    }

    return filtered
  }, [projectsWithStats, searchQuery, filterType])

  const handleCreateProject = useCallback(() => {
    setCreateDialogOpen(true)
  }, [])

  const handleEditProject = useCallback((project: ProjectType) => {
    setSelectedProject(project)
    setEditDialogOpen(true)
  }, [])

  const handleDeleteProject = useCallback((project: ProjectType) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }, [])

  const handleCreateSuccess = useCallback(() => {
    // Refresh is handled by useLiveQuery
  }, [])

  const handleDeleteSuccess = useCallback(() => {
    // Refresh is handled by useLiveQuery
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setFilterType('all')
  }, [])

  const getFilterLabel = useCallback(() => {
    switch (filterType) {
      case 'active':
        return 'Active Projects'
      case 'completed':
        return 'Completed Projects'
      case 'overdue':
        return 'Projects with Overdue'
      default:
        return 'All Projects'
    }
  }, [filterType])

  return (
    <div className="container mx-auto p-5">
      <h2 className="sticky z-40 top-0 bg-background container mx-auto px-5 py-2">
        Projects
      </h2>

      <ProjectSearchBar
        filterType={filterType}
        onClearSearch={clearSearch}
        onCreateProject={handleCreateProject}
        onFilterChange={setFilterType}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {!projects || !todos ? (
        <ProjectLoadingState />
      ) : projects.length === 0 ? (
        <ProjectEmptyState onCreateProject={handleCreateProject} />
      ) : filteredProjects.length === 0 ? (
        <ProjectNoResultsState
          filterLabel={getFilterLabel()}
          onClearFilters={clearFilters}
          searchQuery={searchQuery}
        />
      ) : (
        <ProjectsGrid
          onDelete={handleDeleteProject}
          onEdit={handleEditProject}
          projects={filteredProjects}
        />
      )}

      <ProjectDialogs
        createDialogOpen={createDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        editDialogOpen={editDialogOpen}
        onCreateOpenChange={setCreateDialogOpen}
        onCreateSuccess={handleCreateSuccess}
        onDeleteOpenChange={setDeleteDialogOpen}
        onDeleteSuccess={handleDeleteSuccess}
        onEditOpenChange={setEditDialogOpen}
        selectedProject={selectedProject}
      />
    </div>
  )
}

const Route = createFileRoute('/(todo)/project/')({
  component: ProjectsPage,
})

export { Route }
