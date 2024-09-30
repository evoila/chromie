"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  addDays,
  addHours,
  addWeeks,
  eachDayOfInterval,
  format,
  isMonday,
  isSameDay,
  parse,
  set,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { createTimeRange, readTimeRanges } from "@/actions/time-ranges";
import { insertTimeRangeSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

type Selection = {
  start: Date | null;
  end: Date | null;
};

const Header: React.FC<{
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}> = ({ currentDate, onPrevWeek, onNextWeek, onToday }) => (
  <div className="flex min-h-12 items-center justify-between border-b px-3">
    <div className="font-semibold">{format(currentDate, "MMMM yyyy")}</div>
    <div className="flex gap-3">
      <button className="transition-all hover:opacity-50" onClick={onPrevWeek}>
        <ChevronLeft className="size-4" />
      </button>
      <button className="transition-all hover:opacity-50" onClick={onToday}>
        Today
      </button>
      <button className="transition-all hover:opacity-50" onClick={onNextWeek}>
        <ChevronRight className="size-4" />
      </button>
    </div>
  </div>
);

const WeekDays: React.FC<{ weekDays: Date[] }> = ({ weekDays }) => (
  <div className="grid min-h-12 grid-cols-5 divide-x border-b">
    {weekDays.map((day, index) => (
      <div className="flex items-center px-3" key={index}>
        {format(day, "E dd")}
      </div>
    ))}
  </div>
);

type CellProps = {
  day: Date;
  hour: number;
  isSelected: boolean;
  isFirstColumn: boolean;
  onTimeSlotClick: (day: Date, hour: number) => void;
  isBooked?: boolean;
};

const Cell: React.FC<CellProps> = ({
  day,
  hour,
  isSelected,
  isFirstColumn,
  onTimeSlotClick,
  isBooked,
}) => (
  <button
    className={cn(
      "h-12 hover:bg-muted",
      hour !== 23 && "border-b",
      isSelected && "bg-muted",
      isBooked && "bg-muted",
    )}
    onClick={() => onTimeSlotClick(day, hour)}
    type="button"
  >
    {isFirstColumn && hour !== 0 && (
      <div className="-mt-8 flex">
        <div className="bg-white px-3">{String(hour).padStart(2, "0")}:00</div>
      </div>
    )}
  </button>
);

type TimeRange = {
  date: string;
  start: string;
  end: string;
};

const Grid: React.FC<{
  weekDays: Date[];
  selection: Selection;
  onTimeSlotClick: (day: Date, hour: number) => void;
  timeRanges?: TimeRange[];
}> = ({ weekDays, selection, onTimeSlotClick, timeRanges }) => (
  <div className="grid grow grid-cols-5 divide-x overflow-y-auto scrollbar-hide">
    {weekDays.map((day, index) => (
      <div className="grid-rows-24 grid" key={index}>
        {Array.from({ length: 24 }, (_, hour) => {
          const selectedDateTime = set(day, {
            hours: hour,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });

          let isSelected = false;

          if (selection.start && !selection.end) {
            isSelected =
              selectedDateTime.getTime() === selection.start.getTime();
          } else if (selection.start && selection.end) {
            isSelected =
              selectedDateTime.getTime() >= selection.start.getTime() &&
              selectedDateTime.getTime() <= selection.end.getTime();
          }

          const isBooked = timeRanges?.some((tr) => {
            const start = set(parse(tr.date, "yyyy-MM-dd", new Date()), {
              hours: parseInt(tr.start.split(":")[0], 10),
            });
            const end = set(parse(tr.date, "yyyy-MM-dd", new Date()), {
              hours: parseInt(tr.end.split(":")[0], 10),
            });
            return (
              isSameDay(selectedDateTime, start) &&
              selectedDateTime.getTime() >= start.getTime() &&
              selectedDateTime.getTime() < end.getTime()
            );
          });

          return (
            <Cell
              key={hour}
              day={day}
              hour={hour}
              isSelected={isSelected}
              isFirstColumn={isMonday(day)}
              onTimeSlotClick={onTimeSlotClick}
              isBooked={isBooked}
            />
          );
        })}
      </div>
    ))}
  </div>
);

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const queryClient = useQueryClient();

  const { data: timeRanges } = useQuery({
    queryKey: ["time_ranges"],
    queryFn: async () => await readTimeRanges(),
  });

  const startOfWeekDate = React.useMemo(
    () => startOfWeek(currentDate, { weekStartsOn: 1 }),
    [currentDate],
  );

  const weekDays = React.useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeekDate,
        end: addDays(startOfWeekDate, 4),
      }),
    [startOfWeekDate],
  );

  const [selection, setSelection] = React.useState<Selection>({
    start: null,
    end: null,
  });

  const handleTimeSlotClick = (day: Date, hour: number) => {
    const selectedDateTime = set(day, {
      hours: hour,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    setSelection((prevSelection) => {
      const { start, end } = prevSelection;

      if (!start || (start && end)) {
        return { start: selectedDateTime, end: null };
      } else {
        let newStart = start;
        let newEnd = selectedDateTime;

        if (newStart.getTime() > newEnd.getTime()) {
          [newStart, newEnd] = [newEnd, newStart];
        }

        return { start: newStart, end: newEnd };
      }
    });
  };

  const form = useForm({
    defaultValues: {
      date: "",
      start: "",
      end: "",
    },
    onSubmit: async ({ value: values }) => {
      await createTimeRange(values);
      queryClient.invalidateQueries({ queryKey: ["time_ranges"] });
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: insertTimeRangeSchema,
    },
  });

  React.useEffect(() => {
    if (selection.start && selection.end) {
      form.setFieldValue("date", format(selection.start, "yyyy-MM-dd"));
      form.setFieldValue("start", format(selection.start, "HH:mm"));

      const adjustedEnd = addHours(selection.end, 1);
      form.setFieldValue("end", format(adjustedEnd, "HH:mm"));
    }
  }, [selection.start, selection.end, form]);

  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  return (
    <div className="flex size-full flex-col">
      <Header
        currentDate={currentDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />
      <WeekDays weekDays={weekDays} />
      <Grid
        weekDays={weekDays}
        selection={selection}
        onTimeSlotClick={handleTimeSlotClick}
        timeRanges={timeRanges}
      />
      <form
        className="flex min-h-12 items-center justify-end gap-3 border-t px-3"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          Start:{" "}
          {selection.start ? format(selection.start, "dd.MM.yyyy HH:mm") : ""}
        </div>
        <div>
          End: {selection.end ? format(selection.end, "dd.MM.yyyy HH:mm") : ""}
        </div>
        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <button type="submit" disabled={!canSubmit}>
              <Check className={cn("size-4")} />
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default function Page() {
  return <Calendar />;
}
