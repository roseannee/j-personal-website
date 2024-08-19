"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import { appointmentTable } from "@/server/schema"
import { eq } from "drizzle-orm"

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
