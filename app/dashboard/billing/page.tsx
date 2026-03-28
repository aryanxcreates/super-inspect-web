import { createClient } from "@/lib/supabase/server";
import { PLAN_INFO, type Plan } from "@/lib/plans";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CreditCard,
  Crown,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Billing — InspectMode Pro" };

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await prisma.profile.findUnique({
    where: { id: user!.id },
    select: { plan: true, polarCustomerId: true, trialEndsAt: true },
  });

  const currentPlan = (profile?.plan ?? "free") as Plan;
  const hasCustomerId = !!profile?.polarCustomerId;
  const trialEndsAt = profile?.trialEndsAt;
  const isTrialExpired =
    currentPlan === "trial" &&
    trialEndsAt &&
    new Date(trialEndsAt) < new Date();
  const isTrialActive =
    currentPlan === "trial" && trialEndsAt && !isTrialExpired;
  const trialDaysLeft =
    isTrialActive && trialEndsAt
      ? Math.max(
          0,
          Math.ceil(
            (new Date(trialEndsAt).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : null;

  const showTrial = currentPlan === "free";
  const showPlanCards =
    currentPlan === "free" ||
    currentPlan === "trial" ||
    isTrialExpired ||
    currentPlan === "subscription";
  const isSubscription = currentPlan === "subscription";
  const isLifetime = currentPlan === "lifetime";

  const trialProductId = process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page header */}
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Billing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Plan & payments
        </h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500">
          See what you&apos;re on today, manage billing in Polar, or switch to
          lifetime.
        </p>
      </header>

      {/* Current plan */}
      <section aria-label="Current plan">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Current plan
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  {PLAN_INFO[currentPlan].name}
                </p>
                {isTrialExpired && (
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                    Expired
                  </span>
                )}
                {isTrialActive && trialDaysLeft !== null && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                    {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left
                  </span>
                )}
                {isLifetime && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                    Active
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {PLAN_INFO[currentPlan].price}
                </span>{" "}
                {PLAN_INFO[currentPlan].priceDetail}
              </p>
            </div>
            {hasCustomerId && (
              <a
                href="/api/portal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
              >
                Customer portal
                <ArrowRight className="h-4 w-4 text-gray-400" aria-hidden />
              </a>
            )}
          </div>
          {!hasCustomerId && !isLifetime && (
            <p className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500">
              After you subscribe or buy lifetime, you&apos;ll see a link here to
              open Polar&apos;s customer portal (invoices, payment method, cancel
              subscription).
            </p>
          )}
        </div>
      </section>

      {/* Free trial — only when plan is still free */}
      {showTrial && trialProductId && (
        <section aria-label="Free trial">
          <div className="overflow-hidden rounded-2xl border border-blue-500/20 bg-linear-to-br from-blue-600 via-indigo-600 to-indigo-800 p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                  <Sparkles className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    Start with a free trial
                  </h2>
                  <p className="mt-1 max-w-md text-sm text-blue-100/90">
                    Full Pro access for the trial period. No credit card required
                    — upgrade to monthly or lifetime when you&apos;re ready.
                  </p>
                </div>
              </div>
              <Link
                href={`/api/checkout?products=${trialProductId}&customerEmail=${user!.email}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-blue-50 lg:min-w-44"
              >
                Activate trial
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Lifetime — nothing else to buy */}
      {isLifetime && (
        <section
          aria-label="Lifetime access"
          className="rounded-2xl border border-emerald-200/80 bg-linear-to-br from-emerald-50/80 to-white p-8 text-center shadow-sm"
        >
          <div className="mx-auto flex max-w-md flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Crown className="h-7 w-7" aria-hidden />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              You&apos;re on lifetime access
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              No subscription to manage. Your license stays on this account
              forever.
            </p>
            <Link
              href="/dashboard"
              className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Back to dashboard →
            </Link>
          </div>
        </section>
      )}

      {/* Paid options: lifetime (featured) + subscription */}
      {showPlanCards && !isLifetime && (
        <section aria-label="Choose a plan" className="space-y-4">


          <div className="rounded-2xl border border-gray-200/80 bg-linear-to-b from-gray-50/90 to-white p-4 shadow-sm sm:p-6">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-0">
              {(["lifetime", "subscription"] as Plan[]).map((planKey) => {
                const plan = PLAN_INFO[planKey];
                const isSubscriptionPlan = planKey === "subscription";
                const productParam = isSubscriptionPlan
                  ? process.env.NEXT_PUBLIC_POLAR_SUBSCRIPTION_PRODUCT_ID
                  : process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID;
                const showAsCurrent = isSubscriptionPlan && isSubscription;
                const checkoutHref = `/api/checkout?products=${productParam}&customerEmail=${encodeURIComponent(user!.email ?? "")}`;

                let ctaLabel: string;
                let ctaHref: string | null;
                if (showAsCurrent) {
                  ctaLabel = "Current plan";
                  ctaHref = null;
                } else if (isSubscriptionPlan) {
                  ctaLabel = "Subscribe monthly";
                  ctaHref = checkoutHref;
                } else {
                  ctaLabel = isSubscription
                    ? "Upgrade to lifetime"
                    : "Get lifetime access";
                  ctaHref = checkoutHref;
                }

                return (
                  <div
                    key={planKey}
                    className={`flex min-h-0 flex-col lg:min-h-88 ${
                      isSubscriptionPlan
                        ? "lg:col-span-5 border-t border-gray-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
                        : "lg:col-span-7 lg:pr-8"
                    }`}
                  >
                    {isSubscriptionPlan ? (
                      <div className="flex h-full flex-col rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-md sm:p-7">
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                          <CreditCard className="h-5 w-5" aria-hidden />
                        </div>
                        {showAsCurrent && (
                          <span className="mb-2 inline-flex w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-100">
                            Current
                          </span>
                        )}
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                          {plan.name}
                        </h3>
                        <div className="mt-3 flex items-baseline gap-1">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-sm text-blue-200">
                            {plan.priceDetail}
                          </span>
                        </div>
                        <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                          {plan.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2 text-sm text-blue-50"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-blue-200"
                                aria-hidden
                              />
                              {f}
                            </li>
                          ))}
                        </ul>
                        {ctaHref ? (
                          <Link
                            href={ctaHref}
                            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                          >
                            {ctaLabel}
                            <ArrowRight className="h-4 w-4" aria-hidden />
                          </Link>
                        ) : (
                          <div className="mt-8 rounded-xl bg-white/15 py-3 text-center text-sm font-semibold text-blue-100">
                            {ctaLabel}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-amber-400/50 bg-linear-to-br from-amber-50/90 via-white to-amber-50/30 p-6 shadow-md sm:p-7">
                        <span className="absolute right-4 top-4 rounded-full bg-linear-to-r from-amber-500 to-amber-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                          Best value
                        </span>
                        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-amber-200/40 blur-2xl" />
                        <div className="relative flex flex-1 flex-col">
                          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800 ring-1 ring-amber-200/80">
                            <Crown className="h-6 w-6" aria-hidden />
                          </div>
                          <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-amber-900/80">
                            {plan.name}
                          </h3>
                          <div className="mt-2 flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-gray-900">
                              {plan.price}
                            </span>
                            <span className="text-sm text-gray-500">
                              {plan.priceDetail}
                            </span>
                          </div>
                          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                            {plan.features.map((f) => (
                              <li
                                key={f}
                                className="flex items-start gap-2 text-sm text-gray-700"
                              >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                  <Check
                                    className="h-3 w-3"
                                    strokeWidth={3}
                                    aria-hidden
                                  />
                                </span>
                                {f}
                              </li>
                            ))}
                          </ul>
                          {ctaHref ? (
                            <Link
                              href={ctaHref}
                              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                              {ctaLabel}
                              <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
