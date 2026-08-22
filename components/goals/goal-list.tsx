import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteGoalAction } from "@/app/(dashboard)/goals/actions";
import { ProgressBar } from "@/components/goals/goal-progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Goal } from "@/types/goal";

export function GoalList({ goals }: { goals: Goal[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-950">Goal aktif</h2>
        <p className="text-sm text-slate-500">Review target mingguan agar progres belajarmu konsisten.</p>
      </div>
      <div className="mt-6 space-y-4">
        {goals.length ? (
          goals.map((goal) => (
            <div key={goal.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{goal.title}</p>
                  <p className="text-sm text-slate-500">{goal.currentValue}/{goal.targetValue}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-blue-700">{goal.progress}%</p>
                  <Link href={`/goals?edit=${goal.id}`}>
                    <Button type="button" variant="ghost" className="text-slate-600 hover:bg-slate-100">
                      <Pencil className="size-4" />
                    </Button>
                  </Link>
                  <form action={deleteGoalAction}>
                    <input type="hidden" name="goalId" value={goal.id} />
                    <Button type="submit" variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                      <Trash2 className="size-4" />
                    </Button>
                  </form>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar value={goal.progress} />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Belum ada goal aktif. Tambahkan target belajar pertamamu dari form di samping.
          </div>
        )}
      </div>
    </Card>
  );
}
