import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form"

import { ButtonStatus } from "./button-status"

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (values: T) => Promise<void>
  status: ButtonStatus
}

export interface FormFieldProps<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TFieldName>
}
