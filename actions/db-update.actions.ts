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
        fullName: values.fullName,
        gender: values.gender,
        birthdate: values.birthdate,
        allergies: values.allergies,
        phoneNumber: values.phoneNumber,
        telegram: values.telegram,
        instagram: values.instagram,
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

    const procedureId = await getProcedureId(values.procedure)
    const medicationId = await getMedicationId(values.medication ?? "")

    await db
      .update(appointmentTable)
      .set({
        appointmentDate: values.date,
        procedureId: procedureId,
        medicationId: medicationId,
        price: values.price,
        description: values.description,
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
