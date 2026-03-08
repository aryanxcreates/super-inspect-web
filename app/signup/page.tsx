import { SignupForm } from "@/components/auth/signup-form";

export const metadata = { title: "Sign Up — Snap Inspect" };

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <SignupForm />
    </main>
  );
}
