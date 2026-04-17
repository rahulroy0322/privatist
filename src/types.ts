type ThemeType = 'dark' | 'light' | 'system'

type TodoType = {
  id: number
  title: string
  description?: string
  priority: 1 | 2 | 3 | 4
  dueDate?: number | null
  completed: boolean
  projectId?: string | null
  // labelIds: string[]
  parentId?: string | null
  // order: number
  createdAt: number
  updatedAt: number
  // completedAt?: number | null
  syncedAt?: number | null
}

type ProjectType = {
  id: number
  name: string
  icon?: string
  createdAt: number
  updatedAt: number
}

// type LabelType = {
//   id?: number
//   name: string
//   color: string
//   createdAt: number
// }

// type SyncQueueItemType = {
//   id?: number
//   operation: 'CREATE' | 'UPDATE' | 'DELETE'
//   table: 'todos' | 'projects' | 'labels'
//   payload: object
//   timestamp: number
//   retryCount: number
// }

type SettingsType =
  | {
      key: 'theme'
      value: ThemeType
    }
  | {
      key: 'onboarding'
      value: boolean
    }

export type { ProjectType, SettingsType, ThemeType, TodoType }
