"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CHROME_LOGO_ICON_URL,
  CHROME_WEB_STORE_URL,
} from "@/lib/chrome-web-store";

const bouncy = { type: "spring" as const, stiffness: 200, damping: 25 };

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-indigo-500/8" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={bouncy}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight text-balance">
            Copy the element. Prompt your agent.
          </h2>
          <p className="mt-5 text-zinc-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Install InspectMode Pro — Inspect stays free forever. Start a 3-day
            Pro trial for AI Prompt and the rest, or buy Lifetime once.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <img
                src={CHROME_LOGO_ICON_URL}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 shrink-0 drop-shadow-sm"
                decoding="async"
              />
              Install Chrome Extension
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-zinc-200 bg-white text-zinc-800 text-sm font-semibold shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 hover:-translate-y-0.5"
            >
              Start free trial
            </Link>
          </div>

          <p className="mt-5 text-xs text-zinc-400">
            No credit card for trial &middot; Lifetime $29 one-time
          </p>
        </motion.div>
      </div>
    </section>
  );
}
