"use client"

import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { PatientBrief } from "@/types/patient-brief"

import { DataTable } from "../ui/data-table"
import { lastPatientsColumns } from "./last-patients-columns"

interface LastPatientsDataTableProps {
  data: PatientBrief[]
}

export const LastPatientsDataTable = ({ data }: LastPatientsDataTableProps) => {
  const table = useReactTable({
    data,
    columns: lastPatientsColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} />
}
