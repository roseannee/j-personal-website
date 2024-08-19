import { cache } from "react"
import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import jwt from "jsonwebtoken"
import { Resend } from "resend"
import { twMerge } from "tailwind-merge"

import { AppointmentData } from "@/types/appointment-data"
import { FetchedAppointments } from "@/types/fetched-appointments"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateMagicLink = async (userId: string, email: string) => {
  const token = jwt.sign(
    {
      userId: userId,
      email: email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "5m" }
  )

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/magic-link?token=${token}`

  return {
    success: true,
    message: "Magic link generated successfully",
    data: { token, url },
  }
}

export const sendEmail = async (email: string, url: string) => {
  const resend = new Resend(process.env.RESEND_SECRET)

  // await resend.emails.send({
  //   from: "j-personal-website <noreply@resend.dev>",
  //   to: [email],
  //   subject: "Magic Link",
  //   html: render(MagicLinkEmail({ url })),
  //   // headers: {
  //   //   "X-Entity-Ref-ID": generateId(10),
  //   // },
  // })
}

export const getQuote = cache(async () => {
  try {
    const res = await fetch("https://zenquotes.io/api/today")

    const data = await res.json()

    return data[0].q as string
  } catch (error) {
    console.log("An error occurred while fetching the quote:", error)
    return "No quote for today"
  }
})

export const formatDate = (date: Date) => {
  return format(date, "dd.MM.yyyy", { locale: uk })
}

export const formatDateWithTime = (date: Date) => {
  return format(date, "dd.MM.yyyy, HH:mm", { locale: uk })
}

export const formatAppointments = (
  appointments: FetchedAppointments[]
): AppointmentData[] => {
  return appointments.map((a) => ({
    id: a.id,
    procedure: a.procedure.name,
    procedurePrice: a.procedure.price,
    medication: a.medication?.name,
    medicationPrice: a.medication?.price,
    price: a.price,
    appointmentDate: a.appointmentDate,
    description: a.description,
  }))
}
