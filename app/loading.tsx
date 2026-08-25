import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-4">
      {/* Spinner đơn giản kiểu antd Spin */}
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>

      {/* Skeleton nội dung bên dưới, kiểu antd Skeleton */}
      <div className="w-full max-w-md space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
