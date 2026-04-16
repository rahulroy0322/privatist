import { RiFolderLine } from '@remixicon/react'
import type { ComponentProps, FC } from 'react'
import { SerachToggle } from '@/components/command-dialog/command-toggle'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { AppSidebarNav } from './nav'
import { AppSidebarProjects } from './projects'

type AppSidebarPropsType = ComponentProps<typeof Sidebar>

const AppSidebar: FC<AppSidebarPropsType> = ({ ...props }) => (
  <Sidebar {...props}>
    <SidebarHeader>
      <SidebarMenuItem className="flex gap-2 items-center">
        <RiFolderLine className="size-8 text-primary" />
        <span className="text-xl font-bold">Privatist</span>
      </SidebarMenuItem>
      {/* <Button type='button' render={ */}
      <SerachToggle
        className={'gap-2 w-full'}
        variant={'default'}
      >
        Serach
      </SerachToggle>
    </SidebarHeader>
    <SidebarContent className="gap-0">
      <AppSidebarNav />
      <AppSidebarProjects />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
)

export { AppSidebar }
