import { isSupabaseConfigured } from "@/lib/env";
import { mockGoals } from "@/lib/mock-data";
import { createServerClient } from "@/lib/supabase/server";
import type { Goal } from "@/types/goal";

type GoalRow = {
  id: string;
  title: string;
  target_value: number;
  current_value: number;
  week_start: string;
};

export async function getGoals(): Promise<Goal[]> {
  if (!isSupabaseConfigured()) {
    return mockGoals;
  }

  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return mockGoals;
    }

    const { data, error } = await supabase
      .from("study_goals")
      .select("id, title, target_value, current_value, week_start")
      .order("week_start", { ascending: false });

    if (error || !data) {
      return mockGoals;
    }

    return (data as GoalRow[]).map((goal) => ({
      id: goal.id,
      title: goal.title,
      targetValue: goal.target_value,
      currentValue: goal.current_value,
      progress: Math.min(100, Math.round((goal.current_value / goal.target_value) * 100)),
      weekStartValue: goal.week_start,
    }));
  } catch {
    return mockGoals;
  }
}
