import type { ProjectType, TodoType } from '@/types'

const sampleTodos: TodoType[] = [
  {
    id: 1,
    title: 'Complete testing setup',
    description: 'Set up Vitest, React Testing Library, and Playwright',
    priority: 1, // high
    dueDate: Date.now() + 86400000, // tomorrow
    completed: false,
    projectId: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 2,
    title: 'Write unit tests for utils',
    description: 'Test date and utility functions',
    priority: 2, // medium
    dueDate: Date.now() + 172800000, // day after tomorrow
    completed: true,
    projectId: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 3,
    title: 'Implement integration tests',
    description: 'Test todo components with mock database',
    priority: 4, // low
    dueDate: Date.now() - 86400000, // yesterday (overdue)
    completed: false,
    projectId: 2,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]

const sampleProjects: ProjectType[] = [
  {
    id: 1,
    name: 'Testing Infrastructure',
    icon: '🧪',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 2,
    name: 'Frontend Development',
    icon: '🎨',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 3,
    name: 'Backend API',
    icon: '⚙️',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]

// Helper to generate a todo with overrides
const createTodo = (overrides: Partial<TodoType> = {}): TodoType => ({
  id: Date.now(),
  title: 'Test Todo',
  description: 'Test description',
  priority: 2,
  dueDate: Date.now() + 86400000,
  completed: false,
  projectId: null,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  ...overrides,
})

// Helper to generate a project with overrides
const createProject = (overrides: Partial<ProjectType> = {}): ProjectType => ({
  id: Date.now(),
  name: 'Test Project',
  icon: '📁',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  ...overrides,
})

// Export empty states
const emptyTodos: TodoType[] = []
const emptyProjects: ProjectType[] = []

export {
  createProject,
  createTodo,
  emptyProjects,
  emptyTodos,
  sampleProjects,
  sampleTodos,
}
