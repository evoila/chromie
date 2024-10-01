"use client";

import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { readUsers } from "@/actions/users";

import { columns } from "./columns";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await readUsers(),
  });

  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="sticky top-0 bg-background" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="p-0"
                key={header.id}
                style={{
                  width: header.column.getSize(),
                }}
              >
                <button className="h-12 w-full border-b px-3 text-left font-normal hover:bg-muted">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </button>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr className="h-12 hover:bg-muted" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                className="p-0 px-3"
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
