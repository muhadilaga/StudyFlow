"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/require-user";
import { createServerClient } from "@/lib/supabase/server";
import { goalSchema } from "@/lib/validators/goal";

function redirectWithMessage(message: string, type: "error" | "success"): never {
  redirect(`/goals?${type}=${encodeURIComponent(message)}`);
}

function mapGoalFormData(formData: FormData) {
  return goalSchema.safeParse({
    title: formData.get("title"),
    targetValue: formData.get("targetValue"),
    currentValue: formData.get("currentValue"),
    weekStart: formData.get("weekStart"),
  });
}

export async function createGoalAction(formData: FormData) {
  const user = await requireUser();
  const parsed = mapGoalFormData(formData);

  if (!parsed.success) {
    redirectWithMessage(parsed.error.issues[0]?.message ?? "Data goal tidak valid.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase.from("study_goals").insert({
    user_id: user.id,
    title: parsed.data.title,
    target_value: parsed.data.targetValue,
    current_value: parsed.data.currentValue,
    week_start: parsed.data.weekStart,
  });

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/goals");
  revalidatePath("/dashboard");
  redirectWithMessage("Goal berhasil disimpan.", "success");
}

export async function updateGoalAction(formData: FormData) {
  const user = await requireUser();
  const goalId = String(formData.get("goalId") || "");
  const parsed = mapGoalFormData(formData);

  if (!goalId || !parsed.success) {
    redirectWithMessage(parsed.success ? "Goal tidak ditemukan." : parsed.error.issues[0]?.message ?? "Data goal tidak valid.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("study_goals")
    .update({
      title: parsed.data.title,
      target_value: parsed.data.targetValue,
      current_value: parsed.data.currentValue,
      week_start: parsed.data.weekStart,
    })
    .eq("id", goalId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/goals");
  revalidatePath("/dashboard");
  redirectWithMessage("Goal berhasil diperbarui.", "success");
}

export async function deleteGoalAction(formData: FormData) {
  const user = await requireUser();
  const goalId = String(formData.get("goalId") || "");

  if (!goalId) {
    redirectWithMessage("Goal tidak ditemukan.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("study_goals")
    .delete()
    .eq("id", goalId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/goals");
  revalidatePath("/dashboard");
  redirectWithMessage("Goal berhasil dihapus.", "success");
}
