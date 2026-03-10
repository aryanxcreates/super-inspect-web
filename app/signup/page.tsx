import { Suspense } from "react";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = { title: "Sign Up — InspectMode Pro" };

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </main>
  );
}
