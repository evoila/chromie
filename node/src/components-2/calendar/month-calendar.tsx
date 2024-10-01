"use client";

import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { create } from "zustand";

import { readTimeRangeForDate } from "@/actions/time-ranges";
import { cn } from "@/lib/utils";

interface MonthCalendarState {
  month: Date;
  selected: Date | null;
  nextMonth: () => void;
  previousMonth: () => void;
  setSelected: (date: Date | null) => void;
}

export const useMonthCalendarStore = create<MonthCalendarState>((set) => ({
  month: new Date(),
  selected: null,
  nextMonth: () => set((state) => ({ month: addMonths(state.month, 1) })),
  previousMonth: () => set((state) => ({ month: addMonths(state.month, -1) })),
  setSelected: (date: Date | null) => set(() => ({ selected: date })),
}));

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
        end: addDays(startOfWeekDate, 6),
      }),
    [startOfWeekDate],
  );

  return (
    <div className="grid size-full grid-cols-7">
      {days.map((day, index) => (
        <div
          className={cn(
            "flex items-center px-3",
            index < 6 && "border-r border-foreground",
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
  const today = new Date();

  const { month, setSelected } = useMonthCalendarStore();

  const { data } = useQuery({
    queryKey: ["time_ranges", day],
    queryFn: async () => await readTimeRangeForDate(day),
  });

  return (
    <button
      className="flex size-full"
      disabled={data == null}
      onClick={() => setSelected(day)}
    >
      <div
        className={cn(
          "flex h-12 items-center px-3",
          !isSameMonth(day, month) && "text-foreground/25",
        )}
      >
        <div
          className={cn(
            "flex size-6 items-center justify-center rounded-full",
            isSameDay(day, today) && "bg-destructive text-background",
          )}
        >
          {format(day, "d")}
        </div>
      </div>
    </button>
  );
};

export const MonthCalendar: React.FC = () => {
  const { month, nextMonth, previousMonth } = useMonthCalendarStore();

  const start = startOfWeek(startOfMonth(month), {
    weekStartsOn: 1,
  });
  const end = addDays(start, 41);

  const days = eachDayOfInterval({ start: start, end: end });

  return (
    <div className="flex size-full flex-col">
      <div className="flex h-12 items-center justify-between border-b border-foreground px-3">
        {format(month, "MMMM yyyy")}
        <div className="flex gap-3">
          <button
            className="transition-all hover:opacity-50"
            onClick={previousMonth}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button>Today</button>
          <button
            className="transition-all hover:opacity-50"
            onClick={nextMonth}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="h-12 border-b border-foreground">
        <Header />
      </div>
      <div className="grid grow grid-cols-7 grid-rows-6">
        {days.map((day, index) => (
          <div
            className={cn(
              "border-foreground",
              (index + 1) % 7 !== 0 && "border-r",
              index < days.length - 7 && "border-b",
            )}
            key={index}
          >
            <Day day={day} />
          </div>
        ))}
      </div>
    </div>
  );
};
