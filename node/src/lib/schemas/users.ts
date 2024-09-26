import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { appointments, questions } from "@/lib/schemas";

export const roleEnum = pgEnum("user_roles", ["requester", "responder"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  password: text("password").notNull(),
  role: roleEnum("role").default("requester").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  appointments: many(appointments),
  questions: many(questions),
}));

export const insertUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email(),
  firstName: (schema) => schema.firstName.min(1),
  lastName: (schema) => schema.lastName.min(1),
  password: (schema) => schema.password.min(8),
}).pick({ email: true, firstName: true, lastName: true, password: true });

export const selectUserSchema = createSelectSchema(users, {}).pick({
  email: true,
  password: true,
});
