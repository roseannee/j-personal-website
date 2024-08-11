"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPatient } from "@/actions/patient.actions"
import { PatientSchema } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { GeneralInfoForm } from "@/components/shared/forms/general-info-form"

export const CreatePatientForm = () => {
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "loading">("idle")

  const form = useForm<z.infer<typeof PatientSchema>>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      telegram: "",
      instagram: "",
    },
  })

  async function onSubmit(values: z.infer<typeof PatientSchema>) {
    setStatus("loading")

    const res = await createPatient(values)

    setStatus("idle")

    if (res.success) {
      toast.success("Patient created successfully!")
      form.reset()
      router.push(`/my-patients/${res.data!.id}`)
    } else {
      toast.error(res.message)
    }
  }

  return <GeneralInfoForm form={form} onSubmit={onSubmit} status={status} />
}
