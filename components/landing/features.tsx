"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Download, Palette, Type, Code } from "lucide-react";
import { MEDIA_BASE_URL } from "@/lib/media";

/** Order matches videos: 1 = CSS inspect, 2 = assets, 3 = colors, 4 = fonts */
const features = [
  {
    icon: Code,
    title: "Advanced CSS Inspector",
    description:
      "Hover any element to see CSS properties, spacing, dimensions, and typography in a beautiful HUD overlay. Copy any property instantly.",
    color: "blue",
    videoSrc: `${MEDIA_BASE_URL}/1.mp4`,
  },
  {
    icon: Download,
    title: "One-Click Asset Downloader",
    description:
      "Find every image, SVG, video, and background asset on the page. Preview, copy, and download in one click — no more digging through DevTools.",
    color: "emerald",
    videoSrc: `${MEDIA_BASE_URL}/2.mp4`,
  },
  {
    icon: Palette,
    title: "Precision Color Picker",
    description:
      "Extract every color used on the page. Switch between HEX, RGB, and HSL with a click. Pick any color with the built-in eyedropper.",
    color: "violet",
    videoSrc: `${MEDIA_BASE_URL}/3.mp4`,
  },
  {
    icon: Type,
    title: "Font Analysis",
    description:
      "See all fonts, weights, and sizes used on the page with live previews. Copy font names and full CSS stacks instantly.",
    color: "amber",
    videoSrc: `${MEDIA_BASE_URL}/4.mp4`,
  },
];

const colorMap: Record<string, { bg: string; text: string; gradient: string }> =
  {
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      gradient: "from-emerald-50 to-emerald-100/50",
    },
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
      gradient: "from-violet-50 to-violet-100/50",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
      gradient: "from-amber-50 to-amber-100/50",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      gradient: "from-blue-50 to-blue-100/50",
    },
  };

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
  const colors = colorMap[feature.color];

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
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: 0.1,
      }}
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 sm:gap-10 md:gap-16`}
    >
      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <div
          className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center mb-5 ${colors.bg} ${colors.text}`}
        >
          <feature.icon size={24} />
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight text-balance">
          {feature.title}
        </h3>
        <p className="mt-4 text-zinc-500 leading-relaxed max-w-md">
          {feature.description}
        </p>
      </div>

      {/* Demo video card */}
      <div className="flex-1 w-full">
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`relative rounded-2xl border border-zinc-100 bg-linear-to-br ${colors.gradient} overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300`}
        >
          <div
            ref={videoWrapRef}
            className="aspect-video relative bg-zinc-900/5"
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
    <section id="features" className="py-16 sm:py-24 md:py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 mb-4">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight text-balance px-1">
            Everything you need to
            <br className="hidden sm:block" /> inspect the web
          </h2>
          <p className="mt-5 text-zinc-500 max-w-xl mx-auto text-base sm:text-lg px-1">
            Four powerful tools in one lightweight extension. No clutter, just
            what you need.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
