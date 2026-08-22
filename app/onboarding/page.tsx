import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-12">
      <Card className="w-full p-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-blue-700">Onboarding</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Lengkapi profil akademikmu</h1>
          <p className="text-sm text-slate-600">Form ini nanti akan terhubung ke tabel profiles di Supabase.</p>
        </div>
        <form className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="fullName">Nama lengkap</Label>
            <Input id="fullName" placeholder="Adi Pratama" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="university">Universitas</Label>
            <Input id="university" placeholder="Universitas ..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="major">Program studi</Label>
            <Input id="major" placeholder="Teknik Informatika" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Input id="semester" placeholder="6" type="number" min={1} max={14} />
          </div>
          <div className="sm:col-span-2">
            <Button type="button">Simpan profil</Button>
          </div>
        </form>
      </Card>
    </main>
  );
}
