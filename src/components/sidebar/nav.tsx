import {
  type RemixiconComponentType,
  RiCalendar2Line,
  RiCalendarLine,
  RiCalendarTodoLine,
  RiInbox2Line,
  RiLineChartLine,
} from '@remixicon/react'
import { Link, useLocation } from '@tanstack/react-router'
import type { FC } from 'react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

type SidebarItemType = {
  Icon: RemixiconComponentType
  label: string
  link: Parameters<typeof Link>[0]['to']
  disabled?: boolean
}

const links: SidebarItemType[] = [
  {
    Icon: RiInbox2Line,
    label: 'Inbox',
    link: '/',
  },
  {
    Icon: RiCalendarTodoLine,
    label: 'Today',
    // TODO!
    link: '/',
  },
  {
    Icon: RiCalendarLine,
    label: 'Upcoming',
    // TODO!
    link: '/',
  },
  {
    Icon: RiCalendar2Line,
    label: 'Overdue',
    // TODO!
    link: '/',
  },
  {
    Icon: RiLineChartLine,
    label: 'Analytics',
    // TODO!
    link: '/',
    disabled: true,
  },
]

const AppSidebarNav: FC = () => {
  const { pathname } = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map(({ Icon, label, link, disabled = false }) => (
            <SidebarMenuItem
              aria-disabled={disabled}
              key={`${label}-${link}`}
            >
              <SidebarMenuButton
                className={cn('flex gap-2 items-center p-2', {
                  'opacity-50': disabled,
                })}
                disabled={disabled}
                isActive={pathname === link}
                render={<Link to={link} />}
              >
                <Icon className="size-5" />
                <span className="font-semibold text-sm">{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export { AppSidebarNav }
