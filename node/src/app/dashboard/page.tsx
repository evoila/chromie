"use client";

import React from "react";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import { createAppointment } from "@/actions/appointments";

import { Button } from "@/components-2/button";
import {
  MonthCalendar,
  useMonthCalendarStore,
  WorkWeekCalendar,
} from "@/components-2/calendar";
import { InputField, TextareaField } from "@/components-2/fields/";

import { insertAppointmentSchema } from "@/lib/schemas";

const CreateAppointmentForm: React.FC = () => {
  const form = useForm({
    defaultValues: {
      date: "",
      description: "",
      end: "",
      title: "",
      start: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await createAppointment(value);
      } catch (error) {
        console.error(error);
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: insertAppointmentSchema,
    },
  });

  return (
    <form
      className="flex size-full flex-col gap-12 rounded-lg p-12"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="title"
        validators={{ onChange: insertAppointmentSchema.shape.title }}
      >
        {(field) => (
          <InputField field={field} label="Titel" placeholder="expert-enigma" />
        )}
      </form.Field>
      <form.Field
        name="description"
        validators={{
          onChange: insertAppointmentSchema.shape.description,
        }}
      >
        {(field) => (
          <TextareaField field={field} label="Beschreibung"></TextareaField>
        )}
      </form.Field>
      <form.Field
        name="date"
        validators={{ onChange: insertAppointmentSchema.shape.date }}
      >
        {(field) => <InputField field={field} label="Datum" />}
      </form.Field>
      <div className="grid grid-cols-2 gap-12">
        <form.Field name="start">
          {(field) => (
            <InputField field={field} label="Start" placeholder="00:00" />
          )}
        </form.Field>
        <form.Field name="end">
          {(field) => (
            <InputField field={field} label="Ende" placeholder="00:00" />
          )}
        </form.Field>
      </div>
      <form.Subscribe selector={(state) => [state.canSubmit]}>
        {([canSubmit]) => <Button disabled={!canSubmit}>Submit</Button>}
      </form.Subscribe>
    </form>
  );
};

export default function Page() {
  const { selected } = useMonthCalendarStore();

  return (
    <div className="grid size-full grid-cols-2 gap-12">
      <div className="relative flex items-center">
        <motion.div
          className="absolute left-0 h-[calc(100%-96px)] w-full overflow-y-auto rounded-lg bg-blue-100 text-foreground"
          transition={{ delay: 0.5, type: "spring" }}
          whileInView={{
            height: "100%",
            width: "200%",
            zIndex: 10,
          }}
        >
          <div className="relative size-full p-12">
            <div className="absolute left-12 top-12 text-5xl font-semibold">
              Request Appointment
            </div>
            <button className="absolute bottom-12 right-12 size-12 self-end transition-all hover:opacity-75">
              <ArrowDown className="size-12 animate-bounce stroke-foreground" />
            </button>
          </div>
          <div className="grid size-full grid-cols-3 gap-12 p-12">
            <div className="rounded-lg border border-foreground">
              <CreateAppointmentForm />
            </div>
            <div className="col-span-2 overflow-y-auto rounded-lg border border-foreground">
              {selected == null ? <MonthCalendar /> : <WorkWeekCalendar />}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="relative flex items-center">
        <div className="absolute right-0 grid h-[calc(100%-96px)] w-full rounded-lg bg-muted"></div>
      </div>
    </div>
  );
}
