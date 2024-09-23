import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const textareaVariants = cva("resize-none rounded-lg p-3 outline-black", {
  variants: {
    border: {
      true: "border border-border",
    },
  },
});

export interface TextareaProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    VariantProps<typeof textareaVariants> {}

export const Textarea: React.FC<TextareaProps> = ({
  border,
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn(textareaVariants({ border }), className)}
      {...props}
    />
  );
};
