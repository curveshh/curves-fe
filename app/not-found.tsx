"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-muted">
          <FileQuestion
            className="h-16 w-16 text-muted-foreground"
            strokeWidth={1.5}
          />
        </div>

        {/* Status code - kiểu antd Result */}
        <p className="text-6xl font-bold tracking-tight text-foreground/80">
          404
        </p>

        <h1 className="mt-3 text-xl font-semibold text-foreground">
          Không tìm thấy trang
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xoá.
        </p>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
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
