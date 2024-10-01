"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import React from "react";

import { readAppointments } from "@/actions/appointments";

import { Card } from "@/components/card";
import { Input } from "@/components/elements/input";
import { Table, Td, Th } from "@/components/elements/table";
import { variants } from "@/components/motion-variants";

import { columns } from "./columns";

export default function Page() {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => await readAppointments(),
  });

  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      sorting,
    },
  });

  return (
    <motion.div
      animate="animate"
      className="flex w-full flex-col gap-12"
      initial="initial"
      variants={variants("down")}
    >
      <Input
        border
        className="w-1/3"
        onChange={(event) => setGlobalFilter(event.target.value)}
        value={globalFilter ?? ""}
      />
      <Card>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="sticky top-0 hover:bg-muted" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th header={header} key={header.id} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className="hover:bg-muted" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td cell={cell} key={cell.id} />
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </motion.div>
  );
}
