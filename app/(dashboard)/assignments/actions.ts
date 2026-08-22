"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/require-user";
import { createServerClient } from "@/lib/supabase/server";
import { assignmentSchema } from "@/lib/validators/assignment";

function redirectWithMessage(message: string, type: "error" | "success"): never {
  redirect(`/assignments?${type}=${encodeURIComponent(message)}`);
}

function mapAssignmentFormData(formData: FormData) {
  return assignmentSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
    priority: formData.get("priority"),
    status: formData.get("status"),
    estimatedMinutes: formData.get("estimatedMinutes"),
    courseId: formData.get("courseId"),
  });
}

export async function createAssignmentAction(formData: FormData) {
  const user = await requireUser();
  const parsed = mapAssignmentFormData(formData);

  if (!parsed.success) {
    redirectWithMessage(parsed.error.issues[0]?.message ?? "Data tugas tidak valid.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase.from("assignments").insert({
    user_id: user.id,
    course_id: parsed.data.courseId || null,
    title: parsed.data.title,
    description: parsed.data.description || null,
    due_date: new Date(parsed.data.dueDate).toISOString(),
    priority: parsed.data.priority,
    status: parsed.data.status,
    estimated_minutes: parsed.data.estimatedMinutes ?? null,
  });

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/assignments");
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  redirectWithMessage("Tugas berhasil disimpan.", "success");
}

export async function updateAssignmentAction(formData: FormData) {
  const user = await requireUser();
  const assignmentId = String(formData.get("assignmentId") || "");
  const parsed = mapAssignmentFormData(formData);

  if (!assignmentId || !parsed.success) {
    redirectWithMessage(parsed.success ? "Tugas tidak ditemukan." : parsed.error.issues[0]?.message ?? "Data tugas tidak valid.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("assignments")
    .update({
      course_id: parsed.data.courseId || null,
      title: parsed.data.title,
      description: parsed.data.description || null,
      due_date: new Date(parsed.data.dueDate).toISOString(),
      priority: parsed.data.priority,
      status: parsed.data.status,
      estimated_minutes: parsed.data.estimatedMinutes ?? null,
    })
    .eq("id", assignmentId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/assignments");
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  redirectWithMessage("Tugas berhasil diperbarui.", "success");
}

export async function updateAssignmentStatusAction(formData: FormData) {
  const user = await requireUser();
  const assignmentId = String(formData.get("assignmentId") || "");
  const nextStatus = String(formData.get("nextStatus") || "");

  if (!assignmentId || !nextStatus) {
    redirectWithMessage("Data status tugas tidak lengkap.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("assignments")
    .update({ status: nextStatus })
    .eq("id", assignmentId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/assignments");
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  redirectWithMessage("Status tugas berhasil diperbarui.", "success");
}

export async function deleteAssignmentAction(formData: FormData) {
  const user = await requireUser();
  const assignmentId = String(formData.get("assignmentId") || "");

  if (!assignmentId) {
    redirectWithMessage("Tugas tidak ditemukan.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("assignments")
    .delete()
    .eq("id", assignmentId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/assignments");
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  redirectWithMessage("Tugas berhasil dihapus.", "success");
}
