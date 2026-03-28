import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { Plan } from "@/lib/plans";
import {
  ShieldCheck,
  Download,
  Sparkles,
  Clock,
  Crown,
  ExternalLink,
  Check,
  ArrowRight,
} from "lucide-react";
import { CopyButton } from "@/components/dashboard/copy-button";
import { ActiveDevices } from "@/components/dashboard/active-devices";
import Link from "next/link";

export const metadata = { title: "Dashboard — InspectMode Pro" };

const CHROME_WEB_STORE_URL =
  "https://chromewebstore.google.com/detail/inspectmode-pro/kfpdbhknbecdddfonddcogclcjkadija";

type DashboardSearchParams = Promise<{
  passwordUpdated?: string;
  checkout?: string;
}>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const { passwordUpdated, checkout } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await prisma.profile.findUnique({
    where: { id: user!.id },
    select: {
      plan: true,
      licenseKey: true,
      trialEndsAt: true,
      createdAt: true,
      email: true,
    },
  });

  const plan = (profile?.plan ?? "free") as Plan;
  const licenseKey = profile?.licenseKey ?? null;
  const trialEndsAt = profile?.trialEndsAt;
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  const isTrialExpired =
    plan === "trial" && trialEndsAt && new Date(trialEndsAt) < new Date();
  const trialDaysLeft = trialEndsAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(trialEndsAt).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  const needsTrial = plan === "free";
  const trialProductId = process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID;
  const lifetimeProductId = process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID;
  const showLifetimeCta = plan !== "lifetime" && lifetimeProductId;
  const showTrialCta = needsTrial && trialProductId;
  const showUpgradeRow = showTrialCta || showLifetimeCta;
  const showBothUpgradeOptions = showTrialCta && showLifetimeCta;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {passwordUpdated === "1" && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Your password was updated successfully.
        </div>
      )}

      {checkout === "success" && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-950 shadow-sm">
          <p className="font-semibold">Your plan is active</p>
          <p className="mt-1.5 leading-relaxed text-emerald-900/90">
            Checkout completed successfully. Open the InspectMode Pro extension
            and sign in with your account to use your license. If you haven&apos;t
            installed it yet, use the Chrome extension section below.
          </p>
        </div>
      )}

      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white px-6 py-8 sm:px-8 sm:py-10 shadow-sm">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl"
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome back, {user?.email?.split("@")[0]}
          </h1>
          <p className="mt-2 max-w-xl text-gray-500">
            Your license, devices, and extension in one place.
          </p>
        </div>
      </header>

      {/* Upgrade options — lifetime first; trial paired when available */}
      {showUpgradeRow && (
        <section aria-label="Upgrade options" className="space-y-4">

          <div className="rounded-2xl border border-gray-200/80 bg-linear-to-b from-gray-50/90 to-white p-4 shadow-sm sm:p-6">
            <div
              className={`grid w-full gap-6 ${showBothUpgradeOptions ? "lg:grid-cols-12 lg:items-stretch lg:gap-0" : ""}`}
            >
              {showLifetimeCta && (
                <div
                  className={
                    showBothUpgradeOptions
                      ? "lg:col-span-7 lg:pr-8 flex min-h-0"
                      : "flex"
                  }
                >
                  <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border-2 border-amber-400/45 bg-linear-to-br from-amber-50/90 via-white to-amber-50/40 p-6 shadow-md sm:p-8">
                    <span className="absolute right-4 top-4 rounded-full bg-linear-to-r from-amber-500 to-amber-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                      Best value
                    </span>
                    <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" />
                    <div className="relative flex flex-1 flex-col">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 ring-1 ring-amber-200/80">
                        <Crown className="h-6 w-6" aria-hidden />
                      </div>
                      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-amber-800/90">
                        One-time purchase
                      </p>
                      <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Lifetime access
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-gray-600">
                        {plan === "subscription"
                          ? "Stop renewals. Own InspectMode Pro forever with a single purchase."
                          : "Pay once. Every Pro feature, for life - no subscriptions or renewals."}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {[
                          "All features unlocked permanently",
                          "No monthly fees ever",
                          "Best price if you use Pro long-term",
                        ].map((line) => (
                          <li
                            key={line}
                            className="flex items-start gap-2.5 text-sm font-medium text-gray-800"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/80">
                              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                            </span>
                            {line}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 flex flex-col gap-2 sm:mt-6">
                        <Link
                          href={`/api/checkout?products=${lifetimeProductId}&customerEmail=${encodeURIComponent(user!.email ?? "")}`}
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500/80"
                        >
                          Get lifetime access
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showTrialCta && (
                <div
                  className={
                    showBothUpgradeOptions
                      ? "lg:col-span-5 flex min-h-0 flex-col justify-center border-t border-gray-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
                      : "flex"
                  }
                >
                  {showBothUpgradeOptions ? (
                    <div className="flex h-full min-h-0 w-full flex-col justify-between rounded-2xl border border-blue-200/80 bg-linear-to-b from-blue-50/60 to-white p-5 sm:p-6">
                      <div>
                        <span className="inline-flex items-center rounded-full bg-blue-600/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-800">
                          Or try first
                        </span>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                            <Sparkles className="h-5 w-5" aria-hidden />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              Free trial
                            </h3>
                            <p className="text-xs text-gray-500">
                              Full access · No card required
                            </p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-gray-600">
                          Same Pro tools for a limited time. Upgrade to lifetime
                          whenever you’re ready.
                        </p>
                        <ul className="mt-4 space-y-2">
                          {["All tools during trial", "Cancel before it ends"].map(
                            (line) => (
                              <li
                                key={line}
                                className="flex items-center gap-2 text-sm text-gray-700"
                              >
                                <Check className="h-4 w-4 shrink-0 text-blue-600" aria-hidden />
                                {line}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                      <Link
                        href={`/api/checkout?products=${trialProductId}&customerEmail=${user!.email}`}
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                      >
                        Start free trial
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  ) : (
                    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white shadow-xl shadow-blue-900/15">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23fff'/%3E%3C/svg%3E")`,
                        }}
                        aria-hidden
                      />
                      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-violet-500/25 blur-3xl" />

                      <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                        <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                          <div className="min-w-0 space-y-4">
                            <div>
                              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-100 ring-1 ring-white/15">
                                Free trial · No card
                              </span>
                              <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
                                Try every Pro feature free
                              </h3>
                              <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100/90">
                                Same tools as paid plans—asset grabber, color
                                picker, font inspector, and more. Cancel anytime
                                before it ends.
                              </p>
                            </div>
                            <ul className="grid gap-2 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
                              {[
                                "Full extension access",
                                "All inspection tools",
                                "No credit card to start",
                              ].map((line) => (
                                <li
                                  key={line}
                                  className="flex items-center gap-2 text-sm font-medium text-white/95"
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/25 text-emerald-100 ring-1 ring-emerald-300/30">
                                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                                  </span>
                                  {line}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="shrink-0 lg:w-[min(100%,13rem)]">
                          <Link
                            href={`/api/checkout?products=${trialProductId}&customerEmail=${user!.email}`}
                            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            Activate free trial
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                          </Link>
                          <p className="mt-3 text-center text-[11px] text-blue-200/80 lg:text-left">
                            Secure checkout via Polar
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Trial status alerts */}
      {plan === "trial" && !isTrialExpired && trialDaysLeft <= 3 && (
        <div className="flex flex-col gap-4 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-100 p-2 text-amber-700">
              <Clock className="h-5 w-5 shrink-0" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-950">
                Trial ends in {trialDaysLeft} day
                {trialDaysLeft !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Upgrade to keep using InspectMode Pro without interruption.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/billing"
            className="shrink-0 rounded-xl bg-amber-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Upgrade now
          </Link>
        </div>
      )}

      {isTrialExpired && (
        <div className="flex flex-col gap-4 rounded-2xl border border-red-200/80 bg-red-50/90 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-red-100 p-2 text-red-700">
              <Clock className="h-5 w-5 shrink-0" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-red-950">
                Your trial has ended
              </p>
              <p className="text-xs text-red-800/90 mt-0.5">
                Choose a plan to continue using InspectMode Pro.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/billing"
            className="shrink-0 rounded-xl bg-red-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-red-700"
          >
            View plans
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* License */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex items-start gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <ShieldCheck className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  License
                </h2>
                <p className="text-sm text-gray-500">
                  Key and plan tied to your account
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  License key
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <code className="min-h-11 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm text-gray-900">
                    {licenseKey ?? "No active license"}
                  </code>
                  {licenseKey && <CopyButton value={licenseKey} />}
                </div>
                {!licenseKey && needsTrial && (
                  <p className="mt-2 text-xs text-gray-400">
                    Start a trial to generate your license key.
                  </p>
                )}
              </div>

              <dl className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-gray-500">Plan</dt>
                  <dd>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${
                        plan === "lifetime"
                          ? "bg-emerald-100 text-emerald-800"
                          : plan === "subscription"
                            ? "bg-blue-100 text-blue-800"
                            : plan === "trial"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {plan === "free" ? "No plan" : plan}
                      {plan === "trial" &&
                        !isTrialExpired &&
                        ` · ${trialDaysLeft}d left`}
                      {isTrialExpired && " · expired"}
                    </span>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="text-sm font-medium text-gray-900 truncate max-w-[60%] text-right">
                    {user?.email}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-gray-500">Seats</dt>
                  <dd className="text-sm font-medium text-gray-900">1</dd>
                </div>
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="text-sm text-gray-500">Member since</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {memberSince}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900">
              Chrome extension
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Install from the Chrome Web Store, then sign in with your account.
            </p>
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-4 transition hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="rounded-lg bg-amber-100 p-2 text-amber-700 shrink-0">
                  <Download className="h-5 w-5" aria-hidden />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    Install InspectMode Pro
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Chrome Web Store
                  </p>
                </div>
              </div>
              <ExternalLink
                className="h-5 w-5 shrink-0 text-gray-400"
                aria-hidden
              />
            </a>
          </div>
        </div>

        {/* Devices + Chrome install */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ActiveDevices />
        </div>
      </div>
    </div>
  );
}
