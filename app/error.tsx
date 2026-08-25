"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Illustration - kiểu antd Result status="error" */}
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle
            className="h-16 w-16 text-destructive"
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-xl font-semibold text-foreground">
          Đã có lỗi xảy ra
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Rất tiếc, có lỗi không mong muốn xảy ra trong quá trình xử lý. Vui
          lòng thử lại hoặc quay về trang chủ.
        </p>

        {error && error?.digest && (
          <p className="mt-3 rounded-md bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            Mã lỗi: {error.digest}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => reset && reset()}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Thử lại
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
