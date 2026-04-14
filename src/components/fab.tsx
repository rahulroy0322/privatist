import { RiAddLargeLine } from '@remixicon/react'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'

type FabPropsType = {
  onClick?: () => void
}

const Fab: FC<FabPropsType> = (props) => (
  <Button
    className="fixed bottom-6 right-6"
    size="icon-lg"
    {...props}
  >
    <RiAddLargeLine />
  </Button>
)

export { Fab }
