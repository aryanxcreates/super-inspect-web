"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SquareMousePointer, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
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
    const onScroll = () => setScrolled(window.scrollY > 10);
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/50 backdrop-blur-xl border-b border-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="text-base sm:text-lg font-bold text-zinc-900 flex items-center gap-2 min-w-0 shrink"
          onClick={() => setMenuOpen(false)}
        >
          <div className="bg-blue-600 rounded-lg p-1.5 shrink-0">
            <SquareMousePointer className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="truncate">
            InspectMode <span className="text-blue-600">Pro</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-700 -ml-24">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {!loggedIn && (
            <Link
              href="/login"
              className="hidden sm:inline-flex px-2.5 sm:px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
            >
              Log in
            </Link>
          )}
          <Link
            href={loggedIn ? "/dashboard" : "/signup"}
            className="px-3 sm:px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
            {loggedIn ? "Dashboard" : "Get started"}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
            className="md:hidden fixed inset-0 z-40 top-[6rem] sm:top-[6.5rem] flex flex-col pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pointer-events-auto shrink-0 border-b border-zinc-100 bg-white/95 backdrop-blur-xl shadow-lg shadow-zinc-200/40 max-h-[min(70vh,calc(100dvh-6rem))] overflow-y-auto sm:max-h-[min(70vh,calc(100dvh-6.5rem))]"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="py-3 px-2 rounded-lg text-base font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  href={loggedIn ? "/dashboard" : "/login"}
                  className="py-3 px-2 rounded-lg text-base font-medium text-zinc-600 hover:bg-zinc-50"
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
              className="flex-1 min-h-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
