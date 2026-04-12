import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, type FC } from 'react'
import { toast } from 'sonner'
import { AppHeader } from '@/components/layout/app-header'
import { Sidebar } from '@/components/layout/sidebar'
import { Fab } from '@/components/fab'
import { TaskModal } from '@/components/tasks/task-modal'
import { TaskList } from '@/components/tasks/task-list'
import { useTodoStore } from '@/stores/todo-store'
import type { TaskType } from '@/lib/types'

const TodosPage:FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([])
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<TaskType | null>(null)

  const {
    tasks,
    isLoading,
    filter,
    loadTasks,
    addTask,
    deleteTask,
    toggleComplete,
    setSearchQuery: setStoreSearchQuery,
    setFilter,
    filteredTasks,
  } = useTodoStore()

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  useEffect(() => {
    setStoreSearchQuery(searchQuery)
  }, [searchQuery, setStoreSearchQuery])

  const handleToggleComplete = async (id: number) => {
    try {
      await toggleComplete(id)
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }

  const handleDeleteTask = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id)
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    }
  }

  const handleSelectTask = (id: number) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    )
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleViewChange = (
    view: 'all' | 'today' | 'tomorrow' | 'upcoming' | 'completed' | 'no-date'
  ) => {
    setFilter(view)
  }

  const handleNewTask = () => {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  const handleEditTask = (id: number) => {
    const task = tasks.find((t) => t.id === id)
    setEditingTask(task || null)
    setIsTaskModalOpen(true)
  }

  const handleTaskSubmit = async (formData: {
    title: string
    description: string
    priority: 1 | 2 | 3 | 4
    dueDate: Date | null
    projectId: string | null
    labelIds: string[]
  }) => {
    try {
      if (editingTask?.id) {
        // Update existing task
        // TODO: Implement updateTask in store
        toast.success('Task updated')
      } else {
        // Create new task
        await addTask({
          title: formData.title,
          description: formData.description || '',
          priority: formData.priority,
          dueDate: formData.dueDate ? new Date(formData.dueDate).getTime() : null,
          projectId: formData.projectId || null,
          labelIds: formData.labelIds || [],
          completed: false,
          order: tasks.length,
        })
        toast.success('Task created')
      }
      setIsTaskModalOpen(false)
      setEditingTask(null)
    } catch (error) {
      console.error('Failed to save task:', error)
      toast.error('Failed to save task')
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <AppHeader
        onNewTask={handleNewTask}
        onSearch={handleSearch}
        syncStatus="idle"
        unreadNotifications={0}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeView={filter}
          collapsed={sidebarCollapsed}
          onCollapseChange={setSidebarCollapsed}
          onViewChange={handleViewChange}
        />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {filter === 'all' && 'All Tasks'}
                  {filter === 'today' && 'Today'}
                  {filter === 'tomorrow' && 'Tomorrow'}
                  {filter === 'upcoming' && 'Upcoming'}
                  {filter === 'completed' && 'Completed'}
                  {filter === 'no-date' && 'No Date'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredTasks().length} tasks •{' '}
                  {tasks.filter((t) => t.completed).length} completed
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Filter buttons placeholder */}
              </div>
            </div>

            {/* Task list */}
            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <div className="space-y-6 p-4">
                  {/* Today section skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded-2xl bg-muted" />
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div
                          className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                          key={i}
                        >
                          <div className="size-5 animate-pulse rounded-2xl bg-muted" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 animate-pulse rounded-2xl bg-muted" />
                            <div className="h-3 w-1/2 animate-pulse rounded-2xl bg-muted" />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
                            <div className="size-8 animate-pulse rounded-2xl bg-muted" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Upcoming section skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded-2xl bg-muted" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                        <div className="size-5 animate-pulse rounded-2xl bg-muted" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/4 animate-pulse rounded-2xl bg-muted" />
                          <div className="h-3 w-1/2 animate-pulse rounded-2xl bg-muted" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
                          <div className="size-8 animate-pulse rounded-2xl bg-muted" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* No date section skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded-2xl bg-muted" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                        <div className="size-5 animate-pulse rounded-2xl bg-muted" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/4 animate-pulse rounded-2xl bg-muted" />
                          <div className="h-3 w-1/2 animate-pulse rounded-2xl bg-muted" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
                          <div className="size-8 animate-pulse rounded-2xl bg-muted" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <TaskList
                  emptyMessage="No tasks yet. Create your first task below!"
                  filter={filter}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  onSelect={handleSelectTask}
                  onToggleComplete={handleToggleComplete}
                  selectedTaskIds={selectedTaskIds}
                  tasks={filteredTasks()}
                />
              )}
            </div>

            {/* FAB for adding new tasks */}
            <Fab onClick={handleNewTask} />
          </div>
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal
        open={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
        task={editingTask}
        onSubmit={handleTaskSubmit}
      />
    </div>
  )
}

const Route = createFileRoute('/todos')({
  component: TodosPage,
})

export { Route }
