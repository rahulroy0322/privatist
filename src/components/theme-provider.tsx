import type { FC } from 'react'
import { createContext, use, useEffect, useState } from 'react'

type ThemeType = 'dark' | 'light' | 'system'

type ThemeProviderPropsType = {
  children: React.ReactNode
  defaultTheme?: ThemeType
  storageKey?: string
}

type ThemeProviderStateType = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeProviderContext = createContext<ThemeProviderStateType | null>(null)

const ThemeProvider: FC<ThemeProviderPropsType> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (globalThis || window) {
      const old = (globalThis || window).localStorage?.getItem(storageKey)
      if (old) {
        return old as ThemeType
      }
    }
    return defaultTheme
  })

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

  const value = {
    theme: 'system' as const,
    setTheme: (theme: ThemeType) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext
      {...props}
      value={value}
    >
      {children}
    </ThemeProviderContext>
  )
}

const useTheme = () => {
  const context = use(ThemeProviderContext)

  if (!context) {
    throw new Error('"useTheme" must be used within a <ThemeProvider>')
  }

  return context
}

export { ThemeProvider, useTheme }
