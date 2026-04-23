import { TanStackDevtools } from '@tanstack/react-devtools'
import { hotkeysDevtoolsPlugin } from '@tanstack/react-hotkeys-devtools'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import type { FC, ReactNode } from 'react'
import { ModeWrapper } from '@/components/theme/main'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

type RootLayoutPropsType = {
  children: ReactNode
}

const RootLayout: FC<RootLayoutPropsType> = ({ children }) => (
  <html
    lang="en"
    suppressHydrationWarning
  >
    <head>
      <HeadContent />
    </head>
    <body className="font-sans antialiased">
      <TooltipProvider>
        <ModeWrapper />
        {children}
        <Toaster
          closeButton
          richColors
        />
      </TooltipProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          hotkeysDevtoolsPlugin(),
        ]}
      />
      <Scripts />
    </body>
  </html>
)

const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content:
          'Privatist - Your personal productivity companion for managing tasks, projects, and staying organized.',
      },
      {
        title: 'Privatist',
      },
    ],
  }),
  shellComponent: RootLayout as ({
    children,
  }: {
    children: ReactNode
  }) => ReactNode,
})

export { Route }
