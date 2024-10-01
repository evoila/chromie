import { redirect } from "next/navigation";
import { Calendar, Settings, Triangle } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/elements/button";
import { SignOutButton } from "@/components/sign-out-button";
import { validateRequest } from "@/lib/auth";

const Nav: React.FC = () => {
  return (
    <nav className="flex flex-col justify-between gap-12 rounded-lg">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-12">
          <Link href="/dashboard">
            <Button aspect="square" intent="light">
              <Triangle />
            </Button>
          </Link>
          <Link href="/dashboard/appointments">
            <Button aspect="square" intent="light">
              <Calendar />
            </Button>
          </Link>
        </div>
        <Link href="/dashboard/settings">
          <Button aspect="square" intent="light">
            <Settings />
          </Button>
        </Link>
      </div>
      <SignOutButton />
    </nav>
  );
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) redirect("/auth");

  return (
    <div className="flex h-screen gap-12 p-12">
      <Nav />
      <div className="flex size-full grow justify-center">{children}</div>
    </div>
  );
}
