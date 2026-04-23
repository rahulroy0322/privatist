import { type RenderOptions, render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { vi } from 'vitest'

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  // For now, just return children without providers
  // We'll add proper providers later when we have a better understanding
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Helper to wait for a condition
const waitForCondition = async (condition: () => boolean, timeout = 1000) => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    if (condition()) return
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  throw new Error('Condition not met within timeout')
}

// Helper to mock Dexie database
const mockDexie = () => {
  const mockDb = {
    todos: {
      toArray: vi.fn().mockResolvedValue([]),
      add: vi.fn().mockResolvedValue(1),
      update: vi.fn().mockResolvedValue(1),
      delete: vi.fn().mockResolvedValue(1),
      where: vi.fn().mockReturnValue({
        toArray: vi.fn().mockResolvedValue([]),
        equals: vi.fn().mockReturnThis(),
        above: vi.fn().mockReturnThis(),
        below: vi.fn().mockReturnThis(),
        anyOf: vi.fn().mockReturnThis(),
        noneOf: vi.fn().mockReturnThis(),
      }),
    },
    projects: {
      toArray: vi.fn().mockResolvedValue([]),
      add: vi.fn().mockResolvedValue(1),
      update: vi.fn().mockResolvedValue(1),
      delete: vi.fn().mockResolvedValue(1),
      where: vi.fn().mockReturnValue({
        toArray: vi.fn().mockResolvedValue([]),
        equals: vi.fn().mockReturnThis(),
      }),
    },
    transaction: vi.fn().mockImplementation((_, callback) => callback(mockDb)),
  }

  return mockDb
}

// Helper to generate test data
const generateTodo = (overrides = {}) => ({
  id: `todo-${Date.now()}-${Math.random()}`,
  title: 'Test Todo',
  description: 'Test description',
  priority: 'medium',
  dueDate: new Date().toISOString(),
  completed: false,
  projectId: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

const generateProject = (overrides = {}) => ({
  id: `project-${Date.now()}-${Math.random()}`,
  name: 'Test Project',
  description: 'Test project description',
  color: '#3b82f6',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
})

// Re-export everything from testing-library
export * from '@testing-library/react'
export {
  // Override render method
  customRender as render,
  generateProject,
  generateTodo,
  mockDexie,
  waitForCondition,
}
