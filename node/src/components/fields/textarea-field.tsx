import { FieldApi } from "@tanstack/react-form";
import React from "react";

import { Textarea } from "@/components/elements/textarea";

interface TextareaFieldProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  field: FieldApi<any, any, any, any>;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  field,
  ...props
}) => {
  return (
    <Textarea
      border
      className="aspect-square"
      name={field.name}
      onChange={(event) => field.handleChange(event.target.value)}
      value={field.state.value}
      {...props}
    />
  );
};
