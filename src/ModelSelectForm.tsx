import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  MultiSelect,
  MultiSelectClear,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"

const modelSelectSchema = z.object({
  models: z.array(z.string()).min(1, "Select at least one model"),
})

type ModelSelectFormValues = z.infer<typeof modelSelectSchema>

function ModelSelectForm() {
  const form = useForm<ModelSelectFormValues>({
    resolver: zodResolver(modelSelectSchema),
    defaultValues: {
      models: [],
    },
  })

  const onSubmit = (values: ModelSelectFormValues) => {
    console.log("Submitted models:", values.models)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 px-4">
      <Controller
        control={form.control}
        name="models"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <Label htmlFor="model-select">Models</Label>
            <MultiSelect value={field.value} onValueChange={field.onChange}>
              <MultiSelectTrigger id="model-select">
                <MultiSelectValue placeholder="Choose models" />
              </MultiSelectTrigger>
              <MultiSelectContent>
                <MultiSelectLabel>Available Models</MultiSelectLabel>
                <MultiSelectItem value="gpt-4">gpt-4</MultiSelectItem>
                <MultiSelectItem value="claude-3">claude-3</MultiSelectItem>
                <MultiSelectItem value="llama-3">llama-3</MultiSelectItem>
                <MultiSelectItem value="mistral-large">mistral-large</MultiSelectItem>
                <MultiSelectSeparator />
                <MultiSelectClear />
              </MultiSelectContent>
            </MultiSelect>
            {fieldState.error ? (
              <p className="text-destructive text-sm">{fieldState.error.message}</p>
            ) : null}
          </div>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default ModelSelectForm
