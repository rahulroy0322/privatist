import { RiArrowRightSLine } from '@remixicon/react'
import { Link, useLocation } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC } from 'react'
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
import { db } from '@/lib/db'

const AppSidebarProjectsImpl: FC = () => {
  const { pathname } = useLocation()
  const projects = useLiveQuery(() => db.projects.toArray(), [])

  return (
    <SidebarMenu>
      {projects?.map(({ id, icon, name }) => (
        <SidebarMenuItem key={id || name}>
          <SidebarMenuButton
            isActive={pathname === `/project/${id}`}
            render={
              <Link
                params={{
                  id: String(id),
                }}
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
