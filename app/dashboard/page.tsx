import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { Plan } from "@/lib/plans";
import { 
  ShieldCheck, 
  Monitor, 
  Zap, 
  Download, 
  BookOpen, 
  HelpCircle, 
  Laptop,
  Sparkles,
  Clock,
} from "lucide-react";
import { CopyButton } from "@/components/dashboard/copy-button";
import Link from "next/link";

export const metadata = { title: "Dashboard — InspectMode Pro" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const profile = await prisma.profile.findUnique({
    where: { id: user!.id },
    select: { plan: true, licenseKey: true, trialEndsAt: true, createdAt: true, email: true },
  });

  const plan = (profile?.plan ?? "free") as Plan;
  const licenseKey = profile?.licenseKey ?? null;
  const trialEndsAt = profile?.trialEndsAt;
  const memberSince = profile?.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Unknown";

  const isTrialExpired = plan === "trial" && trialEndsAt && new Date(trialEndsAt) < new Date();
  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const needsTrial = plan === "free";
  const trialProductId = process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-500 text-lg">
          Manage your InspectMode Pro license and devices
        </p>
      </div>

      {/* Start Free Trial Banner */}
      {needsTrial && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg shadow-blue-500/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Sparkles size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Start your free 7-day trial</h2>
              <p className="text-blue-100 text-sm mb-5 max-w-md">
                Get full access to all InspectMode Pro features for 7 days. No credit card required.
              </p>
              <Link
                href={`/api/checkout?products=${trialProductId}&customerEmail=${user!.email}`}
                className="inline-block px-6 py-2.5 bg-white text-blue-600 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors"
              >
                Activate Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trial expiring/expired banner */}
      {plan === "trial" && !isTrialExpired && trialDaysLeft <= 3 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-amber-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900">
                Your trial ends in {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">Upgrade to keep using InspectMode Pro</p>
            </div>
            <Link
              href="/dashboard/billing"
              className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              Upgrade now
            </Link>
          </div>
        </div>
      )}

      {isTrialExpired && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-red-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-900">Your trial has ended</p>
              <p className="text-xs text-red-700 mt-0.5">Upgrade to Pro or Lifetime to continue using InspectMode Pro</p>
            </div>
            <Link
              href="/dashboard/billing"
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Upgrade now
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* License Details Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">License Details</h2>
              <p className="text-gray-500 text-sm">Your InspectMode Pro license information</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">License Key</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-50 px-4 py-3 rounded-lg text-sm font-mono text-gray-900 border border-gray-200">
                  {licenseKey ?? "No active license"}
                </code>
                {licenseKey && <CopyButton value={licenseKey} />}
              </div>
              {!licenseKey && needsTrial && (
                <p className="text-xs text-gray-400">Start your free trial to get a license key</p>
              )}
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-500">Plan</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                plan === "lifetime" ? "bg-emerald-100 text-emerald-800" :
                plan === "subscription" ? "bg-blue-100 text-blue-800" :
                plan === "trial" ? "bg-amber-100 text-amber-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {plan === "free" ? "No plan" : plan}
                {plan === "trial" && !isTrialExpired && ` — ${trialDaysLeft}d left`}
                {isTrialExpired && " — expired"}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-500">Email</span>
              <span className="text-sm font-medium text-gray-900">{user?.email}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-500">Seats</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-500">Member Since</span>
              <span className="text-sm font-medium text-gray-900">{memberSince}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Devices Column */}
        <div className="flex flex-col gap-8">
          
          {/* Active Devices Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Monitor size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Active Devices</h2>
                <p className="text-gray-500 text-sm">Manage your activated devices</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-900">0 / 3 devices activated</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out" style={{ width: "0%" }} />
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Install the Chrome extension and log in to activate this device.
            </p>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex-1">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
                <Zap size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                <p className="text-gray-500 text-sm">Get started with InspectMode Pro</p>
              </div>
            </div>

            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <Download size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Install Extension</p>
                    <p className="text-xs text-gray-500">Add to Chrome browser</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
              </a>

              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <BookOpen size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Documentation</p>
                    <p className="text-xs text-gray-500">Learn how to use all tools</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
              </a>

              <a href="mailto:contact@inspectmode.xyz" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200 transition-colors">
                    <HelpCircle size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Get Support</p>
                    <p className="text-xs text-gray-500">Contact our team</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
