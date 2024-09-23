"use client";

import { useForm } from "@tanstack/react-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { format } from "date-fns";
import { ArrowUp } from "lucide-react";

import { readAppointment } from "@/actions/appointments";
import { createComment } from "@/actions/comments";
import { readUser } from "@/actions/user";

import { Button } from "@/components/elements/button";
import { TextareaField } from "@/components/fields";
import { insertCommentSchema } from "@/lib/schemas";

import { cn } from "@/lib/utils";

interface CommentsProps {
  appointment: NonNullable<Awaited<ReturnType<typeof readAppointment>>>;
}

export const Comments: React.FC<CommentsProps> = ({ appointment }) => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await readUser(),
  });

  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await createComment(value, { appointment: appointment.id });
        queryClient.invalidateQueries({ queryKey: ["appointment"] });
        form.reset();
      } catch (error) {
        console.error(error);
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: insertCommentSchema,
    },
  });

  return (
    <div className="grid size-full grid-rows-4">
      <div className="row-span-3 p-12">
        <div className="flex size-full flex-col gap-12 overflow-y-auto scrollbar-hide">
          {appointment.comments.map((comment, index) => (
            <div
              key={index}
              className={cn(
                "flex w-2/3 flex-col gap-3 rounded-lg border border-border p-3",
                data?.id === comment.creator.id && "self-end",
              )}
            >
              <div className="flex justify-between font-semibold">
                {comment.creator.firstName} {comment.creator.lastName}
              </div>
              <div>{comment.message}</div>
              <div className="self-end text-muted-foreground">
                {format(comment.created, "dd.MM.yyyy HH:mm")}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        className="flex gap-3 border-t border-border p-3"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="message"
          validators={{ onChange: insertCommentSchema.shape.message }}
        >
          {(field) => <TextareaField className="grow" field={field} />}
        </form.Field>
        <Button className="h-full w-12">
          <ArrowUp />
        </Button>
      </form>
    </div>
  );
};
