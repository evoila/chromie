import { date, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const timeRanges = pgTable("time_ranges", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  end: text("end").notNull(),
  start: text("start").notNull(),
});

export const insertTimeRangeSchema = createInsertSchema(timeRanges, {
  date: (schema) => schema.date.date(),
}).pick({ date: true, end: true, start: true });
