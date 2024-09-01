import { z } from "zod"

export const SignUpSchema = z.object({
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
})
export type SignUp = z.infer<typeof SignUpSchema>

export const SignInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Це поле є обов'язковим." })
    .refine((value) => value.trim(), {
      message: "Ім'я користувача не може бути порожнім.",
    }),
  password: z
    .string()
    .min(1, { message: "Це поле є обов'язковим." })
    .refine((value) => value.trim(), {
      message: "Пароль не може бути порожнім.",
    }),
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
  birthdate: z.coerce.date({
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
  date: z.coerce.date({ required_error: "Це поле є обов'язковим." }),
  procedure: z.string({ required_error: "Це поле є обов'язковим." }),
  description: z.string().optional(),
  medication: z.string().optional(),
  // NOTE does not accept floating point numbers
  price: z.coerce.number({
    required_error: "Це поле є обов'язковим.",
  }),
})
export type Appointment = z.infer<typeof AppointmentSchema>

const MAX_MB = 10
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"]
export const ImageSchema = z.object({
  date: z.coerce.date({ required_error: "Це поле є обов'язковим." }),
  image: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE
    }, `File size must be less than ${MAX_MB}MB`)
    .refine(
      (file) => {
        return ACCEPTED_FILE_TYPES.includes(file.type)
      },
      `File must be a ${ACCEPTED_FILE_TYPES.join(", ")}`
    ),
  imageUrl: z.string(),
  downloadUrl: z.string(),
})
export type ImageZodData = z.infer<typeof ImageSchema>
