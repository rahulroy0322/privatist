import { RiSearchLine } from '@remixicon/react'
import { type FC } from 'react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

type ProjectNoResultsStatePropsType = {
  searchQuery: string
  filterLabel: string
  onClearFilters: () => void
}

const ProjectNoResultsState: FC<ProjectNoResultsStatePropsType> = ({
  searchQuery,
  filterLabel,
  onClearFilters,
}) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RiSearchLine className="size-5" />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          {searchQuery
            ? `No projects match "${searchQuery}"`
            : `No ${filterLabel.toLowerCase()}`}
        </EmptyDescription>
      </EmptyHeader>
      <Button onClick={onClearFilters}>Clear Filters</Button>
    </Empty>
  )
}

export { ProjectNoResultsState }
