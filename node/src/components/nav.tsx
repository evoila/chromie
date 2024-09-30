import { Calendar, Settings, Triangle } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/elements/button";

export const Nav: React.FC = () => {
  return (
    <nav className="flex h-full flex-col justify-between">
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
    </nav>
  );
};
