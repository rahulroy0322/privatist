import { RiArrowRightSLine } from '@remixicon/react'
import { Link, useLocation } from '@tanstack/react-router'
import type { FC } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const AppSidebarProjectsImpl: FC = () => {
  const { pathname } = useLocation()

  const projects = [
    {
      id: `home-1234-abcd-xyz`,
      name: 'Home',
      icon: '🏡',
    },
    {
      id: `project-1-1234-abcd-xyz`,
      name: 'Project 1',
      icon: '📽️',
    },
    {
      id: `project-2-1234-abcd-xyz`,
      name: 'Project 2',
      icon: '🎯',
    },
  ]

  return (
    <SidebarMenu>
      {projects.map(({ id, icon, name }) => (
        <SidebarMenuItem key={id || name}>
          <SidebarMenuButton
            isActive={pathname === `/project/${id}`}
            render={
              <Link
                params={{
                  id,
                }}
                // TODO!
                to={`/project/$id`}
              />
            }
          >
            {name} {icon}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

const AppSidebarProjects: FC = () => {
  return (
    <Collapsible className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          render={<CollapsibleTrigger />}
        >
          Projects
          <RiArrowRightSLine className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <AppSidebarProjectsImpl />
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

export { AppSidebarProjects }
