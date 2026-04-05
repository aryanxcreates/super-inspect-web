"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SquareMousePointer } from "lucide-react";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="py-10 sm:py-12 bg-white border-t border-zinc-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <Link
            href="/"
            className="text-lg font-bold text-zinc-900 flex items-center gap-2"
          >
            <SquareMousePointer className="w-5 h-5 text-blue-600" />
            InspectMode <span className="text-blue-600">Pro</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <Link
              href="/privacy"
              className="hover:text-zinc-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-zinc-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/refund"
              className="hover:text-zinc-600 transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/contact"
              className="hover:text-zinc-600 transition-colors"
            >
              Support
            </Link>
          </div>

          <p className="text-xs text-zinc-300">
            &copy; {new Date().getFullYear()} InspectMode Pro. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
