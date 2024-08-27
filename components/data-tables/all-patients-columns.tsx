import { ColumnDef } from "@tanstack/react-table"

import { FutureAppointmentWithImages } from "@/types/future-appointment"
import { formatDateWithTime } from "@/lib/utils"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UndefinedText } from "@/components/ui/undefined-text"

import { DeletePatient } from "../features/my-patients-page/delete/delete-patient"
import { Icons } from "../shared/icons"
import { Button } from "../ui/button"
import { PatientLink } from "../ui/patient-link"

export const allPatientsColumns: ColumnDef<FutureAppointmentWithImages>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ПІБ" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата наступного прийому" />
    ),
    cell: ({ row }) => {
      const date: Date | null = row.getValue("date")
      return <div>{date ? formatDateWithTime(date) : <UndefinedText />}</div>
    },
  },
  {
    accessorKey: "procedureName",
    header: () => <div className="line-clamp-1">Назва процедури</div>,
    cell: ({ row }) => {
      const procedure: string | null = row.getValue("procedureName")
      return (
        <div className="line-clamp-2">
          {procedure ? procedure : <UndefinedText />}
        </div>
      )
    },
  },
  {
    accessorKey: "id",
    header: "Посилання",
    cell: ({ row }) => {
      return <PatientLink patientId={row.getValue("id")} />
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Дії</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <DeletePatient
                patientId={patient.id}
                fullName={patient.fullName}
                images={patient.imageUrl}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
