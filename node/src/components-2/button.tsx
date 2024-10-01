import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva("", {
  variants: {
    aspect: {
      square: "aspect-square",
    },
  },
  defaultVariants: {
    aspect: null,
  },
});

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ aspect, className, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ aspect }),
          "h-12 rounded-lg bg-foreground text-background transition-all hover:bg-muted-foreground disabled:bg-muted-foreground",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
