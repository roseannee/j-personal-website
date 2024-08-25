import { useState } from "react"
import { usePathname } from "next/navigation"
import { createImage } from "@/actions/db-create.actions"
import { ImageSchema, ImageZodData } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ButtonStatus } from "@/types/button-status"
import { DateTime } from "@/components/ui/date-time"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RequiredFieldLabel } from "@/components/ui/required-field-label"
import { SubmitButton } from "@/components/ui/submit-button"

interface UploadImageFormProps {
  onClose: () => void
}

export const UploadImageForm = ({ onClose }: UploadImageFormProps) => {
  const patientId = usePathname().split("/").pop()!

  const [status, setStatus] = useState<ButtonStatus>("idle")

  const form = useForm<ImageZodData>({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      date: new Date(),
      image: new File([], ""),
      imageUrl: "",
      downloadUrl: "",
    },
  })

  async function onSubmit(values: ImageZodData) {
    setStatus("loading")

    const imageData = new FormData()
    imageData.append("patientId", patientId)
    imageData.append("date", values.date.toISOString())
    imageData.append("image", values.image)

    const imageRes = await fetch("/api/images/", {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .catch((error) => {
        toast.error(`Щось пішло не так: ${error}.`)
        return
      })

    const { image, ...rest } = values
    rest.imageUrl = imageRes.url
    rest.downloadUrl = imageRes.downloadUrl

    const res = await createImage(patientId, rest)

    setStatus("idle")

    if (res.success) {
      toast.success("Світлина успішно завантажена!")
      onClose()
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <RequiredFieldLabel>Дата</RequiredFieldLabel>

              <DateTime field={field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <RequiredFieldLabel>Світлина</RequiredFieldLabel>

              <Input
                accept="image/*"
                type="file"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton status={status} />
      </form>
    </Form>
  )
}
