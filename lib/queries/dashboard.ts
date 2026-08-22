import { getOptionalUser } from "@/lib/auth/get-user";
import { getAssignments } from "@/lib/queries/assignments";
import { getCourses } from "@/lib/queries/courses";
import { getGoals } from "@/lib/queries/goals";
import { isDueSoon, isOverdue, isWithinSevenDays } from "@/lib/utils/dates";

function getTodayLabel() {
  return new Intl.DateTimeFormat("id-ID", { weekday: "long" })
    .format(new Date())
    .replace(/^./, (value) => value.toUpperCase());
}

export async function getDashboardData() {
  const [assignments, courses, goals, user] = await Promise.all([
    getAssignments(),
    getCourses(),
    getGoals(),
    getOptionalUser(),
  ]);

  const activeAssignments = assignments.filter((assignment) => assignment.statusValue !== "done");
  const completedAssignments = assignments.filter((assignment) => assignment.statusValue === "done");
  const upcomingThisWeek = activeAssignments.filter((assignment) => isWithinSevenDays(assignment.dueDate));
  const overdueAssignments = activeAssignments.filter((assignment) => isOverdue(assignment.dueDate));
  const dueSoonAssignments = activeAssignments.filter((assignment) => isDueSoon(assignment.dueDate));
  const todayLabel = getTodayLabel();
  const todayCourses = courses.filter((course) => course.classDayLabel === todayLabel);
  const activeGoals = goals.filter((goal) => goal.progress < 100);
  const averageGoalProgress = activeGoals.length
    ? Math.round(activeGoals.reduce((sum, goal) => sum + goal.progress, 0) / activeGoals.length)
    : 0;

  const assignmentsByCourse = new Map<string, number>();
  for (const assignment of assignments) {
    assignmentsByCourse.set(
      assignment.courseName,
      (assignmentsByCourse.get(assignment.courseName) ?? 0) + 1,
    );
  }

  const busiestCourseEntry = [...assignmentsByCourse.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    userName: user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Adi",
    summary: [
      {
        label: "Tugas aktif",
        value: String(activeAssignments.length),
        caption: "Semua tugas yang statusnya belum selesai.",
      },
      {
        label: "Selesai minggu ini",
        value: String(completedAssignments.length),
        caption: "Total tugas yang sudah ditandai selesai.",
      },
      {
        label: "Goal rata-rata",
        value: `${averageGoalProgress}%`,
        caption: "Rata-rata progres semua goal aktif.",
      },
      {
        label: "Course tersibuk",
        value: busiestCourseEntry?.[0] ?? "-",
        caption: busiestCourseEntry ? `${busiestCourseEntry[1]} tugas tercatat.` : "Belum ada tugas per mata kuliah.",
      },
    ],
    upcomingAssignments: upcomingThisWeek.slice(0, 5),
    overdueAssignments: overdueAssignments.slice(0, 5),
    todayCourses,
    goals: activeGoals.slice(0, 6),
    alerts: {
      overdue: overdueAssignments.length,
      dueSoon: dueSoonAssignments.length,
    },
  };
}
