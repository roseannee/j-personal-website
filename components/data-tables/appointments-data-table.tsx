"use client"

import { useState } from "react"
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import { AppointmentData } from "@/types/appointment-data"
import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { appointmentsColumns } from "@/components/data-tables/appointments-columns"

import { CreateAppointment } from "../features/my-patients-page/create/create-appointment"

interface AppointmentsDataTableProps {
  data: AppointmentData[]
}

export const AppointmentsDataTable = ({ data }: AppointmentsDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns: appointmentsColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 4 },
    },
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <DataTable table={table} withPagination>
      <div className="flex items-center justify-between space-x-2">
        <Input
          placeholder="Фільтрувати по процедурі..."
          value={
            (table.getColumn("procedure")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("procedure")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <CreateAppointment />
      </div>
    </DataTable>
  )
}
