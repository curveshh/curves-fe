"use client";

import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChangeAction: (page: number) => void;
  onPageSizeChangeAction?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
};

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChangeAction,
  onPageSizeChangeAction,
  pageSizeOptions = [10, 20, 50],
  className,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages =
    totalPages <= 5
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : [1, 2, 3, 4, 5];
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const baseClassName =
    "flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-[10px] text-slate-500";

  return (
    <div
      className={className ? `${baseClassName} ${className}` : baseClassName}
    >
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-xs"
          aria-label="Trang trước"
          disabled={currentPage === 1}
          onClick={() => onPageChangeAction(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "ghost"}
            size="icon-xs"
            className={
              page === currentPage ? "bg-violet-700 hover:bg-violet-800" : ""
            }
            onClick={() => onPageChangeAction(page)}
          >
            {page}
          </Button>
        ))}
        {totalPages > 5 && (
          <>
            <span className="px-1">…</span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => onPageChangeAction(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
        <Button
          variant="outline"
          size="icon-xs"
          aria-label="Trang sau"
          disabled={currentPage === totalPages}
          onClick={() => onPageChangeAction(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
      <div>
        Hiển thị {start} - {end} / {totalItems}
        {onPageSizeChangeAction && (
          <select
            aria-label="Số mục mỗi trang"
            value={pageSize}
            onChange={(event) =>
              onPageSizeChangeAction(Number(event.target.value))
            }
            className="ml-3 rounded border border-slate-200 bg-white px-2 py-1"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option} / trang
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
