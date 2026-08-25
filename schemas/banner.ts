import { z } from "zod";

export const bannerFormSchema = z.object({
  id: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
  imageUrl: z.string().optional(),
  header: z.string().trim().min(1, "Vui lòng nhập tiêu đề").max(150),
  primaryText: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập nội dung chính")
    .max(160),
  description: z.string().trim(),
  buttonText: z.string().trim(),
  buttonLink: z.string().trim(),
  order: z.number().int().min(0, "Thứ tự phải từ 0 trở lên"),
  isActive: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isDraft: z.boolean().optional(),
});

export type BannerFormValues = z.infer<typeof bannerFormSchema>;

export const bannerSchema = z.object({
  banners: z.array(z.custom<import("@/types/banner").Banner>()),
});

export type BannerValues = z.infer<typeof bannerSchema>;
