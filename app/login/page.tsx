import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Log In — Snap Inspect" };

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <LoginForm />
    </main>
  );
}
