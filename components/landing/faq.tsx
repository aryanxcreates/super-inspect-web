"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Inspect really free forever?",
    a: "Yes. After you sign in, the CSS Inspect tool stays free with no time limit. AI Prompt, Assets, Colors, and Fonts need a free 3-day trial or a Lifetime purchase.",
  },
  {
    q: "How does the free trial work?",
    a: "Create an account and start a 3-day Pro trial — no credit card required. You get AI Prompt, Assets, Colors, and Fonts for three days. When the trial ends, Inspect stays free; buy Lifetime to keep the Pro tools.",
  },
  {
    q: "What is AI Element Copy Prompt?",
    a: "Hover and click any element, then copy a structured prompt for Cursor, Claude, Gemini, Codex, or any coding agent so you can recreate that UI without digging through DevTools.",
  },
  {
    q: "What's included in Lifetime?",
    a: "A one-time $29 payment unlocks all Pro tools forever — AI Prompt, Assets, Colors, Fonts — plus future features, priority support, and up to 3 device activations. No monthly subscription.",
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

const bouncy = { type: "spring" as const, stiffness: 200, damping: 25 };

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={bouncy}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 mb-4">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight text-balance px-1">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-zinc-500 text-base sm:text-lg px-1">
            Everything you need to know about InspectMode Pro.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...bouncy, delay: index * 0.08 }}
      className="rounded-2xl border border-zinc-100 bg-white overflow-hidden transition-colors hover:border-blue-100"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full gap-3 px-4 sm:px-6 py-4 sm:py-5 text-left min-w-0"
      >
        <span className="text-sm sm:text-base font-semibold text-zinc-900 pr-2 min-w-0 text-balance">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-zinc-400 shrink-0" />
        </motion.div>
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
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm text-zinc-500 leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
