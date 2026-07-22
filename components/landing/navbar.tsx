"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SquareMousePointer, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

interface NavbarProps {
  initialLoggedIn?: boolean;
}

export function Navbar({ initialLoggedIn = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session?.user);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-slate-200/70 bg-white/70 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.18)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2.5 text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-600 shadow-sm shadow-blue-600/30 sm:size-9">
            <SquareMousePointer className="size-4 text-white sm:size-5" />
          </span>
          <span className="font-display truncate">
            InspectMode <span className="text-blue-600">Pro</span>
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 rounded-full border border-slate-200/80 bg-white/60 p-1 text-sm text-slate-600 shadow-sm backdrop-blur-md md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 transition-colors hover:bg-slate-900 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {!loggedIn && (
            <Link
              href="/login"
              className="hidden px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:inline-flex"
            >
              Log in
            </Link>
          )}
          <Link
            href={loggedIn ? "/dashboard" : "/signup"}
            className="whitespace-nowrap rounded-xl bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 sm:px-4"
            onClick={() => setMenuOpen(false)}
          >
            {loggedIn ? "Dashboard" : "Get started"}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 top-14 z-40 flex flex-col sm:top-16 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto max-h-[min(70vh,calc(100dvh-3.5rem))] shrink-0 overflow-y-auto border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-xl"
            >
              <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  href={loggedIn ? "/dashboard" : "/login"}
                  className="rounded-xl px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {loggedIn ? "Dashboard" : "Log in"}
                </Link>
              </div>
            </motion.div>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-0 flex-1 pointer-events-auto bg-slate-950/25 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
