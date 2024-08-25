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

import { FutureAppointments } from "@/types/future-appointments"
import { Input } from "@/components/ui/input"
import { allPatientsColumns } from "@/components/data-tables/all-patients-columns"

import { DataTable } from "../ui/data-table"

interface AllPatientsDataTableProps {
  data: FutureAppointments[]
}

export const AllPatientsDataTable = ({ data }: AllPatientsDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns: allPatientsColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 6 },
    },
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <DataTable table={table} withPagination animated className="flex-1">
      <Input
        placeholder="Фільтрувати по ПІБ..."
        value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("fullName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </DataTable>
  )
}
