import { useState } from "react"
import { deletePatient } from "@/actions/db-delete.actions"
import { toast } from "sonner"
import { useMediaQuery } from "usehooks-ts"

import { ButtonStatus } from "@/types/button-status"
import { FutureAppointmentWithImages } from "@/types/future-appointment"
import { PatientBrief } from "@/types/patient-brief"
import { ButtonTrigger } from "@/components/ui/button-trigger"
import { CloseButton } from "@/components/ui/close-button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SubmitDeleteButton } from "@/components/ui/submit-delete-button"
import { Typography } from "@/components/ui/typography"

interface DeletePatientProps {
  patientId: PatientBrief["id"]
  fullName: PatientBrief["fullName"]
  images: FutureAppointmentWithImages["imageUrl"]
}

export const DeletePatient = ({
  patientId,
  fullName,
  images,
}: DeletePatientProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [status, setStatus] = useState<ButtonStatus>("idle")
  const [open, setOpen] = useState(false)

  async function handleSubmit() {
    setStatus("loading")

    images.forEach(async (url) => {
      await fetch(`/api/images?url=${url}`, {
        method: "DELETE",
      }).catch((error) => {
        toast.error(`Щось пішло не так: ${error}.`)
        return
      })
    })

    const res = await deletePatient(patientId)

    setStatus("idle")

    if (res.success) {
      toast.success("Пацієнта скасовано успішно!")
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }
  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <ButtonTrigger>Видалити</ButtonTrigger>
        </DrawerTrigger>

        <DrawerContent>
          <div className="flex flex-col space-y-2">
            <DrawerHeader className="pb-0 text-left">
              <DrawerTitle>Видалити?</DrawerTitle>
              <DrawerDescription className="hidden" />
            </DrawerHeader>

            <Content fullName={fullName} className="px-4" />
          </div>

          <DrawerFooter className="flex flex-row justify-end space-x-2">
            <DrawerClose asChild>
              <CloseButton />
            </DrawerClose>

            <SubmitDeleteButton status={status} handleSubmit={handleSubmit} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ButtonTrigger>Видалити</ButtonTrigger>
      </DialogTrigger>

      <DialogContent>
        <div className="flex flex-col space-y-2">
          <DialogHeader>
            <DialogTitle>Видалити?</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>

          <Content fullName={fullName} />
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>

          <SubmitDeleteButton status={status} handleSubmit={handleSubmit} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Content = ({
  fullName,
  className,
}: {
  fullName: string
  className?: string
}) => {
  return (
    <Typography className={className}>
      Чи видалити пацієнта <span className="font-semibold">{fullName}</span>?
    </Typography>
  )
}
