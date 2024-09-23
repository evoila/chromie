import { validateRequest } from "@/lib/auth";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (user?.role != "responder") return [];

  return <>{children}</>;
}