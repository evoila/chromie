import { FieldApi } from "@tanstack/react-form";
import React from "react";

import { Textarea } from "@/components-2/textarea";

interface TextareaFieldProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  field: FieldApi<any, any, any, any>;
  label: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  field,
  label,
  ...props
}) => {
  return (
    <div className="flex grow flex-col gap-3">
      <div className="relative grow rounded-lg border border-foreground">
        <label className="absolute -top-2 left-6 bg-blue-100 px-3">
          {label}
        </label>
        <Textarea
          name={field.name}
          onChange={(event) => field.handleChange(event.target.value)}
          value={field.state.value}
          {...props}
        />
      </div>
      {field.state.meta.errors.length != 0 && (
        <div>{field.state.meta.errors.join(", ")}</div>
      )}
    </div>
  );
};
