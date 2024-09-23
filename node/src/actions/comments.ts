"use server";

import { generateIdFromEntropySize } from "lucia";
import { z } from "zod";

import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { comments, insertCommentSchema } from "@/lib/schemas";

type CreateCommentParams =
  | { appointment: number; question?: never }
  | { appointment?: never; question: number };

export async function createComment(
  value: z.infer<typeof insertCommentSchema>,
  params: CreateCommentParams,
) {
  const parsed = insertCommentSchema.safeParse(value);

  if (!parsed.success) {
    throw new Error("");
  }

  const { user } = await validateRequest();

  if (!user) {
    throw new Error("");
  }

  const id = generateIdFromEntropySize(10);

  try {
    if ("appointment" in params) {
      await db.insert(comments).values({
        id: id,
        created: new Date(),
        message: parsed.data.message,
        creator: user.id,
        appointment: params.appointment,
        question: null,
      });
    } else if ("question" in params) {
      await db.insert(comments).values({
        id: id,
        created: new Date(),
        message: parsed.data.message,
        creator: user.id,
        appointment: null,
        question: params.question,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    throw new Error();
  }
}
