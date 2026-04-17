import { useHotkey } from '@tanstack/react-hotkeys'
import type { FC } from 'react'
import { SearchToggle } from '@/components/command-dialog/command-toggle'
import { ModeToggle } from '@/components/theme/main'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { toggleCommandDialog } from '@/stores/command-dialog-store'
import { openTodoModel } from '@/stores/todo-model'

const AppHeader: FC = () => {
  useHotkey('Mod+K', toggleCommandDialog, {
    meta: { name: 'Search', description: 'Open command palette' },
  })

  useHotkey(
    'Mod+N',
    () => {
      openTodoModel()
    },
    {
      meta: { name: 'New Todo', description: 'Create new todo' },
    }
  )

  return (
    <header className="w-full h-fit flex items-center justify-between p-1">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <SearchToggle />
        <ModeToggle />
      </div>
    </header>
  )
}

export { AppHeader }
