import { AssignmentFilter } from "@/components/assignments/assignment-filter";
import { AssignmentForm } from "@/components/assignments/assignment-form";
import { AssignmentList } from "@/components/assignments/assignment-list";
import { PageHeader } from "@/components/layout/page-header";
import { getAssignments } from "@/lib/queries/assignments";
import { getCourseOptions } from "@/lib/queries/courses";
import { isSameDay, isWithinSevenDays } from "@/lib/utils/dates";
import type { Assignment } from "@/types/assignment";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function filterAssignments(assignments: Assignment[], filter: string) {
  switch (filter) {
    case "today":
      return assignments.filter((assignment) => isSameDay(assignment.dueDate));
    case "week":
      return assignments.filter((assignment) => isWithinSevenDays(assignment.dueDate));
    case "high":
      return assignments.filter((assignment) => assignment.priorityLabel === "Tinggi");
    case "done":
      return assignments.filter((assignment) => assignment.statusValue === "done");
    default:
      return assignments;
  }
}

export default async function AssignmentsPage({ searchParams }: { searchParams: SearchParams }) {
  const [assignments, courses, params] = await Promise.all([getAssignments(), getCourseOptions(), searchParams]);

  const errorValue = params.error;
  const successValue = params.success;
  const filterValue = params.filter;
  const editValue = params.edit;
  const errorMessage = Array.isArray(errorValue) ? errorValue[0] : errorValue;
  const successMessage = Array.isArray(successValue) ? successValue[0] : successValue;
  const activeFilter = Array.isArray(filterValue) ? filterValue[0] : filterValue || "all";
  const editId = Array.isArray(editValue) ? editValue[0] : editValue;
  const filteredAssignments = filterAssignments(assignments, activeFilter);
  const selectedAssignment = editId ? assignments.find((assignment) => assignment.id === editId) : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tugas"
        title="Pantau semua deadline"
        description="Atur prioritas, status, dan deadline agar tidak ada tugas yang terlewat."
      />
      <AssignmentFilter activeFilter={activeFilter} />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AssignmentList assignments={filteredAssignments} />
        <AssignmentForm courses={courses} assignment={selectedAssignment} errorMessage={errorMessage} successMessage={successMessage} />
      </div>
    </div>
  );
}
