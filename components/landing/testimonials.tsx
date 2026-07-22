"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-web-store";

const testimonials = [
  {
    quote:
      "Inspect Mode Pro is fast, precise, and incredibly useful for grabbing assets, colors, fonts, and CSS details in seconds.",
    name: "qfeng lu",
    meta: "Web developer",
    initials: "QL",
  },
  {
    quote:
      "Copying an element as an AI prompt is surprisingly useful. It gives Cursor enough context that I’m not explaining the whole layout from scratch.",
    name: "Emily Carter",
    meta: "Design engineer",
    initials: "EC",
  },
  {
    quote:
      "Loved it bro, its lightweight and too clean UI......its really good for extracting assets and finding fonts",
    name: "Vaishnav Raj",
    meta: "UI designer",
    initials: "VR",
  },
  {
    quote:
      "As a frontend developer this tool helps a lot. we don't have to open developer tools element section to check all element css properties.",
    name: "Satyabrata",
    meta: "Frontend developer",
    initials: "SA",
  },
  {
    quote:
      "The AI prompt saves me a lot of back and forth. I select the section, paste it into Cursor, and already have a solid starting point.",
    name: "James Wilson",
    meta: "Frontend engineer",
    initials: "JW",
  },
  {
    quote:
      "Being able to see the exact colors and typography without digging through computed styles makes design research much faster.",
    name: "Olivia Parker",
    meta: "Product designer",
    initials: "OP",
  },
];

const spring = { type: "spring" as const, stiffness: 200, damping: 26 };

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="relative py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={spring}
          className="mb-8 flex flex-col gap-5 sm:mb-10 sm:gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Reviews
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 text-balance sm:text-4xl md:text-5xl">
              Less inspecting.
              <br className="hidden sm:block" />
              More making.
            </h2>
          </div>

          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 self-start rounded-2xl bg-slate-950 px-5 py-4 text-white transition-transform hover:-translate-y-0.5 md:self-auto"
          >
            <div>
              <p className="font-display text-3xl font-bold tracking-tight">
                5.0
              </p>
              <div className="mt-1 flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="fill-amber-300 text-amber-300"
                  />
                ))}
              </div>
            </div>
            <div className="border-l border-white/15 pl-4">
              <p className="text-sm font-medium">Chrome Web Store</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-400 transition-colors group-hover:text-sky-300">
                Read all reviews
                <ArrowUpRight size={12} />
              </p>
            </div>
          </a>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
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
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.06 }}
      className="mb-4 break-inside-avoid rounded-2xl border border-slate-200/80 bg-white/70 p-5 backdrop-blur-sm transition-colors hover:border-blue-200 hover:bg-white"
    >
      <blockquote className="text-sm leading-relaxed text-slate-700">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-[11px] font-bold text-blue-700"
          aria-hidden
        >
          {testimonial.initials}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {testimonial.name}
          </p>
          <p className="text-xs text-slate-500">{testimonial.meta}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}
