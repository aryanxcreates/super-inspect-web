"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Gift } from "lucide-react";

const PROMO_CODE = "GETFREE";

export function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden bg-linear-to-r from-blue-700 via-blue-600 to-indigo-600 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 120% at 10% 50%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(ellipse 60% 100% at 90% 50%, rgba(255,255,255,0.18), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-2.5 sm:px-6 sm:py-3">
        <span className="inline-flex items-center gap-2 text-[13px] sm:text-sm font-medium tracking-tight">
          <Gift className="size-3.5 shrink-0 opacity-90" aria-hidden />
          <span>
            Lifetime access — free for a limited time
          </span>
        </span>

        <span className="hidden h-3.5 w-px bg-white/30 sm:block" aria-hidden />

        <button
          type="button"
          onClick={copyCode}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/25 bg-white/15 px-2.5 py-1 text-[13px] sm:text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label={copied ? "Code copied" : `Copy code ${PROMO_CODE}`}
        >
          <span className="text-white/75 font-normal">Code</span>
          <span className="font-semibold tracking-[0.12em]">{PROMO_CODE}</span>
          {copied ? (
            <Check className="size-3.5 text-emerald-200" aria-hidden />
          ) : (
            <Copy className="size-3.5 opacity-80 group-hover:opacity-100" aria-hidden />
          )}
        </button>
      </div>
    </motion.div>
  );
}
