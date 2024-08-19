import { Appointment } from "@/types"
import { ControllerRenderProps } from "react-hook-form"
import { useMediaQuery } from "usehooks-ts"

import { ProcedureData } from "@/types/appointment-data"
import { cn } from "@/lib/utils"

import { Icons } from "./shared/icons"
import { Button } from "./ui/button"
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command"
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

interface ProcedureSelectorProps {
  field: ControllerRenderProps<Appointment, "procedure">
  procedures: ProcedureData[]
  handleProcedureSelect: (procedureId: number) => void
}

export const ProcedureSelector = ({
  field,
  procedures,
  handleProcedureSelect,
}: ProcedureSelectorProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            click="static"
            className={cn(
              "justify-between px-3",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? procedures.find((procedure) => procedure.name === field.value)
                  ?.name
              : "Виберіть процедуру"}

            <Icons.chevrons className="ml-2 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>

          <Command className="mt-4 border-t border-border">
            <CommandList>
              <CommandGroup>
                {procedures.map((procedure) => (
                  <CommandItem
                    value={`procedure-${procedure.id}`}
                    key={procedure.id}
                    onSelect={() => handleProcedureSelect(procedure.id)}
                  >
                    {procedure.name}

                    <Icons.check
                      className={cn(
                        "ml-auto",
                        procedure.name === field.value
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
              "justify-between px-3",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? procedures.find((procedure) => procedure.name === field.value)
                  ?.name
              : "Виберіть процедуру"}

            <Icons.chevrons className="ml-2 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {procedures.map((procedure) => (
                <CommandItem
                  value={`procedure-${procedure.id}`}
                  key={procedure.id}
                  onSelect={() => handleProcedureSelect(procedure.id)}
                >
                  {procedure.name}

                  <Icons.check
                    className={cn(
                      "ml-auto",
                      procedure.name === field.value
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
