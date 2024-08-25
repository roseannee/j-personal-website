import { ColumnDef } from "@tanstack/react-table"

import { AppointmentData } from "@/types/appointment-data"
import { formatDateWithTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UndefinedText } from "@/components/ui/undefined-text"
import { Icons } from "@/components/shared/icons"

import { DeleteAppointment } from "../features/my-patients-page/delete/delete-appointment"
import { UpdateAppointment } from "../features/my-patients-page/update/update-appointment"

export const appointmentsColumns: ColumnDef<AppointmentData>[] = [
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата прийому" />
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue("appointmentDate")

      return formatDateWithTime(date)
    },
  },
  {
    accessorKey: "procedure",
    header: "Процедура",
  },
  {
    accessorKey: "description",
    header: "Опис",
  },
  {
    accessorKey: "medication",
    header: "Препарат",
    cell: ({ row }) => {
      const medication: string | null = row.getValue("medication")
      return (
        <div className="line-clamp-2 text-pretty">
          {medication ? medication : <UndefinedText />}
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Вартість</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = `${price.toLocaleString("uk-UA")} ₴`

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original

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
              <UpdateAppointment appointment={appointment} />
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <DeleteAppointment
                id={appointment.id}
                procedure={appointment.procedure}
                medication={appointment.medication}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
