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
    // FIXME domain
    from: "j-personal-website <noreply@resend.dev>",
    to: [email],
    subject: "Magic Link",
    html: render(MagicLinkEmail({ url })),
    // headers: {
    //   "X-Entity-Ref-ID": generateId(10),
    // },
  })
}
