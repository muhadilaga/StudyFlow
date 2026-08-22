import { GoalForm } from "@/components/goals/goal-form";
import { GoalList } from "@/components/goals/goal-list";
import { PageHeader } from "@/components/layout/page-header";
import { getGoals } from "@/lib/queries/goals";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function GoalsPage({ searchParams }: { searchParams: SearchParams }) {
  const [goals, params] = await Promise.all([getGoals(), searchParams]);
  const errorValue = params.error;
  const successValue = params.success;
  const editValue = params.edit;
  const errorMessage = Array.isArray(errorValue) ? errorValue[0] : errorValue;
  const successMessage = Array.isArray(successValue) ? successValue[0] : successValue;
  const editId = Array.isArray(editValue) ? editValue[0] : editValue;
  const selectedGoal = editId ? goals.find((goal) => goal.id === editId) : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Target Belajar"
        title="Jaga progres mingguan"
        description="Tetapkan target belajar yang realistis dan pantau progresnya setiap minggu."
      />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <GoalList goals={goals} />
        <GoalForm goal={selectedGoal} errorMessage={errorMessage} successMessage={successMessage} />
      </div>
    </div>
  );
}
