import { RiFolderLine } from '@remixicon/react'
import type { ComponentProps, FC } from 'react'
import { SearchToggle } from '@/components/command-dialog/command-toggle'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { AppSidebarNav } from './nav'
import { AppSidebarProjects } from './projects'

type AppSidebarPropsType = ComponentProps<typeof Sidebar>

const AppSidebar: FC<AppSidebarPropsType> = ({ ...props }) => (
  <Sidebar {...props}>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="flex gap-2 items-center">
          <RiFolderLine className="size-8 text-primary" />
          <span className="text-xl font-bold">Privatist</span>
        </SidebarMenuItem>
      </SidebarMenu>
      <SearchToggle
        className={'gap-2 w-full'}
        variant={'default'}
      >
        Search
      </SearchToggle>
    </SidebarHeader>
    <SidebarContent className="gap-0">
      <AppSidebarNav />
      <AppSidebarProjects />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
)

export { AppSidebar }
