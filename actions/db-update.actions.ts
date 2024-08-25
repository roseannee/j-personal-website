"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import {
  appointmentTable,
  defaultNoteTable,
  noteTable,
  patientTable,
} from "@/server/schema"
import {
  Appointment,
  AppointmentSchema,
  DefaultNote,
  Patient,
  PatientSchema,
} from "@/types"
import { eq } from "drizzle-orm"

import { getMedicationId, getProcedureId } from "./db.utils"

export const updatePatient = async (patientId: string, values: Patient) => {
  try {
    PatientSchema.parse(values)

    await db
      .update(patientTable)
      .set({
        ...values,
        updatedAt: new Date(),
      })
      .where(eq(patientTable.id, patientId))

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const updateNote = async (patientId: string, note: string) => {
  try {
    await db
      .update(noteTable)
      .set({
        noteContent: note,
      })
      .where(eq(noteTable.patientId, patientId))

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const updateDefaultNote = async (note: DefaultNote) => {
  try {
    await db
      .update(defaultNoteTable)
      .set({
        defaultNote: note.note,
      })
      .where(eq(defaultNoteTable.id, 1))

    revalidatePath("/default-note")
    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const updateAppointment = async (
  id: number,
  patientId: string,
  values: Appointment
) => {
  try {
    AppointmentSchema.parse(values)

    const [procedureId, medicationId] = await Promise.all([
      getProcedureId(values.procedure),
      getMedicationId(values.medication ?? ""),
    ])

    await db
      .update(appointmentTable)
      .set({
        procedureId: procedureId,
        medicationId: medicationId,
        appointmentDate: values.date,
        ...values,
      })
      .where(eq(appointmentTable.id, id))

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}
