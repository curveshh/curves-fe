import { z } from "zod";

export const bannerBgTypeSchema = z.enum(["GRADIENT", "IMAGE"]);

export const promotionFormSchema = z.object({
  id: z.number(),
  badge: z.string().optional(),
  title: z.string().min(1, "Tiêu đề không được để trống"),
  discount: z.string().optional(),
  extra: z.string().optional(),
  ctaText: z.string().optional(),
  footerText: z.string().optional(),
  footerLink: z.url("Link không hợp lệ").optional().or(z.literal("")),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Ngày kết thúc không hợp lệ")
    .optional()
    .or(z.literal("")),
  showOnHome: z.boolean().optional(),
  bgGradient: z.string().optional(),
  bgType: bannerBgTypeSchema,
  bgFrom: z.string().optional(),
  bgTo: z.string().optional(),
  imageUrl: z.string().optional(),
  image: z.file().optional().nullable(),
  order: z
    .number()
    .int("Order phải là số nguyên")
    .min(0, "Order không được nhỏ hơn 0")
    .optional(),
});

export type Promotion = z.infer<typeof promotionFormSchema>;
