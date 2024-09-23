"use server";

import { validateRequest } from "@/lib/auth";

export async function readUser() {
  const { user } = await validateRequest();

  return user;
}
