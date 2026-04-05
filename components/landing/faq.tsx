"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the free trial work?",
    a: "You get full access to all InspectMode Pro features for 3 days — no credit card required. Just install the Chrome extension, create an account, and start inspecting. When your trial ends, you can upgrade to a paid plan to continue.",
  },
  {
    q: "Can I use this on any website?",
    a: "Yes! InspectMode Pro works on any website you visit in Chrome. It overlays a non-intrusive UI on top of the page, letting you inspect elements, grab colors, analyze fonts, and download assets from any site.",
  },
  {
    q: "What's included in the Lifetime plan?",
    a: "The Lifetime plan is a one-time $29 payment that gives you permanent access to all current and future features. No recurring charges, no subscription fatigue. You also get priority support and up to 3 device activations.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. InspectMode Pro runs entirely in your browser. We don't collect, store, or transmit any data from the websites you inspect. Your browsing activity stays private.",
  },
  {
    q: "Do I need to know CSS to use this?",
    a: "Not at all! InspectMode Pro is designed for both designers and developers. The interface is clean and intuitive — just hover over elements and the extension shows you everything in plain language. You can copy any value with one click.",
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
