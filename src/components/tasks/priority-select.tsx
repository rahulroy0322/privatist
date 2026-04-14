import type { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFieldContext } from '../form/main'
import { FormBase, type FormControllPropsType } from '../form/ui/base'
import {
  PriorityBadge,
  PriorityText,
  type PriorityType,
  priorityConfig,
} from './priority-badge'

type PrioritySelectPropsType = FormControllPropsType

const PrioritySelect: FC<PrioritySelectPropsType> = ({
  label,
  description,
  ...props
}) => {
  const field = useFieldContext<PriorityType>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  const priority = field.state.value

  return (
    <FormBase
      description={description}
      label={label}
    >
      <Select
        onValueChange={field.handleChange as () => void}
        value={field.state.value}
        {...props}
      >
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
        >
          <SelectValue>
            {field.state.value && (
              <div className="flex items-center gap-2">
                <PriorityBadge priority={field.state.value} />

                {priorityConfig[priority]}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
        >
          {Object.keys(priorityConfig).map((key) => (
            <SelectItem
              className={'p-0'}
              key={key}
              value={key}
            >
              <PriorityText
                className="hover:bg-primary/50 flex w-full h-full p-2 items-center gap-1 font-semibold"
                priority={Number(key) as PriorityType}
              >
                <PriorityBadge priority={Number(key) as PriorityType} />

                {priorityConfig[key as unknown as keyof typeof priorityConfig]}
              </PriorityText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormBase>
  )
}

export { PrioritySelect }
