import { RiCloseLine } from '@remixicon/react'
import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FilterDropdown, type FilterType } from './filter-dropdown'
import { SortDropdown, type SortType } from './sort-dropdown'

type FilterSortBarPropsType = {
  filter: FilterType
  onFilterChange: (value: FilterType) => void
  sort: SortType
  onSortChange: (value: SortType) => void
  onClearFilters?: () => void
  showClearButton?: boolean
  className?: string
}

const FilterSortBar: FC<FilterSortBarPropsType> = ({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  onClearFilters,
  showClearButton = false,
  className,
}) => (
  <div
    className={cn(
      'flex flex-wrap items-center gap-2 px-5 py-3 border-b border-border bg-background',
      className
    )}
  >
    <FilterDropdown
      onChange={onFilterChange}
      value={filter}
    />
    <SortDropdown
      onChange={onSortChange}
      value={sort}
    />
    {showClearButton && onClearFilters && (
      <Button
        className="gap-1.5 text-muted-foreground hover:text-foreground"
        onClick={onClearFilters}
        size="sm"
        variant="ghost"
      >
        <RiCloseLine className="size-4" />
        <span>Clear</span>
      </Button>
    )}
  </div>
)

export { FilterSortBar }
