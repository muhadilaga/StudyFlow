"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { navLinks } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils/cn";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r border-slate-200 bg-white px-5 py-6 lg:block">
      <div className="flex h-full flex-col justify-between gap-8">
        <div className="space-y-8">
          <div className="space-y-1">
            <p className="text-xl font-semibold tracking-tight text-slate-950">StudyFlow</p>
            <p className="text-sm text-slate-500">Academic planner for students</p>
          </div>
          <nav className="space-y-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="rounded-3xl bg-slate-950 p-5 text-white">
          <Badge className="bg-white/15 text-white">MVP</Badge>
          <h3 className="mt-3 text-lg font-semibold">StudyFlow Pro</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Nanti bisa ditambah reminder email, analytics, dan export planner mingguan.
          </p>
        </div>
      </div>
    </aside>
  );
}
