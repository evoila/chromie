import { redirect } from "next/navigation";
import React from "react";

import { validateRequest } from "@/lib/auth";
import { Aside } from "@/components/aside";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) redirect("/auth");

  return (
    <div className="flex h-screen gap-12 p-12">
      <Aside />
      <div className="flex size-full grow justify-center">{children}</div>
    </div>
  );
}
