import { createCourseAction, updateCourseAction } from "@/app/(dashboard)/courses/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COURSE_COLORS, COURSE_DAYS } from "@/lib/utils/constants";
import type { Course } from "@/types/course";

type CourseFormProps = {
  course?: Course;
  errorMessage?: string;
  successMessage?: string;
};

const dayLabels: Record<(typeof COURSE_DAYS)[number], string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

const colorLabels: Record<(typeof COURSE_COLORS)[number], string> = {
  blue: "Biru",
  purple: "Ungu",
  green: "Hijau",
  amber: "Amber",
  rose: "Rose",
};

export function CourseForm({ course, errorMessage, successMessage }: CourseFormProps) {
  const formAction = course ? updateCourseAction : createCourseAction;
  const heading = course ? "Edit mata kuliah" : "Tambah mata kuliah";
  const buttonLabel = course ? "Update mata kuliah" : "Simpan mata kuliah";

  return (
    <Card className="p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-950">{heading}</h2>
        <p className="text-sm text-slate-500">
          Form ini sekarang langsung tersimpan ke database Supabase milik akunmu.
        </p>
      </div>
      <form action={formAction} className="mt-6 space-y-4">
        {course ? <input type="hidden" name="courseId" value={course.id} /> : null}
        <div className="space-y-2">
          <Label htmlFor="courseName">Nama mata kuliah</Label>
          <Input id="courseName" name="courseName" placeholder="Basis Data" defaultValue={course?.courseName ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lecturerName">Dosen</Label>
          <Input id="lecturerName" name="lecturerName" placeholder="Dr. Andi" defaultValue={course?.lecturerName === "Belum diisi" ? "" : (course?.lecturerName ?? "")} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="classDay">Hari</Label>
            <select
              id="classDay"
              name="classDay"
              defaultValue={course?.classDayValue ?? ""}
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Pilih hari</option>
              {COURSE_DAYS.map((day) => (
                <option key={day} value={day}>
                  {dayLabels[day]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Warna label</Label>
            <select
              id="color"
              name="color"
              defaultValue={course?.colorKey ?? "blue"}
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              {COURSE_COLORS.map((color) => (
                <option key={color} value={color}>
                  {colorLabels[color]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="startTime">Jam mulai</Label>
            <Input id="startTime" name="startTime" type="time" defaultValue={course?.startTimeValue ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">Jam selesai</Label>
            <Input id="endTime" name="endTime" type="time" defaultValue={course?.endTimeValue ?? ""} />
          </div>
        </div>
        {errorMessage ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</div> : null}
        {successMessage ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{successMessage}</div> : null}
        <Button type="submit">{buttonLabel}</Button>
      </form>
    </Card>
  );
}
