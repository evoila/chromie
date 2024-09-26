"use server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { appointments } from "@/lib/schemas";

export async function updateResponder(id: number, responderId: string) {
  await db
    .update(appointments)
    .set({ responderId: responderId })
    .where(eq(appointments.id, id));
}
