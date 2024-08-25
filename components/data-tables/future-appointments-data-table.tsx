"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { FutureAppointment } from "@/types/future-appointment"

import { DataTable } from "../ui/data-table"
import { futureAppointmentsColumns } from "./future-appointments-columns"

interface FutureAppointmentsDataTableProps {
  data: FutureAppointment[]
}

export const FutureAppointmentsDataTable = ({
  data,
}: FutureAppointmentsDataTableProps) => {
  const table = useReactTable({
    data,
    columns: futureAppointmentsColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} />
}
