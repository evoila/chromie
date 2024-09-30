"use client";

import { LogOut } from "lucide-react";
import React from "react";

import { signOut } from "@/actions/auth";
import { Button } from "@/components/elements/button";
import { Nav } from "@/components/nav";

export const Aside: React.FC = () => {
  return (
    <aside className="flex flex-col justify-between gap-12">
      <Nav></Nav>
      <Button aspect="square" intent="light" onClick={() => signOut()}>
        <LogOut />
      </Button>
    </aside>
  );
};
