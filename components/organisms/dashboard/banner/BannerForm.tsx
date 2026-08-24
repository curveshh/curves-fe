"use client";

import { BaseFormField } from "@/components/atoms/FieldForm";
import { BaseFormSwitch } from "@/components/atoms/SwitchForm";
import { ImageDropzone } from "@/components/dashboard/image-dropzone";
import { Button, Card, Input, Textarea } from "@/components/ui";
import { useBanner } from "@/hooks/useBanner";
import { useUpload } from "@/hooks/useUpload";
import { bannerFormSchema, BannerFormValues } from "@/schemas/banner";
import { Banner } from "@/types/banner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

type Props = { data?: Banner | null };

export default function BannerForm({ data = null }: Props) {
  const router = useRouter();
  const { create, update } = useBanner();
  const { uploadImages } = useUpload();
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: data
      ? { ...data, image: null }
      : {
          header: "",
          primaryText: "",
          description: "",
          buttonText: "",
          buttonLink: "",
          order: 0,
          isActive: true,
          image: null,
        },
  });
  const image = form.watch("image");
  const imageUrl = form.watch("imageUrl");

  const onSubmit = async (values: BannerFormValues) => {
    const uploadedImageUrl = values.image
      ? (await uploadImages.mutateAsync(values.image)).data.url
      : values.imageUrl;
    const now = new Date().toISOString();
    const { image, ...banner } = values;
    const payload: Banner = {
      ...banner,
      id: values.id ?? crypto.randomUUID(),
      imageUrl: uploadedImageUrl,
      createdAt: values.createdAt ?? now,
      updatedAt: now,
    };

    if (values.id) await update.mutateAsync({ id: values.id, req: payload });
    else await create.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen bg-[#faf9fc] px-4 py-6 lg:px-7">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 text-xs text-violet-500">Banner</div>
          <h1 className="text-lg font-extrabold uppercase text-[#2b1745]">
            {data ? "Chỉnh sửa banner" : "Thêm banner"}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Cập nhật thông tin banner trên website
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            className="text-xs text-slate-600"
            onClick={() => router.back()}
          >
            <ArrowLeft /> Quay lại danh sách
          </Button>
          {data && (
            <Button
              type="button"
              variant="outline"
              className="border-rose-200 text-xs text-rose-500"
            >
              <Trash2 /> Xóa banner
            </Button>
          )}
        </div>
      </div>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 xl:grid-cols-[250px_minmax(0,1fr)_280px]"
        >
          <Card className="h-fit border-slate-100 p-3.5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-[#2b1745]">
              Thông tin banner
            </h2>
            <BaseFormField
              name="header"
              label="Tiêu đề"
              required
              className="mb-3"
            >
              {(field) => <Input {...field} />}
            </BaseFormField>
            <BaseFormField
              name="primaryText"
              label="Nội dung chính"
              required
              className="mb-3"
            >
              {(field) => <Input {...field} />}
            </BaseFormField>
            <BaseFormField
              name="order"
              label="Thứ tự hiển thị"
              required
              description="Số nhỏ hiển thị trước"
              className="mb-3"
            >
              {(field) => (
                <Input
                  {...field}
                  type="number"
                  onChange={(event) =>
                    field.onChange(event.target.valueAsNumber)
                  }
                />
              )}
            </BaseFormField>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <BaseFormSwitch
                name="isActive"
                label="Trạng thái"
                description="Hiển thị banner trên trang chủ"
              />
            </div>
          </Card>

          <Card className="border-slate-100 p-3.5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-[#2b1745]">
              Hình ảnh banner
            </h2>
            <BaseFormField name="image" label="Ảnh banner" required>
              {(field) => (
                <ImageDropzone
                  value={image ?? imageUrl}
                  onChange={(value) => {
                    field.onChange(value instanceof File ? value : null);
                    if (!value)
                      form.setValue("imageUrl", undefined, {
                        shouldValidate: true,
                      });
                  }}
                  compact
                  acceptLabel="JPG, PNG, WEBP"
                />
              )}
            </BaseFormField>
            <p className="mt-2 text-[10px] text-slate-400">
              Định dạng: JPG, PNG, WEBP. Kích thước đề nghị: 1920×600px. Tối đa:
              2MB.
            </p>
          </Card>

          <Card className="h-fit border-slate-100 p-3.5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold text-[#2b1745]">
              Liên kết và hành động
            </h2>
            <BaseFormField name="description" label="Mô tả" className="mb-3">
              {(field) => <Textarea {...field} />}
            </BaseFormField>
            <BaseFormField
              name="buttonText"
              label="Văn bản nút"
              className="mb-3"
            >
              {(field) => <Input {...field} />}
            </BaseFormField>
            <BaseFormField
              name="buttonLink"
              label="URL liên kết"
              className="mb-3"
            >
              {(field) => <Input {...field} />}
            </BaseFormField>
            <div className="mt-7 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                className="text-xs"
                onClick={() => router.back()}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-violet-700 text-xs hover:bg-violet-800"
              >
                <Save />{" "}
                {form.formState.isSubmitting
                  ? "Đang lưu..."
                  : data
                    ? "Cập nhật"
                    : "Tạo banner"}
              </Button>
            </div>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
}
