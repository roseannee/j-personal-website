"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import {
  appointmentTable,
  imagesTable,
  noteTable,
  patientTable,
} from "@/server/schema"
import {
  Appointment,
  AppointmentSchema,
  ImageSchema,
  ImageZodData,
  Patient,
  PatientSchema,
} from "@/types"
import { generateId } from "lucia"

import { getDefaultNote, getMedicationId, getProcedureId } from "./db.utils"

export const createPatient = async (values: Patient) => {
  try {
    PatientSchema.parse(values)

    const patientId = generateId(15)
    const timestamp = new Date()

    await db.insert(patientTable).values({
      id: patientId,
      ...values,
      birthdate: values.birthdate.toDateString(),
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    const defaultNote = await getDefaultNote()
    await db.insert(noteTable).values({
      patientId,
      noteContent: defaultNote,
    })

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
      data: {
        id: patientId,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const createAppointment = async (
  patientId: string,
  values: Appointment
) => {
  try {
    AppointmentSchema.parse(values)

    const [procedureId, medicationId] = await Promise.all([
      getProcedureId(values.procedure),
      getMedicationId(values.medication ?? ""),
    ])

    await db.insert(appointmentTable).values({
      patientId,
      procedureId,
      medicationId,
      appointmentDate: values.date,
      ...values,
    })

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

export const createImage = async (
  patientId: string,
  values: Omit<ImageZodData, "image">
) => {
  try {
    ImageSchema.omit({ image: true }).parse(values)

    await db.insert(imagesTable).values({
      patientId,
      date: values.date,
      url: values.imageUrl!,
      downloadUrl: values.downloadUrl!,
    })

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
