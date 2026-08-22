export type AssignmentStatus = "todo" | "in_progress" | "done";

export type Assignment = {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  priorityLabel: string;
  statusLabel: string;
  statusValue: AssignmentStatus;
  courseId?: string | null;
  description?: string | null;
  estimatedMinutes?: number | null;
  priorityValue?: string;
};
