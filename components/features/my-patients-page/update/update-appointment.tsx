"use client"

import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"

import { AppointmentData } from "@/types/appointment-data"
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
import { ButtonTrigger } from "@/components/shared/button-trigger"

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
          <ButtonTrigger>Оновити</ButtonTrigger>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Оновити дані прийому</DrawerTitle>
            <DrawerDescription className="hidden" />
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
        <ButtonTrigger>Оновити</ButtonTrigger>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оновити дані прийому</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <UpdateAppointmentForm
          appointment={appointment}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}
