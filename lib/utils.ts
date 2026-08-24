import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function diffToParts(endIso: string) {
  const diff = new Date(endIso).getTime() - Date.now();
  if (isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export function defaultEndDate(daysFromNow = 7) {
  const d = new Date(Date.now() + daysFromNow * 86400000);
  return d.toISOString().slice(0, 16); // for datetime-local input
}

export const pad2 = (n: number) =>
  String(Math.max(0, Math.floor(n))).padStart(2, "0");

export const slugify = (value: string) =>
  value
    .normalize("NFD") // tách chữ và dấu ra riêng
    .replace(/[\u0300-\u036f]/g, "") // xóa các dấu (combining marks)
    .replace(/đ/g, "d") // xử lý riêng chữ đ (NFD không tách được)
    .replace(/Đ/g, "D")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const toDatetimeLocal = (value: string | Date) => {
  const date = new Date(value);

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
};
