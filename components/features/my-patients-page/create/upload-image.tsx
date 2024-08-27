"use client"

import React, { useState } from "react"
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

import { UploadImageForm } from "./upload-image-form"

export const UploadImage = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <CreateButton />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Нова світлина</DrawerTitle>
            <DrawerDescription className="hidden" />
          </DrawerHeader>

          <div className="p-4 pt-0">
            <UploadImageForm onClose={handleClose} />
          </div>
        </DrawerContent>
      </Drawer>
    )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Нова світлина</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <UploadImageForm onClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

const CreateButton = React.forwardRef<HTMLButtonElement>((props, ref) => {
  return (
    <Button ref={ref} size="icon" className="!m-0" {...props}>
      <Icons.plus />
    </Button>
  )
})
CreateButton.displayName = "CreateButton"
