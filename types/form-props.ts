import { FieldValues, UseFormReturn } from "react-hook-form"

import { ButtonStatus } from "./button-status"

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (values: T) => Promise<void>
  status: ButtonStatus
}
