"use server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { appointments } from "@/lib/schemas";

export async function updateResponder(id: number, responder: string) {
  console.log("test");

  await db
    .update(appointments)
    .set({ revisor: responder })
    .where(eq(appointments.id, id));
}
