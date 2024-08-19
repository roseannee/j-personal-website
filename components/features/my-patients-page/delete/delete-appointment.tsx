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
          <Button
            variant="ghost"
            size="sm"
            click="static"
            className="w-full justify-start px-2 py-1.5"
          >
            Видалити
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="flex flex-col space-y-2">
            <DrawerHeader className="pb-0 text-left">
              <DrawerTitle>Видалити?</DrawerTitle>
              <DrawerDescription className="hidden" />
            </DrawerHeader>

            <Typography className="px-4">
              Чи видалити запис на процедуру{" "}
              <span className="font-semibold">{procedure}</span> з препаратом{" "}
              <span className="font-semibold">{medication}</span>?
            </Typography>
          </div>

          <DrawerFooter className="flex flex-row justify-end space-x-2">
            <DrawerClose asChild>
              <Button variant="ghost">Ні</Button>
            </DrawerClose>

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
          </DrawerFooter>
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
          Видалити
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex flex-col space-y-2">
          <DialogHeader>
            <DialogTitle>Видалити?</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>

          <Typography>
            Чи видалити запис на процедуру{" "}
            <span className="ffont-semibold">{procedure}</span> з препаратом{" "}
            <span className="font-semibold">{medication}</span>?
          </Typography>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="ghost">Ні</Button>
          </DialogClose>

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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
