"use client"

import React, { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { deleteImage } from "@/actions/db-delete.actions"
import { toast } from "sonner"
import { useMediaQuery } from "usehooks-ts"

import { ButtonStatus } from "@/types/button-status"
import { DbImage } from "@/types/db-image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { Icons } from "@/components/shared/icons"

interface DeleteImageProps {
  id: DbImage["id"]
  url: DbImage["url"]
}

export const DeleteImage = ({ id, url }: DeleteImageProps) => {
  const patientId = usePathname().split("/").pop()!

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [status, setStatus] = useState<ButtonStatus>("idle")
  const [open, setOpen] = useState(false)

  async function handleSubmit() {
    setStatus("loading")

    const imageData = new FormData()
    imageData.append("url", url)

    await fetch("/api/images/", {
      method: "DELETE",
      body: imageData,
    }).catch((error) => {
      toast.error(`Щось пішло не так: ${error}.`)
      return
    })

    const res = await deleteImage(id, patientId)

    setStatus("idle")

    if (res.success) {
      toast.success("Світлина скасовано успішно!")
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <IconButtonTrigger />
        </DrawerTrigger>

        <DrawerContent>
          <div className="flex flex-col space-y-2">
            <DrawerHeader className="pb-0 text-left">
              <DrawerTitle>Видалити?</DrawerTitle>
              <DrawerDescription className="hidden" />
            </DrawerHeader>

            <Content url={url} className="px-4" />
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
        <IconButtonTrigger />
      </DialogTrigger>

      <DialogContent>
        <div className="flex flex-col space-y-2">
          <DialogHeader>
            <DialogTitle>Видалити?</DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>

          <Content url={url} />
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

const IconButtonTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className="absolute right-2 top-2 !size-8 !rounded-full !p-0"
      {...props}
    >
      <Icons.delete />
    </Button>
  )
})
IconButtonTrigger.displayName = "IconButtonTrigger"

const Content = ({ url, className }: { url: string; className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Typography>Чи видалити цю світлину?</Typography>

      <Image
        src={url}
        alt={url}
        width="0"
        height="0"
        sizes="100vw"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
