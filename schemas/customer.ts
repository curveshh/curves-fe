import { phoneRegex } from "@/contants/regex";
import { CHANNELS } from "@/types/customer";
import { z } from "zod";

const optionalPhone = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || phoneRegex.test(value),
    "Số điện thoại không hợp lệ",
  );

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.url().safeParse(value).success,
    "URL không hợp lệ",
  );

export const customerSchema = z.object({
  name: z.string().trim().min(1, "Tên khách hàng không được để trống"),
  zalo: optionalPhone,
  phone: optionalPhone,
  facebookUrl: optionalUrl,
  note: z.string().trim().optional(),
  type: z.enum(CHANNELS),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
