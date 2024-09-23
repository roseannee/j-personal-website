import { FieldValues, Path } from "react-hook-form"
import { useMediaQuery } from "usehooks-ts"

import { FormFieldProps } from "@/types/form-props"
import { cn, formatDate } from "@/lib/utils"

import { Icons } from "../shared/icons"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"
import { FormControl } from "./form"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export const DateSelector = <
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  field,
}: FormFieldProps<TFieldValues, TFieldName>) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              click="static"
              className={cn("px-3", !field.value && "text-muted-foreground")}
            >
              {field.value ? formatDate(field.value) : "Виберіть дату"}

              <Icons.calendar className="ml-auto opacity-50" />
            </Button>
          </FormControl>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>

          <Calendar
            initialFocus
            mode="single"
            captionLayout="dropdown-buttons"
            fromYear={1990}
            toYear={new Date().getFullYear() + 1}
            selected={field.value}
            onSelect={field.onChange}
            className="*:items-center"
          />
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
            {field.value ? formatDate(field.value) : "Виберіть дату"}

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
          toYear={new Date().getFullYear() + 1}
          selected={field.value}
          onSelect={field.onChange}
        />
      </PopoverContent>
    </Popover>
  )
}
