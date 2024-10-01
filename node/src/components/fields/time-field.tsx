import { FieldApi } from "@tanstack/react-form";
import React from "react";

import { Input } from "@/components/elements/input";
import { useCalendarStore } from "../calendar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { calculateAvailableTimeSlots } from "@/actions/time-slots";

interface TimeFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  field: FieldApi<any, any, any, any>;
}

export const TimeField: React.FC<TimeFieldProps> = ({ field, ...props }) => {
  const [duration, setDuration] = React.useState<string>("");

  const queryClient = useQueryClient();

  const { selectedDate } = useCalendarStore();

  const { data } = useQuery({
    queryKey: ["time_slots", selectedDate],
    queryFn: async () =>
      await calculateAvailableTimeSlots(selectedDate, duration),
  });

  console.log(data);

  return (
    <>
      <Input
        border
        onChange={(event) => {
          setDuration(event.target.value);
          queryClient.invalidateQueries({
            queryKey: ["time_slots", selectedDate],
          });
        }}
        placeholder="00:30"
      />
      <div className="flex gap-3">
        <div>Available Slots</div>
        {data?.map((availableSlot, index) => (
          <div key={index}>
            {availableSlot.start}-{availableSlot.end}
          </div>
        ))}
      </div>
      <Input
        border
        name={field.name}
        onChange={(event) => field.handleChange(event.target.value)}
        value={field.state.value}
        {...props}
      />
    </>
  );
};
