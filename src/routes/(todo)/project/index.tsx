import { createFileRoute } from '@tanstack/react-router'

const Route = createFileRoute('/(todo)/project/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/project/"!</div>
}

export { Route }
