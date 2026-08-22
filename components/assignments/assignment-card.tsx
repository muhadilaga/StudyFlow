import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteAssignmentAction, updateAssignmentStatusAction } from "@/app/(dashboard)/assignments/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateLabel } from "@/lib/utils/dates";
import type { Assignment, AssignmentStatus } from "@/types/assignment";

const nextStatusMap: Record<AssignmentStatus, AssignmentStatus> = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
};

const buttonLabelMap: Record<AssignmentStatus, string> = {
  todo: "Mulai",
  in_progress: "Selesai",
  done: "Reset",
};

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const nextStatus = nextStatusMap[assignment.statusValue];

  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{assignment.title}</p>
          <p className="text-sm text-slate-600">{assignment.courseName}</p>
          <p className="text-sm text-slate-500">Status: {assignment.statusLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge>{assignment.priorityLabel}</Badge>
          <span className="text-sm text-slate-500">{formatDateLabel(assignment.dueDate)}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Link href={`/assignments?edit=${assignment.id}`}>
          <Button type="button" variant="ghost" className="text-slate-600 hover:bg-slate-100">
            <Pencil className="size-4" />
          </Button>
        </Link>
        <form action={updateAssignmentStatusAction}>
          <input type="hidden" name="assignmentId" value={assignment.id} />
          <input type="hidden" name="nextStatus" value={nextStatus} />
          <Button type="submit" variant="secondary">{buttonLabelMap[assignment.statusValue]}</Button>
        </form>
        <form action={deleteAssignmentAction}>
          <input type="hidden" name="assignmentId" value={assignment.id} />
          <Button type="submit" variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">
            <Trash2 className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
