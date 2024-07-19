import { cache } from "react"
import MagicLinkEmail from "@/emails"
import { render } from "@react-email/components"
import { clsx, type ClassValue } from "clsx"
import jwt from "jsonwebtoken"
import { Resend } from "resend"
import { twMerge } from "tailwind-merge"

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

  await resend.emails.send({
    // NOTE own domain
    from: "j-personal-website <noreply@resend.dev>",
    to: [email],
    subject: "Magic Link",
    html: render(MagicLinkEmail({ url })),
    // headers: {
    //   "X-Entity-Ref-ID": generateId(10),
    // },
  })
}

export const getQuote = cache(async () => {
  try {
    const res = await fetch("https://zenquotes.io/api/today")

    const data = await res.json()

    return data[0].q as string
  } catch (error) {
    console.log("An error occurred while fetching the quote:", error)
    // TODO maybe update return
    return "No quote for today"
  }
})
