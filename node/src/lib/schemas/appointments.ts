import {
  date,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

import { comments, users } from "@/lib/schemas";

export const statusEnum = pgEnum("appointment_status", [
  "Not started",
  "In progress",
  "Done",
]);

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  created: timestamp("created").notNull(),
  date: date("date").notNull(),
  description: text("description").notNull(),
  modified: timestamp("modified").notNull(),
  status: statusEnum("status").default("Not started").notNull(),
  title: text("title").notNull(),
  responderId: text("responder_id").references(() => users.id),
  requesterId: text("requester_id")
    .notNull()
    .references(() => users.id),
});

export const appointmentsRelations = relations(
  appointments,
  ({ one, many }) => ({
    comments: many(comments),
    responder: one(users, {
      fields: [appointments.responderId],
      references: [users.id],
    }),
    requester: one(users, {
      fields: [appointments.requesterId],
      references: [users.id],
    }),
  }),
);

export const insertAppointmentSchema = createInsertSchema(appointments, {
  date: (schema) => schema.date.date(),
  description: (schema) => schema.description.min(1),
  title: (schema) => schema.title.min(1),
}).pick({ date: true, description: true, title: true });
