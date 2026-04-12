import { Button } from '@/components/ui/button'
import { RiAddLargeLine } from '@remixicon/react'
import type { FC } from 'react'

type FabPropsType = {
  onClick?: () => void
}

const Fab: FC<FabPropsType> = (props) => <Button size='icon-lg' className='fixed bottom-6 right-6'
  {...props}
>
  <RiAddLargeLine />
</Button>

export {
  Fab
}