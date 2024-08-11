"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/shared/icons"

import { GeneralInfoCardProps } from "../select/general-info-card"
import { UpdatePatientForm } from "./update-patient-form"

export const UpdatePatient = ({ patient }: GeneralInfoCardProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

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
          <DialogTitle>Update {patient.fullName}&apos;s data</DialogTitle>
        </DialogHeader>

        <UpdatePatientForm patient={patient} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
