import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Pengaturan"
        title="Pengaturan akun"
        description="Halaman ini disiapkan untuk profil, preferensi tema, dan pengaturan notifikasi berikutnya."
      />
      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Roadmap pengaturan</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Edit profil akademik</li>
          <li>• Preferensi notifikasi email</li>
          <li>• Tema dashboard</li>
          <li>• Reset password via Supabase Auth</li>
        </ul>
      </Card>
    </div>
  );
}
