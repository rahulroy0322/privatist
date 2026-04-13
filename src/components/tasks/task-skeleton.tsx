import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import type { FC } from "react"

type TaskSkeletonPropsType = {
  count?: number
  className?: string
}

const TaskSkeleton: FC<TaskSkeletonPropsType> = ({ count = 3, className }) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
        key={i.toString()}
      >
        <Skeleton className="size-5 rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="size-8 rounded" />
        </div>
      </div>
    ))}
  </div>
)


const TaskListSkeleton: FC = () => (
  <div className="space-y-6 p-4">
    {/* Today section skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <TaskSkeleton count={2} />
    </div>
    {/* Upcoming section skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <TaskSkeleton count={1} />
    </div>
    {/* No date section skeleton */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <TaskSkeleton count={1} />
    </div>
  </div>
)

export {
  TaskListSkeleton
}
