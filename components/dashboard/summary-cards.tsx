import { Card } from "@/components/ui/card";

type SummaryItem = {
  label: string;
  value: string;
  caption: string;
};

export function SummaryCards({ items }: { items: SummaryItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 break-words">{item.value}</p>
          <p className="mt-2 text-sm text-slate-600">{item.caption}</p>
        </Card>
      ))}
    </div>
  );
}
