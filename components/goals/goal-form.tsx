import { createGoalAction, updateGoalAction } from "@/app/(dashboard)/goals/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Goal } from "@/types/goal";

type GoalFormProps = {
  goal?: Goal;
  errorMessage?: string;
  successMessage?: string;
};

export function GoalForm({ goal, errorMessage, successMessage }: GoalFormProps) {
  const formAction = goal ? updateGoalAction : createGoalAction;
  const heading = goal ? "Edit goal mingguan" : "Tambah goal mingguan";
  const buttonLabel = goal ? "Update goal" : "Simpan goal";

  return (
    <Card className="p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-950">{heading}</h2>
        <p className="text-sm text-slate-500">
          Contoh: 5 sesi belajar, 3 rangkuman, atau 2 latihan soal.
        </p>
      </div>
      <form action={formAction} className="mt-6 space-y-4">
        {goal ? <input type="hidden" name="goalId" value={goal.id} /> : null}
        <div className="space-y-2">
          <Label htmlFor="title">Nama target</Label>
          <Input id="title" name="title" placeholder="Belajar machine learning 4 sesi" defaultValue={goal?.title ?? ""} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="targetValue">Target</Label>
            <Input id="targetValue" name="targetValue" type="number" min={1} max={1000} placeholder="4" defaultValue={goal?.targetValue ?? ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentValue">Progress awal</Label>
            <Input id="currentValue" name="currentValue" type="number" min={0} max={1000} defaultValue={goal?.currentValue ?? 0} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="weekStart">Mulai minggu</Label>
          <Input id="weekStart" name="weekStart" type="date" defaultValue={goal?.weekStartValue ?? ""} required />
        </div>
        {errorMessage ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</div> : null}
        {successMessage ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{successMessage}</div> : null}
        <Button type="submit">{buttonLabel}</Button>
      </form>
    </Card>
  );
}
