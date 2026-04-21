import { RiFilterLine } from '@remixicon/react'
import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type FilterType =
  | 'all'
  | 'active'
  | 'completed'
  | 'overdue'
  | 'priority-1'
  | 'priority-2'
  | 'priority-3'
  | 'priority-4'
  | 'today'
  | 'tomorrow'
  | 'this-week'
  | 'no-date'

type FilterDropdownPropsType = {
  value: FilterType
  onChange: (value: FilterType) => void
  className?: string
}

const filterOptions: Array<{
  value: FilterType
  label: string
  group?: string
}> = [
  { value: 'all', label: 'All tasks', group: 'Status' },
  { value: 'active', label: 'Active', group: 'Status' },
  { value: 'completed', label: 'Completed', group: 'Status' },
  { value: 'overdue', label: 'Overdue', group: 'Status' },
  { value: 'priority-1', label: 'Priority 1 (Critical)', group: 'Priority' },
  { value: 'priority-2', label: 'Priority 2 (High)', group: 'Priority' },
  { value: 'priority-3', label: 'Priority 3 (Medium)', group: 'Priority' },
  { value: 'priority-4', label: 'Priority 4 (Low)', group: 'Priority' },
  { value: 'today', label: 'Today', group: 'Due Date' },
  { value: 'tomorrow', label: 'Tomorrow', group: 'Due Date' },
  { value: 'this-week', label: 'This Week', group: 'Due Date' },
  { value: 'no-date', label: 'No Date', group: 'Due Date' },
]

const FilterDropdown: FC<FilterDropdownPropsType> = ({
  value,
  onChange,
  className,
}) => {
  const selectedOption = filterOptions.find((opt) => opt.value === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Filter tasks"
            className={cn('gap-2', className)}
            variant="outline"
          >
            <RiFilterLine className="size-4" />
            <span>{selectedOption?.label || 'Filter'}</span>
          </Button>
        }
      />
      <DropdownMenuContent
        align="start"
        className="w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {['Status', 'Priority', 'Due Date'].map((group) => (
          <DropdownMenuGroup key={group}>
            {filterOptions
              .filter((opt) => opt.group === group)
              .map((option) => (
                <DropdownMenuItem
                  className={cn(
                    'cursor-pointer',
                    value === option.value && 'bg-accent'
                  )}
                  key={option.value}
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export type { FilterType }
export { FilterDropdown }
