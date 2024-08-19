export type FetchedAppointments = {
  id: number
  price: number
  appointmentDate: Date
  description: string | null
  procedure: {
    name: string
    price: number | null
  }
  medication: {
    name: string
    price: number
  } | null
}
