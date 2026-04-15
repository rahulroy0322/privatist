import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { type FC, useState } from 'react'
import { HomeCTASection } from '@/components/home/cta'
import { HomeFeatureSection } from '@/components/home/feature'
import { HomeHeroSection } from '@/components/home/hero'
import { useSettingsStore } from '@/stores/use-settings-store'

const HomePage: FC = () => {
  const navigate = useNavigate()
  const { setOnboardingComplete, loadDemoTasks } = useSettingsStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = async () => {
    setIsLoading(true)
    try {
      await setOnboardingComplete(true)
      await loadDemoTasks()
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
