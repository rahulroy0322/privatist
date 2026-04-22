import { type FC } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const ProjectLoadingState: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {[1, 2, 3].map((i) => (
        <Skeleton
          className="h-40 rounded-4xl"
          key={i}
        />
      ))}
    </div>
  )
}

export { ProjectLoadingState }
