import { createFileRoute, Outlet } from '@tanstack/react-router'
import type { FC } from 'react'
import { Fab } from '@/components/fab'
import { AppHeader } from '@/components/layout/header'
import { AppSidebar } from '@/components/sidebar/main'
import { TodoModal } from '@/components/todo/todo-modal'
import { SidebarProvider } from '@/components/ui/sidebar'
import { openTodoModel } from '@/stores/todo-model'

const BaseLayout: FC = () => (
  <SidebarProvider>
    <AppSidebar />
    <div className="w-full flex flex-col h-screen overflow-hidden">
      <AppHeader />
      <main className="grow overflow-auto">
        <Outlet />
      </main>
    </div>
    <TodoModal />
    <Fab onClick={openTodoModel} />
  </SidebarProvider>
)

const Route = createFileRoute('/(todo)')({
  component: BaseLayout,
})

export { Route }
