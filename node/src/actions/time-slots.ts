"use server";

import {
  differenceInMilliseconds,
  format,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { insertTimeSlotSchema, timeSlots } from "@/lib/schemas";

import { readTimeRangeForDate } from "@/actions/time-ranges";

export async function createTimeRange(
  value: z.infer<typeof insertTimeSlotSchema>,
) {
  const parsed = insertTimeSlotSchema.safeParse(value);

  if (!parsed.success) return;

  await db.insert(timeSlots).values({
    date: parsed.data.date,
    end: parsed.data.end,
    start: parsed.data.start,
  });
}

export async function readTimeSlots() {
  return await db.query.timeSlots.findMany();
}

export async function readTimeSlotsForDate(date: Date) {
  const result = await db.query.timeSlots.findMany({
    where: eq(timeSlots.date, format(date, "yyyy-MM-dd")),
  });

  return result ?? null;
}

export async function calculateAvailableTimeSlots(
  date: Date,
  duration: string, // Duration as "HH:mm" format
) {
  const timeRange = await readTimeRangeForDate(date);
  const timeSlots = await readTimeSlotsForDate(date);

  if (!timeRange) {
    return null;
  }

  // Parse the start and end times of the time range using the provided date
  const timeRangeStart = parse(timeRange.start, "HH:mm", date);
  const timeRangeEnd = parse(timeRange.end, "HH:mm", date);

  // Convert the duration string to milliseconds
  const desiredDurationMs = durationStringToMilliseconds(duration);

  const occupiedIntervals = timeSlots.map((slot) => {
    const start = parse(slot.start, "HH:mm", date);
    const end = parse(slot.end, "HH:mm", date);
    return { start, end };
  });

  // Sort occupied intervals by start time
  occupiedIntervals.sort((a, b) => a.start.getTime() - b.start.getTime());

  const freeSlots = [];
  let lastEnd = timeRangeStart;

  for (const interval of occupiedIntervals) {
    if (isAfter(interval.start, lastEnd)) {
      const gapStart = lastEnd;
      const gapEnd = interval.start;
      const gapDuration = differenceInMilliseconds(gapEnd, gapStart);

      if (gapDuration >= desiredDurationMs) {
        freeSlots.push({
          start: format(gapStart, "HH:mm"),
          end: format(gapEnd, "HH:mm"),
        });
      }
    }
    if (isAfter(interval.end, lastEnd)) {
      lastEnd = interval.end;
    }
  }

  // Check for a gap between the last occupied interval and the end of the time range
  if (isBefore(lastEnd, timeRangeEnd)) {
    const gapStart = lastEnd;
    const gapEnd = timeRangeEnd;
    const gapDuration = differenceInMilliseconds(gapEnd, gapStart);

    if (gapDuration >= desiredDurationMs) {
      freeSlots.push({
        start: format(gapStart, "HH:mm"),
        end: format(gapEnd, "HH:mm"),
      });
    }
  }

  return freeSlots;
}

function durationStringToMilliseconds(durationStr: string): number {
  const [hoursStr, minutesStr] = durationStr.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error();
  }

  return (hours * 60 + minutes) * 60 * 1000;
}
