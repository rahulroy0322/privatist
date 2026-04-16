import { useHotkey } from '@tanstack/react-hotkeys'
import type { FC } from 'react'
import { SerachToggle } from '@/components/command-dialog/command-toggle'
import { ModeToggle } from '@/components/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { toggleCommandDialog } from '@/stores/command-dialog-store'

const AppHeader: FC = () => {
  useHotkey('Mod+K', toggleCommandDialog, {
    meta: { name: 'Search', description: 'Open command palette' },
    target: document,
  })

  return (
    <header className="w-full h-fit flex items-center justify-between p-1">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <SerachToggle />
        <ModeToggle />
      </div>
    </header>
  )
}

export { AppHeader }
