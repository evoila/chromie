import Link from "next/link";
import React from "react";

import { Card } from "@/components/card";
import { validateRequest } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) return;

  return (
    <div className="grid size-full grid-cols-4 gap-12">
      <aside>
        <Card className="flex flex-col gap-12 p-12">
          <div className="flex flex-col gap-3">
            <div className="font-semibold">Appointments</div>
            {user.role === "responder" && (
              <Link className="pl-3" href={"/dashboard/settings/slots"}>
                Slots
              </Link>
            )}
          </div>
        </Card>
      </aside>
      <div className="col-span-3 overflow-y-auto">{children}</div>
    </div>
  );
}
