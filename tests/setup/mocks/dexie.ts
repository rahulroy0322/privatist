import { vi } from 'vitest'

const createMockDexie = () => {
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
    settings: {
      put: vi.fn().mockResolvedValue(1),
      get: vi.fn().mockResolvedValue(null),
      toArray: vi.fn().mockResolvedValue([]),
    },
    transaction: vi.fn().mockImplementation((_, callback) => callback(mockDb)),
    version: vi.fn().mockReturnValue({
      stores: vi.fn().mockReturnThis(),
      upgrade: vi.fn().mockReturnThis(),
    }),
  }

  return mockDb
}

const mockDb = createMockDexie()

// Mock the default export (Dexie constructor)
const mockDexieConstructor = vi.fn().mockImplementation(() => mockDb)
mockDexieConstructor.prototype = {
  version: vi.fn().mockReturnValue({
    stores: vi.fn().mockReturnThis(),
    upgrade: vi.fn().mockReturnThis(),
  }),
}

export default mockDexieConstructor

export { createMockDexie, mockDb }
