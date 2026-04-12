import type { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type HomeCTASectionPropsType = {
  handleGetStarted: () => void
  isLoading: boolean
}

const HomeCTASection: FC<HomeCTASectionPropsType> = ({
  handleGetStarted,
  isLoading,
}) => (
  <section className="py-20 px-4 text-center">
    <div className="max-w-2xl mx-auto">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            Ready to take control of your tasks?
          </CardTitle>
          <p className="text-muted-foreground">
            Join thousands who trust Privatist with their productivity.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              className="w-full py-6 text-lg"
              disabled={isLoading}
              onClick={handleGetStarted}
              size="lg"
            >
              {isLoading ? 'Loading...' : 'Get Started for Free'}
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required. Your data stays with you.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
)

export { HomeCTASection }
