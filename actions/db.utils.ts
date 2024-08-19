"use server"

import db from "@/server"
import { medicationTable, procedureTable } from "@/server/schema"
import { eq } from "drizzle-orm"

export const getDefaultNote = async () => {
  const defaultNote = await db.query.defaultNoteTable
    .findFirst()
    .then((note) => note!.defaultNote)

  return defaultNote
}

export const getProcedureId = async (procedure: string) => {
  const procedureId = await db.query.procedureTable
    .findFirst({
      where: eq(procedureTable.name, procedure),
      columns: {
        id: true,
      },
    })
    .then((procedure) => procedure!.id)

  return procedureId
}

export const getMedicationId = async (medication: string) => {
  const medicationId = await db.query.medicationTable
    .findFirst({
      where: eq(medicationTable.name, medication),
      columns: {
        id: true,
      },
    })
    .then((medication) => medication?.id ?? undefined)

  return medicationId
}