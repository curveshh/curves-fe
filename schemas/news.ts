import { z } from "zod";

export const newsPostSchema = z
  .object({
    id: z.string().optional(),
    categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
    title: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập tiêu đề bài viết")
      .max(150, "Tiêu đề tối đa 150 ký tự"),
    slug: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập slug")
      .max(160, "Slug tối đa 160 ký tự")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug chỉ gồm chữ thường, số và dấu gạch ngang",
      ),
    excerpt: z.string().trim().max(300, "Tóm tắt tối đa 300 ký tự"),
    content: z.string().trim().min(1, "Vui lòng nhập nội dung bài viết"),
    coverImage: z.instanceof(File).nullable().optional(),
    coverImageUrl: z.string().optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    publishedAt: z.string(),
    seoTitle: z.string().trim().max(150, "SEO title tối đa 150 ký tự"),
    seoDescription: z
      .string()
      .trim()
      .max(300, "SEO description tối đa 300 ký tự"),
    isHome: z.boolean(),
  })
  .superRefine((values, context) => {
    if (values.status === "PUBLISHED" && !values.publishedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["publishedAt"],
        message: "Vui lòng chọn ngày xuất bản",
      });
    }
  });
