import { create } from 'zustand'
import { db } from '@/lib/db'
import type { Task } from '@/lib/types'

type SyncConfig = {
  enabled: boolean
  endpointUrl?: string
  authToken?: string
}

type SettingsState = {
  onboardingComplete: boolean
  syncConfig: SyncConfig | null
  theme: 'light' | 'dark' | 'system'
  setOnboardingComplete: (complete: boolean) => Promise<void>
  setSyncConfig: (config: SyncConfig | null) => Promise<void>
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>
  loadDemoTasks: () => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  onboardingComplete: false,
  syncConfig: null,
  theme: 'system',

  setOnboardingComplete: async (complete) => {
    set({ onboardingComplete: complete })
    await db.settings.put({ key: 'onboardingComplete', value: complete })
  },

  setSyncConfig: async (config) => {
    set({ syncConfig: config })
    await db.settings.put({ key: 'syncConfig', value: config })
  },

  setTheme: async (theme) => {
    set({ theme })
    await db.settings.put({ key: 'theme', value: theme })
  },

  loadDemoTasks: async () => {
    const demoTasks: Task[] = [
      {
        id: Date.now(),
        title: 'Welcome to Privatist!',
        priority: 2,
        dueDate: new Date().toISOString(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 1,
        title: 'Try completing this task',
        priority: 3,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 2,
        title: 'Drag me to reorder',
        priority: 4,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    await db.tasks.bulkAdd(demoTasks)
  },
}))
