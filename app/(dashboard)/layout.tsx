import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { getOptionalUser } from "@/lib/auth/get-user";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getOptionalUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[260px_1fr]">
        <AppSidebar />
        <div className="flex min-h-screen flex-col">
          <AppNavbar />
          <main className="flex-1 px-6 py-6 pb-24 lg:px-8 lg:pb-6">{children}</main>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
