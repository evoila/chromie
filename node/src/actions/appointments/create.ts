"use server";

import { z } from "zod";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { appointments, insertAppointmentSchema } from "@/lib/schemas";

export async function createAppointment(
  value: z.infer<typeof insertAppointmentSchema>,
) {
  const parsed = insertAppointmentSchema.safeParse(value);

  if (!parsed.success) return;

  const { user } = await validateRequest();

  if (!user) return;

  await db.insert(appointments).values({
    created: new Date(),
    date: parsed.data.date,
    description: parsed.data.description,
    modified: new Date(),
    title: parsed.data.title,
    requesterId: user.id,
  });
}
