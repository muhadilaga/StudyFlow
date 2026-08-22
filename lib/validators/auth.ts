import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Masukkan email yang valid."),
  password: z.string().min(8, "Password minimal 8 karakter."),
});

export const registerSchema = loginSchema.extend({
  fullName: z
    .string()
    .min(3, "Nama minimal 3 karakter.")
    .max(80, "Nama terlalu panjang."),
});
