import {
  Calendar,
  MessageSquare,
  Settings,
  Triangle,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/elements/button";

export const Aside: React.FC = () => {
  return (
    <aside className="flex h-full flex-col justify-between">
      <nav className="flex flex-col gap-12">
        <Link href="/dashboard">
          <Button aspect="square" intent="light">
            <Triangle />
          </Button>
        </Link>
        <div className="flex flex-col gap-3">
          <Link href="/dashboard/appointments">
            <Button aspect="square" intent="light">
              <Calendar />
            </Button>
          </Link>
          <Button aspect="square" disabled intent="light">
            <MessageSquare />
          </Button>
        </div>
      </nav>
      <div className="flex flex-col gap-3">
        <Link href="/dashboard/settings">
          <Button aspect="square" intent="light">
            <Settings />
          </Button>
        </Link>
      </div>
    </aside>
  );
};
