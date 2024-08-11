import { PatientSchema } from "@/types"
import { format } from "date-fns"
import { ControllerRenderProps } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/shared/icons"

interface DobSelectorProps {
  field: ControllerRenderProps<z.infer<typeof PatientSchema>, "birthdate">
}

export const DobSelector = ({ field }: DobSelectorProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            click="static"
            className={cn("px-3", !field.value && "text-muted-foreground")}
          >
            {field.value ? (
              format(field.value, "dd.MM.yyyy")
            ) : (
              <span>Pick a date</span>
            )}

            <Icons.calendar className="ml-auto opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={1990}
          toYear={new Date().getFullYear()}
          selected={field.value}
          onSelect={field.onChange}
        />
      </PopoverContent>
    </Popover>
  )
}
