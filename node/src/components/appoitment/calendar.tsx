import {
  addDays,
  eachDayOfInterval,
  format,
  isMonday,
  isSameDay,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const hoursInDay = Array.from({ length: 24 }, (_, i) => i);

interface CalendarProps {
  date: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const hourRange = [6, 12];

  const monday = React.useMemo(
    () => startOfWeek(date, { weekStartsOn: 1 }),
    [date],
  );

  const weekDays = React.useMemo(
    () =>
      eachDayOfInterval({
        start: monday,
        end: addDays(monday, 4),
      }),
    [monday],
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex min-h-12 items-center justify-between border-b px-3 font-semibold">
        <div>{format(date, "MMMM yyyy")}</div>
        <div className="flex gap-3">
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
        </div>
      </div>
      <div className="grid min-h-12 grid-cols-5 divide-x border-b">
        {weekDays.map((day, index) => (
          <div className="flex items-center px-3" key={index}>
            {format(day, "E dd")}
          </div>
        ))}
      </div>
      <div className="grid grow grid-cols-5 divide-x overflow-y-auto scrollbar-hide">
        {weekDays.map((day, index) => (
          <div className="grid-rows-24 grid" key={index}>
            {hoursInDay.map((hour) => {
              const isDate = isSameDay(day, date);
              const isInRange = hour >= hourRange[0] && hour < hourRange[1];

              return (
                <div
                  key={hour}
                  className={cn(
                    "h-12",
                    isDate && isInRange && "bg-muted",
                    hour != 23 &&
                      (!isDate || !isInRange || hour === hourRange[1] - 1) &&
                      "border-b",
                  )}
                >
                  {isMonday(day) && hour != 0 && (
                    <div className="-mt-2 flex">
                      {!isMonday(date) ? (
                        <div className="bg-background px-3">
                          {String(hour).padStart(2, "0")}:00
                        </div>
                      ) : (
                        !isInRange &&
                        hour != hourRange[1] && (
                          <div className="bg-background px-3">
                            {String(hour).padStart(2, "0")}:00
                          </div>
                        )
                      )}
                    </div>
                  )}
                  {!isMonday(day) && isInRange && (
                    <div className="hour-range">
                      <div className="h-full w-full bg-primary/30"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
