"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crosshair, Palette, Type, Image } from "lucide-react";

const bouncy = { type: "spring", stiffness: 300, damping: 20 };

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-32">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-linear-to-br from-blue-100/60 via-white to-blue-50/40 rounded-full blur-[100px] animate-pulse-soft" />
        <div
          className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-[80px] animate-pulse-soft"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute -top-10 left-1/4 w-[300px] h-[300px] bg-indigo-100/30 rounded-full blur-[60px] animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        />
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
          <Link
            href="/signup"
            className="group w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            Get started free
            <span className="inline-block ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
          <a
            href="#pricing"
            className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-white text-gray-700 text-sm font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5"
          >
            View pricing
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

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            delay: 0.6,
          }}
          className="mt-12 sm:mt-16 max-w-4xl mx-auto w-full min-w-0"
        >
          <div className="animate-float">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-b border-gray-100 min-w-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2 sm:mx-4 min-w-0">
                  <div className="bg-white rounded-lg border border-gray-200 px-2 sm:px-4 py-1.5 text-[10px] sm:text-xs text-gray-400 text-center truncate">
                    inspectmode.pro
                  </div>
                </div>
              </div>
              {/* Extension UI mockup */}
              <div className="p-4 sm:p-6 md:p-8 bg-linear-to-b from-gray-50 to-white">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  {[
                    { icon: Crosshair, label: "Inspect", color: "blue" },
                    { icon: Image, label: "Assets", color: "emerald" },
                    { icon: Palette, label: "Colors", color: "violet" },
                    { icon: Type, label: "Fonts", color: "amber" },
                  ].map((tool, i) => (
                    <motion.div
                      key={tool.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...bouncy, delay: 0.9 + i * 0.1 }}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 min-w-0"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tool.color === "blue"
                            ? "bg-blue-100 text-blue-600"
                            : tool.color === "emerald"
                              ? "bg-emerald-100 text-emerald-600"
                              : tool.color === "violet"
                                ? "bg-violet-100 text-violet-600"
                                : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        <tool.icon size={20} />
                      </div>
                      <span className="text-xs font-medium text-gray-700">
                        {tool.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
