"use server";

import { z } from "zod";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { insertQuestionSchema, questions } from "@/lib/schemas";

export async function createQuestion(
  value: z.infer<typeof insertQuestionSchema>,
) {
  const parsed = insertQuestionSchema.safeParse(value);

  if (!parsed.success) return;

  const { user } = await validateRequest();

  if (!user) return;

  await db.insert(questions).values({
    created: new Date(),
    description: parsed.data.description,
    modified: new Date(),
    title: parsed.data.title,
    creator: user.id,
  });
}
