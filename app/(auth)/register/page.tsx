import Link from "next/link";
import { redirect } from "next/navigation";
import { registerAction } from "@/app/(auth)/actions";
import { AuthForm } from "@/components/auth/auth-form";
import { getOptionalUser } from "@/lib/auth/get-user";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function RegisterPage({
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
  const errorMessage = Array.isArray(errorValue) ? errorValue[0] : errorValue;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Link href="/" className="text-sm font-medium text-blue-700">
            ← Kembali ke StudyFlow
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Buat akun StudyFlow</h1>
          <p className="text-sm text-slate-600">
            Mulai atur deadline, jadwal kuliah, dan target belajar dari satu tempat.
          </p>
        </div>
        <AuthForm mode="register" action={registerAction} errorMessage={errorMessage} />
      </div>
    </main>
  );
}
