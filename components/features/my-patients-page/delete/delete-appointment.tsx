import { useState } from "react"
import { usePathname } from "next/navigation"
import { deleteAppointment } from "@/actions/db-delete.actions"
import { toast } from "sonner"
import { useMediaQuery } from "usehooks-ts"

import { AppointmentData } from "@/types/appointment-data"
import { ButtonStatus } from "@/types/button-status"
import { Button } from "@/components/ui/button"
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
import { Typography } from "@/components/ui/typography"
import { ButtonTrigger } from "@/components/shared/button-trigger"
import { Icons } from "@/components/shared/icons"

interface DeleteAppointmentProps {
  id: AppointmentData["id"]
  procedure: AppointmentData["procedure"]
  medication: AppointmentData["medication"]
}

export const DeleteAppointment = ({
  id,
  procedure,
  medication,
}: DeleteAppointmentProps) => {
  const patientId = usePathname().split("/").pop()!

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [status, setStatus] = useState<ButtonStatus>("idle")
  const [open, setOpen] = useState(false)

  async function handleSubmit(id: number) {
    setStatus("loading")

    const res = await deleteAppointment(id, patientId)

    setStatus("idle")

    if (res.success) {
      toast.success("Прийом скасовано успішно!")
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

            <Content
              procedure={procedure}
              medication={medication}
              className="px-4"
            />
          </div>

          <DrawerFooter className="flex flex-row justify-end space-x-2">
            <DrawerClose asChild>
              <CloseButton />
            </DrawerClose>

            <SubmitButton status={status} handleSubmit={handleSubmit} id={id} />
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

          <Content procedure={procedure} medication={medication} />
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <DialogClose asChild>
            <CloseButton />
          </DialogClose>

          <SubmitButton status={status} handleSubmit={handleSubmit} id={id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Content = ({
  procedure,
  medication,
  className,
}: {
  procedure: string
  medication: string | null | undefined
  className?: string
}) => {
  return (
    <Typography className={className}>
      Чи видалити запис на процедуру{" "}
      <span className="ffont-semibold">{procedure}</span> з препаратом{" "}
      <span className="font-semibold">{medication}</span>?
    </Typography>
  )
}

const CloseButton = () => {
  return <Button variant="ghost">Ні</Button>
}

const SubmitButton = ({
  status,
  handleSubmit,
  id,
}: {
  status: ButtonStatus
  handleSubmit: (id: number) => void
  id: number
}) => {
  return (
    <form onSubmit={() => handleSubmit(id)}>
      <Button
        type="submit"
        variant="destructive"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            Видалення...
            <Icons.loader className="mr-2 animate-spin" />
          </>
        ) : (
          "Так"
        )}
      </Button>
    </form>
  )
}
