"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    key: "trial",
    name: "Free Trial",
    price: "$0",
    priceDetail: "3 days, no card required",
    features: [
      "Inspect free forever (always)",
      "AI Element Copy Prompt",
      "Download & copy assets",
      "Colors + eyedropper",
      "Font analysis",
      "No credit card required",
    ],
    cta: "Start free trial",
    highlighted: false,
    href: "/signup",
    icon: Sparkles,
  },
  {
    key: "lifetime",
    name: "Lifetime",
    price: "$29",
    priceDetail: "one-time",
    features: [
      "Everything in trial, forever",
      "AI Element Copy Prompt",
      "Pay once, use forever",
      "All future features included",
      "No recurring charges",
      "Priority support · 3 devices",
    ],
    cta: "Buy lifetime",
    highlighted: true,
    href: "/signup",
    icon: Crown,
  },
];

const bouncy = { type: "spring" as const, stiffness: 200, damping: 25 };

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-16 sm:py-24 md:py-32 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={bouncy}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 mb-4">
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight text-balance px-1">
            Try Pro free. Own it once.
          </h2>
          <p className="mt-5 text-zinc-500 max-w-lg mx-auto text-base sm:text-lg px-1">
            Inspect is free forever. Start a 3-day Pro trial with no card — then
            unlock everything with Lifetime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
  plan: (typeof plans)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ ...bouncy, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
        plan.highlighted
          ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25 ring-2 ring-blue-600 md:scale-[1.02]"
          : "bg-white border border-zinc-200 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-500 text-white text-[11px] font-bold tracking-wide shadow-lg">
          Most Popular
        </div>
      )}

      <div className="flex items-center gap-2 mb-1">
        {plan.icon && (
          <plan.icon
            size={16}
            className={plan.highlighted ? "text-blue-200" : "text-zinc-400"}
          />
        )}
        <h3
          className={`text-sm font-semibold ${
            plan.highlighted ? "text-blue-100" : "text-zinc-500"
          }`}
        >
          {plan.name}
        </h3>
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span
          className={`text-5xl font-bold tracking-tight ${
            plan.highlighted ? "text-white" : "text-zinc-900"
          }`}
        >
          {plan.price}
        </span>
        <span
          className={`text-sm ${
            plan.highlighted ? "text-blue-200" : "text-zinc-400"
          }`}
        >
          {plan.priceDetail}
        </span>
      </div>

      <ul className="mt-7 flex-1 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${
                plan.highlighted ? "text-blue-200" : "text-blue-500"
              }`}
            />
            <span
              className={plan.highlighted ? "text-blue-50" : "text-zinc-600"}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        className={`mt-8 block text-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
          plan.highlighted
            ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg shadow-blue-700/20"
            : "bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-900/20"
        }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}
