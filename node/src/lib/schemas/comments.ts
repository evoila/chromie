import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

import { appointments, questions, users } from "@/lib/schemas";

export const comments = pgTable("comments", {
  id: text("id").primaryKey(),
  created: timestamp("timestamp").notNull(),
  message: text("message").notNull(),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  creatorId: text("creator_id")
    .notNull()
    .references(() => users.id),
  questionId: integer("question_id").references(() => questions.id),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  appointment: one(appointments, {
    fields: [comments.appointmentId],
    references: [appointments.id],
  }),
  creator: one(users, {
    fields: [comments.creatorId],
    references: [users.id],
  }),
  question: one(questions, {
    fields: [comments.questionId],
    references: [questions.id],
  }),
}));

export const insertCommentSchema = createInsertSchema(comments, {
  message: (schema) => schema.message.min(1),
}).pick({ message: true });
