import { Cell, flexRender, Header } from "@tanstack/react-table";
import React from "react";

import { cn } from "@/lib/utils";

interface TableProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {}

export const Table: React.FC<TableProps> = ({ className, ...props }) => {
  return <table className={cn("w-full", className)} {...props} />;
};

interface ThProps
  extends React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  > {
  header: Header<any, any>;
}

export const Th: React.FC<ThProps> = ({ className, header, ...props }) => {
  return (
    <th
      className="p-0"
      {...props}
      style={{
        width: header.column.getSize(),
      }}
    >
      <button
        className={cn(
          "size-full h-12 border-b bg-background p-3 text-left font-normal",
          className,
        )}
        onClick={() =>
          header.column.toggleSorting(header.column.getIsSorted() === "asc")
        }
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
      </button>
    </th>
  );
};

interface TdProps
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  > {
  cell: Cell<any, any>;
}

export const Td: React.FC<TdProps> = ({
  cell,
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={cn("h-12 p-3", className)}
      style={{
        width: cell.column.getSize(),
      }}
      {...props}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};
