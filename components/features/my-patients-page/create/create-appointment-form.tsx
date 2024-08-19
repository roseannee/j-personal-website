import { useState } from "react"
import { usePathname } from "next/navigation"
import { createAppointment } from "@/actions/db-create.actions"
import { Appointment, AppointmentSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ButtonStatus } from "@/types/button-status"
import { AppointmentForm } from "@/components/shared/appointment-form"

interface CreateAppointmentFormProps {
  onClose: () => void
}

export const CreateAppointmentForm = ({
  onClose,
}: CreateAppointmentFormProps) => {
  const patientId = usePathname().split("/").pop()!

  const [status, setStatus] = useState<ButtonStatus>("idle")

  const form = useForm<Appointment>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      date: new Date(),
      price: 0,
      description: "",
    },
  })

  async function onSubmit(values: Appointment) {
    setStatus("loading")

    const res = await createAppointment(patientId, values)

    setStatus("idle")

    if (res.success) {
      toast.success("Прийом створено успішно!")
      onClose()
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }

  return <AppointmentForm form={form} onSubmit={onSubmit} status={status} />
}
