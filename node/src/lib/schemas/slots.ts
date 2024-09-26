import { date, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const slots = pgTable("slots", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  end: text("end").notNull(),
  start: text("start").notNull(),
});

const pattern = /^([0-9]|1[0-9]|2[0-4]):(00|15|30|45)$/;

export const insertSlotSchema = createInsertSchema(slots, {
  date: (schema) => schema.date.date(),
  start: (schema) => schema.start.regex(pattern),
  end: (schema) => schema.end.regex(pattern),
});
