import { CourseForm } from "@/components/courses/course-form";
import { CourseList } from "@/components/courses/course-list";
import { PageHeader } from "@/components/layout/page-header";
import { getCourses } from "@/lib/queries/courses";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const [courses, params] = await Promise.all([getCourses(), searchParams]);
  const errorValue = params.error;
  const successValue = params.success;
  const editValue = params.edit;

  const errorMessage = Array.isArray(errorValue) ? errorValue[0] : errorValue;
  const successMessage = Array.isArray(successValue) ? successValue[0] : successValue;
  const editId = Array.isArray(editValue) ? editValue[0] : editValue;
  const selectedCourse = editId ? courses.find((course) => course.id === editId) : undefined;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mata Kuliah"
        title="Kelola jadwal kuliah"
        description="Simpan mata kuliah, hari kelas, dan warna label agar dashboard lebih rapi."
      />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <CourseList courses={courses} />
        <CourseForm course={selectedCourse} errorMessage={errorMessage} successMessage={successMessage} />
      </div>
    </div>
  );
}
