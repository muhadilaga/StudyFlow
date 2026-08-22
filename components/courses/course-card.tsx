import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteCourseAction } from "@/app/(dashboard)/courses/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full" style={{ backgroundColor: course.colorValue }} />
            <p className="font-medium text-slate-900">{course.courseName}</p>
          </div>
          <p className="text-sm text-slate-600">{course.lecturerName}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right text-sm text-slate-500">
            <p>{course.classDayLabel}</p>
            <Badge>{course.timeRange}</Badge>
          </div>
          <Link href={`/courses?edit=${course.id}`}>
            <Button type="button" variant="ghost" className="text-slate-600 hover:bg-slate-100">
              <Pencil className="size-4" />
            </Button>
          </Link>
          <form action={deleteCourseAction}>
            <input type="hidden" name="courseId" value={course.id} />
            <Button type="submit" variant="ghost" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">
              <Trash2 className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
