import type { FC } from 'react'
import { useFieldContext } from '@/components/form/main'
import { FormBase, type FormControllPropsType } from '@/components/form/ui/base'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

  const handleChange = (value: PriorityType | null) =>
    field.handleChange(Number(value) as PriorityType)

  return (
    <FormBase
      description={description}
      label={label}
    >
      <Select
        onValueChange={handleChange}
        value={field.state.value}
        {...props}
      >
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          render={<PriorityText priority={priority} />}
        >
          <SelectValue>
            {priority ? (
              <>
                <PriorityBadge priority={priority} />

                {priorityConfig[priority]}
              </>
            ) : null}
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

                {priorityConfig[Number(key) as PriorityType]}
              </PriorityText>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormBase>
  )
}

export { PrioritySelect }
