import { FieldApi } from "@tanstack/react-form";
import React from "react";

import { Input } from "@/components/elements/input";

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  field: FieldApi<any, any, any, any>;
}

export const InputField: React.FC<InputFieldProps> = ({ field, ...props }) => {
  return (
    <Input
      border
      name={field.name}
      onChange={(event) => field.handleChange(event.target.value)}
      value={field.state.value}
      {...props}
    />
  );
};
