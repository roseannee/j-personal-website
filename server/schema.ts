import { InferSelectModel } from "drizzle-orm"
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
})

export const magicLinkTable = pgTable("magic_link", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  token: text("token").notNull(),
})

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export const genderEnum = pgEnum("gender", ["male", "female"])

export const patientTable = pgTable("patient", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  gender: genderEnum("gender").notNull(),
  birthdate: date("birthdate", { mode: "date" }).notNull(),
  allergies: boolean("allergies").notNull(),
  phoneNumber: text("phone_number"),
  telegram: text("telegram"),
  instagram: text("instagram"),
})
export type Patient = InferSelectModel<typeof patientTable>
