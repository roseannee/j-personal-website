import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

// NOTE maybe update with drizzle-zod
export const PatientSchema = z.object({
  fullName: z.string({ required_error: "Full name is required." }),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required.",
  }),
  birthdate: z.date({
    required_error: "A date of birth is required.",
  }),
  allergies: z.boolean().default(false),
  phoneNumber: z.string().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
})
