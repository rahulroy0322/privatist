import type { FC } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useFieldContext } from '../main'
import { FormBase, type FormControllPropsType } from './base'

type FormTextareaPropsType = FormControllPropsType &
  Parameters<typeof Textarea>[0]

const FormTextarea: FC<FormTextareaPropsType> = ({
  label,
  description,
  addon,
  ...props
}) => {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FormBase
      addon={addon}
      description={description}
      label={label}
    >
      <Textarea
        {...props}
        aria-invalid={isInvalid}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        value={field.state.value}
      />
    </FormBase>
  )
}

export { FormTextarea }
