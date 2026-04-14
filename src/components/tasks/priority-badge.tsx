// REMOVE!

import { RiFlag2Line } from '@remixicon/react'
import type { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type PriorityType = keyof typeof priorityConfig

type PriorityBadgePropsType = {
  priority: PriorityType
}

const priorityConfig = {
  1: 'Critical',
  2: 'Alert',
  3: 'Elevated',
  4: 'Standby',
} as const

const PriorityBadge: FC<PriorityBadgePropsType> = ({ priority }) => (
  <RiFlag2Line
    className={cn('size-4', {
      'text-destructive': priority === 1,
      'text-amber-600': priority === 2,
      'text-primary': priority === 3,
      'text-muted-foreground': priority === 4,
    })}
  />
)

type PriorityTextPropsType = PriorityBadgePropsType & {
  children?: ReactNode
  className?: string
}

const PriorityText: FC<PriorityTextPropsType> = ({
  priority,
  className,
  children = priorityConfig[priority],
}) => (
  <span
    className={cn(
      {
        'text-destructive bg-destructive/20': priority === 1,
        'bg-amber-500/20 text-amber-600': priority === 2,
        'text-primary bg-pritext-primary/20': priority === 3,
        'text-muted-foreground bg-mutext-muted-foreground/20': priority === 4,
      },
      className
    )}
  >
    {children}
  </span>
)

export type { PriorityType }

export { PriorityBadge, PriorityText, priorityConfig }
