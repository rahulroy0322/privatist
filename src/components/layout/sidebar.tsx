import {
  RiAddLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiFolderLine,
  RiHashtag,
  RiHomeLine,
} from '@remixicon/react'
import { useState, type FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type SidebarViewType =
  | 'all'
  | 'today'
  | 'tomorrow'
  | 'upcoming'
  | 'completed'
  | 'no-date'

type SidebarPropsType = {
  className?: string
  collapsed?: boolean
  activeView?: SidebarViewType
  onCollapseChange?: (collapsed: boolean) => void
  onViewChange?: (view: SidebarViewType) => void
}

const Sidebar: FC<SidebarPropsType> = ({
  className,
  collapsed = false,
  activeView = 'all',
  onCollapseChange,
  onViewChange,
}) => {
  const [activeProject, setActiveProject] = useState<string | null>(null)

  const views = [
    { id: 'all', label: 'All Tasks', icon: RiHomeLine, count: 12 },
    { id: 'today', label: 'Today', icon: RiCalendarLine, count: 5 },
    { id: 'upcoming', label: 'Upcoming', icon: RiCalendarLine, count: 8 },
    {
      id: 'completed',
      label: 'Completed',
      icon: RiCheckboxCircleLine,
      count: 3,
    },
  ] as const

  const handleViewClick = (viewId: string) => {
    onViewChange?.(viewId as SidebarViewType)
  }

  const projects = [
    { id: 'personal', name: 'Personal', color: 'bg-blue-500', count: 7 },
    { id: 'work', name: 'Work', color: 'bg-green-500', count: 5 },
    { id: 'shopping', name: 'Shopping', color: 'bg-purple-500', count: 2 },
    { id: 'ideas', name: 'Ideas', color: 'bg-yellow-500', count: 4 },
  ]

  const labels = [
    { id: 'important', name: 'Important', color: 'bg-red-500' },
    { id: 'waiting', name: 'Waiting', color: 'bg-orange-500' },
    { id: 'meeting', name: 'Meeting', color: 'bg-indigo-500' },
  ]

  const handleToggleCollapse = () => {
    onCollapseChange?.(!collapsed)
  }

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-border bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Collapse toggle */}
      <div className="flex items-center justify-between border-b border-border p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <RiFolderLine className="size-5 text-primary" />
            <span className="font-semibold">Privatist</span>
          </div>
        )}
        <Button
          className="ml-auto"
          onClick={handleToggleCollapse}
          size="icon"
          variant="ghost"
        >
          {collapsed ? (
            <RiArrowRightSLine size={16} />
          ) : (
            <RiArrowLeftSLine size={16} />
          )}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4">
          {/* Views */}
          <div className="space-y-1">
            <h3
              className={cn(
                'mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
                collapsed && 'sr-only'
              )}
            >
              Views
            </h3>
            {views.map((view) => {
              const Icon = view.icon
              return (
                <Button
                  className={cn('w-full justify-start', collapsed && 'px-2')}
                  key={view.id}
                  onClick={() => handleViewClick(view.id)}
                  size={collapsed ? 'icon' : 'default'}
                  variant={activeView === view.id ? 'secondary' : 'ghost'}
                >
                  <Icon className={cn('size-4', !collapsed && 'mr-2')} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{view.label}</span>
                      <Badge
                        className="ml-2 text-xs"
                        variant="outline"
                      >
                        {view.count}
                      </Badge>
                    </>
                  )}
                </Button>
              )
            })}
          </div>

          <Separator className="my-4" />

          {/* Projects */}
          <div className="space-y-1">
            <div
              className={cn(
                'mb-2 flex items-center justify-between',
                collapsed && 'sr-only'
              )}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Projects
              </h3>
              <Button
                className="h-6 w-6"
                size="icon"
                variant="ghost"
              >
                <RiAddLine size={12} />
              </Button>
            </div>
            {projects.map((project) => (
              <Button
                className={cn('w-full justify-start', collapsed && 'px-2')}
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                size={collapsed ? 'icon' : 'default'}
                variant={activeProject === project.id ? 'secondary' : 'ghost'}
              >
                <div
                  className={cn(
                    'size-2 rounded-full',
                    project.color,
                    !collapsed && 'mr-2'
                  )}
                  title={project.name}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{project.name}</span>
                    <Badge
                      className="ml-2 text-xs"
                      variant="outline"
                    >
                      {project.count}
                    </Badge>
                  </>
                )}
              </Button>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Labels */}
          <div className="space-y-1">
            <h3
              className={cn(
                'mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
                collapsed && 'sr-only'
              )}
            >
              Labels
            </h3>
            {labels.map((label) => (
              <Button
                className={cn('w-full justify-start', collapsed && 'px-2')}
                key={label.id}
                size={collapsed ? 'icon' : 'default'}
                variant="ghost"
              >
                <RiHashtag className={cn('size-4', !collapsed && 'mr-2')} />
                {!collapsed && (
                  <>
                    <div
                      className="mr-2 size-2 rounded-full"
                      style={{
                        backgroundColor: label.color.replace('bg-', ''),
                      }}
                    />
                    <span className="flex-1 text-left">{label.name}</span>
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}

export {
  Sidebar
}
