import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { type FC, useState } from 'react'
import { HomeCTASection } from '@/components/home/cta'
import { HomeFeatureSection } from '@/components/home/feature'
import { HomeHeroSection } from '@/components/home/hero'
import { db } from '@/lib/db'
import type { TodoType } from '@/lib/types'
import { useSettingsStore } from '@/stores/use-settings-store'

const loadDemoTodos = async () => {
  const now = Date.now()
  const demoTodos: TodoType[] = [
    {
      id: now,
      title: 'Welcome to Privatist!',
      priority: 2,
      dueDate: now,
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: now + 1,
      title: 'Try completing this task',
      priority: 3,
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: now + 2,
      title: 'Drag me to reorder',
      priority: 4,
      completed: false,
      createdAt: now,
      updatedAt: now,
    },
  ]

  await db.todos.bulkAdd(demoTodos)
}

const HomePage: FC = () => {
  const navigate = useNavigate()
  const { setOnboardingComplete } = useSettingsStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = async () => {
    setIsLoading(true)
    try {
      // todo
      await setOnboardingComplete(true)
      await loadDemoTodos()
      navigate({ to: '/inbox' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HomeHeroSection
        handleGetStarted={handleGetStarted}
        isLoading={isLoading}
      />

      <HomeFeatureSection />

      <HomeCTASection
        handleGetStarted={handleGetStarted}
        isLoading={isLoading}
      />
    </main>
  )
}
const Route = createFileRoute('/')({ component: HomePage })

export { Route }
