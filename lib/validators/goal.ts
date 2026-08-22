import { z } from "zod";

const numericField = (label: string, minValue: number) =>
  z.preprocess((value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    if (trimmed === "") return undefined;
    const parsed = Number(trimmed);
    return Number.isNaN(parsed) ? value : parsed;
  },
  z
    .number()
    .int(`${label} harus berupa angka bulat.`)
    .min(minValue, `${label} minimal ${minValue}.`)
    .max(1000, `${label} maksimal 1000.`));

export const goalSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Nama goal minimal 3 karakter.")
      .max(120, "Nama goal terlalu panjang."),
    targetValue: numericField("Target", 1),
    currentValue: numericField("Progress awal", 0),
    weekStart: z.string().min(1, "Tanggal mulai minggu wajib diisi."),
  })
  .refine((data) => data.currentValue <= data.targetValue, {
    message: "Progress awal tidak boleh melebihi target.",
    path: ["currentValue"],
  });
