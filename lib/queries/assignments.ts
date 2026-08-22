import { isSupabaseConfigured } from "@/lib/env";
import { mockAssignments } from "@/lib/mock-data";
import { createServerClient } from "@/lib/supabase/server";
import type { Assignment, AssignmentStatus } from "@/types/assignment";

const priorityLabelMap: Record<string, string> = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
};

const statusLabelMap: Record<AssignmentStatus, string> = {
  todo: "Belum mulai",
  in_progress: "Dikerjakan",
  done: "Selesai",
};

type AssignmentRow = {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  priority: string;
  status: AssignmentStatus;
  estimated_minutes: number | null;
  course_id: string | null;
  courses: { course_name: string } | { course_name: string }[] | null;
};

function mapMockAssignments() {
  return mockAssignments.map((item) => ({ ...item, statusValue: item.statusValue ?? ("todo" as AssignmentStatus) }));
}

export async function getAssignments(): Promise<Assignment[]> {
  if (!isSupabaseConfigured()) {
    return mapMockAssignments();
  }

  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return mapMockAssignments();
    }

    const { data, error } = await supabase
      .from("assignments")
      .select("id, title, description, due_date, priority, status, estimated_minutes, course_id, courses(course_name)")
      .order("due_date", { ascending: true });

    if (error || !data) {
      return mapMockAssignments();
    }

    return (data as AssignmentRow[]).map((assignment) => {
      const courseRelation = Array.isArray(assignment.courses)
        ? assignment.courses[0]
        : assignment.courses;

      return {
        id: assignment.id,
        title: assignment.title,
        courseName: courseRelation?.course_name ?? "Tanpa mata kuliah",
        dueDate: assignment.due_date,
        priorityLabel: priorityLabelMap[assignment.priority] ?? assignment.priority,
        statusLabel: statusLabelMap[assignment.status] ?? assignment.status,
        statusValue: assignment.status,
        courseId: assignment.course_id,
        description: assignment.description,
        estimatedMinutes: assignment.estimated_minutes,
        priorityValue: assignment.priority,
      };
    });
  } catch {
    return mapMockAssignments();
  }
}
