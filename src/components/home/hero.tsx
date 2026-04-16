import {
  type RemixiconComponentType,
  RiCloudOffLine,
  RiLoaderLine,
  RiLockLine,
  RiShieldLine,
} from '@remixicon/react'
import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FeatureDataType = {
  Icon: RemixiconComponentType
  title: string
  content: string
}

const data: FeatureDataType[] = [
  {
    Icon: RiShieldLine,
    title: 'Privacy First',
    content: 'Your data never leaves your device unless you choose to sync.',
  },
  {
    Icon: RiLockLine,
    title: 'No Account Required',
    content: 'Start using immediately without creating an account',
  },
  {
    Icon: RiCloudOffLine,
    title: 'Works Offline',
    content: 'No internet? No problem. Your todos are always accessible.',
  },
]

type HomeHeroSectionPropsType = {
  handleGetStarted: () => void
  isLoading: boolean
}

const HomeHeroSection: FC<HomeHeroSectionPropsType> = ({
  handleGetStarted,
  isLoading,
}) => (
  <section className="py-20 px-4 text-center">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
        <span className="block">Your todos,</span>
        <span className="block">your device,</span>
        <span className="block text-primary">your choice to sync.</span>
      </h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
        A privacy-first todo manager that works 100% offline by default. Your
        data stays on your device unless you choose to sync.
      </p>

      <div className="flex justify-center mb-16">
        <Button
          aria-busy={isLoading}
          className="px-12 py-6 text-lg font-medium"
          disabled={isLoading}
          onClick={handleGetStarted}
          size="lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-1">
              <RiLoaderLine
                aria-label="Loading"
                className="size-4 animate-spin animation-duration-[2.5s]"
              />
              <span>Getting started...</span>
            </span>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {data.map(({ Icon, content, title }) => (
          <Card
            className="bg-transparent shadow-none ring ring-primary"
            key={title}
          >
            <CardHeader>
              <CardTitle>
                <Icon className="size-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{title}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

export { HomeHeroSection }
