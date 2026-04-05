"use client";

import { motion } from "framer-motion";
import {
  CHROME_LOGO_ICON_URL,
  CHROME_WEB_STORE_URL,
} from "@/lib/chrome-web-store";

const bouncy = { type: "spring", stiffness: 300, damping: 20 };

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-20 md:pt-44 md:pb-18">
      {/* Hero-only spotlight — page background handles grid + base wash */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-radial-[ellipse_95%_70%_at_50%_20%] from-blue-500/6 via-transparent to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...bouncy, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          The new standard for developers &amp; designers
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...bouncy, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.08] text-balance"
        >
          Your all-in-one
          <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            design toolkit
          </span>{" "}
          for the web
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...bouncy, delay: 0.35 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed px-1 sm:px-0"
        >
          Inspect elements, extract assets, pick colors, and analyze fonts — all
          from a sleek overlay right inside your browser. No context switching.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...bouncy, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto sm:mx-0 sm:w-auto"
        >
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
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
            <span className="inline-block ml-0.5 transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-4 text-xs text-gray-400"
        >
          Free 3-day trial &middot; No credit card required
        </motion.p>
      </div>
    </section>
  );
}
