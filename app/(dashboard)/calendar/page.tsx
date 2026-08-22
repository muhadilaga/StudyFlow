import { AssignmentCalendar } from "@/components/calendar/assignment-calendar";
import { PageHeader } from "@/components/layout/page-header";
import { getAssignments } from "@/lib/queries/assignments";

export default async function CalendarPage() {
  const assignments = await getAssignments();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Kalender"
        title="Lihat deadline per minggu"
        description="Tampilan kalender membantu kamu membaca pola deadline sebelum tugas menumpuk."
      />
      <AssignmentCalendar assignments={assignments} />
    </div>
  );
}
