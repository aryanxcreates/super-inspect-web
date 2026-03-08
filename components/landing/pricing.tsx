import Link from "next/link";
import { Check } from "lucide-react";
import { PLAN_INFO, type Plan } from "@/lib/plans";

const planOrder: Plan[] = ["free", "pro", "lifetime"];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Start free. Upgrade when you need the full power. Pay once for
            lifetime access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {planOrder.map((planKey) => {
            const plan = PLAN_INFO[planKey];
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={planKey}
                className={`relative flex flex-col rounded-2xl p-6 ${
                  isHighlighted
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25 ring-2 ring-blue-600"
                    : "bg-white border border-gray-200"
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-500 text-white text-[11px] font-semibold">
                    Most Popular
                  </div>
                )}

                <h3
                  className={`text-sm font-semibold ${isHighlighted ? "text-blue-100" : "text-gray-500"}`}
                >
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${isHighlighted ? "text-white" : "text-gray-900"}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${isHighlighted ? "text-blue-200" : "text-zinc-500"}`}
                  >
                    {plan.priceDetail}
                  </span>
                </div>

                <ul className="mt-6 flex-1 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${isHighlighted ? "text-blue-200" : "text-blue-500"}`}
                      />
                      <span
                        className={
                          isHighlighted ? "text-blue-50" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={
                    planKey === "free" ? "/signup" : "/signup?plan=" + planKey
                  }
                  className={`mt-8 block text-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isHighlighted
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {planKey === "free"
                    ? "Get started"
                    : planKey === "pro"
                      ? "Subscribe"
                      : "Buy lifetime"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
