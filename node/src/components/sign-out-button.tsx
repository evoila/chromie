"use client";

import { LogOut } from "lucide-react";

import { signOut } from "@/actions/auth";

import { Button } from "./elements/button";

export const SignOutButton: React.FC = () => {
  return (
    <Button aspect="square" intent="light" onClick={() => signOut()}>
      <LogOut />
    </Button>
  );
};
