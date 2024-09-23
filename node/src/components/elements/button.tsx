import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "box-border flex h-12 items-center justify-center rounded-lg outline-none transition-all",
  {
    variants: {
      border: {
        true: "border border-border",
        false: "",
      },
      intent: {
        dark: "bg-foreground text-background hover:bg-muted-foreground disabled:bg-muted-foreground",
        light: "hover:bg-muted disabled:bg-muted",
      },
      aspect: {
        square: "aspect-square",
      },
    },
    defaultVariants: {
      aspect: null,
      border: false,
      intent: "dark",
    },
  },
);

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ aspect, border, className, intent, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ aspect, border, intent }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
