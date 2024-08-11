import { useState } from "react"
import { updatePatient } from "@/actions/patient.actions"
import { PatientSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { GeneralInfoForm } from "@/components/shared/forms/general-info-form"

import { GeneralInfoCardProps } from "../select/general-info-card"

export const UpdatePatientForm = ({
  patient,
  onClose,
}: GeneralInfoCardProps & { onClose: () => void }) => {
  const [status, setStatus] = useState<"idle" | "loading">("idle")

  PatientSchema.parse(patient)

  const form = useForm<z.infer<typeof PatientSchema>>({
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

  async function onSubmit(values: z.infer<typeof PatientSchema>) {
    setStatus("loading")

    const res = await updatePatient(patient.id, values)

    setStatus("idle")

    if (res.success) {
      toast.success("Patient updated successfully!")
      onClose()
    } else {
      toast.error(res.message)
    }
  }

  return <GeneralInfoForm form={form} onSubmit={onSubmit} status={status} />
}
