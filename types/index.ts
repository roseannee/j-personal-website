import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})
export type SignIn = z.infer<typeof SignInSchema>

export const PatientSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Це поле є обов'язковим." })
    .refine((value) => value.trim(), {
      message: "ПІБ не може бути порожнім.",
    }),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Це поле є обов'язковим." }),
  }),
  birthdate: z.date({
    required_error: "Це поле є обов'язковим.",
  }),
  allergies: z.boolean().default(false),
  phoneNumber: z.string().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
})
export type Patient = z.infer<typeof PatientSchema>

export const DefaultNoteSchema = z.object({
  note: z.string(),
})
export type DefaultNote = z.infer<typeof DefaultNoteSchema>

export const AppointmentSchema = z.object({
  date: z.date({
    required_error: "Це поле є обов'язковим.",
  }),
  procedure: z.string({ required_error: "Це поле є обов'язковим." }),
  description: z.string().optional(),
  medication: z.string().optional(),
  // FIX
  price: z.coerce.number({
    required_error: "Це поле є обов'язковим.",
  }),
})
export type Appointment = z.infer<typeof AppointmentSchema>
