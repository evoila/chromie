// fix animation

"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { AnimatePresence, motion } from "framer-motion";
import { Triangle } from "lucide-react";
import React from "react";

import { signIn, signUp } from "@/actions/auth";
import { Button } from "@/components/elements/button";
import { InputField } from "@/components/fields";
import { insertUserSchema, selectUserSchema } from "@/lib/schemas";

type SwitchCase = "in" | "up";

const In: React.FC<{
  setSwitchCase: React.Dispatch<React.SetStateAction<SwitchCase | null>>;
}> = ({ setSwitchCase }) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await signIn(value);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: selectUserSchema,
    },
  });

  return (
    <form
      className="flex size-full flex-col justify-center gap-12"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Triangle />
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic
        voluptate magni doloremque iste beatae ut dolorem facilis accusamus
        architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam
        provident, adipisci repellat?
      </p>
      <div className="flex flex-col gap-3">
        <form.Field
          name="email"
          validators={{ onChange: selectUserSchema.shape.email }}
        >
          {(field) => (
            <InputField field={field} placeholder="jondoe@example.com" />
          )}
        </form.Field>
        <form.Field
          name="password"
          validators={{ onChange: selectUserSchema.shape.password }}
        >
          {(field) => <InputField field={field} type="password" />}
        </form.Field>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button border disabled={!canSubmit} type="submit">
            {isSubmitting ? "..." : "Sign In"}
          </Button>
        )}
      </form.Subscribe>
      <div>
        Don't have an account?{" "}
        <button
          className="underline"
          type="button"
          onClick={() => setSwitchCase("up")}
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

const Up: React.FC<{
  setSwitchCase: React.Dispatch<React.SetStateAction<SwitchCase | null>>;
}> = ({ setSwitchCase }) => {
  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await signUp(value);
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: insertUserSchema,
    },
  });

  return (
    <form
      className="flex size-full flex-col justify-center gap-12"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Triangle />
      <h1 className="text-3xl font-semibold">Sign Up</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic
        voluptate magni doloremque iste beatae ut dolorem facilis accusamus
        architecto, quasi reprehenderit inventore illum sunt suscipit quibusdam
        provident, adipisci repellat?
      </p>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <form.Field
            name="firstName"
            validators={{ onChange: insertUserSchema.shape.firstName }}
          >
            {(field) => <InputField field={field} placeholder="jon" />}
          </form.Field>
          <form.Field
            name="lastName"
            validators={{ onChange: insertUserSchema.shape.lastName }}
          >
            {(field) => <InputField field={field} placeholder="doe" />}
          </form.Field>
        </div>
        <form.Field
          name="email"
          validators={{ onChange: insertUserSchema.shape.email }}
        >
          {(field) => (
            <InputField field={field} placeholder="jondoe@example.com" />
          )}
        </form.Field>
        <form.Field
          name="password"
          validators={{ onChange: insertUserSchema.shape.password }}
        >
          {(field) => <InputField field={field} type="password" />}
        </form.Field>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button border disabled={!canSubmit} type="submit">
            {isSubmitting ? "..." : "Sign Up"}
          </Button>
        )}
      </form.Subscribe>
      <div>
        Already have an account?{" "}
        <button
          className="underline"
          type="button"
          onClick={() => setSwitchCase("in")}
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

const variants = {
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
  initial: { opacity: 0, x: "100%" },
};

export default function Page() {
  const [switchCase, setSwitchCase] = React.useState<SwitchCase | null>("in");

  return (
    <div className="grid h-screen grid-cols-3">
      <div className="relative col-start-2">
        <AnimatePresence>
          {switchCase === "in" ? (
            <motion.div
              animate="animate"
              className="absolute size-full"
              exit="exit"
              key="in"
              initial="initial"
              variants={variants}
            >
              <In setSwitchCase={setSwitchCase} />
            </motion.div>
          ) : (
            <motion.div
              animate="animate"
              className="absolute size-full"
              exit="exit"
              key="up"
              initial="initial"
              variants={variants}
            >
              <Up setSwitchCase={setSwitchCase} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
