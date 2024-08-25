"use server"

import { cookies } from "next/headers"
import { lucia, validateRequest } from "@/auth"
import db from "@/server"
import { userTable } from "@/server/schema"
import { SignIn, SignInSchema, SignUp, SignUpSchema } from "@/types"
import * as argon2 from "argon2"
import { eq } from "drizzle-orm"
import { generateId } from "lucia"

export const signUp = async (values: SignUp) => {
  try {
    SignUpSchema.parse(values)

    const userId = generateId(15)
    const hashedPassword = await argon2.hash(values.password)

    await db.insert(userTable).values({
      id: userId,
      username: values.username,
      hashedPassword,
    })

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

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

export const signIn = async (values: SignIn) => {
  try {
    SignInSchema.parse(values)

    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.username, values.username),
    })

    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      }
    }

    if (!existingUser.hashedPassword) {
      return {
        success: false,
        message: "User not found",
      }
    }

    const isValidPassword = await argon2.verify(
      existingUser.hashedPassword,
      values.password
    )

    if (!isValidPassword) {
      return {
        success: false,
        message: "Incorrect username or password",
      }
    }

    const session = await lucia.createSession(existingUser.id.toString(), {
      expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

    return {
      success: true,
    }
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message,
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
