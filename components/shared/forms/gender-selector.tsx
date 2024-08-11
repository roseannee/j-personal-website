import { PatientSchema } from "@/types"
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { genders } from "@/types/gender"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { FormControl } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { GenderList } from "./gender-list"

interface GenderSelectorProps {
  form: UseFormReturn<z.infer<typeof PatientSchema>>
  field: ControllerRenderProps<z.infer<typeof PatientSchema>, "gender">
}

export const GenderSelector = ({ form, field }: GenderSelectorProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild className="hidden md:block">
          <FormControl>
            <Button
              variant="outline"
              click="static"
              role="combobox"
              className={cn(
                "px-3 text-left",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? genders.find((g) => g.value === field.value)?.label
                : "Select gender"}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <GenderList form={form} field={field} />
        </PopoverContent>
      </Popover>

      <Drawer>
        <DrawerTrigger asChild className="md:hidden">
          <FormControl>
            <Button
              variant="outline"
              click="static"
              role="combobox"
              className={cn(
                "justify-start px-3",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? genders.find((g) => g.value === field.value)?.label
                : "Select gender"}
            </Button>
          </FormControl>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <GenderList form={form} field={field} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
