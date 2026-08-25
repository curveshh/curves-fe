"use client";

import { type ReactTable, type RowData } from "@tanstack/react-table";
import { RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type DataTableFeatures } from "./features";

interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
  filterColumn?: string;
  filterPlaceholder?: string;
}

export function DataTableToolbar<TData extends RowData>({
  table,
  filterColumn,
  filterPlaceholder = "Filter...",
}: DataTableToolbarProps<TData>) {
  const column = filterColumn ? table.getColumn(filterColumn) : undefined;

  if (!column) return null;

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={filterPlaceholder}
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(event) => column.setFilterValue(event.target.value)}
            className="h-9 pl-9"
          />
        </div>

        {table.state.columnFilters.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            <RotateCcw />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
