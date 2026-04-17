import { RiSearchLine } from '@remixicon/react'
import { type FC, useEffect, useState } from 'react'
import { TodoItem } from '@/components/todo/todo-item'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useSearchTodos } from '@/hooks/use-search-todos'
import { toggleTodo } from '@/services/todo'
import {
  setOpenCommandDialog,
  useCommandDialogStore,
} from '@/stores/command-dialog-store'
import type { TodoType } from '@/types'

const CommandDialogEmptyState: FC = () => (
  <CommandEmpty>
    <div className="flex flex-col items-center gap-2 py-4">
      <RiSearchLine className="size-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">No todos found</p>
    </div>
  </CommandEmpty>
)

type CommandDialogTodosStatePropsType = {
  todos: TodoType[]
}

const CommandDialogTodosState: FC<CommandDialogTodosStatePropsType> = ({
  todos,
}) => (
  <CommandGroup
    className="space-y-2"
    heading="Todos"
  >
    {todos.map((todo) => (
      <CommandItem
        className="border-b-primary border-b last:border-b-0"
        key={todo.id}
        onSelect={() => toggleTodo(todo.id!)}
      >
        <TodoItem todo={todo} />
        <span className="sr-only">
          {todo.title} {todo.description}
        </span>
      </CommandItem>
    ))}
  </CommandGroup>
)

const CommandDialogComponent: FC = () => {
  const open = useCommandDialogStore((state) => state.open)
  const [searchQuery, setSearchQuery] = useState('')
  const todos = useSearchTodos(searchQuery)

  useEffect(() => {
    if (!open) {
      setSearchQuery('')
    }
  }, [open])

  return (
    <CommandDialog
      onOpenChange={setOpenCommandDialog}
      open={open}
    >
      <Command>
        <CommandInput
          onValueChange={setSearchQuery}
          placeholder="Search todos..."
          value={searchQuery}
        />
        <CommandList>
          {searchQuery ? (
            todos.length ? (
              <CommandDialogTodosState todos={todos} />
            ) : (
              <CommandDialogEmptyState />
            )
          ) : null}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}

export { CommandDialogComponent }
