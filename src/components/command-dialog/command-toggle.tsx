import { RiSearchLine } from '@remixicon/react'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import { toggleCommandDialog } from '@/stores/command-dialog-store'

type SearchTogglePropsType = Parameters<typeof Button>[0]

const SearchToggle: FC<SearchTogglePropsType> = (props) => (
  <Button
    {...props}
    aria-label="Search todos"
    onClick={toggleCommandDialog}
    size="icon-sm"
    variant="ghost"
  >
    {props.children}
    <RiSearchLine className="size-5" />
  </Button>
)

export { SearchToggle }
