import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { create } from "zustand";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { readTimeRangesForDate } from "@/actions/time-ranges";

interface CalendarState {
  currentMonth: Date;
  selectedDate: Date;
  nextMonth: () => void;
  previousMonth: () => void;
  resetToToday: () => void;
  setSelectedDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentMonth: new Date(),
  selectedDate: new Date(),
  nextMonth: () =>
    set((state) => ({ currentMonth: addMonths(state.currentMonth, 1) })),
  previousMonth: () =>
    set((state) => ({ currentMonth: addMonths(state.currentMonth, -1) })),
  resetToToday: () =>
    set(() => ({ currentMonth: new Date(), selectedDate: new Date() })),
  setSelectedDate: (date: Date) => set(() => ({ selectedDate: date })),
}));

interface DayProps {
  date: Date;
}

const Day: React.FC<DayProps> = ({ date }) => {
  const { data } = useQuery({
    queryKey: ["time_ranges", date],
    queryFn: async () => await readTimeRangesForDate(date),
  });

  const { currentMonth, selectedDate, setSelectedDate } = useCalendarStore();
  const today = new Date();

  const isSelected = isSameDay(selectedDate, date);
  const isCurrentMonth = getMonth(currentMonth) === getMonth(date);
  const isToday = isSameDay(today, date);

  const classNames = cn(
    "flex items-center justify-center rounded-lg disabled:text-muted",
    isSelected && "bg-muted",
    !isCurrentMonth && "text-muted",
    isToday && "text-destructive",
  );

  return (
    <button
      className={classNames}
      disabled={!data?.date}
      onClick={() => setSelectedDate(date)}
      type="button"
    >
      {format(date, "d")}
    </button>
  );
};

export const Calendar: React.FC = () => {
  const { currentMonth, nextMonth, previousMonth, resetToToday } =
    useCalendarStore();

  const start = startOfWeek(startOfMonth(currentMonth), {
    weekStartsOn: 1,
  });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: start, end: end });

  return (
    <div className="flex aspect-square h-full flex-col rounded-lg border">
      <div className="flex h-12 items-center justify-between gap-3 border-b px-3">
        <div className="font-semibold">{format(currentMonth, "MMMM yyyy")}</div>
        <div className="flex items-center gap-3">
          <button onClick={previousMonth} type="button">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={resetToToday} type="button">
            Heute
          </button>
          <button onClick={nextMonth} type="button">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid grow grid-cols-7 grid-rows-6 gap-3 p-3">
        {days.map((day) => (
          <Day date={day} key={day.toISOString()} />
        ))}
      </div>
    </div>
  );
};
