import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { FC } from 'react'

type PriorityType = 1 | 2 | 3 | 4

type PriorityBadgePropsType = {
  priority: PriorityType
  className?: string
  showLabel?: boolean
}

const priorityConfig = {
  1: {
    label: 'P1',
    color: 'destructive',
    bg: 'bg-destructive/10',
    text: 'text-destructive',
    border: 'border-destructive/30',
  },
  2: {
    label: 'P2',
    color: 'warning',
    bg: 'bg-orange-500/10',
    text: 'text-orange-600 dark:text-orange-500',
    border: 'border-orange-500/30',
  },
  3: {
    label: 'P3',
    color: 'primary',
    bg: 'bg-primary/10',
    text: 'text-primary',
    border: 'border-primary/30',
  },
  4: {
    label: 'P4',
    color: 'muted',
    bg: 'bg-muted',
    text: 'text-muted-foreground',
    border: 'border-border',
  },
} as const

const PriorityBadge: FC<PriorityBadgePropsType> = ({
  priority,
  className,
  showLabel = true,
}) => {
  const config = priorityConfig[priority]

  if (!showLabel) {
    return (
      <div
        className={cn(
          'h-2 w-2 rounded-full border',
          config.bg,
          config.border,
          className
        )}
        title={`Priority ${priority}`}
      />
    )
  }

  return (
    <Badge
      className={cn(
        'px-2 py-0.5 text-xs font-medium',
        config.bg,
        config.text,
        config.border,
        className
      )}
      variant="outline"
    >
      {config.label}
    </Badge>
  )
}


export {
  PriorityBadge
}