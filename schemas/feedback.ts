import { z } from "zod";

export const memberFeedbackSchema = z.object({
  fullName: z
    .string()
    .min(1, "Vui lòng nhập họ và tên")
    .max(150, "Họ và tên không được vượt quá 150 ký tự"),

  phone: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại")
    .max(30, "Số điện thoại không được vượt quá 30 ký tự"),

  clubName: z
    .string()
    .min(1, "Vui lòng nhập tên CLB")
    .max(150, "Tên CLB không được vượt quá 150 ký tự"),

  clubId: z.string().optional(),

  attendanceTime: z
    .string()
    .max(100, "Thời gian tham gia không được vượt quá 100 ký tự")
    .optional(),

  rating: z
    .number()
    .int("Đánh giá phải là số nguyên")
    .min(1, "Đánh giá tối thiểu 1 sao")
    .max(6, "Đánh giá tối đa 6 sao"),

  favoriteAspect: z
    .string()
    .max(250, "Nội dung không được vượt quá 250 ký tự")
    .optional(),

  content: z
    .string()
    .min(1, "Vui lòng nhập nội dung cảm nhận")
    .max(3000, "Nội dung không được vượt quá 3000 ký tự"),

  imageUrl: z
    .url("URL hình ảnh không hợp lệ")
    .max(1000, "URL hình ảnh không được vượt quá 1000 ký tự")
    .optional(),

  publicationConsent: z.boolean().optional(),
});

export type MemberFeedbackFormValues = z.infer<typeof memberFeedbackSchema>;
