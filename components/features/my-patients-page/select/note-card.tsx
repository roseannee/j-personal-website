"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { updateNote } from "@/actions/db-update.actions"
import { toast } from "sonner"
import { useMediaQuery } from "usehooks-ts"

import { ButtonStatus } from "@/types/button-status"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/shared/icons"

interface NoteCardProps {
  note: string
}

export const NoteCard = ({ note: noteProps }: NoteCardProps) => {
  const patientId = usePathname().split("/").pop()!

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [status, setStatus] = useState<ButtonStatus>("idle")
  const [isEditing, setIsEditing] = useState(false)
  const [note, setNote] = useState(noteProps)

  const handleButtonClick = async () => {
    if (isEditing) {
      setStatus("loading")

      const res = await updateNote(patientId, note)

      if (res.success) {
        toast.success("Нотатка успішно оновлена!")
      } else {
        toast.error(`Щось пішло не так: ${res.message}.`)
      }

      setIsEditing(false)
      setStatus("idle")
    } else {
      setIsEditing(true)
    }
  }

  return (
    <>
      <CardHeader className="relative">
        <CardTitle className="max-w-[calc(100%_-_40px)]">Нотатка</CardTitle>

        <Button
          variant={isEditing ? "default" : "ghost"}
          size={!isDesktop ? "icon" : isEditing ? "default" : "icon"}
          disabled={status === "loading"}
          onClick={handleButtonClick}
          className="group absolute right-4 top-4 !m-0"
        >
          {isEditing ? (
            status === "loading" ? (
              !isDesktop ? (
                <Icons.loader className="animate-spin" />
              ) : (
                <>
                  Підтвердження...
                  <Icons.loader className="ml-2 animate-spin" />
                </>
              )
            ) : !isDesktop ? (
              <Icons.check className="size-5" />
            ) : (
              "Підтвердити"
            )
          ) : (
            <Icons.pencil className="opacity-50 transition-opacity group-hover:opacity-100" />
          )}
        </Button>
      </CardHeader>

      <CardContent className="h-[calc(100%_-_96px)]">
        <Textarea
          className="h-full resize-none !opacity-100"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={!isEditing}
        />
      </CardContent>
    </>
  )
}
