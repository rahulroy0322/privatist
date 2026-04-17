import Dexie from 'dexie'
import type { ProjectType, SettingsType, TodoType } from '@/types'

export class AppDB extends Dexie {
  todos!: Dexie.Table<TodoType, number>
  settings!: Dexie.Table<SettingsType, SettingsType['key']>
  projects!: Dexie.Table<ProjectType, number>
  // labels!: Dexie.Table<LabelType, number>
  // syncQueue!: Dexie.Table<SyncQueueItemType, number>

  constructor() {
    super('PrivatistDB')
    this.version(1).stores({
      todos:
        '++id, title, priority, dueDate, completed, projectId, createdAt, updatedAt, description, parentId',
      settings: 'key',
      projects: '++id, name, createdAt, updatedAt, icon',
      // labels: '++id, name, color',
      // syncQueue: '++id, operation, table, timestamp',
    })
  }
}

export const db = new AppDB()
