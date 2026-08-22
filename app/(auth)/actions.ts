"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { getSiteUrl } from "@/lib/env";
import { createServerClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/lib/validators/auth";

function errorRedirect(path: "/login" | "/register", message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    errorRedirect("/login", parsed.error.issues[0]?.message ?? "Data login tidak valid.");
  }

  if (!isSupabaseConfigured()) {
    errorRedirect("/login", "Supabase belum dikonfigurasi. Isi .env.local terlebih dahulu.");
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    errorRedirect("/login", error.message);
  }

  redirect("/dashboard");
}

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    errorRedirect("/register", parsed.error.issues[0]?.message ?? "Data pendaftaran tidak valid.");
  }

  if (!isSupabaseConfigured()) {
    errorRedirect("/register", "Supabase belum dikonfigurasi. Isi .env.local terlebih dahulu.");
  }

  const supabase = await createServerClient();
  const { error, data } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/login`,
      data: {
        full_name: parsed.data.fullName,
      },
    },
  });

  if (error) {
    errorRedirect("/register", error.message);
  }

  if (!data.session) {
    redirect("/login?message=" + encodeURIComponent("Akun berhasil dibuat. Silakan cek email untuk verifikasi jika diminta."));
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/");
  }

  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
