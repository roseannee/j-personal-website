"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { FutureAppointments } from "@/types/future-appointments"

import { DataTable } from "../ui/data-table"
import { futureAppointmentsColumns } from "./future-appointments-columns"

interface FutureAppointmentsDataTableProps {
  data: FutureAppointments[]
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
