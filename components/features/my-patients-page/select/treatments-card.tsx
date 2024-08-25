import { AppointmentData } from "@/types/appointment-data"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { AppointmentsDataTable } from "../../../data-tables/appointments-data-table"

interface TreatmentsCardProps {
  appointment: AppointmentData[]
}

export const TreatmentsCard = ({ appointment }: TreatmentsCardProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Процедури</CardTitle>
      </CardHeader>

      <CardContent className="h-[calc(100%_-_96px)]">
        <AppointmentsDataTable data={appointment} />
      </CardContent>
    </>
  )
}
