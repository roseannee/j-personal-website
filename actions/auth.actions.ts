"use server"

import { cookies } from "next/headers"
import { lucia, validateRequest } from "@/auth"
import db from "@/server"
import { magicLinkTable, userTable } from "@/server/schema"
import { SignInSchema } from "@/types"
import { eq } from "drizzle-orm"
import { generateId } from "lucia"
import { z } from "zod"

import { generateMagicLink, sendEmail } from "@/lib/utils"

export const singIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values)

    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.email, values.email),
    })

    if (existingUser) {
      const res = await generateMagicLink(existingUser.id, values.email)

      await db.insert(magicLinkTable).values({
        userId: existingUser.id,
        token: res.data.token,
      })

      sendEmail(values.email, res.data.url)
    } else {
      // ITS CREATE USER !!!
      const userId = generateId(15)

      await db.insert(userTable).values({
        id: userId,
        email: values.email,
      })

      const res = await generateMagicLink(values.email, userId)

      await db.insert(magicLinkTable).values({
        userId,
        token: res.data.token,
      })

      sendEmail(values.email, res.data.url)
    }

    return {
      success: true,
      message: "Magic link sent successfully",
      data: null,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    }
  }
}

export const signOut = async () => {
  try {
    const { session } = await validateRequest()

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    }
  }
}
