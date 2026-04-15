import type { FC } from 'react'
import { Input } from '@/components/ui/input'
import { useFieldContext } from '../main'
import { FormBase, type FormControllPropsType } from './base'

type FormInputPropsType = FormControllPropsType & Parameters<typeof Input>[0]

const FormInput: FC<FormInputPropsType> = ({
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
      <Input
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

export { FormInput }
