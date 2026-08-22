import { isSupabaseConfigured } from "@/lib/env";
import { mockCourses } from "@/lib/mock-data";
import { createServerClient } from "@/lib/supabase/server";
import type { Course, CourseOption } from "@/types/course";

const dayMap: Record<string, string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

const colorMap: Record<string, string> = {
  blue: "#2563eb",
  purple: "#9333ea",
  green: "#16a34a",
  amber: "#d97706",
  rose: "#e11d48",
};

type CourseRow = {
  id: string;
  course_name: string;
  lecturer_name: string | null;
  class_day: string | null;
  start_time: string | null;
  end_time: string | null;
  color: string;
};

export async function getCourses(): Promise<Course[]> {
  if (!isSupabaseConfigured()) {
    return mockCourses;
  }

  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return mockCourses;
    }

    const { data, error } = await supabase
      .from("courses")
      .select("id, course_name, lecturer_name, class_day, start_time, end_time, color")
      .order("created_at", { ascending: true });

    if (error || !data) {
      return mockCourses;
    }

    return (data as CourseRow[]).map((course) => ({
      id: course.id,
      courseName: course.course_name,
      lecturerName: course.lecturer_name ?? "Belum diisi",
      classDayLabel: course.class_day ? dayMap[course.class_day] ?? course.class_day : "Belum dijadwalkan",
      timeRange:
        course.start_time && course.end_time
          ? `${course.start_time.slice(0, 5)} - ${course.end_time.slice(0, 5)}`
          : "Waktu fleksibel",
      colorValue: colorMap[course.color] ?? "#2563eb",
      classDayValue: course.class_day ?? "",
      startTimeValue: course.start_time ? course.start_time.slice(0, 5) : "",
      endTimeValue: course.end_time ? course.end_time.slice(0, 5) : "",
      colorKey: course.color,
    }));
  } catch {
    return mockCourses;
  }
}

export async function getCourseOptions(): Promise<CourseOption[]> {
  const courses = await getCourses();
  return courses.map((course) => ({
    id: course.id,
    courseName: course.courseName,
  }));
}
