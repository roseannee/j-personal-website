"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import { appointmentTable, noteTable, patientTable } from "@/server/schema"
import { Appointment, AppointmentSchema, Patient, PatientSchema } from "@/types"
import { generateId } from "lucia"

import { getDefaultNote, getMedicationId, getProcedureId } from "./db.utils"

export const createPatient = async (values: Patient) => {
  try {
    PatientSchema.parse(values)

    const patientId = generateId(15)

    await db.insert(patientTable).values({
      id: patientId,
      fullName: values.fullName,
      gender: values.gender,
      birthdate: values.birthdate,
      allergies: values.allergies,
      phoneNumber: values.phoneNumber,
      telegram: values.telegram,
      instagram: values.instagram,
      createdAt: new Date(),
      updatedAt: new Date(),
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
  AppointmentSchema.parse(values)

  try {
    const procedureId = await getProcedureId(values.procedure)
    const medicationId = await getMedicationId(values.medication ?? "")

    await db.insert(appointmentTable).values({
      patientId,
      procedureId: procedureId,
      medicationId: medicationId,
      price: values.price,
      appointmentDate: values.date,
      description: values.description,
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
