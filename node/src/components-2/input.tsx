import React from "react";

import { cn } from "@/lib/utils";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn("size-full bg-transparent px-3 outline-none", className)}
      {...props}
    />
  );
};
