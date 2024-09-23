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

import { users } from "@/lib/schemas";
import { comments } from "./comments";

export const statusEnum = pgEnum("status", [
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
  creator: text("creator")
    .notNull()
    .references(() => users.id),
  revisor: text("revisor").references(() => users.id),
});

export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  comments: many(comments),
  creator: one(users, {
    fields: [appointments.creator],
    references: [users.id],
  }),
  revisor: one(users, {
    fields: [appointments.revisor],
    references: [users.id],
  }),
}));

export const insertAppointmentSchema = createInsertSchema(appointments, {
  date: (schema) => schema.date.date(),
  description: (schema) => schema.description.min(1),
  title: (schema) => schema.title.min(1),
}).pick({ date: true, description: true, title: true });
