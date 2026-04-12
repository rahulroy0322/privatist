type TaskType = {
  id?: number
  title: string
  description?: string
  priority: number
  dueDate?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

type SettingType = {
  key: string
  value: unknown
}
export type {
  TaskType,
  SettingType
}