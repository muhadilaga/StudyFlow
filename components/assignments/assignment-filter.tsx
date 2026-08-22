import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const filters = [
  { label: "Semua", value: "all" },
  { label: "Hari ini", value: "today" },
  { label: "Minggu ini", value: "week" },
  { label: "Prioritas tinggi", value: "high" },
  { label: "Selesai", value: "done" },
] as const;

export function AssignmentFilter({ activeFilter = "all" }: { activeFilter?: string }) {
  return (
    <Card className="flex flex-wrap gap-2 p-4">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <Link key={filter.value} href={`/assignments?filter=${filter.value}`}>
            <Badge className={isActive ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"}>
              {filter.label}
            </Badge>
          </Link>
        );
      })}
    </Card>
  );
}
