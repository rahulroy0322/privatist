import { RiMoonLine, RiSunLine } from '@remixicon/react'
import { useHotkey } from '@tanstack/react-hotkeys'
import type { FC } from 'react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'
import { db } from '@/lib/db'
import type { ThemeType } from '@/types'

const setTheme = (theme: ThemeType) => {
  db.settings.put({ key: 'theme', value: theme })
}

const ModeWrapper: FC = () => {
  const { theme } = useTheme()

  useHotkey(
    'Mod+Shift+T',
    (e) => {
      e.preventDefault()
      const themes: ThemeType[] = ['light', 'dark', 'system']
      const currentIndex = themes.indexOf(theme)
      const nextTheme = themes[(currentIndex + 1) % themes.length]
      setTheme(nextTheme)
    },
    {
      meta: {
        name: 'Toggle Theme',
        description: 'Cycle through light, dark, and system themes',
      },
    }
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return null
}

const ModeToggle: FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button
          size="icon-sm"
          variant="ghost"
        />
      }
    >
      <RiSunLine className="size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <RiMoonLine className="absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => setTheme('light')}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export { ModeToggle, ModeWrapper }
