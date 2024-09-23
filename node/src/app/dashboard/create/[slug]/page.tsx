"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { z } from "zod";

import { createAppointment } from "@/actions/appointments";
import { createQuestion } from "@/actions/questions";

import { Button } from "@/components/elements/button";
import { H2 } from "@/components/elements/h";
import { AppointmentForm, QuestionForm } from "@/components/forms";
import { variants } from "@/components/motion-variants";

import { insertAppointmentSchema, insertQuestionSchema } from "@/lib/schemas";

interface SectionProps {
  children: React.ReactNode;
  heading: string;
  paragraph: string;
  position: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
}

export const Section: React.FC<SectionProps> = ({
  children,
  heading,
  paragraph,
  position,
  setPosition,
}) => {
  return (
    <div
      className="flex size-full flex-col justify-center gap-12"
      style={{ top: `${position * 100}%` }}
    >
      {position == 0 ? (
        <Link className="self-start" href="/dashboard">
          <Button
            aspect="square"
            intent="light"
            onClick={() => setPosition(position - 1)}
            type="button"
          >
            <ArrowLeft />
          </Button>
        </Link>
      ) : (
        <Button
          aspect="square"
          className="self-start"
          intent="light"
          onClick={() => setPosition(position - 1)}
          type="button"
        >
          <ArrowUp />
        </Button>
      )}
      <H2>{heading}</H2>
      <p className="w-2/3">{paragraph}</p>
      <div className="flex w-2/3 flex-col gap-3 self-end">{children}</div>
      <Button
        aspect="square"
        className="self-end"
        intent="light"
        onClick={() => setPosition(position + 1)}
        type="button"
      >
        <ArrowDown />
      </Button>
    </div>
  );
};

type DefaultValues =
  | z.infer<typeof insertAppointmentSchema>
  | z.infer<typeof insertQuestionSchema>;

export default function Page({ params }: { params: { slug: string } }) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [position, setPosition] = React.useState(-1);

  React.useEffect(() => {
    if (formRef.current && position >= 0) {
      const child = formRef.current.children[position];

      if (!child) return;

      child.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setPosition(-1);
    }
  }, [position]);

  // fix onSubmit

  let defaultValues: DefaultValues | null;
  let onSubmit: ({ value }: any) => Promise<void> | null;
  let validators: {};
  let sections: any[];

  switch (params.slug) {
    case "appointment":
      defaultValues = {
        date: "",
        description: "",
        title: "",
      };
      onSubmit = async ({ value }: any) => {
        await createAppointment(value);
      };
      validators = {
        onChange: insertAppointmentSchema,
      };
      sections = AppointmentForm;

      break;

    case "questions":
      defaultValues = {
        description: "",
        title: "",
      };
      onSubmit = async ({ value }: any) => {
        await createQuestion(value);
      };
      validators = {
        onChange: insertQuestionSchema,
      };
      sections = QuestionForm;

      break;

    default:
      defaultValues = null;
      onSubmit = () => null;
      validators = {};
      sections = [];

      break;
  }

  const form = useForm({
    defaultValues,
    onSubmit,
    validatorAdapter: zodValidator(),
    validators,
  });

  return (
    <motion.form
      animate="animate"
      className="scrollbar-hide h-full w-1/2 overflow-y-auto"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      initial="initial"
      ref={formRef}
      variants={variants("right")}
    >
      {sections.map((section, index) => (
        <Section
          heading={section.heading}
          key={section.name}
          paragraph={section.paragraph}
          position={index}
          setPosition={setPosition}
        >
          <form.Field name={section.name} validators={section.validators}>
            {section.children}
          </form.Field>
        </Section>
      ))}
      <div
        className="flex size-full flex-col justify-center gap-12"
        style={{ top: `${sections.length * 100}%` }}
      >
        <Button
          aspect="square"
          className="self-start"
          intent="light"
          onClick={() => setPosition(sections.length - 1)}
          type="button"
        >
          <ArrowUp />
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button border disabled={!canSubmit} type="submit">
              {isSubmitting ? "..." : "submit"}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </motion.form>
  );
}
