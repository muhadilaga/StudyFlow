import { AssignmentCard } from "@/components/assignments/assignment-card";
import { Card } from "@/components/ui/card";
import type { Assignment } from "@/types/assignment";

export function AssignmentList({ assignments }: { assignments: Assignment[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-950">Daftar tugas</h2>
        <p className="text-sm text-slate-500">
          Mulai dari tugas yang prioritasnya tinggi dan deadline paling dekat.
        </p>
      </div>
      <div className="mt-6 space-y-3">
        {assignments.length ? (
          assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Belum ada tugas. Tambahkan tugas pertamamu dari form di samping.
          </div>
        )}
      </div>
    </Card>
  );
}
