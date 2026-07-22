"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Crown } from "lucide-react";

const sharedFeatures = [
  "Advanced CSS Inspector",
  "AI Element Copy Prompt",
  "One-click asset downloader",
  "Precision color picker + eyedropper",
  "Font analysis & CSS stacks",
  "Works on any website",
];

const plans = [
  {
    key: "lifetime",
    name: "Lifetime",
    price: "$9",
    originalPrice: "$69",
    priceDetail: "one-time · forever",
    note: "Pay once. Own every Pro tool — and everything we ship next.",
    features: sharedFeatures,
    extras: [
      "All future features included",
      "Priority support",
      "Up to 3 devices",
      "No recurring charges",
    ],
    cta: "Get lifetime deal",
    highlighted: true,
    href: "/signup",
    icon: Crown,
  },
  {
    key: "free",
    name: "Free",
    price: "$0",
    originalPrice: null as string | null,
    priceDetail: "3 days · no card required",
    note: "Full Pro access for 3 days, then Inspect stays free forever.",
    features: sharedFeatures,
    extras: ["No credit card required"],
    cta: "Start free",
    highlighted: false,
    href: "/signup",
    icon: Sparkles,
  },
] as const;

const spring = { type: "spring" as const, stiffness: 200, damping: 26 };

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="relative py-12 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/3 h-120 w-180 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-8 text-center sm:mb-10"
        >
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Pricing
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl md:text-5xl">
            Try it free. Own it for $9.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-slate-500 sm:mt-4 sm:text-lg">
            Same Pro toolkit on both plans. Start with 3 free days — or lock in
            the lifetime deal.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 items-stretch gap-5 pt-3 sm:gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <PricingCard key={plan.key} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const allFeatures = [...plan.features, ...plan.extras];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ ...spring, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`relative flex flex-col rounded-[1.75rem] p-6 transition-shadow duration-300 sm:p-8 ${
        plan.highlighted
          ? "bg-slate-950 pt-8 text-white shadow-2xl shadow-blue-600/25 ring-1 ring-white/10 md:-mt-1 md:mb-1 sm:pt-10"
          : "border border-slate-200/80 bg-white/75 shadow-sm backdrop-blur-sm hover:border-blue-200 hover:shadow-md"
      }`}
    >
      {plan.highlighted && (
        <>
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(ellipse 90% 70% at 85% -10%, rgba(37,99,235,0.5), transparent 55%), radial-gradient(ellipse 55% 45% at 0% 100%, rgba(14,165,233,0.22), transparent 50%)",
            }}
          />
          <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center rounded-full bg-blue-500 px-3.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-lg shadow-blue-600/40">
              Lifetime deal
            </span>
          </div>
        </>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-1 flex items-center gap-2">
          <plan.icon
            size={16}
            className={plan.highlighted ? "text-sky-300" : "text-slate-400"}
          />
          <h3
            className={`text-sm font-semibold ${
              plan.highlighted ? "text-sky-200" : "text-slate-500"
            }`}
          >
            {plan.name}
          </h3>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-2.5">
          {plan.originalPrice && (
            <span className="text-2xl font-semibold tabular-nums text-white/35 line-through decoration-2 decoration-white/40">
              {plan.originalPrice}
            </span>
          )}
          <span
            className={`font-display text-5xl font-bold leading-none tracking-tight tabular-nums sm:text-6xl ${
              plan.highlighted ? "text-white" : "text-slate-900"
            }`}
          >
            {plan.price}
          </span>
        </div>
        <p
          className={`mt-2 text-sm ${
            plan.highlighted ? "text-sky-200/90" : "text-slate-400"
          }`}
        >
          {plan.priceDetail}
        </p>
        <p
          className={`mt-3 text-sm leading-relaxed ${
            plan.highlighted ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {plan.note}
        </p>

        <div
          className={`my-6 h-px ${
            plan.highlighted ? "bg-white/10" : "bg-slate-100"
          }`}
        />

        <ul className="flex flex-1 flex-col gap-3">
          {allFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                  plan.highlighted
                    ? "bg-blue-500/20 text-sky-300"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span
                className={plan.highlighted ? "text-slate-200" : "text-slate-600"}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={plan.href}
          className={`mt-8 block rounded-2xl px-5 py-3.5 text-center text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
            plan.highlighted
              ? "bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-400"
              : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/15"
          }`}
        >
          {plan.cta}
        </Link>
      </div>
    </motion.div>
  );
}
