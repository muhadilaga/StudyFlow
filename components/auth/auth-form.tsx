import Link from "next/link";
import type { loginAction, registerAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormProps = {
  mode: "login" | "register";
  action: typeof loginAction | typeof registerAction;
  errorMessage?: string;
  infoMessage?: string;
};

export function AuthForm({
  mode,
  action,
  errorMessage,
  infoMessage,
}: AuthFormProps) {
  const isLogin = mode === "login";

  return (
    <Card className="p-6">
      <form action={action} className="space-y-4">
        {!isLogin ? (
          <div className="space-y-2">
            <Label htmlFor="fullName">Nama lengkap</Label>
            <Input id="fullName" name="fullName" placeholder="Adi Pratama" required />
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="nama@email.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required />
        </div>
        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}
        {infoMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {infoMessage}
          </div>
        ) : null}
        <Button type="submit" className="w-full">
          {isLogin ? "Masuk" : "Buat akun"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm text-slate-600">
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="font-medium text-blue-700 hover:text-blue-800"
        >
          {isLogin ? "Daftar sekarang" : "Masuk di sini"}
        </Link>
      </div>
    </Card>
  );
}
