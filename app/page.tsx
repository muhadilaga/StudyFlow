import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckSquare,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const highlights = [
  {
    icon: CalendarDays,
    title: "Jadwal kuliah tertata",
    description: "Lihat kelas hari ini, jam mulai, dan prioritas minggu ini tanpa buka banyak catatan.",
  },
  {
    icon: CheckSquare,
    title: "Deadline lebih terkendali",
    description: "Kelola tugas, prioritas, status, dan deadline dari satu alur yang sederhana.",
  },
  {
    icon: Target,
    title: "Goal belajar lebih konsisten",
    description: "Pantau target mingguan dan progres belajarmu agar tetap stabil sepanjang semester.",
  },
];

const stats = [
  { label: "Fokus utama", value: "Dashboard + tugas + goal" },
  { label: "Cocok untuk", value: "Mahasiswa aktif" },
  { label: "Benefit", value: "Lebih rapi, lebih tenang" },
];

const features = [
  {
    icon: Sparkles,
    title: "Planner akademik yang ringan",
    description: "Bukan sistem yang ribet. StudyFlow dibuat agar cepat dipakai setiap hari dari HP maupun laptop.",
  },
  {
    icon: BellRing,
    title: "Deadline cepat terlihat",
    description: "Tugas terlambat, deadline dekat, dan tugas aktif langsung terlihat di dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Akun dan data lebih aman",
    description: "Auth Supabase dan RLS memastikan setiap user hanya melihat data miliknya sendiri.",
  },
];

const steps = [
  {
    step: "01",
    title: "Masukkan mata kuliah",
    description: "Susun jadwal per hari supaya kamu tahu ritme kuliah dan slot belajar yang realistis.",
  },
  {
    step: "02",
    title: "Catat tugas & deadline",
    description: "Simpan tugas, prioritas, dan deadline agar tidak ada yang lewat diam-diam.",
  },
  {
    step: "03",
    title: "Pantau progres mingguan",
    description: "Lihat goal, tugas aktif, dan tugas terlambat dari satu dashboard yang ringkas.",
  },
];

const proofItems = [
  "Dirancang untuk penggunaan harian dari HP",
  "Dashboard fokus pada deadline dan progres nyata",
  "Navigasi mobile sudah tersedia untuk semua halaman utama",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06070a] text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-blue-500/12 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl sm:top-40 sm:h-72 sm:w-72" />
      </div>

      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-4 sm:gap-14 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
        <header className="rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur sm:rounded-3xl sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-lg font-semibold tracking-tight text-white">StudyFlow</p>
              <p className="max-w-xs text-sm leading-6 text-slate-300">
                Academic planner sederhana untuk mahasiswa Indonesia.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Link href="/login" className="text-center text-sm font-medium text-slate-300 transition hover:text-white">
                Saya sudah punya akun
              </Link>
              <Button asChild className="w-full bg-white font-semibold !text-slate-950 hover:bg-slate-200 sm:w-auto [&_svg]:!text-slate-950">
                <Link href="/register" className="!text-slate-950" style={{ color: "#020617" }}>
                  Daftar gratis
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
          <div className="space-y-6 sm:space-y-7">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-200 sm:text-sm">
              <Sparkles className="size-4 shrink-0" />
              <span className="truncate">Study planner modern untuk ritme kuliah harian</span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-[2.15rem] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                Bikin kuliahmu lebih tertata, fokus, dan tidak keteteran deadline.
              </h1>
              <p className="max-w-2xl text-[15px] leading-7 text-slate-300 sm:text-lg sm:leading-8">
                StudyFlow menggabungkan jadwal kuliah, tugas, kalender deadline, dan target belajar
                mingguan ke dalam satu dashboard yang nyaman dipakai dari HP.
              </p>
            </div>

            <div className="grid gap-3 sm:flex sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full bg-blue-600 text-base font-semibold text-white hover:bg-blue-500 sm:w-auto [&_svg]:text-white">
                <Link href="/register" className="text-white">
                  Daftar & mulai pakai
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-12 w-full border border-white/10 bg-white/5 text-base text-white hover:bg-white/10 sm:w-auto">
                <Link href="/login">Saya sudah punya akun</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-medium leading-6 text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0e1117] text-white shadow-[0_24px_70px_rgba(0,0,0,0.42)] sm:rounded-[2rem] sm:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="border-b border-white/10 bg-white/5 px-4 py-4 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:text-xs">Preview dashboard</p>
                  <h2 className="mt-1 text-lg font-semibold sm:text-xl">Hari ini lebih terarah</h2>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-300 sm:text-xs">
                  Deadline terpantau
                </span>
              </div>
            </div>

            <div className="space-y-4 p-4 sm:space-y-5 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Tugas aktif</p>
                  <p className="mt-2 text-3xl font-semibold">12</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">Dengan indikator deadline dekat & terlambat</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-300">Goal rata-rata</p>
                  <p className="mt-2 text-3xl font-semibold">67%</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">Progress mingguan lebih mudah dipantau</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white p-4 text-slate-900 sm:rounded-3xl sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Prioritas hari ini</p>
                    <h3 className="mt-1 text-base font-semibold sm:text-lg">Tugas yang perlu dibereskan dulu</h3>
                  </div>
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-[11px] font-medium text-rose-700 sm:text-xs">
                    1 terlambat
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    "Upload tugas Basis Data sebelum 19:00",
                    "Review goal belajar minggu ini",
                    "Update status tugas Pemrograman Mobile",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-3 py-3">
                      <span className={`size-2 rounded-full ${index === 0 ? "bg-rose-500" : "bg-blue-600"}`} />
                      <span className="text-sm leading-6 text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur sm:rounded-3xl sm:p-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                  <Icon className="size-6" />
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </Card>
            );
          })}
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[#0b0e14] p-5 sm:rounded-[2rem] sm:p-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-blue-300">Cara kerja StudyFlow</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Satu alur sederhana untuk mengelola semester yang sibuk.
            </h2>
            <p className="text-sm leading-6 text-slate-300 sm:text-base">
              StudyFlow dirancang supaya mahasiswa bisa mulai cepat tanpa setup yang rumit.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:rounded-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-blue-300">{item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-[#0e1117] px-5 py-5 shadow-[0_10px_28px_rgba(0,0,0,0.12)] sm:rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 sm:rounded-[2rem] sm:p-8">
            <p className="text-sm font-medium text-blue-300">Kenapa cocok untuk mahasiswa?</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Fokus pada hal yang benar-benar sering bikin kacau: deadline, jadwal, dan progres.
            </h2>
            <div className="mt-5 space-y-3">
              {proofItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0c1017] px-4 py-4">
                  <span className="mt-1 size-2 rounded-full bg-emerald-400" />
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[#0b0e14] p-5 sm:rounded-[2rem] sm:p-8">
            <p className="text-sm font-medium text-blue-300">Yang bisa kamu lakukan</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Tambah dan edit mata kuliah",
                "Kelola tugas & status",
                "Pantau kalender deadline",
                "Cek goal mingguan",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-7 text-white shadow-[0_20px_60px_rgba(37,99,235,0.35)] sm:rounded-[2rem] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-blue-100">Sudah siap dipakai dari HP</p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Mulai rapikan semester ini dengan alur yang sederhana tapi benar-benar berguna.
              </h2>
              <p className="text-sm leading-6 text-blue-100 sm:text-base">
                StudyFlow cocok untuk mahasiswa yang ingin fokus pada deadline, ritme belajar, dan progres mingguan tanpa aplikasi yang terlalu rumit.
              </p>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full bg-white text-base font-semibold !text-slate-950 hover:bg-slate-100 sm:w-auto [&_svg]:!text-slate-950">
                <Link href="/register" className="!text-slate-950" style={{ color: "#020617" }}>
                  Daftar sekarang
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-12 w-full border border-white/30 bg-white/10 text-base text-white hover:bg-white/20 sm:w-auto">
                <Link href="/login">Saya sudah punya akun</Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-white/10 pt-1 pb-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-slate-200">StudyFlow</p>
            <p>Academic planner sederhana untuk mahasiswa Indonesia.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/register" className="transition hover:text-white">
              Daftar
            </Link>
            <Link href="/login" className="transition hover:text-white">
              Login
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
