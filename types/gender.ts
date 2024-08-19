import { Patient } from "@/types"
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"

export const genders = [
  {
    label: "Чоловік",
    value: "male",
  },
  {
    label: "Жінка",
    value: "female",
  },
] as const

export interface GenderFormProps {
  form: UseFormReturn<Patient>
  field: ControllerRenderProps<Patient, "gender">
}
