import { createClient } from "@/lib/supabase/server";
import { PLAN_INFO, type Plan } from "@/lib/plans";
import Link from "next/link";
import { Check } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Billing — InspectMode Pro" };

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const profile = await prisma.profile.findUnique({
    where: { id: user!.id },
    select: { plan: true, polarCustomerId: true },
  });

  const currentPlan = (profile?.plan ?? "free") as Plan;
  const hasCustomerId = !!profile?.polarCustomerId;
  const showUpgrade = currentPlan === "free" || currentPlan === "trial";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your subscription and plan</p>

      {/* Current plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current plan</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{PLAN_INFO[currentPlan].name}</p>
            <p className="text-sm text-gray-400 mt-0.5">
              {PLAN_INFO[currentPlan].price} {PLAN_INFO[currentPlan].priceDetail}
            </p>
          </div>
          {hasCustomerId && (
            <Link
              href="/api/portal"
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Manage subscription
            </Link>
          )}
        </div>
      </div>

      {/* Plan comparison */}
      {showUpgrade && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(["pro", "lifetime"] as Plan[]).map((planKey) => {
            const plan = PLAN_INFO[planKey];
            const isPro = planKey === "pro";
            const productParam = isPro
              ? process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID
              : process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID;

            return (
              <div
                key={planKey}
                className={`rounded-xl p-6 ${
                  isPro
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                <h3 className={`text-sm font-semibold ${isPro ? "text-blue-200" : "text-gray-500"}`}>
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${isPro ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${isPro ? "text-blue-200" : "text-gray-400"}`}>
                    {plan.priceDetail}
                  </span>
                </div>
                <ul className="mt-4 flex flex-col gap-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={14} className={isPro ? "text-blue-200" : "text-blue-500"} />
                      <span className={isPro ? "text-blue-50" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/api/checkout?products=${productParam}&customerEmail=${user!.email}`}
                  className={`mt-6 block text-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isPro
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {isPro ? "Subscribe to Pro" : "Get Lifetime Access"}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
