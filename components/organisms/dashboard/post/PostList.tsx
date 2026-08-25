"use client";

import { DataTable } from "@/components/mocules/data-table";
import { type DataTableFeatures } from "@/components/mocules/data-table/features";
import { Badge, Button, Card, Checkbox } from "@/components/ui";
import { ROUTE } from "@/contants/route";
import { useNews } from "@/hooks/useNews";
import { type Pagination } from "@/types/base";
import { type NewsPostFormValues } from "@/types/news";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye, Filter, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const pageSize = 10;

const statusLabels = {
  ARCHIVED: "Đã lưu trữ",
  DRAFT: "Bản nháp",
  PUBLISHED: "Đã xuất bản",
} as const;

type Props = {
  data: NewsPostFormValues[];
};

export function PostList({ data = [] }: Props) {
  const router = useRouter();
  const { prefetchList, remove } = useNews({ page: 1, limit: pageSize });

  const onEditNews = (data: NewsPostFormValues) => {
    router.push(ROUTE.EDIT_POST.replace("{slug}", data.slug));
  };

  const columns: ColumnDef<DataTableFeatures, NewsPostFormValues>[] = [
    {
      accessorKey: "title",
      header: "Bài viết",
      cell: ({ row }) => {
        const post = row.original;

        return (
          <div className="flex items-center gap-3">
            {post.coverImageUrl ? (
              <Image
                src={post.coverImageUrl}
                alt=""
                width={44}
                height={36}
                className="h-9 w-11 rounded object-cover"
              />
            ) : (
              <div className="h-9 w-11 rounded bg-slate-100" />
            )}
            <div className="max-w-64">
              <p className="truncate font-semibold text-slate-700">
                {post.title}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-slate-400">
                /{post.slug}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "categoryId",
      header: "Danh mục",
      cell: ({ row }) => (
        <Badge className="bg-violet-50 text-violet-500">
          {row.original.categoryId}
        </Badge>
      ),
    },
    {
      accessorKey: "isHome",
      header: "Hiển thị trang chủ",
      cell: ({ row }) => <Checkbox checked={row.original.isHome} />,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <Badge
            className={
              status === "PUBLISHED"
                ? "bg-emerald-50 text-emerald-600"
                : status === "DRAFT"
                  ? "bg-orange-50 text-orange-500"
                  : "bg-slate-100 text-slate-500"
            }
          >
            {statusLabels[status]}
          </Badge>
        );
      },
    },
    {
      accessorKey: "publishedAt",
      header: "Ngày xuất bản",
      cell: ({ row }) =>
        row.original.publishedAt
          ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "short" }).format(
              new Date(row.original.publishedAt),
            )
          : "—",
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <div className="flex justify-center gap-1">
          <Button variant="ghost" size="icon-xs" aria-label="Xem bài viết">
            <Eye />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Sửa bài viết"
            onClick={() => onEditNews(row.original)}
          >
            <Pencil />
          </Button>
          {row.original.id && (
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-rose-400 hover:bg-rose-50 hover:text-rose-500"
              aria-label="Xóa bài viết"
              onClick={() => {
                const id = row.original.id;
                if (id) remove.mutate(id);
              }}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    void prefetchList({ page: 2, limit: pageSize });
  }, [prefetchList]);

  const prefetchNextPage = (page: number, limit: number) => {
    const nextRequest: Pagination = { page: page + 1, limit };
    void prefetchList(nextRequest);
  };

  return (
    <main className="min-h-screen bg-[#faf9fc] px-4 py-6 lg:px-7">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-lg font-extrabold uppercase text-[#2b1745]">
          Danh sách bài viết
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Filter /> Bộ lọc
          </Button>
          <Button
            size="sm"
            className="bg-violet-700 text-xs hover:bg-violet-800"
            onClick={() => router.push(ROUTE.CREATE_POST)}
          >
            <Plus /> Thêm bài viết mới
          </Button>
        </div>
      </div>
      <Card className="gap-0 overflow-hidden border-slate-100 py-4 shadow-sm">
        <DataTable
          columns={columns}
          data={data}
          filterColumn="title"
          filterPlaceholder="Tìm bài viết..."
          pageSize={pageSize}
          onPageChange={prefetchNextPage}
        />
      </Card>
    </main>
  );
}
