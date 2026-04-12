// import {ThemeToggle} from '@/components/ThemeToggle'

import { createFileRoute } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="">
      <Button>testing</Button>

      <ModeToggle />
    </main>
  )
}
