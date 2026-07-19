"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type SyntheticEvent,
} from "react";
import { Dancing_Script } from "next/font/google";
import { motion, useInView } from "framer-motion";
import {
  CHROME_LOGO_ICON_URL,
  CHROME_WEB_STORE_URL,
} from "@/lib/chrome-web-store";
import { VSL_VIDEO_URL } from "@/lib/media";

const designToolkitCursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

const bouncy = { type: "spring", stiffness: 300, damping: 20 };

export function Hero() {
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoInView = useInView(videoWrapRef, { once: false, amount: 0.35 });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (videoInView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [videoInView]);

  const onVslEnded = useCallback((e: SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden pt-36 pb-10 md:pt-44 md:pb-10">
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
          className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-800 tracking-tight leading-[1.08] text-balance"
        >
          Your all-in-one
          <br />
          <span
            className={`${designToolkitCursive.className} text-5xl sm:text-6xl md:text-7xl font-semibold bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent`}
          >
            design toolkit
          </span>{" "}
          for the web
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...bouncy, delay: 0.35 }}
          className="mt-6 text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed px-1 sm:px-0"
        >
          Inspect elements, extract assets, pick colors, and analyze fonts — all
          from a sleek overlay right inside your browser. No context switching.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...bouncy, delay: 0.55 }}
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
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-4 text-xs text-zinc-400"
        >
          Free 3-day trial &middot; No credit card required
        </motion.p>

        {/* VSL */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...bouncy, delay: 0.42 }}
          className="mt-10 sm:mt-12 w-full max-w-4xl mx-auto"
        >
          <div className="rounded-2xl shadow-[0_24px_70px_-18px_rgba(37,99,235,0.28),0_0_0_1px_rgba(15,23,42,0.04)]">
            <div
              ref={videoWrapRef}
              className="overflow-hidden rounded-[calc(1rem-3px)] shadow-inner aspect-video relative"
            >
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={VSL_VIDEO_URL}
                muted
                playsInline
                preload="metadata"
                aria-label="Super Inspect product overview video"
                onEnded={onVslEnded}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
