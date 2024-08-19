"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPatient } from "@/actions/db-create.actions"
import { Patient, PatientSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { ButtonStatus } from "@/types/button-status"
import { GeneralInfoForm } from "@/components/shared/general-info-form"

export const CreatePatientForm = () => {
  const router = useRouter()

  const [status, setStatus] = useState<ButtonStatus>("idle")

  const form = useForm<Patient>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      telegram: "",
      instagram: "",
    },
  })

  async function onSubmit(values: Patient) {
    setStatus("loading")

    const res = await createPatient(values)

    setStatus("idle")

    if (res.success) {
      form.reset()

      toast.success("Пацієнт створений успішно!")
      router.push(`/my-patients/${res.data!.id}`)
    } else {
      toast.error(`Щось пішло не так: ${res.message}.`)
    }
  }

  return <GeneralInfoForm form={form} onSubmit={onSubmit} status={status} />
}
