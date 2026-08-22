import { z } from "zod";
import { ASSIGNMENT_PRIORITIES, ASSIGNMENT_STATUSES } from "@/lib/utils/constants";

const optionalText = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().max(1000, "Deskripsi terlalu panjang.").optional());

const optionalNumber = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed === "") return undefined;
  const numberValue = Number(trimmed);
  return Number.isNaN(numberValue) ? value : numberValue;
}, z.number().int().min(1, "Estimasi minimal 1 menit.").max(1440, "Estimasi maksimal 1440 menit.").optional());

const optionalCourseId = z.preprocess((value) => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}, z.string().uuid("Course tidak valid.").optional());

export const assignmentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Judul tugas minimal 3 karakter.")
    .max(120, "Judul tugas terlalu panjang."),
  description: optionalText,
  dueDate: z.string().min(1, "Deadline wajib diisi."),
  priority: z.enum(ASSIGNMENT_PRIORITIES, "Pilih prioritas yang tersedia."),
  status: z.enum(ASSIGNMENT_STATUSES, "Pilih status yang tersedia."),
  estimatedMinutes: optionalNumber,
  courseId: optionalCourseId,
});
