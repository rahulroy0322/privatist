import { type FC, type ReactNode } from 'react'

type TodoListPageWrapperPropsType = {
  children: ReactNode
  title: string
}

const TodoListPageWrapper: FC<TodoListPageWrapperPropsType> = ({
  title,
  children,
}) => (
  <div>
    <h2 className="sticky z-40 top-0 bg-background container mx-auto px-5 py-2">
      {title}
    </h2>
    <div className="container mx-auto p-5">{children}</div>
  </div>
)

export { TodoListPageWrapper }
