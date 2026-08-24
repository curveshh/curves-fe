import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên category không được để trống")
    .max(100, "Tên category tối đa 100 ký tự"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug không được để trống")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug không hợp lệ"),

  parentId: z.number().nullable(),

  isActive: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
