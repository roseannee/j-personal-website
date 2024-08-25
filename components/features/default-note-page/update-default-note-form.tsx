import { useState } from "react"
import { updateDefaultNote } from "@/actions/db-update.actions"
import { DefaultNote, DefaultNoteSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ButtonStatus } from "@/types/button-status"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SubmitButton } from "@/components/ui/submit-button"
import { Textarea } from "@/components/ui/textarea"

export const UpdateDefaultNotesForm = ({ note }: DefaultNote) => {
  const [status, setStatus] = useState<ButtonStatus>("idle")

  DefaultNoteSchema.parse({ note })

  const form = useForm<DefaultNote>({
    resolver: zodResolver(DefaultNoteSchema),
    defaultValues: {
      note,
    },
  })

  async function onSubmit(values: DefaultNote) {
    setStatus("loading")

    const res = await updateDefaultNote(values)

    setStatus("idle")

    if (res.success) {
      toast.success("Стандартна нотатка успішно оновлена!")
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нотатка</FormLabel>

              <FormControl>
                <Textarea className="h-96" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton status={status} />
      </form>
    </Form>
  )
}
