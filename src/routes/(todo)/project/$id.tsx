import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(todo)/project/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(base)/project/$/id"!</div>
}
