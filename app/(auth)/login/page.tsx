import Link from "next/link";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/(auth)/actions";
import { AuthForm } from "@/components/auth/auth-form";
import { getOptionalUser } from "@/lib/auth/get-user";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getOptionalUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const errorValue = params.error;
  const messageValue = params.message;
  const errorMessage = Array.isArray(errorValue) ? errorValue[0] : errorValue;
  const infoMessage = Array.isArray(messageValue) ? messageValue[0] : messageValue;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Link href="/" className="text-sm font-medium text-blue-700">
            ← Kembali ke StudyFlow
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Masuk ke akunmu</h1>
          <p className="text-sm text-slate-600">
            Gunakan email kampus atau email aktif untuk lanjut ke dashboard.
          </p>
        </div>
        <AuthForm
          mode="login"
          action={loginAction}
          errorMessage={errorMessage}
          infoMessage={infoMessage}
        />
      </div>
    </main>
  );
}
