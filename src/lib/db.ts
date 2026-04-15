import Dexie from 'dexie'
import type {
  LabelType,
  ProjectType,
  SettingType,
  SyncQueueItemType,
  TodoType,
} from '@/lib/types'

export class AppDB extends Dexie {
  todos!: Dexie.Table<TodoType, number>
  settings!: Dexie.Table<SettingType, string>
  projects!: Dexie.Table<ProjectType, number>
  labels!: Dexie.Table<LabelType, number>
  syncQueue!: Dexie.Table<SyncQueueItemType, number>

  constructor() {
    super('PrivatistDB')
    this.version(1).stores({
      todos:
        '++id, title, priority, dueDate, completed, projectId, createdAt, updatedAt, description, parentId',
      settings: 'key',
      projects: '++id, name, color, order',
      labels: '++id, name, color',
      syncQueue: '++id, operation, table, timestamp',
    })
  }
}

export const db = new AppDB()
