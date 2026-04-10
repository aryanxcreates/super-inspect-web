import { Suspense } from "react";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = {
  title: "Reset password — InspectMode Pro",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-linear-to-b from-zinc-50 to-zinc-100/80 px-4 py-10 sm:py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        <Suspense
          fallback={
            <div className="h-48 animate-pulse rounded-lg bg-zinc-100" />
          }
        >
          <ForgotPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
