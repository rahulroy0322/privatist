import {
  RiAddLine,
  RiCheckboxCircleLine,
  RiNotificationLine,
  RiRefreshLine,
  RiSearchLine,
} from '@remixicon/react'
import { useEffect, useRef, useState, type FC } from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type AppHeaderPropsType = {
  className?: string
  onSearch?: (query: string) => void
  onNewTask?: () => void
  syncStatus?: 'idle' | 'syncing' | 'error'
  unreadNotifications?: number
}

const AppHeader: FC<AppHeaderPropsType> = ({
  className,
  onSearch,
  onNewTask,
  syncStatus = 'idle',
  unreadNotifications = 0,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Focus search input when '/' is pressed (unless already focused or inside input/textarea)
      if (
        e.key === '/' &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      // New task shortcut 'N'
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onNewTask?.()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [onNewTask])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch?.(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Trigger search
      onSearch?.(searchQuery)
    }
    if (e.key === 'Escape') {
      setSearchQuery('')
      onSearch?.('')
      searchInputRef.current?.blur()
    }
  }

  const syncStatusConfig = {
    idle: {
      label: 'All changes saved',
      color: 'text-green-500',
      icon: RiCheckboxCircleLine,
    },
    syncing: {
      label: 'Syncing...',
      color: 'text-blue-500',
      icon: RiRefreshLine,
    },
    error: {
      label: 'Sync failed',
      color: 'text-destructive',
      icon: RiRefreshLine,
    },
  } as const

  const SyncIcon = syncStatusConfig[syncStatus].icon

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60',
        className
      )}
    >
      <div className="flex flex-1 items-center gap-4 px-4">
        {/* Logo / App name */}
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <RiCheckboxCircleLine className="size-4 text-primary" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">Privatist</h1>
            <div className="flex items-center gap-2">
              <SyncIcon
                className={cn('size-3', syncStatusConfig[syncStatus].color)}
              />
              <span className="text-xs text-muted-foreground">
                {syncStatusConfig[syncStatus].label}
              </span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-2xl">
          <RiSearchLine
            className={cn(
              'absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground',
              isSearchFocused && 'text-primary'
            )}
          />
          <Input
            className="pl-10 pr-4"
            onBlur={() => setIsSearchFocused(false)}
            onChange={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search tasks (Press / to focus)"
            ref={searchInputRef}
            type="search"
            value={searchQuery}
          />
          <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 md:flex">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 px-4">
        <Button
          className="hidden md:inline-flex"
          onClick={onNewTask}
          size="sm"
          variant="outline"
        >
          <RiAddLine className="mr-2 size-4" />
          New Task
          <kbd className="ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground lg:inline-flex">
            N
          </kbd>
        </Button>
        <Button
          className="md:hidden"
          onClick={onNewTask}
          size="icon"
          variant="ghost"
        >
          <RiAddLine size={18} />
        </Button>

        {/* Notifications */}
        <Button
          className="relative"
          size="icon"
          variant="ghost"
        >
          <RiNotificationLine size={18} />
          {unreadNotifications > 0 && (
            <Badge className="absolute -right-1 -top-1 size-5 p-0 text-xs">
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </Badge>
          )}
        </Button>

        {/* Sync status (mobile) */}
        <div className="md:hidden">
          <Button
            size="icon"
            variant="ghost"
          >
            <SyncIcon
              className={cn('size-4', syncStatusConfig[syncStatus].color)}
            />
          </Button>
        </div>

        <ModeToggle />
      </div>
    </header>
  )
}


export {
  AppHeader
}