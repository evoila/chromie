"use client";

import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Ellipsis, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { readAppointment } from "@/actions/appointments";
import { readUser } from "@/actions/user";

import { Calendar } from "@/components/appoitment/calendar";
import { Card } from "@/components/card";
import * as DropdownMenu from "@/components/dropdown-menu";
import { H2 } from "@/components/elements/h";
import { variants } from "@/components/motion-variants";
import { Button } from "@/components/elements/button";

import { Comments } from "@/components/appoitment/comments";
import { AssignMe } from "@/components/appoitment/assign-me";

export default function Page({ params }: { params: { id: number } }) {
  const { data: appointment } = useQuery({
    queryKey: ["appointment"],
    queryFn: async () => await readAppointment(params.id),
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await readUser(),
  });

  if (!user || !appointment) return;

  return (
    <motion.div
      animate="animate"
      className="flex size-full flex-col gap-12"
      initial="initial"
      variants={variants("right")}
    >
      <header className="flex justify-between">
        <Link href="/dashboard/appointments">
          <Button aspect="square" intent="light">
            <ArrowLeft />
          </Button>
        </Link>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button aspect="square" intent="light">
              <Ellipsis />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            {user.role === "responder" && <AssignMe id={appointment.id} />}
            <DropdownMenu.Item>Update Status</DropdownMenu.Item>
            <DropdownMenu.Separator className="border-b" />
            <DropdownMenu.Item className="text-destructive">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </header>
      <div className="grid grow grid-cols-2 grid-rows-2 gap-12 overflow-y-auto">
        <Card className="p-12">
          <div className="flex size-full flex-col justify-between gap-12 overflow-y-auto scrollbar-hide">
            <H2>{appointment.title}</H2>
            <div className="flex flex-col gap-3">
              <b>Status</b>
              <div>{appointment.status}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-3">
                <b>Requester</b>
                <div>
                  {appointment.requester.firstName}{" "}
                  {appointment.requester.lastName}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <b>Responder</b>
                <div>
                  {appointment.responder?.firstName}{" "}
                  {appointment.responder?.lastName}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <b>Description</b>
              {appointment.description}
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-3">
                <b>Created</b>
                <div>{format(appointment.created, "dd.MM.yyyy HH:mm")}</div>
              </div>
              <div className="flex flex-col gap-3">
                <b>Modified</b>
                <div>{format(appointment.created, "dd.MM.yyyy HH:mm")}</div>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <Calendar date={parse(appointment.date, "yyyy-MM-dd", new Date())} />
        </Card>
        <Card className="col-span-2">
          <Comments appointment={appointment}></Comments>
        </Card>
      </div>
    </motion.div>
  );
}
