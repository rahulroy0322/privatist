import {
  type RemixiconComponentType,
  RiCheckLine,
  RiCloudOffLine,
  RiLockLine,
  RiLoopLeftLine,
} from '@remixicon/react'
import type { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FeatureDataType = {
  Icon: RemixiconComponentType
  title: string
  content: string
}

const data: FeatureDataType[] = [
  {
    Icon: RiCheckLine,
    title: 'Simple & Intuitive',
    content:
      'Clean, minimal interface focused on productivity. No unnecessary features, just what you need to get things done.',
  },
  {
    Icon: RiLockLine,
    title: 'No Account Required',
    content:
      'Start using Privatist immediately without creating an account. No email, no password, no tracking.',
  },
  {
    Icon: RiCloudOffLine,
    title: 'Offline First',
    content:
      'Privatist is designed to work without an internet connection. Your tasks are stored locally on your device using secure IndexedDB technology.',
  },
  {
    Icon: RiLoopLeftLine,
    title: 'Optional Sync',
    content: `When you're ready, enable sync with end-to-end encryption. Your data remains encrypted even in transit.`,
  },
]

const HomeFeatureSection: FC = () => (
  <section className="py-20 px-4 bg-muted/20">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Privatist?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map(({ Icon, title, content }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="text-primary" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

export { HomeFeatureSection }
