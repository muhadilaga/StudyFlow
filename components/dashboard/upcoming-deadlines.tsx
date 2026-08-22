import { CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDateLabel, isDueSoon, isOverdue } from "@/lib/utils/dates";
import type { Assignment } from "@/types/assignment";

function getDeadlineBadge(item: Assignment) {
  if (isOverdue(item.dueDate)) {
    return <Badge className="bg-rose-100 text-rose-700">Terlambat</Badge>;
  }

  if (isDueSoon(item.dueDate)) {
    return <Badge className="bg-amber-100 text-amber-700">≤ 24 jam</Badge>;
  }

  return <Badge className="bg-blue-100 text-blue-700">Aman</Badge>;
}

export function UpcomingDeadlines({ items }: { items: Assignment[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Deadline terdekat</h2>
          <p className="text-sm text-slate-500">Prioritaskan tugas yang jatuh tempo dalam 7 hari.</p>
        </div>
        <CalendarClock className="size-5 text-slate-400" />
      </div>
      <div className="mt-6 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.courseName}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-end">
                  <Badge>{item.priorityLabel}</Badge>
                  {getDeadlineBadge(item)}
                  <span className="text-sm text-slate-500">{formatDateLabel(item.dueDate)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Belum ada deadline dalam 7 hari ke depan. Bagus, ritmemu masih aman.
          </div>
        )}
      </div>
    </Card>
  );
}
