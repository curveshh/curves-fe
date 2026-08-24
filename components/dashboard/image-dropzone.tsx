"use client";

import { Button } from "@/components/ui";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  value?: string | File | null;
  onChange: (value: string | File | null) => void;
  compact?: boolean;
  acceptLabel?: string;
};

export function ImageDropzone({
  value,
  onChange,
  compact = false,
  acceptLabel = "JPG, PNG, WEBP",
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  const onDrop = useCallback(
    (files: File[]) => {
      const file = files[0];

      if (file) {
        onChange(file);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });

  if (preview) {
    return (
      <div
        className={`overflow-hidden rounded-md border border-slate-200 ${
          compact ? "flex flex-col flex-wrap items-center gap-3 p-2" : ""
        }`}
      >
        <div
          className={
            compact
              ? "flex flex-col min-w-0 items-center gap-3 w-full relative h-52"
              : "relative"
          }
        >
          <Image
            src={preview}
            alt="Ảnh đã chọn"
            className="size-full object-cover"
            fill
          />
        </div>

        <span className="min-w-0 flex-1 truncate px-2 text-xs text-slate-600">
          {typeof value === "string" ? "Ảnh hiện tại" : value?.name}
        </span>

        <footer className="flex justify-center items-center">
          <div {...getRootProps()} className="shrink-0 ">
            <input {...getInputProps()} />

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="m-2 text-xs"
            >
              <Upload />
              Thay đổi ảnh
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange(null)}
            className="m-2 border-rose-200 text-rose-500"
          >
            <X />
            Xóa
          </Button>
        </footer>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-5 text-center transition ${
        isDragActive
          ? "border-violet-500 bg-violet-50"
          : "border-slate-300 bg-slate-50/50 hover:border-violet-400"
      }`}
    >
      <input {...getInputProps()} />

      <Upload className="mb-2 h-5 w-5 text-violet-500" />

      <p className="text-xs text-slate-500">Kéo thả ảnh vào đây hoặc</p>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 border-violet-200 text-xs text-violet-700"
      >
        Chọn ảnh
      </Button>

      <p className="mt-2 text-[10px] text-slate-400">
        Định dạng: {acceptLabel}. Tối đa 2MB
      </p>
    </div>
  );
}
