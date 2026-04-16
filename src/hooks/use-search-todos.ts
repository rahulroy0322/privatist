import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import { db } from '@/lib/db'

const useSearchTodos = (searchQuery: string) => {
  const allTodos = useLiveQuery(() => db.todos.toArray(), [])

  const filteredTodos = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }

    const query = searchQuery.toLowerCase()

    return (
      allTodos?.filter((todo) => {
        const titleMatch = todo.title?.toLowerCase().includes(query)
        const descriptionMatch = todo.description?.toLowerCase().includes(query)
        return titleMatch || descriptionMatch
      }) ?? []
    )
  }, [allTodos, searchQuery])

  return filteredTodos
}

export { useSearchTodos }
