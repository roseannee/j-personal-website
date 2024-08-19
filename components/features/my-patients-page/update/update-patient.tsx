"use client"

import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"

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
import { Icons } from "@/components/shared/icons"

import { GeneralInfoCardProps } from "../select/general-info-card"
import { UpdatePatientForm } from "./update-patient-form"

export const UpdatePatient = ({ patient }: GeneralInfoCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="group absolute right-4 top-4 !m-0"
          >
            <Icons.pencil className="opacity-50 transition-opacity group-hover:opacity-100" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Оновити дані пацієнта</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>

          <div className="p-4 pt-0">
            <UpdatePatientForm patient={patient} onClose={handleClose} />
          </div>
        </DrawerContent>
      </Drawer>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group absolute right-4 top-4 !m-0"
        >
          <Icons.pencil className="opacity-50 transition-opacity group-hover:opacity-100" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оновити дані пацієнта</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <UpdatePatientForm patient={patient} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
