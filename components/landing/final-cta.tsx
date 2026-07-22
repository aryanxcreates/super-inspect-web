"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CHROME_LOGO_ICON_URL,
  CHROME_WEB_STORE_URL,
} from "@/lib/chrome-web-store";

const spring = { type: "spring" as const, stiffness: 200, damping: 26 };

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 text-center sm:px-10 sm:py-12 md:py-14">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(14,165,233,0.2), transparent 50%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent)",
          }}
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="relative z-10"
        >
          <p className="font-display text-lg font-semibold text-sky-300 sm:text-xl">
            InspectMode <span className="text-white">Pro</span>
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            Ship faster with the UI in front of you.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            Install free. Try Pro for 3 days. Or own Lifetime for $9.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-400"
            >
              <img
                src={CHROME_LOGO_ICON_URL}
                alt=""
                width={20}
                height={20}
                className="size-5 shrink-0 drop-shadow-sm"
                decoding="async"
              />
              Install Chrome Extension
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Start free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
