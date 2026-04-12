import Dexie from 'dexie'
import type { Setting, Task } from '@/lib/types'

export class AppDB extends Dexie {
  tasks!: Dexie.Table<Task, number>
  settings!: Dexie.Table<Setting, string>

  constructor() {
    super('PrivatistDB')
    this.version(1).stores({
      tasks: '++id, title, priority, dueDate, completed',
      settings: 'key',
    })
  }
}

export const db = new AppDB()
