import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'
import { AppHeader } from '@/components/layout/header'
import { AppSidebar } from '@/components/sidebar/main'
import { TaskModal } from '@/components/tasks/task-modal'
import { SidebarProvider } from '@/components/ui/sidebar'

const BaseLayout: FC = () => (
  <SidebarProvider>
    <AppSidebar />
    <div className="w-full flex flex-col h-screen overflow-hidden">
      <AppHeader />
      <main className="grow overflow-auto">
        <Outlet />
      </main>
    </div>
    <TaskModal />
  </SidebarProvider>
)

const Route = createFileRoute('/(base)')({
  component: BaseLayout,
})

export { Route }
