import { FieldApi } from "@tanstack/react-form";

import { DateField, InputField, TextareaField } from "@/components/fields";
import { insertAppointmentSchema, insertQuestionSchema } from "@/lib/schemas";

import { TimeField } from "./fields/time-field";

export const AppointmentForm = [
  {
    children: (field: FieldApi<any, any, any, any>) => (
      <InputField field={field} placeholder="ideal-train" />
    ),
    heading: "Titel",
    name: "title",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic voluptate magni doloremque iste beatae ut dolorem facilis accusamus architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam provident, adipisci repellat?",
    validators: { onChange: insertAppointmentSchema.shape.title },
  },
  {
    children: (field: FieldApi<any, any, any, any>) => (
      <TextareaField field={field} />
    ),
    heading: "Beschreibung",
    name: "description",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic voluptate magni doloremque iste beatae ut dolorem facilis accusamus architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam provident, adipisci repellat?",
    validators: { onChange: insertAppointmentSchema.shape.description },
  },
  {
    children: (field: FieldApi<any, any, any, any>) => (
      <DateField field={field} />
    ),
    heading: "Datum",
    name: "date",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic voluptate magni doloremque iste beatae ut dolorem facilis accusamus architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam provident, adipisci repellat?",
    validators: { onChange: insertAppointmentSchema.shape.date },
  },
  {
    children: (field: FieldApi<any, any, any, any>) => (
      <TimeField field={field} placeholder="ideal-train" />
    ),
    heading: "Zeit",
    name: "time",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic voluptate magni doloremque iste beatae ut dolorem facilis accusamus architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam provident, adipisci repellat?",
    validators: { onChange: insertAppointmentSchema.shape.title },
  },
];

export const QuestionForm = [
  {
    children: (field: FieldApi<any, any, any, any>) => (
      <InputField field={field} placeholder="ideal-train" />
    ),
    heading: "Titel",
    name: "title",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic voluptate magni doloremque iste beatae ut dolorem facilis accusamus architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam provident, adipisci repellat?",
    validators: { onChange: insertQuestionSchema.shape.title },
  },
  {
    children: (field: FieldApi<any, any, any, any>) => (
      <TextareaField field={field} />
    ),
    heading: "Beschreibung",
    name: "description",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic voluptate magni doloremque iste beatae ut dolorem facilis accusamus architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam provident, adipisci repellat?",
    validators: { onChange: insertQuestionSchema.shape.description },
  },
];
