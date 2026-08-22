import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateLabel, isDueSoon, isOverdue } from "@/lib/utils/dates";
import type { Assignment } from "@/types/assignment";

function getStatusBadge(assignment: Assignment) {
  if (assignment.statusValue === "done") {
    return <Badge className="bg-emerald-100 text-emerald-700">Selesai</Badge>;
  }

  if (isOverdue(assignment.dueDate)) {
    return <Badge className="bg-rose-100 text-rose-700">Terlambat</Badge>;
  }

  if (isDueSoon(assignment.dueDate)) {
    return <Badge className="bg-amber-100 text-amber-700">Hari ini / dekat</Badge>;
  }

  return <Badge className="bg-blue-100 text-blue-700">Mendatang</Badge>;
}

export function AssignmentCalendar({ assignments }: { assignments: Assignment[] }) {
  return (
    <Card className="p-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assignments.length ? (
          assignments.map((assignment) => (
            <div key={assignment.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-blue-700">{formatDateLabel(assignment.dueDate)}</p>
                {getStatusBadge(assignment)}
              </div>
              <h3 className="mt-2 font-semibold text-slate-900">{assignment.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{assignment.courseName}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>{assignment.priorityLabel}</Badge>
                <span className="text-sm text-slate-500">Status: {assignment.statusLabel}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Belum ada tugas di kalender. Tambahkan assignment baru agar deadline muncul di sini.
          </div>
        )}
      </div>
    </Card>
  );
}
