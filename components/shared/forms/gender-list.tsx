import { PatientSchema } from "@/types"
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { genders } from "@/types/gender"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/shared/icons"

interface GenderListProps {
  form: UseFormReturn<z.infer<typeof PatientSchema>>
  field: ControllerRenderProps<z.infer<typeof PatientSchema>, "gender">
}

export const GenderList = ({ form, field }: GenderListProps) => {
  return (
    <Command>
      <CommandList>
        <CommandGroup>
          {genders.map((g) => (
            <CommandItem
              key={g.value}
              value={g.value}
              onSelect={() => {
                form.setValue("gender", g.value)
              }}
            >
              {g.label}
              <Icons.check
                className={cn(
                  "ml-auto",
                  g.value === field.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
