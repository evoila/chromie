"use server";

import { hash, verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { z } from "zod";

import { lucia, validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { insertUserSchema, selectUserSchema, users } from "@/lib/schemas";

const hashOptions = {
  memoryCost: 19456,
  outputLen: 32,
  parallelism: 1,
  timeCost: 2,
};

async function createAndSetSessionCookie(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function signIn(value: z.infer<typeof selectUserSchema>) {
  const parsed = selectUserSchema.safeParse(value);

  if (!parsed.success) return;

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
      password: true,
    },
    where: eq(users.email, parsed.data.email),
  });

  if (!user) return { error: "" };

  const password = await verify(
    user.password,
    parsed.data.password,
    hashOptions,
  );

  if (!password) return { error: "" };

  await createAndSetSessionCookie(user.id);
}

export async function signOut() {
  const { session } = await validateRequest();

  if (!session) return;

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function signUp(value: z.infer<typeof insertUserSchema>) {
  const parsed = insertUserSchema.safeParse(value);

  if (!parsed.success) return;

  const user = await db.query.users.findFirst({
    columns: {
      email: true,
    },
    where: eq(users.email, parsed.data.email),
  });

  if (user?.email) return { error: "" };

  const userId = generateIdFromEntropySize(10);

  const password = await hash(parsed.data.password, hashOptions);

  await db.insert(users).values({
    id: userId,
    email: parsed.data.email,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    password: password,
  });

  await createAndSetSessionCookie(userId);
}
