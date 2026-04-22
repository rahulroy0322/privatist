import {
  createFileRoute,
  type UseNavigateResult,
  useNavigate,
} from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC, useEffect, useState } from 'react'
import { HomeCTASection } from '@/components/home/cta'
import { HomeFeatureSection } from '@/components/home/feature'
import { HomeHeroSection } from '@/components/home/hero'
import { db } from '@/lib/db'
import type { TodoType } from '@/types'

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

const loadDefaultProjects = async () => {
  const now = Date.now()
  const defaultProjects = [
    {
      id: 1,
      name: 'Personal',
      icon: '🏡',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 2,
      name: 'Work',
      icon: '💼',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 3,
      name: 'Learning',
      icon: '📚',
      createdAt: now,
      updatedAt: now,
    },
  ]

  await db.projects.bulkAdd(defaultProjects)
}

const completeOnboarding = async () => {
  await loadDemoTodos()
  await loadDefaultProjects()
  await db.settings.put({ key: 'onboarding', value: true })
}

type CheckOnBoardingPropsType = {
  navigate: UseNavigateResult<string>
}

const CheckOnBoarding: FC<CheckOnBoardingPropsType> = ({ navigate }) => {
  const onBoarding = useLiveQuery(() => db.settings.get('onboarding'))

  useEffect(() => {
    if (onBoarding?.value) {
      navigate({ to: '/inbox' })
    }
  }, [onBoarding, navigate])

  return null
}

const HomePage: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = async () => {
    setIsLoading(true)
    try {
      await completeOnboarding()
      navigate({ to: '/inbox' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CheckOnBoarding navigate={navigate} />

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
const Route = createFileRoute('/')({
  component: HomePage,
})

export { Route }
