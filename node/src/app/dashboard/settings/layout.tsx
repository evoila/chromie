import { Clock, Settings, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Card } from "@/components/card";
import { validateRequest } from "@/lib/auth";

const Nav: React.FC = () => {
  return (
    <nav className="flex size-full flex-col">
      <div className="h-12 border-b">
        <Link
          className="flex size-full items-center justify-start gap-3 px-3 hover:bg-muted"
          href="/dashboard/settings/account"
        >
          <Settings className="size-4" />
          Account
        </Link>
      </div>
      <div className="h-12 border-b">
        <Link
          className="flex size-full items-center justify-start gap-3 px-3 hover:bg-muted"
          href="/dashboard/settings/time-ranges"
        >
          <Clock className="size-4" />
          Time Ranges
        </Link>
      </div>
      <div className="h-12">
        <Link
          className="flex size-full items-center justify-start gap-3 px-3 hover:bg-muted"
          href="/dashboard/settings/users"
        >
          <Users className="size-4" />
          Users
        </Link>
      </div>
    </nav>
  );
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) return;

  return (
    <Card className="grid size-full grid-cols-6">
      <div className="border-r">
        <Nav />
      </div>
      <div className="col-span-5 overflow-y-auto">{children}</div>
    </Card>
  );
}
