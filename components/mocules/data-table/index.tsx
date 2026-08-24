"use client";

import { type ColumnDef, type RowData, useTable } from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

import { dataTableFeatures, type DataTableFeatures } from "./features";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData, unknown>[];
  data: TData[];

  /**
   * Column dùng để filter text.
   * Ví dụ: "name", "email", "title"
   */
  filterColumn?: string;

  /**
   * Placeholder của ô filter.
   */
  filterPlaceholder?: string;

  /**
   * Cho phép chọn row.
   */
  enableRowSelection?: boolean;

  /**
   * Callback khi selection thay đổi.
   */
  onRowSelectionChange?: (rows: TData[]) => void;

  /**
   * Số row mỗi page.
   */
  pageSize?: number;

  /** Được gọi sau khi người dùng đổi trang (page bắt đầu từ 1). */
  onPageChange?: (page: number, pageSize: number) => void;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filter...",
  enableRowSelection = false,
  onRowSelectionChange,
  pageSize = 10,
  onPageChange,
}: DataTableProps<TData>) {
  console.log("data:", data);
  const tableColumns = React.useMemo<
    ColumnDef<DataTableFeatures, TData, unknown>[]
  >(() => {
    if (!enableRowSelection) {
      return columns;
    }

    const selectionColumn: ColumnDef<DataTableFeatures, TData, unknown> = {
      id: "select",

      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() &&
              !table.getIsAllPageRowsSelected() &&
              "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),

      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),

      enableSorting: false,
      enableHiding: false,
    };

    return [selectionColumn, ...columns];
  }, [columns, enableRowSelection]);

  const table = useTable({
    data,
    columns: tableColumns,

    features: dataTableFeatures,
    enableRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
  });

  React.useEffect(() => {
    onRowSelectionChange?.(
      table.getSelectedRowModel().rows.map((row) => row.original),
    );
  }, [onRowSelectionChange, table, table.state.rowSelection]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        filterColumn={filterColumn}
        filterPlaceholder={filterPlaceholder}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} onPageChange={onPageChange} />
    </div>
  );
}
