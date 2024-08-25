import { cache } from "react"
import { getLastPatients } from "@/actions/db-select.actions"
import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { twMerge } from "tailwind-merge"

import { PatientBrief } from "@/types/patient-brief"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export const fetchLastPatients = async (): Promise<PatientBrief[]> => {
  const res = (await getLastPatients()).data!
  return res
}
