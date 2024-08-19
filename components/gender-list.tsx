import { GenderFormProps, genders } from "@/types/gender"
import { cn } from "@/lib/utils"

import { Icons } from "./shared/icons"
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command"

export const GenderList = ({ form, field }: GenderFormProps) => {
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
