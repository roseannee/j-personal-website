"use client"

import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"

import { AppointmentData } from "@/types/appointment-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { UpdateAppointmentForm } from "./update-appointment-form"

export interface UpdateAppointmentProps {
  appointment: AppointmentData
}

export const UpdateAppointment = ({ appointment }: UpdateAppointmentProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            click="static"
            className="w-full justify-start px-2 py-1.5"
          >
            Оновити
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Оновити дані прийому</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>

          <div className="p-4 pt-0">
            <UpdateAppointmentForm
              appointment={appointment}
              onClose={handleClose}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          click="static"
          className="w-full justify-start px-2 py-1.5"
        >
          Оновити
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оновити дані прийому</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <UpdateAppointmentForm
          appointment={appointment}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}
