import { Appointment } from "@/types"
import { ControllerRenderProps } from "react-hook-form"
import { useMediaQuery } from "usehooks-ts"

import { MedicationData } from "@/types/appointment-data"
import { cn } from "@/lib/utils"

import { Icons } from "./shared/icons"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { FormControl } from "./ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface MedicationSelectorProps {
  field: ControllerRenderProps<Appointment, "medication">
  medications: MedicationData[]
  handleMedicationSelect: (medication: string) => void
}

export const MedicationSelector = ({
  field,
  medications,
  handleMedicationSelect,
}: MedicationSelectorProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            click="static"
            className={cn(
              "relative justify-between overflow-hidden truncate px-3",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? medications.find(
                  (medication) => medication.name === field.value
                )?.name
              : "Виберіть препарат"}

            <Icons.chevrons className="absolute inset-y-3 right-3 opacity-50" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>

          <Command>
            <CommandInput placeholder="Знайти препарат..." />

            <CommandList>
              <CommandEmpty>Нічого не знайдено.</CommandEmpty>

              <CommandGroup>
                {medications.map((medication) => (
                  <CommandItem
                    value={`medication-${medication.name}`}
                    key={medication.name}
                    onSelect={() => handleMedicationSelect(medication.name)}
                  >
                    {medication.name}

                    <Icons.check
                      className={cn(
                        "ml-auto",
                        medication.name === field.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DrawerContent>
      </Drawer>
    )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            click="static"
            className={cn(
              "relative justify-between px-3",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? medications.find(
                  (medication) => medication.name === field.value
                )?.name
              : "Виберіть препарат"}

            <Icons.chevrons className="absolute inset-y-3 right-3 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Знайти препарат..." />

          <CommandList>
            <CommandEmpty>Нічого не знайдено.</CommandEmpty>

            <CommandGroup>
              {medications.map((medication) => (
                <CommandItem
                  value={`medication-${medication.name}`}
                  key={medication.name}
                  onSelect={() => handleMedicationSelect(medication.name)}
                >
                  {medication.name}

                  <Icons.check
                    className={cn(
                      "ml-auto",
                      medication.name === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
