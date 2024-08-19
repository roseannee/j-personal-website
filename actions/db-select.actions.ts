"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import { patientTable } from "@/server/schema"
import { eq } from "drizzle-orm"

export const getPatient = async (patientId: string) => {
  try {
    const patient = await db.query.patientTable.findFirst({
      where: eq(patientTable.id, patientId),
      columns: {
        createdAt: false,
        updatedAt: false,
      },
      with: {
        note: {
          columns: {
            noteContent: true,
          },
        },
        appointments: {
          columns: {
            id: true,
            appointmentDate: true,
            price: true,
            description: true,
          },
          with: {
            procedure: {
              columns: {
                name: true,
                price: true,
              },
            },
            medication: {
              columns: {
                name: true,
                price: true,
              },
            },
          },
          orderBy: (appointments, { desc }) => [
            desc(appointments.appointmentDate),
          ],
        },
      },
    })

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
      data: { patient },
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getProceduresWithMedications = async () => {
  try {
    const procedures = await db.query.procedureTable.findMany({
      with: {
        medications: {
          columns: {
            procedureId: false,
          },
        },
      },
    })

    return {
      success: true,
      data: procedures,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}
