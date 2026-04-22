import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { differenceInCalendarDays, isPast, isToday, isTomorrow } from 'date-fns'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import type { FilterType } from '@/components/project/filter-dropdown'
import { FilterSortBar } from '@/components/project/filter-sort-bar'
import { ProjectDeleteDialog } from '@/components/project/project-delete-dialog'
import { ProjectEditDialog } from '@/components/project/project-edit-dialog'
import { ProjectHeader } from '@/components/project/project-header'
import type { SortType } from '@/components/project/sort-dropdown'
import { TodoList } from '@/components/todo/todo-list'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { setTodoModelOpen, setTodotoEdit } from '@/stores/todo-model'
import type { TodoType } from '@/types'

const ProjectDetailPage: FC = () => {
  const { id } = useParams({ from: '/(todo)/project/$id' })
  const navigate = useNavigate()

  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('due-date-asc')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Fetch project details (real-time updates) - use array query to distinguish loading vs not found
  const projectResult = useLiveQuery(
    () => db.projects.where('id').equals(Number(id)).toArray(),
    [id]
  )

  // Fetch all todos for this project (real-time updates)
  const todos = useLiveQuery(
    () => db.todos.where('projectId').equals(Number(id)).toArray(),
    [id]
  )

  // Extract project from result or undefined if loading/not found
  const project = projectResult?.[0]

  const handleEditProject = useCallback(() => {
    setEditDialogOpen(true)
  }, [])

  const handleDeleteProject = useCallback(() => {
    setDeleteDialogOpen(true)
  }, [])

  const handleDeleteSuccess = useCallback(() => {
    navigate({ to: '/project' })
  }, [navigate])

  const handleClearFilters = useCallback(() => {
    setFilter('all')
    setSort('due-date-asc')
  }, [])

  // Filter todos based on selected filter
  const filteredTodos = useMemo(() => {
    if (!todos) return []

    const now = new Date()

    return todos.filter((todo) => {
      switch (filter) {
        case 'all':
          return true
        case 'active':
          return !todo.completed
        case 'completed':
          return todo.completed
        case 'overdue':
          return (
            !todo.completed &&
            todo.dueDate &&
            isPast(new Date(todo.dueDate)) &&
            !isToday(new Date(todo.dueDate))
          )
        case 'priority-1':
          return todo.priority === 1
        case 'priority-2':
          return todo.priority === 2
        case 'priority-3':
          return todo.priority === 3
        case 'priority-4':
          return todo.priority === 4
        case 'today':
          return todo.dueDate && isToday(new Date(todo.dueDate))
        case 'tomorrow':
          return todo.dueDate && isTomorrow(new Date(todo.dueDate))
        case 'this-week':
          return (
            todo.dueDate &&
            differenceInCalendarDays(new Date(todo.dueDate), now) >= 0 &&
            differenceInCalendarDays(new Date(todo.dueDate), now) <= 7
          )
        case 'no-date':
          return !todo.dueDate
        default:
          return true
      }
    })
  }, [todos, filter])

  // Sort todos based on selected sort option
  const sortedTodos = useMemo(() => {
    const sorted = [...filteredTodos]

    switch (sort) {
      case 'due-date-asc':
        sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return a.dueDate - b.dueDate
        })
        break
      case 'due-date-desc':
        sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return b.dueDate - a.dueDate
        })
        break
      case 'priority-desc':
        sorted.sort((a, b) => {
          if (a.priority !== b.priority) {
            return a.priority - b.priority
          }
          // Secondary sort by due date
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return a.dueDate - b.dueDate
        })
        break
      case 'created-desc':
        sorted.sort((a, b) => b.createdAt - a.createdAt)
        break
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return sorted
  }, [filteredTodos, sort])

  useEffect(() => {
    if (projectResult !== undefined && projectResult.length === 0) {
      toast.error('Project not found')
      navigate({ to: '/project' })
    }
  }, [navigate, projectResult])

  // Show loading state
  if (projectResult === undefined || todos === undefined) {
    return (
      <div className="container mx-auto p-5 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <div className="space-y-2 mt-8">
          {[1, 2, 3].map((i) => (
            <Skeleton
              className="h-16"
              key={i}
            />
          ))}
        </div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <>
      <ProjectHeader
        onDelete={handleDeleteProject}
        onEdit={handleEditProject}
        project={project!}
        todos={todos || []}
      />
      <FilterSortBar
        filter={filter}
        onClearFilters={handleClearFilters}
        onFilterChange={setFilter}
        onSortChange={setSort}
        showClearButton={filter !== 'all' || sort !== 'due-date-asc'}
        sort={sort}
      />
      <div className="container mx-auto p-5">
        <TodoList
          emptyMessage={
            filter === 'all'
              ? 'No tasks in this project yet'
              : 'No tasks match your filters'
          }
          openTodoModel={() => {
            // to not show update todo form and pre fill project id
            setTodotoEdit({
              projectId: Number(id),
            } as unknown as TodoType)
            setTodoModelOpen(true)
          }}
          todos={sortedTodos}
        />
      </div>
      <ProjectEditDialog
        onOpenChange={setEditDialogOpen}
        open={editDialogOpen}
        project={project!}
      />
      <ProjectDeleteDialog
        onDeleteSuccess={handleDeleteSuccess}
        onOpenChange={setDeleteDialogOpen}
        open={deleteDialogOpen}
        project={project}
      />
    </>
  )
}

const Route = createFileRoute('/(todo)/project/$id')({
  component: ProjectDetailPage,
})

export { Route }
