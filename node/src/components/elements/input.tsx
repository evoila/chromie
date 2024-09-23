import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "border-box min-h-12 rounded-lg px-3 outline-foreground",
  {
    variants: {
      border: {
        true: "border border-border",
      },
    },
  },
);

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputVariants> {}

export const Input: React.FC<InputProps> = ({
  border,
  className,
  ...props
}) => {
  return (
    <input className={cn(inputVariants({ border }), className)} {...props} />
  );
};
