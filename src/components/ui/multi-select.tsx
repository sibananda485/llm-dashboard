import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type MultiSelectContextValue = {
  value: string[]
  onValueChange: (nextValue: string[]) => void
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | null>(
  null
)

function useMultiSelectContext(componentName: string) {
  const context = React.useContext(MultiSelectContext)

  if (!context) {
    throw new Error(`${componentName} must be used within MultiSelect`)
  }

  return context
}

type MultiSelectProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (nextValue: string[]) => void
}

function MultiSelect({
  value,
  defaultValue = [],
  onValueChange,
  children,
  ...props
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
  const isControlled = value !== undefined
  const selectedValues = isControlled ? value : internalValue

  const handleValueChange = React.useCallback(
    (nextValue: string[]) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }

      onValueChange?.(nextValue)
    },
    [isControlled, onValueChange]
  )

  return (
    <MultiSelectContext.Provider
      value={{ value: selectedValues, onValueChange: handleValueChange }}
    >
      <DropdownMenuPrimitive.Root data-slot="multi-select" {...props}>
        {children}
      </DropdownMenuPrimitive.Root>
    </MultiSelectContext.Provider>
  )
}

function MultiSelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="multi-select-trigger"
      className={cn(
        "border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 inline-flex h-9 w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-muted-foreground size-4 opacity-50" />
    </DropdownMenuPrimitive.Trigger>
  )
}

function MultiSelectValue({
  className,
  placeholder = "Select options",
  maxVisible = 2,
  ...props
}: React.ComponentProps<"span"> & {
  placeholder?: string
  maxVisible?: number
}) {
  const { value } = useMultiSelectContext("MultiSelectValue")

  if (!value.length) {
    return (
      <span
        data-slot="multi-select-value"
        className={cn("text-muted-foreground", className)}
        {...props}
      >
        {placeholder}
      </span>
    )
  }

  const visibleValues = value.slice(0, maxVisible)
  const hiddenCount = value.length - visibleValues.length

  return (
    <span
      data-slot="multi-select-value"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      {visibleValues.map((item) => (
        <span
          key={item}
          className="bg-muted text-muted-foreground inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs"
        >
          {item}
        </span>
      ))}
      {hiddenCount > 0 ? (
        <span className="text-muted-foreground text-xs">+{hiddenCount}</span>
      ) : null}
    </span>
  )
}

function MultiSelectContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="multi-select-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 min-w-[10rem] rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function MultiSelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="multi-select-label"
      className={cn("px-2 py-1.5 text-xs font-medium", className)}
      {...props}
    />
  )
}

function MultiSelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="multi-select-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function MultiSelectItem({
  className,
  children,
  value,
  onSelect,
  onCheckedChange,
  ...props
}: Omit<React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>, "checked"> & {
  value: string
}) {
  const { value: selectedValues, onValueChange } =
    useMultiSelectContext("MultiSelectItem")

  const isChecked = selectedValues.includes(value)

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="multi-select-item"
      checked={isChecked}
      onCheckedChange={(checked) => {
        const nextValue = checked
          ? [...selectedValues, value]
          : selectedValues.filter((item) => item !== value)

        onValueChange(nextValue)
        onCheckedChange?.(checked)
      }}
      onSelect={(event) => {
        event.preventDefault()
        onSelect?.(event)
      }}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function MultiSelectClear({
  className,
  children = "Clear",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  const { onValueChange } = useMultiSelectContext("MultiSelectClear")

  return (
    <DropdownMenuPrimitive.Item
      data-slot="multi-select-clear"
      className={cn(
        "text-muted-foreground focus:bg-accent focus:text-accent-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        className
      )}
      onSelect={(event) => {
        event.preventDefault()
        onValueChange([])
      }}
      {...props}
    >
      <XIcon className="size-4" />
      {children}
    </DropdownMenuPrimitive.Item>
  )
}

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectItem,
  MultiSelectClear,
}
