"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "This replaced three separate extensions for me. The color picker alone is worth it — being able to grab any color in HEX, RGB, or HSL instantly is a game-changer.",
    name: "Sarah Chen",
    role: "Senior Product Designer",
    company: "Figma",
    avatar: "SC",
  },
  {
    quote:
      "I use InspectMode Pro every single day. The CSS inspector is incredibly fast, and being able to copy properties with one click saves me hours each week.",
    name: "Marcus Johnson",
    role: "Frontend Engineer",
    company: "Vercel",
    avatar: "MJ",
  },
  {
    quote:
      "The font analyzer is brilliant. I can instantly see every typeface on a page with live previews. No more right-clicking and scrolling through computed styles.",
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    company: "Linear",
    avatar: "ER",
  },
];

const bouncy = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
};

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={bouncy}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 tracking-tight text-balance px-1">
            Loved by designers &amp; developers
          </h2>
          <p className="mt-5 text-gray-500 max-w-lg mx-auto text-base sm:text-lg px-1">
            Join thousands of professionals who ship faster with InspectMode Pro.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        ...bouncy,
        delay: index * 0.12,
      }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:shadow-lg hover:shadow-blue-50"
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star
            key={j}
            size={16}
            className="fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3 pt-5 border-t border-gray-50">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-400">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
