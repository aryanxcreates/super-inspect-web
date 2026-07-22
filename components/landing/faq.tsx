"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is Inspect really free forever?",
    a: "Yes. After you sign in, the CSS Inspect tool stays free with no time limit. AI Prompt, Assets, Colors, and Fonts need Free (3 days) or a Lifetime purchase.",
  },
  {
    q: "How does Free work?",
    a: "Create an account and start free — no credit card required. You get full Pro access (AI Prompt, Assets, Colors, and Fonts) for three days. When that ends, Inspect stays free; buy Lifetime to keep the Pro tools.",
  },
  {
    q: "What is AI Element Copy Prompt?",
    a: "Hover and click any element, then copy a structured prompt for Cursor, Claude, Gemini, Codex, or any coding agent so you can recreate that UI without digging through DevTools.",
  },
  {
    q: "What's included in Lifetime?",
    a: "A one-time $9 payment unlocks all Pro tools forever — AI Prompt, Assets, Colors, Fonts — plus future features, priority support, and up to 3 device activations. No monthly subscription.",
  },
  {
    q: "Can I use this on any website?",
    a: "Yes. InspectMode Pro works on any site you visit in Chrome. It overlays a non-intrusive UI so you can inspect, copy prompts, grab colors, analyze fonts, and download assets.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. InspectMode Pro runs in your browser. We don't collect or transmit data from the websites you inspect. Your browsing activity stays private.",
  },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 26 };

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-8 text-center sm:mb-10"
        >
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl md:text-5xl">
            Questions, answered
          </h2>
          <p className="mt-3 text-base text-slate-500 sm:mt-4 sm:text-lg">
            Everything you need to know about InspectMode Pro.
          </p>
        </motion.div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.05 }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full min-w-0 items-center justify-between gap-4 py-4 text-left sm:py-5"
        aria-expanded={open}
      >
        <span className="min-w-0 pr-2 text-sm font-semibold text-slate-900 text-balance sm:text-base">
          {faq.q}
        </span>
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full border transition-colors ${
            open
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-200 bg-white text-slate-500"
          }`}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="grid place-items-center"
          >
            <Plus size={16} />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-slate-500 sm:pb-6">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
