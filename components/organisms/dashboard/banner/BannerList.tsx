"use client";

import { DndProvider } from "@/components/mocules/dnd/DndContextProvider";
import { Badge, Button, Card } from "@/components/ui";
import { ROUTE } from "@/contants/route";
import { useBanner } from "@/hooks/useBanner";
import { bannerSchema, BannerValues } from "@/schemas/banner";
import { Banner } from "@/types/banner";
import { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const blank = (): Banner => ({
  id: crypto.randomUUID(),
  header: "",
  primaryText: "",
  description: "",
  buttonText: "Xem thêm",
  buttonLink: "",
  isActive: true,
  order: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isDraft: true,
});

export default function BannerList() {
  const router = useRouter();
  const { list, move: moveBanner, remove: removeBanner } = useBanner();
  const form = useForm<BannerValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: { banners: [] },
  });
  const { control, watch, setValue } = form;
  const { fields, move: reorderFields } = useFieldArray({
    control,
    name: "banners",
    keyName: "fieldId",
  });
  const banners = watch("banners");
  const [preview, setPreview] = useState(0);

  const current = banners?.length ? banners : [blank()];
  const shown = current[Math.min(preview, current.length - 1)];
  const addBanner = () => {
    router.push(ROUTE.NEW_BANNER);
  };

  const onEditBanner = (bannerId: string) => {
    router.push(ROUTE.EDIT_BANNER.replace(":id", bannerId));
  };

  useEffect(() => {
    setValue("banners", list.data || []);
  }, [list.data, setValue]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((field) => field.id === active.id);
    const newIndex = fields.findIndex((field) => field.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const movedBanner = banners[oldIndex];
    if (!movedBanner) return;

    reorderFields(oldIndex, newIndex);
    moveBanner.mutate(
      { id: movedBanner.id, order: newIndex },
      { onError: () => reorderFields(newIndex, oldIndex) },
    );
  };

  return (
    <main className="min-h-screen bg-[#f6f4f9] p-5 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-purple-950">
              Quản lý Banner
            </h1>
            <p className="text-sm text-purple-400">
              Thiết lập slideshow ảnh hiển thị trên trang chủ
            </p>
          </div>
          <Button
            onClick={addBanner}
            className="bg-purple-700 hover:bg-purple-800"
          >
            <Plus /> Thêm banner mới
          </Button>
        </div>
        <section className="mb-8">
          <div className="mb-3 flex justify-between text-sm">
            <h2 className="font-bold text-purple-900">Xem trước slideshow</h2>
            <span className="text-purple-400">
              Slide {Math.min(preview + 1, current.length)}/{current.length}
            </span>
          </div>
          <Card className="relative min-h-72 justify-center overflow-hidden border-purple-100 bg-purple-950 p-0">
            {shown.image && (
              <img
                src={shown.image}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-45"
              />
            )}
            <div className="relative max-w-xl px-12 py-10 text-white">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-pink-200">
                {shown.header || "Tiêu đề banner"}
              </p>
              <h2 className="mb-3 text-3xl font-extrabold">
                {shown.primaryText || "Nội dung chính"}
              </h2>
              <p className="mb-6 text-sm text-white/80">
                {shown.description || "Mô tả ngắn cho banner này"}
              </p>
              <Button className="bg-pink-500 hover:bg-pink-600">
                {shown.buttonText || "Xem thêm"}
              </Button>
            </div>
            <Button
              onClick={() =>
                setPreview((preview - 1 + current.length) % current.length)
              }
              variant="ghost"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => setPreview((preview + 1) % current.length)}
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <ChevronRight />
            </Button>
          </Card>
        </section>
        <div className="mb-3 flex justify-between">
          <h2 className="text-sm font-bold text-purple-900">
            Danh sách banner ({fields.length})
          </h2>
          <span className="flex items-center gap-1 text-xs text-purple-400">
            <GripVertical className="size-3.5" /> Kéo thả để sắp xếp
          </span>
        </div>
        <DndProvider onDragEnd={handleDragEnd}>
          <SortableContext
            items={fields.map((field) => field.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {fields.map((field, index) => {
                const banner = banners[index];
                return (
                  <SortableBannerRow key={field.fieldId} id={field.id}>
                    <Card className="gap-0 overflow-hidden border-purple-100 py-0 shadow-sm">
                      <div className="flex items-center gap-3 p-3">
                        <GripVertical className="cursor-grab text-purple-300" />
                        <div className="h-14 w-20 overflow-hidden rounded-lg bg-purple-100 relative">
                          {banner.imageUrl && (
                            <Image
                              src={banner.imageUrl}
                              alt={banner.description || ""}
                              className="size-full object-cover"
                              fill
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex gap-2">
                            <p className="truncate font-bold text-purple-950">
                              {banner.primaryText || "Chưa có tiêu đề"}
                            </p>
                            <Badge
                              className={
                                banner.isActive
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-slate-100 text-slate-500"
                              }
                            >
                              {banner.isActive ? "Đang hiển thị" : "Đã tắt"}
                            </Badge>
                          </div>
                          <p className="truncate text-xs text-purple-400">
                            Slide {index + 1} · Nút: “{banner.buttonText}” →{" "}
                            {banner.buttonLink || "Chưa có liên kết"}
                          </p>
                        </div>
                        {banner.id && (
                          <Button
                            onClick={() => onEditBanner(banner.id)}
                            variant="ghost"
                            size="icon-sm"
                            className="text-purple-600"
                          >
                            <Pencil />
                          </Button>
                        )}
                        <Button
                          onClick={() => removeBanner.mutate(banner.id)}
                          variant="ghost"
                          size="icon-sm"
                          className="text-rose-400"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </Card>
                  </SortableBannerRow>
                );
              })}
            </div>
          </SortableContext>
        </DndProvider>
      </div>
    </main>
  );
}

function SortableBannerRow({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
