import { toast } from 'sonner'
import { create } from 'zustand'
import { db } from '@/lib/db'
import type { LabelType, ProjectType, TaskType } from '@/lib/types'

type FilterType =
  | 'all'
  | 'today'
  | 'tomorrow'
  | 'upcoming'
  | 'completed'
  | 'no-date'
type SortType = 'priority' | 'dueDate' | 'createdAt' | 'title'

type TodoStoreState = {
  tasks: TaskType[]
  projects: ProjectType[]
  labels: LabelType[]
  isLoading: boolean
  filter: FilterType
  sort: SortType
  searchQuery: string
  selectedTaskIds: number[]
  // Actions
  loadTasks: () => Promise<void>
  loadProjects: () => Promise<void>
  loadLabels: () => Promise<void>
  addTask: (
    task: Omit<TaskType, 'id' | 'createdAt' | 'updatedAt' | 'syncedAt'>
  ) => Promise<number>
  updateTask: (id: number, updates: Partial<TaskType>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  toggleComplete: (id: number) => Promise<void>
  reorderTasks: (activeId: number, overId: number) => Promise<void>
  setFilter: (filter: FilterType) => void
  setSort: (sort: SortType) => void
  setSearchQuery: (query: string) => void
  toggleTaskSelection: (id: number) => void
  clearSelectedTasks: () => void
  // Computed
  filteredTasks: () => TaskType[]
  todayTasks: () => TaskType[]
  upcomingTasks: () => TaskType[]
}

export const useTodoStore = create<TodoStoreState>((set, get) => ({
  tasks: [],
  projects: [],
  labels: [],
  isLoading: false,
  filter: 'all',
  sort: 'priority',
  searchQuery: '',
  selectedTaskIds: [],

  loadTasks: async () => {
    set({ isLoading: true })
    try {
      const tasks = await db.tasks.toArray()
      set({ tasks, isLoading: false })
    } catch (error) {
      console.error('Failed to load tasks:', error)
      toast.error('Failed to load tasks')
      set({ isLoading: false })
    }
  },

  loadProjects: async () => {
    try {
      const projects = await db.projects.toArray()
      set({ projects })
    } catch (error) {
      console.error('Failed to load projects:', error)
    }
  },

  loadLabels: async () => {
    try {
      const labels = await db.labels.toArray()
      set({ labels })
    } catch (error) {
      console.error('Failed to load labels:', error)
    }
  },

  addTask: async (taskData) => {
    const now = Date.now()
    const newTask: TaskType = {
      ...taskData,
      createdAt: now,
      updatedAt: now,
      syncedAt: null,
      labelIds: taskData.labelIds || [],
      order: taskData.order ?? 0,
    }
    try {
      const id = await db.tasks.add(newTask)
      // Optimistic update
      set((state) => ({
        tasks: [...state.tasks, { ...newTask, id }],
      }))
      toast.success('Task added')
      return id as number
    } catch (error) {
      console.error('Failed to add task:', error)
      toast.error('Failed to add task')
      throw error
    }
  },

  updateTask: async (id, updates) => {
    const now = Date.now()
    const updatedTask = {
      ...updates,
      updatedAt: now,
    }
    try {
      await db.tasks.update(id, updatedTask)
      // Optimistic update
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        ),
      }))
      toast.success('Task updated')
    } catch (error) {
      console.error('Failed to update task:', error)
      toast.error('Failed to update task')
      throw error
    }
  },

  deleteTask: async (id) => {
    try {
      await db.tasks.delete(id)
      // Optimistic update
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        selectedTaskIds: state.selectedTaskIds.filter(
          (taskId) => taskId !== id
        ),
      }))
      toast.success('Task deleted')
    } catch (error) {
      console.error('Failed to delete task:', error)
      toast.error('Failed to delete task')
      throw error
    }
  },

  toggleComplete: async (id) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return
    const completed = !task.completed
    const updates = {
      completed,
      completedAt: completed ? Date.now() : null,
    }
    await get().updateTask(id, updates)
  },

  reorderTasks: async (activeId, overId) => {
    const tasks = get().tasks
    const activeIndex = tasks.findIndex((t) => t.id === activeId)
    const overIndex = tasks.findIndex((t) => t.id === overId)
    if (activeIndex === -1 || overIndex === -1) return

    const reordered = [...tasks]
    const [removed] = reordered.splice(activeIndex, 1)
    reordered.splice(overIndex, 0, removed)

    // Update order fields
    const updated = reordered.map((task, index) => ({
      ...task,
      order: index,
    }))

    set({ tasks: updated })

    // Persist to DB (batch update)
    try {
      await db.transaction('rw', db.tasks, async () => {
        for (const task of updated) {
          await db.tasks.update(task.id!, { order: task.order })
        }
      })
    } catch (error) {
      console.error('Failed to persist reorder:', error)
      toast.error('Failed to save order')
      // Revert optimistic update
      get().loadTasks()
    }
  },

  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleTaskSelection: (id) =>
    set((state) => ({
      selectedTaskIds: state.selectedTaskIds.includes(id)
        ? state.selectedTaskIds.filter((taskId) => taskId !== id)
        : [...state.selectedTaskIds, id],
    })),

  clearSelectedTasks: () => set({ selectedTaskIds: [] }),

  filteredTasks: () => {
    const { tasks, filter, sort, searchQuery } = get()
    let filtered = tasks

    // Apply filter
    const todayStart = new Date().setHours(0, 0, 0, 0)
    const todayEnd = todayStart + 86400000
    const tomorrowStart = todayStart + 86400000
    const tomorrowEnd = tomorrowStart + 86400000

    switch (filter) {
      case 'today':
        filtered = filtered.filter(
          (task) =>
            task.dueDate &&
            task.dueDate >= todayStart &&
            task.dueDate < todayEnd
        )
        break
      case 'tomorrow':
        filtered = filtered.filter(
          (task) =>
            task.dueDate &&
            task.dueDate >= tomorrowStart &&
            task.dueDate < tomorrowEnd
        )
        break
      case 'upcoming':
        filtered = filtered.filter(
          (task) => task.dueDate && task.dueDate >= todayEnd
        )
        break
      case 'completed':
        filtered = filtered.filter((task) => task.completed)
        break
      case 'no-date':
        filtered = filtered.filter((task) => !task.dueDate)
        break
      default:
        // Show all except completed? Usually show incomplete
        filtered = filtered.filter((task) => !task.completed)
        break
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(query)
      )
    }

    // Apply sort
    filtered = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'priority':
          return a.priority - b.priority
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return a.dueDate - b.dueDate
        case 'createdAt':
          return b.createdAt - a.createdAt // newest first
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  },

  todayTasks: () => {
    const tasks = get().tasks
    const todayStart = new Date().setHours(0, 0, 0, 0)
    const todayEnd = todayStart + 86400000
    return tasks.filter(
      (task) =>
        task.dueDate &&
        task.dueDate >= todayStart &&
        task.dueDate < todayEnd &&
        !task.completed
    )
  },

  upcomingTasks: () => {
    const tasks = get().tasks
    const todayEnd = new Date().setHours(23, 59, 59, 999)
    return tasks.filter(
      (task) => task.dueDate && task.dueDate > todayEnd && !task.completed
    )
  },
}))
