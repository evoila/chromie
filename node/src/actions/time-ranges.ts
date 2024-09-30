"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { insertTimeRangeSchema, timeRanges } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { format } from "date-fns";

export async function createTimeRange(
  value: z.infer<typeof insertTimeRangeSchema>,
) {
  const parsed = insertTimeRangeSchema.safeParse(value);

  if (!parsed.success) return;

  await db.insert(timeRanges).values({
    date: parsed.data.date,
    end: parsed.data.end,
    start: parsed.data.start,
  });
}

export async function readTimeRanges() {
  return await db.query.timeRanges.findMany();
}

export async function readTimeRangesForDate(date: Date) {
  const result = await db.query.timeRanges.findFirst({
    where: eq(timeRanges.date, format(date, "yyyy-MM-dd")),
  });

  return result ?? null;
}
