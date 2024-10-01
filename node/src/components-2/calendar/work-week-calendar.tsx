"use client";

import React from "react";
import {
  addDays,
  eachDayOfInterval,
  format,
  isFriday,
  isMonday,
  startOfWeek,
} from "date-fns";

import { useMonthCalendarStore } from "./month-calendar";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const Header: React.FC = () => {
  const { month } = useMonthCalendarStore();

  const startOfWeekDate = React.useMemo(
    () => startOfWeek(month, { weekStartsOn: 1 }),
    [month],
  );

  const days = React.useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeekDate,
        end: addDays(startOfWeekDate, 4),
      }),
    [startOfWeekDate],
  );

  return (
    <div className="grid size-full grid-cols-5">
      {days.map((day, index) => (
        <div
          className={cn(
            "flex items-center px-3",
            index < 4 && "border-r border-foreground",
          )}
          key={index}
        >
          {format(day, "E")}
        </div>
      ))}
    </div>
  );
};

const Day: React.FC<{ day: Date }> = ({ day }) => {
  return (
    <div className={cn(!isFriday(day) && "border-r border-foreground")}>
      {Array.from({ length: 24 }, (_, hour) => {
        return (
          <div
            key={hour}
            className={cn(
              "flex h-12",
              hour != 23 && "border-b border-foreground",
            )}
          >
            {isMonday(day) && hour != 0 && (
              <div className="-mt-2 bg-blue-100 px-3">
                {String(hour).padStart(2, "0")}:00
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const WorkWeekCalendar: React.FC = () => {
  const { selected, setSelected } = useMonthCalendarStore();

  if (selected == null) return;

  const start = startOfWeek(startOfWeek(selected), {
    weekStartsOn: 1,
  });
  const end = addDays(start, 4);

  const days = eachDayOfInterval({ start: start, end: end });

  return (
    <div className="relative flex size-full flex-col">
      <div className="sticky top-0 flex min-h-12 items-center justify-between border-b border-foreground bg-blue-100 px-3">
        {format(selected, "MMMM yyyy")}
        <button onClick={() => setSelected(null)}>
          <X className="size-4" />
        </button>
      </div>
      <div className="sticky top-12 min-h-12 border-b border-foreground bg-blue-100">
        <Header />
      </div>
      <div className="grid grow grid-cols-5">
        {days.map((day, index) => (
          <Day day={day} key={index} />
        ))}
      </div>
    </div>
  );
};
