"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, SquareMousePointer, Star } from "lucide-react";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-web-store";

const X_URL = "https://x.com/inspectmodepro";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="border-t border-zinc-100 bg-white py-12 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="flex flex-col"
        >
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.65fr_0.8fr_1fr] lg:gap-12">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold text-zinc-900"
              >
                <SquareMousePointer className="h-5 w-5 text-blue-600" />
                <span>
                  InspectMode <span className="text-blue-600">Pro</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
                Inspect, understand, and recreate any interface without slowing
                down your workflow.
              </p>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow InspectMode Pro on X"
                className="mt-5 grid size-9 place-items-center rounded-lg border border-zinc-200 text-zinc-600 transition-all hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-900">Product</p>
              <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-zinc-500">
                <Link
                  href="/#features"
                  className="transition-colors hover:text-zinc-900"
                >
                  Features
                </Link>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-zinc-900"
                >
                  Pricing
                </Link>
                <Link
                  href="/#testimonials"
                  className="transition-colors hover:text-zinc-900"
                >
                  Reviews
                </Link>
                <Link
                  href="/#faq"
                  className="transition-colors hover:text-zinc-900"
                >
                  FAQ
                </Link>
              </nav>
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Support &amp; legal
              </p>
              <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-zinc-500">
                <Link
                  href="/contact"
                  className="transition-colors hover:text-zinc-900"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-zinc-900"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-zinc-900"
                >
                  Terms
                </Link>
                <Link
                  href="/refund"
                  className="transition-colors hover:text-zinc-900"
                >
                  Refund Policy
                </Link>
              </nav>
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Loved on Chrome
              </p>
              <a
                href={CHROME_WEB_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 block rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold tracking-tight text-zinc-900">
                    5.0
                  </span>
                  <div>
                    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={13}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-500">
                      Chrome Web Store
                    </p>
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                  Read customer reviews
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-zinc-100 pt-6 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} InspectMode Pro. All rights
              reserved.
            </p>
            <p>Built for designers and developers who move fast.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
