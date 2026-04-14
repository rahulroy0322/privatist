import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { FormInput } from './ui/input'
import { FormSelect } from './ui/select'
import { FormTextarea } from './ui/textarea'

const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Textarea: FormTextarea,
    Select: FormSelect,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

export { useAppForm, useFieldContext }
