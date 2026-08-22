import Link from "next/link";
import { AlertTriangle, Pencil } from "lucide-react";
import { updateAssignmentStatusAction } from "@/app/(dashboard)/assignments/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateLabel } from "@/lib/utils/dates";
import type { Assignment } from "@/types/assignment";

export function OverdueTasks({ items }: { items: Assignment[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Tugas terlambat</h2>
          <p className="text-sm text-slate-500">
            Fokuskan dulu pada tugas yang sudah melewati deadline agar ritme belajarmu pulih.
          </p>
        </div>
        <AlertTriangle className="size-5 text-rose-500" />
      </div>
      <div className="mt-6 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-rose-200 bg-rose-50/40 px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <Badge className="bg-rose-100 text-rose-700">Terlambat</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{item.courseName}</p>
                  <p className="mt-1 text-sm text-slate-500">Deadline: {formatDateLabel(item.dueDate)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/assignments?edit=${item.id}`}>
                    <Button type="button" variant="ghost" className="text-slate-600 hover:bg-white">
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                  </Link>
                  <form action={updateAssignmentStatusAction}>
                    <input type="hidden" name="assignmentId" value={item.id} />
                    <input type="hidden" name="nextStatus" value="done" />
                    <Button type="submit" variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                      Tandai selesai
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Tidak ada tugas terlambat. Bagus, semua deadline masih terkendali.
          </div>
        )}
      </div>
    </Card>
  );
}
