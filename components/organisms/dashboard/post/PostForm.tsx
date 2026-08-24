"use client";

import { BaseFormField } from "@/components/atoms/FieldForm";
import { ImageDropzone } from "@/components/dashboard/image-dropzone";
import { RichTextEditor } from "@/components/organisms/editor/rich-text-editor";
import {
  Button,
  Card,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import { useCategory } from "@/hooks/useCategory";
import { useNews } from "@/hooks/useNews";
import { useUpload } from "@/hooks/useUpload";
import { slugify } from "@/lib/utils";
import { newsPostSchema } from "@/schemas/news";
import { newsService } from "@/services/news";
import { NewsPostFormValues } from "@/types/news";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const defaults: NewsPostFormValues = {
  categoryId: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  status: "DRAFT",
  publishedAt: "",
  seoTitle: "",
  seoDescription: "",
  isHome: false,
};

type Props = {
  data?: NewsPostFormValues | null;
};

export default function DashboardPostCmp({ data }: Props) {
  const router = useRouter();
  const { list: categoryList } = useCategory();
  const { create, update } = useNews();
  const { uploadImages } = useUpload();
  const [isSlugChecking, setIsSlugChecking] = useState(false);
  const slugEdited = useRef(false);
  const form = useForm<NewsPostFormValues>({
    resolver: zodResolver(newsPostSchema),
    defaultValues: data
      ? { ...data, categoryId: String(data?.categoryId) }
      : defaults,
    mode: "onChange",
  });
  console.log(data);
  const title = form.watch("title");
  const slug = form.watch("slug");
  const status = form.watch("status");
  const coverImageUrl = form.watch("coverImageUrl");
  const {
    formState: { errors },
  } = form;
  console.log(errors);
  useEffect(() => {
    if (!slugEdited.current)
      form.setValue("slug", slugify(title), { shouldValidate: true });
  }, [form, title]);

  useEffect(() => {
    const normalizedSlug = slug.trim();
    if (!normalizedSlug || form.getFieldState("slug").error) return;
    const timeout = window.setTimeout(async () => {
      setIsSlugChecking(true);
      try {
        const response = await newsService.checkSlug(normalizedSlug);
        if (response.data.slug === normalizedSlug)
          form.setError("slug", {
            type: "validate",
            message: "Slug đã được sử dụng",
          });
        else form.clearErrors("slug");
      } catch {
        form.setError("slug", {
          type: "validate",
          message: "Không thể kiểm tra slug, vui lòng thử lại",
        });
      } finally {
        setIsSlugChecking(false);
      }
    }, 450);
    return () => window.clearTimeout(timeout);
  }, [form, slug]);

  const onSubmit = async (values: NewsPostFormValues) => {
    const { coverImage, ...draft } = values;
    const uploadedCoverImageUrl = coverImage
      ? (await uploadImages.mutateAsync(coverImage)).data.url
      : values.coverImageUrl;
    const payload = {
      ...draft,
      coverImageUrl: uploadedCoverImageUrl,
      publishedAt:
        values.status === "PUBLISHED"
          ? new Date(values.publishedAt).toISOString()
          : new Date().toISOString(),
    };

    if (values.id) {
      await update.mutateAsync({ id: values.id, req: payload });
      return;
    }

    await create.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen bg-[#faf9fc] px-4 py-6 lg:px-7">
      <div className="mb-5">
        <div className="text-xs text-violet-500">
          Bài viết <span className="mx-1 text-slate-300">›</span> Thêm bài viết
          mới
        </div>
        <h1 className="mt-2 text-lg font-extrabold uppercase text-[#2b1745]">
          {form.getValues("id") ? "Sửa bài viết" : "Thêm bài viết"}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-slate-100 p-4 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-[#2b1745]">
              Thông tin bài viết
            </h2>
            <div className="grid gap-5 lg:grid-cols-[42%_1fr]">
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <PostField label="Tiêu đề bài viết" required>
                      <Input
                        {...field}
                        placeholder="Nhập tiêu đề bài viết..."
                        maxLength={150}
                      />
                    </PostField>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <PostField
                      label="Slug"
                      required
                      hint={
                        isSlugChecking
                          ? "Đang kiểm tra slug..."
                          : "URL: /news/slug-cua-ban"
                      }
                    >
                      <Input
                        {...field}
                        onChange={(event) => {
                          slugEdited.current = true;
                          form.setValue("slug", slugify(event.target.value), {
                            shouldValidate: true,
                          });
                        }}
                        placeholder="slug-bai-viet"
                      />
                    </PostField>
                  )}
                />

                <BaseFormField
                  className="flex my-2"
                  name="isHome"
                  label="Hiển thị trang chủ"
                >
                  {(field) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                </BaseFormField>

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <PostField label="Danh mục" required>
                      <select {...field} className="form-select w-full">
                        <option value="">Chọn danh mục</option>
                        {categoryList.data?.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </PostField>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <PostField label="Tóm tắt bài viết" required>
                      <Textarea
                        {...field}
                        placeholder="Nhập tóm tắt bài viết..."
                        maxLength={300}
                        className="min-h-24"
                      />
                    </PostField>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel className="text-[11px] font-semibold text-slate-600">
                        Ảnh đại diện <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <ImageDropzone
                          value={field.value ?? coverImageUrl}
                          onChange={(image) => {
                            field.onChange(
                              image instanceof File ? image : null,
                            );
                            if (!image)
                              form.setValue("coverImageUrl", undefined);
                          }}
                        />
                      </FormControl>
                      <p className="text-[10px] text-slate-400">
                        Kích thước đề nghị: 1200×630px
                      </p>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-semibold text-slate-600">
                        Nội dung bài viết{" "}
                        <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="overflow-hidden rounded-md border border-slate-200">
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="mb-2 text-[11px] font-semibold text-slate-600">
                    Trạng thái
                  </p>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                        {[
                          ["DRAFT", "Bản nháp"],
                          ["PUBLISHED", "Công khai"],
                          ["ARCHIVED", "Lưu trữ"],
                        ].map(([value, label]) => (
                          <label
                            key={value}
                            className="flex items-center gap-1.5"
                          >
                            <input
                              type="radio"
                              value={value}
                              checked={field.value === value}
                              onChange={field.onChange}
                              className="accent-violet-700"
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                </div>
                {status === "PUBLISHED" && (
                  <FormField
                    control={form.control}
                    name="publishedAt"
                    render={({ field }) => (
                      <PostField label="Ngày xuất bản" required>
                        <Input {...field} type="datetime-local" />
                      </PostField>
                    )}
                  />
                )}
              </div>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <h2 className="mb-4 text-sm font-bold text-[#2b1745]">SEO</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <PostField label="SEO title">
                      <Input
                        {...field}
                        maxLength={150}
                        placeholder="Mặc định dùng tiêu đề bài viết"
                      />
                    </PostField>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoDescription"
                  render={({ field }) => (
                    <PostField label="SEO description">
                      <Textarea
                        {...field}
                        maxLength={300}
                        placeholder="Mặc định dùng tóm tắt bài viết"
                      />
                    </PostField>
                  )}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
              <Button
                type="button"
                variant="outline"
                className="text-xs"
                onClick={() => router.back()}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || isSlugChecking}
                className="bg-violet-700 text-xs hover:bg-violet-800"
              >
                <Save />
                {form.formState.isSubmitting ? "Đang lưu..." : "Lưu bài viết"}
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}

function PostField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <FormItem className="mb-3">
      <FormLabel className="text-[11px] font-semibold text-slate-600">
        {label} {required && <span className="text-rose-500">*</span>}
      </FormLabel>
      <FormControl>{children}</FormControl>
      {hint && <p className="text-[10px] text-slate-400">{hint}</p>}
      <FormMessage className="text-xs" />
    </FormItem>
  );
}
