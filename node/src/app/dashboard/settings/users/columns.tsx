import { createColumnHelper } from "@tanstack/react-table";

import { readUsers } from "@/actions/users";

type Appointment = Awaited<ReturnType<typeof readUsers>>[number];

const columnHelper = createColumnHelper<Appointment>();

export const columns = [
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "Email",
  }),
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
    header: "Last Name",
  }),
  columnHelper.accessor("role", {
    cell: (info) => info.getValue(),
    header: "Role",
  }),
];
