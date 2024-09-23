import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

import { appointments, questions, users } from "@/lib/schemas";

export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  created: timestamp("timestamp").notNull(),
  message: text("message").notNull(),
  appointment: integer("appointment").references(() => appointments.id),
  question: integer("question").references(() => questions.id),
  creator: text("creator")
    .notNull()
    .references(() => users.id),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  appointment: one(appointments, {
    fields: [comments.appointment],
    references: [appointments.id],
  }),
  question: one(questions, {
    fields: [comments.question],
    references: [questions.id],
  }),
  creator: one(users, {
    fields: [comments.creator],
    references: [users.id],
  }),
}));

export const insertCommentSchema = createInsertSchema(comments, {
  message: (schema) => schema.message.min(1),
}).pick({ message: true });
