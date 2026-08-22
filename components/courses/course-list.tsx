import { CourseCard } from "@/components/courses/course-card";
import { Card } from "@/components/ui/card";
import type { Course } from "@/types/course";

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <Card className="p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-950">Daftar mata kuliah</h2>
        <p className="text-sm text-slate-500">
          Label warna membantu membedakan fokus tiap mata kuliah.
        </p>
      </div>
      <div className="mt-6 space-y-3">
        {courses.length ? (
          courses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Belum ada mata kuliah. Tambahkan mata kuliah pertamamu dari form di samping.
          </div>
        )}
      </div>
    </Card>
  );
}
