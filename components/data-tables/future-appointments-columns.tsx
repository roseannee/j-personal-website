import { ColumnDef } from "@tanstack/react-table"

import { FutureAppointment } from "@/types/future-appointment"
import { formatDateWithTime } from "@/lib/utils"

import { PatientLink } from "../ui/patient-link"

export const futureAppointmentsColumns: ColumnDef<FutureAppointment>[] = [
  {
    accessorKey: "date",
    header: () => <div className="line-clamp-1">Дата наступного прийому</div>,
    cell: ({ row }) => {
      const date: Date = row.getValue("date")
      return formatDateWithTime(date)
    },
  },
  {
    accessorKey: "fullName",
    header: "ПІБ",
    cell: ({ row }) => {
      return <div className="line-clamp-2">{row.getValue("fullName")}</div>
    },
  },
  {
    accessorKey: "procedureName",
    header: "Процедура",
    cell: ({ row }) => {
      return <div className="line-clamp-2">{row.getValue("procedureName")}</div>
    },
  },
  {
    accessorKey: "id",
    header: "Посилання",
    cell: ({ row }) => {
      return <PatientLink patientId={row.getValue("id")} />
    },
  },
]
