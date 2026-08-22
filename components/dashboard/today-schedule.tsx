import { Clock3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Course } from "@/types/course";

export function TodaySchedule({ items }: { items: Course[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Jadwal hari ini</h2>
          <p className="text-sm text-slate-500">Lihat kelas terdekat dan blok waktu belajar mandiri.</p>
        </div>
        <Clock3 className="size-5 text-slate-400" />
      </div>
      <div className="mt-6 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-900">{item.courseName}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.lecturerName}</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>{item.classDayLabel}</p>
                  <p>{item.timeRange}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
            Tidak ada jadwal kuliah untuk hari ini.
          </div>
        )}
      </div>
    </Card>
  );
}
