import { OverdueTasks } from "@/components/dashboard/overdue-tasks";
import { PageHeader } from "@/components/layout/page-header";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { TodaySchedule } from "@/components/dashboard/today-schedule";
import { WeeklyGoalsWidget } from "@/components/dashboard/weekly-goals-widget";
import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "@/lib/queries/dashboard";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title={`Selamat datang, ${data.userName}`}
        description="Pantau tugas, jadwal kuliah, dan progres belajar dari satu tempat."
      />
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-rose-100 text-rose-700">Terlambat: {data.alerts.overdue}</Badge>
        <Badge className="bg-amber-100 text-amber-700">Deadline dekat: {data.alerts.dueSoon}</Badge>
      </div>
      <SummaryCards items={data.summary} />
      <OverdueTasks items={data.overdueAssignments} />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <UpcomingDeadlines items={data.upcomingAssignments} />
        <TodaySchedule items={data.todayCourses} />
      </div>
      <WeeklyGoalsWidget items={data.goals} />
    </div>
  );
}
