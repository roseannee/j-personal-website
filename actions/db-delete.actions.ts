"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import {
  appointmentTable,
  imagesTable,
  noteTable,
  patientTable,
} from "@/server/schema"
import { eq } from "drizzle-orm"

export const deletePatient = async (id: string) => {
  try {
    Promise.all([
      await db.delete(noteTable).where(eq(noteTable.patientId, id)),
      await db
        .delete(appointmentTable)
        .where(eq(appointmentTable.patientId, id)),
      await db.delete(imagesTable).where(eq(imagesTable.patientId, id)),
      await db.delete(patientTable).where(eq(patientTable.id, id)),
    ])

    revalidatePath("/my-patients")
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

export const deleteAppointment = async (id: number, patientId: string) => {
  try {
    await db.delete(appointmentTable).where(eq(appointmentTable.id, id))

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

export const deleteImage = async (id: number, patientId: string) => {
  try {
    await db.delete(imagesTable).where(eq(imagesTable.id, id))

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
