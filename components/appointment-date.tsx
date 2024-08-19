import { Appointment } from "@/types"
import { ControllerRenderProps } from "react-hook-form"
import { useMediaQuery } from "usehooks-ts"

import { cn, formatDateWithTime } from "@/lib/utils"

import { Icons } from "./shared/icons"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
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
import { Separator } from "./ui/separator"
import { TimePickerDemo } from "./ui/time-picker-demo"

interface AppointmentDateProps {
  field: ControllerRenderProps<Appointment, "date">
}

export const AppointmentDate = ({ field }: AppointmentDateProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            click="static"
            className={cn("px-3", !field.value && "text-muted-foreground")}
          >
            {field.value ? (
              formatDateWithTime(field.value)
            ) : (
              <span>Виберіть дату</span>
            )}

            <Icons.calendar className="ml-auto opacity-50" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>

          <div className="flex flex-col items-center">
            <Calendar
              initialFocus
              mode="single"
              captionLayout="dropdown-buttons"
              fromYear={1990}
              toYear={new Date().getFullYear()}
              selected={field.value}
              onSelect={field.onChange}
            />

            <Separator />

            <div className="py-3">
              <TimePickerDemo setDate={field.onChange} date={field.value} />
            </div>
          </div>
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
            className={cn("px-3", !field.value && "text-muted-foreground")}
          >
            {field.value ? (
              formatDateWithTime(field.value)
            ) : (
              <span>Виберіть дату</span>
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

        <div className="border-t border-border p-3">
          <TimePickerDemo setDate={field.onChange} date={field.value} />
        </div>
      </PopoverContent>
    </Popover>
  )
}