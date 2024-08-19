import { FetchedAppointments } from "@/types/fetched-appointments"
import { formatAppointments } from "@/lib/utils"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { AppointmentsDataTable } from "./appointments-data-table"

interface TreatmentsCardProps {
  appointment: FetchedAppointments[]
}

export const TreatmentsCard = ({ appointment }: TreatmentsCardProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Процедури</CardTitle>
      </CardHeader>

      <CardContent>
        <AppointmentsDataTable data={formatAppointments(appointment)} />
      </CardContent>
    </>
  )
}
