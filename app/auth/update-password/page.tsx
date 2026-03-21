import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export const metadata = { title: "New password — InspectMode Pro" };

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=session");
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100/80 px-4 py-10 sm:py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        <UpdatePasswordForm />
      </div>
    </main>
  );
}
