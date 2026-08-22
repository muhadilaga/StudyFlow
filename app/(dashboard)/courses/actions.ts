"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/require-user";
import { createServerClient } from "@/lib/supabase/server";
import { courseSchema } from "@/lib/validators/course";

function redirectWithMessage(message: string, type: "error" | "success"): never {
  redirect(`/courses?${type}=${encodeURIComponent(message)}`);
}

export async function createCourseAction(formData: FormData) {
  const user = await requireUser();

  const parsed = courseSchema.safeParse({
    courseName: formData.get("courseName"),
    lecturerName: formData.get("lecturerName"),
    classDay: formData.get("classDay"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    color: formData.get("color"),
  });

  if (!parsed.success) {
    redirectWithMessage(parsed.error.issues[0]?.message ?? "Data mata kuliah tidak valid.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase.from("courses").insert({
    user_id: user.id,
    course_name: parsed.data.courseName,
    lecturer_name: parsed.data.lecturerName || null,
    class_day: parsed.data.classDay || null,
    start_time: parsed.data.startTime || null,
    end_time: parsed.data.endTime || null,
    color: parsed.data.color,
  });

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/courses");
  revalidatePath("/dashboard");
  redirectWithMessage("Mata kuliah berhasil disimpan.", "success");
}

export async function updateCourseAction(formData: FormData) {
  const user = await requireUser();
  const courseId = String(formData.get("courseId") || "");

  const parsed = courseSchema.safeParse({
    courseName: formData.get("courseName"),
    lecturerName: formData.get("lecturerName"),
    classDay: formData.get("classDay"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    color: formData.get("color"),
  });

  if (!courseId || !parsed.success) {
    redirectWithMessage(parsed.success ? "Course tidak ditemukan." : parsed.error.issues[0]?.message ?? "Data mata kuliah tidak valid.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("courses")
    .update({
      course_name: parsed.data.courseName,
      lecturer_name: parsed.data.lecturerName || null,
      class_day: parsed.data.classDay || null,
      start_time: parsed.data.startTime || null,
      end_time: parsed.data.endTime || null,
      color: parsed.data.color,
    })
    .eq("id", courseId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/courses");
  revalidatePath("/dashboard");
  redirectWithMessage("Mata kuliah berhasil diperbarui.", "success");
}

export async function deleteCourseAction(formData: FormData) {
  const user = await requireUser();
  const courseId = String(formData.get("courseId") || "");

  if (!courseId) {
    redirectWithMessage("Course tidak ditemukan.", "error");
  }

  const supabase = await createServerClient();
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId)
    .eq("user_id", user.id);

  if (error) {
    redirectWithMessage(error.message, "error");
  }

  revalidatePath("/courses");
  revalidatePath("/assignments");
  revalidatePath("/dashboard");
  redirectWithMessage("Mata kuliah berhasil dihapus.", "success");
}
