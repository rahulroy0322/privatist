import Dexie from 'dexie'
import type {
  LabelType,
  ProjectType,
  SettingType,
  SyncQueueItemType,
  TaskType,
} from '@/lib/types'

export class AppDB extends Dexie {
  tasks!: Dexie.Table<TaskType, number>
  settings!: Dexie.Table<SettingType, string>
  projects!: Dexie.Table<ProjectType, number>
  labels!: Dexie.Table<LabelType, number>
  syncQueue!: Dexie.Table<SyncQueueItemType, number>

  constructor() {
    super('PrivatistDB')
    this.version(1).stores({
      tasks: '++id, title, priority, dueDate, completed',
      settings: 'key',
    })
    this.version(2)
      .stores({
        tasks:
          '++id, title, priority, dueDate, completed, projectId, createdAt',
        settings: 'key',
        projects: '++id, name, color, order',
        labels: '++id, name, color',
        syncQueue: '++id, operation, table, timestamp',
      })
      .upgrade((tx) => {
        // Migration logic from v1 to v2
        // For existing tasks, add missing fields
        return tx
          .table('tasks')
          .toCollection()
          .modify((task) => {
            // Convert dueDate from string to number if needed
            if (task.dueDate && typeof task.dueDate === 'string') {
              task.dueDate = new Date(task.dueDate).getTime()
            }
            // Add default fields
            task.projectId = null
            task.labelIds = []
            task.parentId = null
            task.order = 0
            task.createdAt = task.createdAt || Date.now()
            task.updatedAt = task.updatedAt || Date.now()
            task.completedAt = task.completed ? Date.now() : null
            task.syncedAt = null
          })
      })
  }
}

export const db = new AppDB()
