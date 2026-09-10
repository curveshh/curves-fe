import { phoneRegex } from "@/contants/regex";
import { z } from "zod";

export const contactSchema = z.object({
  hotline: z
    .string()
    .refine(
      (value) => value === "" || phoneRegex.test(value),
      "Số điện thoại không hợp lệ",
    )
    .optional(),
  zalo: z
    .string()
    .refine(
      (value) => value === "" || phoneRegex.test(value),
      "Số Zalo không hợp lệ",
    )
    .optional(),
  facebook: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
