"use client";

import Link from "next/link";
import { SquareMousePointer } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { Plan } from "@/lib/plans";

interface DashboardShellProps {
  user: User;
  plan: Plan;
  children: React.ReactNode;
}

export function DashboardShell({ user, plan, children }: DashboardShellProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex min-w-0 shrink items-center gap-2 text-base font-bold text-gray-900 sm:text-lg"
          >
            <div className="shrink-0 rounded-lg bg-blue-600 p-1.5">
              <SquareMousePointer className="h-5 w-5 text-white" aria-hidden />
            </div>
            <span className="truncate">
              InspectMode <span className="text-blue-600">Pro</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500 hidden sm:inline-block">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} InspectMode Pro</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="/refund" className="hover:text-gray-900 transition-colors">Refund Policy</Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
