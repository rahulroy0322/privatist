import { RiCloseLine, RiFilterLine, RiSearchLine } from '@remixicon/react'
import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ProjectFilterType = 'all' | 'active' | 'completed' | 'overdue'

type ProjectSearchBarPropsType = {
  searchQuery: string
  filterType: ProjectFilterType
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  onFilterChange: (filter: ProjectFilterType) => void
  onCreateProject: () => void
}

const ProjectSearchBar: FC<ProjectSearchBarPropsType> = ({
  searchQuery,
  filterType,
  onSearchChange,
  onClearSearch,
  onFilterChange,
  onCreateProject,
}) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative flex-1">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          className="pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          value={searchQuery}
        />
        {searchQuery && (
          <Button
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={onClearSearch}
            size="icon-xs"
            variant="ghost"
          >
            <RiCloseLine />
          </Button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className={cn(
                filterType !== 'all' && 'bg-primary text-primary-foreground'
              )}
              size="icon"
              variant="outline"
            />
          }
        >
          <RiFilterLine />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className={cn(filterType === 'all' && 'bg-muted')}
            onClick={() => onFilterChange('all')}
          >
            All Projects
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(filterType === 'active' && 'bg-muted')}
            onClick={() => onFilterChange('active')}
          >
            Active Projects
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(filterType === 'completed' && 'bg-muted')}
            onClick={() => onFilterChange('completed')}
          >
            Completed Projects
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(filterType === 'overdue' && 'bg-muted')}
            onClick={() => onFilterChange('overdue')}
          >
            Projects with Overdue
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={onCreateProject}>Create Project</Button>
    </div>
  )
}

export { ProjectSearchBar }
