import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});
