export type AppointmentData = {
  id: number
  procedure: string
  procedurePrice: number | undefined | null
  medication: string | undefined | null
  medicationPrice: number | undefined | null
  price: number
  appointmentDate: Date
  description: string | undefined | null
}

export type ProcedureData = {
  id: number
  name: string
  price: number | undefined | null
  medications: MedicationData[]
}

export type MedicationData = {
  id: number
  name: string
  price: number
}
