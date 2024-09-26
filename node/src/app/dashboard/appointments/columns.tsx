import { createColumnHelper } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

import { readAppointments } from "@/actions/appointments";
import Link from "next/link";

type Appointment = Awaited<ReturnType<typeof readAppointments>>[number];

const columnHelper = createColumnHelper<Appointment>();

export const columns = [
  columnHelper.accessor((row) => `APPO-${String(row.id).padStart(4, "0")}`, {
    cell: (info) => <>{info.getValue()}</>,
    header: "ID",
    id: "id",
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: "Title",
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: "Status",
  }),
  columnHelper.accessor(
    (row) => `${row.requester.firstName} ${row.requester.lastName}`,
    {
      cell: (info) => info.getValue(),
      header: "Requester",
      id: "requester",
    },
  ),
  columnHelper.accessor(
    (row) =>
      row.responder
        ? `${row.responder.firstName} ${row.responder.lastName}`
        : "",
    {
      cell: (info) => info.getValue(),
      header: "Responder",
      id: "responder",
    },
  ),
  columnHelper.accessor("date", {
    cell: (info) => format(info.getValue(), "dd.MM.yyyy"),
    header: "Date",
  }),
  columnHelper.display({
    cell: (info) => (
      <Link href={`/dashboard/appointments/${info.row.original.id}`}>
        <ArrowRight className="size-4" />
      </Link>
    ),
    id: "actions",
  }),
];
