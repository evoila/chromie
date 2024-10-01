import React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {}

export const Textarea: React.FC<TextareaProps> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn("size-full resize-none bg-transparent p-3 outline-none", className)}
      {...props}
    />
  );
};
