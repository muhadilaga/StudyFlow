import { createAssignmentAction, updateAssignmentAction } from "@/app/(dashboard)/assignments/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ASSIGNMENT_PRIORITIES, ASSIGNMENT_STATUSES } from "@/lib/utils/constants";
import type { Assignment } from "@/types/assignment";
import type { CourseOption } from "@/types/course";

type AssignmentFormProps = {
  courses: CourseOption[];
  assignment?: Assignment;
  errorMessage?: string;
  successMessage?: string;
};

const priorityLabels: Record<(typeof ASSIGNMENT_PRIORITIES)[number], string> = {
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
};

const statusLabels: Record<(typeof ASSIGNMENT_STATUSES)[number], string> = {
  todo: "Belum mulai",
  in_progress: "Dikerjakan",
  done: "Selesai",
};

function toDatetimeLocal(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

export function AssignmentForm({ courses, assignment, errorMessage, successMessage }: AssignmentFormProps) {
  const formAction = assignment ? updateAssignmentAction : createAssignmentAction;
  const heading = assignment ? "Edit tugas" : "Tambah tugas";
  const buttonLabel = assignment ? "Update tugas" : "Simpan tugas";

  return (
    <Card className="p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-950">{heading}</h2>
        <p className="text-sm text-slate-500">
          Form ini sekarang tersimpan ke Supabase dan terhubung ke mata kuliah milik akunmu.
        </p>
      </div>
      <form action={formAction} className="mt-6 space-y-4">
        {assignment ? <input type="hidden" name="assignmentId" value={assignment.id} /> : null}
        <div className="space-y-2">
          <Label htmlFor="title">Judul tugas</Label>
          <Input id="title" name="title" placeholder="Ringkasan Sistem Operasi" defaultValue={assignment?.title ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="courseId">Mata kuliah</Label>
          <select
            id="courseId"
            name="courseId"
            defaultValue={assignment?.courseId ?? ""}
            className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">Tanpa mata kuliah</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <textarea
            id="description"
            name="description"
            placeholder="Catatan singkat tugas..."
            defaultValue={assignment?.description ?? ""}
            className="min-h-28 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dueDate">Deadline</Label>
            <Input id="dueDate" name="dueDate" type="datetime-local" defaultValue={toDatetimeLocal(assignment?.dueDate)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedMinutes">Estimasi (menit)</Label>
            <Input id="estimatedMinutes" name="estimatedMinutes" type="number" min={1} max={1440} placeholder="90" defaultValue={assignment?.estimatedMinutes ?? ""} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="priority">Prioritas</Label>
            <select
              id="priority"
              name="priority"
              defaultValue={assignment?.priorityValue ?? "medium"}
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              {ASSIGNMENT_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priorityLabels[priority]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              defaultValue={assignment?.statusValue ?? "todo"}
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              {ASSIGNMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errorMessage ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</div> : null}
        {successMessage ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{successMessage}</div> : null}
        <Button type="submit">{buttonLabel}</Button>
      </form>
    </Card>
  );
}
