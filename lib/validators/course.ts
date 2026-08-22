import { z } from "zod";
import { COURSE_COLORS, COURSE_DAYS } from "@/lib/utils/constants";

const optionalText = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().max(100).optional());

const optionalDay = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.enum(COURSE_DAYS).optional());

const optionalTime = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().regex(/^\d{2}:\d{2}$/, "Format jam harus HH:MM.").optional());

export const courseSchema = z
  .object({
    courseName: z
      .string()
      .trim()
      .min(3, "Nama mata kuliah minimal 3 karakter.")
      .max(100, "Nama mata kuliah terlalu panjang."),
    lecturerName: optionalText,
    classDay: optionalDay,
    startTime: optionalTime,
    endTime: optionalTime,
    color: z.enum(COURSE_COLORS, "Pilih warna yang tersedia."),
  })
  .refine(
    (data) => !data.startTime || !data.endTime || data.startTime < data.endTime,
    {
      message: "Jam selesai harus lebih besar dari jam mulai.",
      path: ["endTime"],
    },
  );
