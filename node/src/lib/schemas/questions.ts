import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

import { users } from "@/lib/schemas";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  created: timestamp("created").notNull(),
  description: text("description").notNull(),
  modified: timestamp("modified").notNull(),
  title: text("text").notNull(),
  creator: text("creator")
    .notNull()
    .references(() => users.id),
});

export const questionsRelations = relations(questions, ({ many, one }) => ({
  creator: one(users, {
    fields: [questions.creator],
    references: [users.id],
  }),
  questions: many(questions),
}));

export const insertQuestionSchema = createInsertSchema(questions, {
  description: (schema) => schema.description.min(1),
  title: (schema) => schema.title.min(1),
}).pick({ description: true, title: true });
