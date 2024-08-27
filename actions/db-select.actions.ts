"use server"

import { revalidatePath } from "next/cache"
import db from "@/server"
import { Patient } from "@/types"
import { eq, gte } from "drizzle-orm"

import { AppointmentData } from "@/types/appointment-data"
import {
  FutureAppointment,
  FutureAppointmentWithImages,
} from "@/types/future-appointment"

export const getPatient = async (patientId: string) => {
  try {
    const patient = (await db.query.patientTable.findFirst({
      where: (table) => eq(table.id, patientId),
      columns: {
        createdAt: false,
        updatedAt: false,
      },
    })) as Patient

    const [note, appointments] = await Promise.all([
      db.query.noteTable
        .findFirst({
          where: (table) => eq(table.patientId, patientId),
          columns: {
            noteContent: true,
          },
        })
        .then((note) => note!.noteContent),
      db.query.appointmentTable.findMany({
        where: (table) => eq(table.patientId, patientId),
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
      }),
    ])

    const formattedAppointments: AppointmentData[] = appointments.map((a) => ({
      id: a.id,
      procedure: a.procedure.name,
      procedurePrice: a.procedure.price,
      medication: a.medication?.name,
      medicationPrice: a.medication?.price,
      price: a.price,
      appointmentDate: a.appointmentDate,
      description: a.description,
    }))

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
      data: { patient, note, formattedAppointments },
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

export const getLastPatients = async () => {
  try {
    const patients = await db.query.patientTable.findMany({
      columns: {
        id: true,
        fullName: true,
      },
      orderBy: (patients, { desc }) => [desc(patients.updatedAt)],
      limit: 3,
    })

    revalidatePath(`/`)
    return {
      success: true,
      data: patients,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getFutureAppointments = async () => {
  try {
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

    const appointments = await db.query.patientTable.findMany({
      columns: {
        id: true,
        fullName: true,
      },
      with: {
        appointments: {
          columns: {
            appointmentDate: true,
          },
          with: {
            procedure: {
              columns: {
                name: true,
              },
            },
          },
          where: (table) => gte(table.appointmentDate, new Date()),
          orderBy: (appointments, { asc }) => [
            asc(appointments.appointmentDate),
          ],
          limit: 3,
        },
      },
    })

    const formattedAppointments: FutureAppointment[] = appointments
      .flatMap((patient) =>
        patient.appointments.map((appointment) => ({
          id: patient.id,
          fullName: patient.fullName,
          date: appointment.appointmentDate,
          procedureName: appointment.procedure.name,
        }))
      )
      .slice(0, 3)

    revalidatePath(`/`)
    return {
      success: true,
      data: formattedAppointments,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getAllPatients = async () => {
  try {
    const patients = await db.query.patientTable.findMany({
      columns: {
        id: true,
        fullName: true,
      },
      with: {
        appointments: {
          columns: {
            appointmentDate: true,
          },
          with: {
            procedure: {
              columns: {
                name: true,
              },
            },
          },
          where: (table) => gte(table.appointmentDate, new Date()),
          orderBy: (appointments, { desc }) => [
            desc(appointments.appointmentDate),
          ],
          limit: 1,
        },
        images: {
          columns: {
            url: true,
          },
        },
      },
      orderBy: (patients, { desc }) => [desc(patients.updatedAt)],
    })

    const formattedPatients: FutureAppointmentWithImages[] = patients.map(
      (patient) => {
        const nextAppointment = patient.appointments[0]
        return {
          id: patient.id,
          fullName: patient.fullName,
          date: nextAppointment ? nextAppointment.appointmentDate : null,
          procedureName: nextAppointment ? nextAppointment.procedure.name : "",
          imageUrl: patient.images.map((image) => image.url),
        }
      }
    )

    revalidatePath("/my-patients")
    return {
      success: true,
      data: formattedPatients,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}

export const getImages = async (patientId: string) => {
  try {
    const images = await db.query.imagesTable.findMany({
      where: (table) => eq(table.patientId, patientId),
      columns: {
        patientId: false,
      },
      orderBy: (images, { desc }) => [desc(images.date)],
    })

    revalidatePath(`/my-patients/${patientId}`)
    return {
      success: true,
      data: images,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}
