import { create } from 'zustand'
import { db } from '@/lib/db'
import type { TodoType } from '@/lib/types'

type SyncConfig = {
  enabled: boolean
  endpointUrl?: string
  authToken?: string
}

type SettingsState = {
  onboardingComplete: boolean
  syncConfig: SyncConfig | null
  setOnboardingComplete: (complete: boolean) => Promise<void>
  setSyncConfig: (config: SyncConfig | null) => Promise<void>
  loadDemoTasks: () => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  onboardingComplete: false,
  syncConfig: null,

  setOnboardingComplete: async (complete) => {
    set({ onboardingComplete: complete })
    await db.settings.put({ key: 'onboardingComplete', value: complete })
  },

  setSyncConfig: async (config) => {
    set({ syncConfig: config })
    await db.settings.put({ key: 'syncConfig', value: config })
  },

  loadDemoTasks: async () => {
    const now = Date.now()
    const demoTasks: TodoType[] = [
      {
        id: now,
        title: 'Welcome to Privatist!',
        priority: 2,
        dueDate: now,
        completed: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: now + 1,
        title: 'Try completing this task',
        priority: 3,
        completed: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: now + 2,
        title: 'Drag me to reorder',
        priority: 4,
        completed: false,
        createdAt: now,
        updatedAt: now,
      },
    ]

    await db.todos.bulkAdd(demoTasks)
  },
}))
