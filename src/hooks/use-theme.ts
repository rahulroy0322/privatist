import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import type { ThemeType } from '@/types'

const useTheme = () => {
  const themeSetting = useLiveQuery(() => db.settings.get('theme'))
  const theme: ThemeType =
    themeSetting?.key === 'theme' ? themeSetting.value : 'system'

  return { theme }
}

export { useTheme }
