import { FieldApi } from "@tanstack/react-form";
import React from "react";

import { Input } from "@/components-2/input";

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  field: FieldApi<any, any, any, any>;
  label: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  field,
  label,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex h-12 rounded-lg border border-foreground">
        <label className="absolute -top-2 left-6 bg-blue-100 px-3">
          {label}
        </label>
        <Input
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
