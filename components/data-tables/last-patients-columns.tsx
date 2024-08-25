import { ColumnDef } from "@tanstack/react-table"

import { PatientBrief } from "@/types/patient-brief"

import { PatientLink } from "../ui/patient-link"

export const lastPatientsColumns: ColumnDef<PatientBrief>[] = [
  {
    accessorKey: "fullName",
    header: "ПІБ",
    cell: ({ row }) => {
      return <div className="line-clamp-1">{row.getValue("fullName")}</div>
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
