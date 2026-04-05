"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Crown } from "lucide-react";

const plans = [
  {
    key: "trial",
    name: "Free Trial",
    price: "$0",
    priceDetail: "7 days, no card required",
    features: [
      "All inspection tools",
      "Copy CSS properties",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
    ],
    cta: "Start free trial",
    highlighted: false,
    href: "/signup",
    icon: null,
    urgency: null,
  },
  {
    key: "subscription",
    name: "Pro Monthly",
    price: "$9",
    priceDetail: "/month",
    features: [
      "All inspection tools",
      "Copy CSS properties",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
    ],
    cta: "Subscribe now",
    highlighted: true,
    href: "/signup?plan=subscription",
    icon: Zap,
    urgency: "Only 14 licenses remaining",
  },
  {
    key: "lifetime",
    name: "Lifetime",
    price: "$29",
    priceDetail: "one-time",
    features: [
      "All inspection tools",
      "Pay once, use forever",
      "All future features included",
      "No recurring charges",
      "Priority support",
    ],
    cta: "Buy lifetime",
    highlighted: false,
    href: "/signup?plan=lifetime",
    icon: Crown,
    urgency: "87% Sold Out",
  },
];

const bouncy = { type: "spring" as const, stiffness: 200, damping: 25 };

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-16 sm:py-24 md:py-32 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance px-1">
            Simple, transparent pricing
          </h2>
          <p className="mt-5 text-gray-500 max-w-lg mx-auto text-base sm:text-lg px-1">
            Start with a free 3-day trial. Upgrade when you&apos;re ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
          : "bg-white border border-gray-200 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-500 text-white text-[11px] font-bold tracking-wide shadow-lg">
          Most Popular
        </div>
      )}

      {plan.urgency && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ ...bouncy, delay: index * 0.12 + 0.3 }}
          className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide mb-4 ${
            plan.highlighted
              ? "bg-white/20 text-white"
              : "bg-red-50 text-red-600 border border-red-100"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {plan.urgency}
        </motion.div>
      )}

      <div className="flex items-center gap-2 mb-1">
        {plan.icon && (
          <plan.icon
            size={16}
            className={plan.highlighted ? "text-blue-200" : "text-gray-400"}
          />
        )}
        <h3
          className={`text-sm font-semibold ${
            plan.highlighted ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {plan.name}
        </h3>
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span
          className={`text-5xl font-bold tracking-tight ${
            plan.highlighted ? "text-white" : "text-gray-900"
          }`}
        >
          {plan.price}
        </span>
        <span
          className={`text-sm ${
            plan.highlighted ? "text-blue-200" : "text-gray-400"
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
              className={plan.highlighted ? "text-blue-50" : "text-gray-600"}
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
            : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20"
        }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}
