"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Download, Palette, Type, Code, Sparkles } from "lucide-react";
import { MEDIA_BASE_URL } from "@/lib/media";

const features = [
  {
    icon: Sparkles,
    title: "AI Element Copy Prompt",
    description:
      "Select any element and copy a ready-made prompt for Cursor, Claude, Gemini, Codex, or any coding agent — recreate UI without fighting DevTools.",
    videoSrc: `${MEDIA_BASE_URL}/5.mp4`,
    badge: "Pro" as const,
  },
  {
    icon: Code,
    title: "Advanced CSS Inspector",
    description:
      "Hover any element to see CSS properties, spacing, dimensions, and typography in a beautiful HUD overlay. Free forever for every account.",
    videoSrc: `${MEDIA_BASE_URL}/1.mp4`,
    badge: "Free" as const,
  },
  {
    icon: Download,
    title: "One-Click Asset Downloader",
    description:
      "Find every image, SVG, video, and background asset on the page. Preview, copy, and download in one click — no more digging through DevTools.",
    videoSrc: `${MEDIA_BASE_URL}/2.mp4`,
    badge: "Pro" as const,
  },
  {
    icon: Palette,
    title: "Precision Color Picker",
    description:
      "Extract every color used on the page. Switch between HEX, RGB, and HSL with a click. Pick any color with the built-in eyedropper.",
    videoSrc: `${MEDIA_BASE_URL}/3.mp4`,
    badge: "Pro" as const,
  },
  {
    icon: Type,
    title: "Font Analysis",
    description:
      "See all fonts, weights, and sizes used on the page with live previews. Copy font names and full CSS stacks instantly.",
    videoSrc: `${MEDIA_BASE_URL}/4.mp4`,
    badge: "Pro" as const,
  },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 26 };

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const videoInView = useInView(videoWrapRef, { once: false, amount: 0.35 });
  const isReversed = index % 2 !== 0;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (videoInView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [videoInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: 0.05 }}
      className={`flex flex-col items-center gap-6 sm:gap-8 md:gap-12 ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex-1 text-center md:text-left">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          <span className="grid size-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/25">
            <feature.icon size={20} />
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              feature.badge === "Free"
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
            }`}
          >
            {feature.badge}
          </span>
          <span className="font-display text-xs font-semibold tabular-nums text-slate-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 text-balance sm:text-3xl">
          {feature.title}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-500 md:mx-0">
          {feature.description}
        </p>
      </div>

      <div className="w-full flex-1">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="relative overflow-hidden rounded-2xl bg-slate-900/5 shadow-[0_20px_60px_-28px_rgba(37,99,235,0.35)] ring-1 ring-slate-200/80"
        >
          <div
            ref={videoWrapRef}
            className="relative aspect-16/9.5 bg-slate-100"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={feature.videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={feature.title}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="features" className="relative py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-16"
        >
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Features
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl md:text-5xl">
            Five tools. One overlay.
          </h2>
          <p className="mt-3 text-base text-slate-500 sm:mt-4 sm:text-lg">
            CSS Inspect stays free forever. Unlock AI Prompt, Assets, Colors,
            and Fonts with Free or Lifetime.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 sm:gap-14 md:gap-16">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
