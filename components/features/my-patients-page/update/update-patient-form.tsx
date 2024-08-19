import { useState } from "react"
import { usePathname } from "next/navigation"
import { updatePatient } from "@/actions/db-update.actions"
import { Patient, PatientSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ButtonStatus } from "@/types/button-status"
import { GeneralInfoForm } from "@/components/shared/general-info-form"

import { GeneralInfoCardProps } from "../select/general-info-card"

export const UpdatePatientForm = ({
  patient,
  onClose,
}: GeneralInfoCardProps & { onClose: () => void }) => {
  const patientId = usePathname().split("/").pop()!

  const [status, setStatus] = useState<ButtonStatus>("idle")

  PatientSchema.parse(patient)

  const form = useForm<Patient>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      fullName: patient.fullName,
      gender: patient.gender,
      birthdate: patient.birthdate,
      allergies: patient.allergies,
      phoneNumber: patient.phoneNumber || undefined,
      telegram: patient.telegram || undefined,
      instagram: patient.instagram || undefined,
    },
  })

  async function onSubmit(values: Patient) {
    setStatus("loading")

    const res = await updatePatient(patientId, values)

    setStatus("idle")

    if (res.success) {
      toast.success("Пацієнт оновлений успішно!")
      onClose()
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }

  return <GeneralInfoForm form={form} onSubmit={onSubmit} status={status} />
}
