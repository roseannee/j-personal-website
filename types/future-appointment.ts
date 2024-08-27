import { PatientBrief } from "./patient-brief"

export type FutureAppointment = {
  date: Date | null
  procedureName: string | null
} & PatientBrief

export type FutureAppointmentWithImages = {
  imageUrl: string[]
} & FutureAppointment
