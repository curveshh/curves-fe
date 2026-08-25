"use client";

import { type ReactTable, type RowData } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { type DataTableFeatures } from "./features";

interface DataTablePaginationProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
  onPageChange?: (page: number, pageSize: number) => void;
}

export function DataTablePagination<TData extends RowData>({
  table,
  onPageChange,
}: DataTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const totalCount = table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.state.pagination;
  const pageCount = table.getPageCount();
  const from = totalCount === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedCount > 0 ? `${selectedCount} selected · ` : ""}
        Showing {from}–{to} of {totalCount}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            onPageChange?.(pageIndex, pageSize);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
          Previous
        </Button>

        <div className="min-w-20 text-center text-sm">
          {pageCount === 0 ? "Page 0" : `Page ${pageIndex + 1} of ${pageCount}`}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            onPageChange?.(pageIndex + 2, pageSize);
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
