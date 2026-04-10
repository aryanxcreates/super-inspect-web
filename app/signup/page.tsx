import { Suspense } from "react";
import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up — InspectMode Pro",
  description:
    "Create your InspectMode Pro account and start inspecting layouts, colors, and typography on any site.",
};

export default function SignupPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-linear-to-b from-zinc-50 to-zinc-100/80 px-4 py-10 sm:py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded-lg bg-zinc-100" />
          }
        >
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
