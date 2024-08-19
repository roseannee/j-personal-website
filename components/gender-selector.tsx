import { useMediaQuery } from "usehooks-ts"

import { GenderFormProps, genders } from "@/types/gender"
import { cn } from "@/lib/utils"

import { GenderList } from "./gender-list"
import { Button } from "./ui/button"
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

export const GenderSelector = ({ form, field }: GenderFormProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop)
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              click="static"
              className={cn(
                "justify-start px-3",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? genders.find((g) => g.value === field.value)?.label
                : "Виберіть стать"}
            </Button>
          </FormControl>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="hidden">
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>

          <div className="mt-4 border-t border-border">
            <GenderList form={form} field={field} />
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
            className={cn(
              "justify-start px-3",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? genders.find((g) => g.value === field.value)?.label
              : "Виберіть стать"}
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <GenderList form={form} field={field} />
      </PopoverContent>
    </Popover>
  )
}
