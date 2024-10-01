"use server";

import { db } from "@/lib/db";

export async function readUsers() {
  const result = await db.query.users.findMany({
    columns: {
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });

  return result ?? null;
}
