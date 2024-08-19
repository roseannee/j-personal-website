import { relations } from "drizzle-orm"
import {
  boolean,
  date,
  integer,
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
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
})

export const defaultNoteTable = pgTable("default_note", {
  id: serial("id").primaryKey(),
  defaultNote: text("default_note").notNull(),
})

export const noteTable = pgTable("note", {
  id: serial("id").primaryKey(),
  patientId: text("patient_id")
    .notNull()
    .references(() => patientTable.id),
  noteContent: text("note_content").notNull(),
})

export const procedureTable = pgTable("procedure", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price"),
})

export const medicationTable = pgTable("medication", {
  id: serial("id").primaryKey(),
  procedureId: integer("procedure_id")
    .notNull()
    .references(() => procedureTable.id),
  name: text("name").notNull(),
  price: integer("price").notNull(),
})

export const appointmentTable = pgTable("appointment", {
  id: serial("id").primaryKey(),
  patientId: text("patient_id")
    .notNull()
    .references(() => patientTable.id),
  procedureId: integer("procedure_id")
    .notNull()
    .references(() => procedureTable.id),
  medicationId: integer("medication_id").references(() => medicationTable.id),
  price: integer("price").notNull(),
  appointmentDate: timestamp("appointment_date", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  description: text("description"),
})

export const patientRelations = relations(patientTable, ({ one, many }) => ({
  note: one(noteTable, {
    fields: [patientTable.id],
    references: [noteTable.patientId],
  }),
  appointments: many(appointmentTable),
}))

export const procedureRelations = relations(procedureTable, ({ many }) => ({
  medications: many(medicationTable),
}))

export const medicationRelations = relations(medicationTable, ({ one }) => ({
  procedure: one(procedureTable, {
    fields: [medicationTable.procedureId],
    references: [procedureTable.id],
  }),
}))

export const appointmentRelations = relations(appointmentTable, ({ one }) => ({
  patient: one(patientTable, {
    fields: [appointmentTable.patientId],
    references: [patientTable.id],
  }),
  procedure: one(procedureTable, {
    fields: [appointmentTable.procedureId],
    references: [procedureTable.id],
  }),
  medication: one(medicationTable, {
    fields: [appointmentTable.medicationId],
    references: [medicationTable.id],
  }),
}))
