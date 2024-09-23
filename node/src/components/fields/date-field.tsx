"use client";

import { FieldApi } from "@tanstack/react-form";
import { format } from "date-fns";
import React from "react";

import { Calendar, useCalendarStore } from "@/components/calendar";
import { Input } from "@/components/elements/input";

interface DateFieldProps {
  field: FieldApi<any, any, any, any>;
}

export const DateField: React.FC<DateFieldProps> = ({ field }) => {
  const { selectedDate } = useCalendarStore();

  React.useEffect(() => {
    field.setValue(format(selectedDate, "yyyy-MM-dd"));
  }, [field, selectedDate]);

  return (
    <>
      <Calendar />
      <Input
        border
        className="hidden"
        name={field.name}
        onChange={(event) => field.handleChange(event.target.value)}
        value={field.state.value}
      />
    </>
  );
};
