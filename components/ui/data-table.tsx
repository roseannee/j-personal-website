"use client"

import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"
import { m } from "framer-motion"

import { bottomFadeVariants } from "@/lib/framer-variants"
import { cn } from "@/lib/utils"

import { DataTablePagination } from "./data-table-pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>
  withPagination?: boolean
  animated?: boolean
}

export function DataTable<TData>({
  table,
  withPagination = false,
  animated = false,
  children,
  className,
}: DataTableProps<TData>) {
  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={animated ? bottomFadeVariants({ delay: 0.8 }) : undefined}
      className={cn(
        "grid size-full content-between justify-items-stretch space-y-2.5",
        className
      )}
    >
      {children}

      <div className="overflow-auto rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  Результатів немає.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {withPagination && (
        <div className="flex flex-col gap-2.5">
          <DataTablePagination table={table} />
        </div>
      )}
    </m.div>
  )
}
