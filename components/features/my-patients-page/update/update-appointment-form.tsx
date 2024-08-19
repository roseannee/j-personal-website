import { useState } from "react"
import { usePathname } from "next/navigation"
import { updateAppointment } from "@/actions/db-update.actions"
import { Appointment, AppointmentSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ButtonStatus } from "@/types/button-status"
import { AppointmentForm } from "@/components/shared/appointment-form"

import { UpdateAppointmentProps } from "./update-appointment"

export const UpdateAppointmentForm = ({
  appointment,
  onClose,
}: UpdateAppointmentProps & { onClose: () => void }) => {
  const patientId = usePathname().split("/").pop()!

  const [status, setStatus] = useState<ButtonStatus>("idle")

  AppointmentSchema.parse({
    date: appointment.appointmentDate,
    procedure: appointment.procedure,
    description: appointment.description,
    medication: appointment.medication,
    price: appointment.price,
  })

  const form = useForm<Appointment>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      date: appointment.appointmentDate,
      procedure: appointment.procedure,
      description: appointment.description ?? "",
      medication: appointment.medication ?? "",
      price: appointment.price,
    },
  })

  async function onSubmit(values: Appointment) {
    setStatus("loading")

    const res = await updateAppointment(appointment.id, patientId, values)

    setStatus("idle")

    if (res.success) {
      toast.success("Прийом успішно оновлено!")
      onClose()
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }

  return <AppointmentForm form={form} onSubmit={onSubmit} status={status} />
}
