import { ProgressBar } from "@/components/goals/goal-progress";
import { Card } from "@/components/ui/card";
import type { Goal } from "@/types/goal";

export function WeeklyGoalsWidget({ items }: { items: Goal[] }) {
  return (
    <Card className="p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Progress goal mingguan</h2>
        <p className="text-sm text-slate-500">Biar target belajarmu tidak hanya jadi catatan.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.length ? (
          items.map((goal) => (
            <div key={goal.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="space-y-1">
                <p className="font-medium text-slate-900">{goal.title}</p>
                <p className="text-sm text-slate-500">
                  {goal.currentValue}/{goal.targetValue} target tercapai
                </p>
              </div>
              <div className="mt-4">
                <ProgressBar value={goal.progress} />
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Belum ada goal aktif minggu ini. Tambahkan target belajar baru agar dashboard lebih hidup.
          </div>
        )}
      </div>
    </Card>
  );
}
