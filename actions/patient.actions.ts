"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import { patientTable } from "@/server/schema"
import { PatientSchema } from "@/types"
import { eq } from "drizzle-orm"
import { generateId } from "lucia"
import { z } from "zod"

export const getPatient = async (id: string) => {
  try {
    const patient = await db.query.patientTable.findFirst({
      where: (table) => eq(table.id, id),
    })

    revalidatePath(`/my-patients/${id}`)
    return {
      success: true,
      message: "Success",
      data: { patient },
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error: ${error.message}`,
      data: null,
    }
  }
}

export const createPatient = async (values: z.infer<typeof PatientSchema>) => {
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
    })

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
      message: "Success",
      data: {
        id: patientId,
      },
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error: ${error.message}`,
      data: null,
    }
  }
}

export const updatePatient = async (
  id: string,
  values: z.infer<typeof PatientSchema>
) => {
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
      })
      .where(eq(patientTable.id, id))

    revalidatePath(`/my-patients/${id}`)
    return {
      success: true,
      message: "Success",
      data: null,
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error: ${error.message}`,
      data: null,
    }
  }
}
