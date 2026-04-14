import type { FC } from 'react'
import { ModeToggle } from '../mode-toggle'
import { SidebarTrigger } from '../ui/sidebar'

const AppHeader: FC = () => (
  <header className="w-full h-fit flex items-center justify-between p-1">
    <SidebarTrigger />
    <div>
      <ModeToggle />
    </div>
  </header>
)

export { AppHeader }
