"use client";

import Link from "next/link";
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900 tracking-tight">
              Inspect<span className="text-blue-600">Mode</span> Pro
            </Link>
          </div>

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
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
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
