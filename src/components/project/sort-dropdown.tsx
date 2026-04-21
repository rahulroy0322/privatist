import { RiArrowUpDownLine } from '@remixicon/react'
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

export type SortType =
  | 'due-date-asc'
  | 'due-date-desc'
  | 'priority-desc'
  | 'created-desc'
  | 'title-asc'

type SortDropdownPropsType = {
  value: SortType
  onChange: (value: SortType) => void
  className?: string
}

const sortOptions: Array<{
  value: SortType
  label: string
}> = [
  { value: 'due-date-asc', label: 'Due Date (Earliest)' },
  { value: 'due-date-desc', label: 'Due Date (Latest)' },
  { value: 'priority-desc', label: 'Priority (Highest)' },
  { value: 'created-desc', label: 'Created (Newest)' },
  { value: 'title-asc', label: 'Title (A-Z)' },
]

const SortDropdown: FC<SortDropdownPropsType> = ({
  value,
  onChange,
  className,
}) => {
  const selectedOption = sortOptions.find((opt) => opt.value === value)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label="Sort tasks"
            className={cn('gap-2', className)}
            variant="outline"
          >
            <RiArrowUpDownLine className="size-4" />
            <span>{selectedOption?.label || 'Sort'}</span>
          </Button>
        }
      />
      <DropdownMenuContent
        align="start"
        className="w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SortDropdown }
