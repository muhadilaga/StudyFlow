import { Bell, LogOut, Search } from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isSupabaseConfigured } from "@/lib/env";

export function AppNavbar() {
  const authReady = isSupabaseConfigured();

  return (
    <header className="border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Senin, minggu produktif baru dimulai.</p>
          <h1 className="text-lg font-semibold tracking-tight text-slate-950">
            Fokus pada yang paling dekat deadline.
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full min-w-0 sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input className="pl-9" placeholder="Cari tugas atau mata kuliah..." />
          </div>
          <button className="inline-flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
            <Bell className="size-5" />
          </button>
          {authReady ? (
            <form action={logoutAction}>
              <Button type="submit" variant="secondary" className="gap-2">
                <LogOut className="size-4" />
                Keluar
              </Button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
