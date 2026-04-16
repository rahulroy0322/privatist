import { create } from 'zustand'
import { db } from '@/lib/db'

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
}))
