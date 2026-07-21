"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-web-store";

const testimonials = [
  {
    quote:
      "Inspect Mode Pro is fast, precise, and incredibly useful for grabbing assets, colors, fonts, and CSS details in seconds.",
    name: "qfeng lu",
    meta: "Web developer",
    initials: "QL",
    tone: "blue",
  },
  {
    quote:
      "Copying an element as an AI prompt is surprisingly useful. It gives Cursor enough context that I’m not explaining the whole layout from scratch.",
    name: "Emily Carter",
    meta: "Design engineer",
    initials: "EC",
    tone: "violet",
  },
  {
    quote:
      "Loved it bro, its lightweight and too clean UI......its really good for extracting assets and finding fonts",
    name: "Vaishnav Raj",
    meta: "UI designer",
    initials: "VR",
    tone: "emerald",
  },
  {
    quote:
      "As a frontend developer this tool helps a lot. we don't have to open developer tools element section to check all element css properties.",
    name: "Satyabrata",
    meta: "Frontend developer",
    initials: "SA",
    tone: "amber",
  },
  {
    quote:
      "The AI prompt saves me a lot of back and forth. I select the section, paste it into Cursor, and already have a solid starting point.",
    name: "James Wilson",
    meta: "Frontend engineer",
    initials: "JW",
    tone: "indigo",
  },
  {
    quote:
      "Being able to see the exact colors and typography without digging through computed styles makes design research much faster.",
    name: "Olivia Parker",
    meta: "Product designer",
    initials: "OP",
    tone: "orange",
  },
  {
    quote:
      "The asset downloader is genuinely handy. Images, icons, and backgrounds are all in one place instead of scattered through the page source.",
    name: "Ethan Miller",
    meta: "Web developer",
    initials: "EM",
    tone: "fuchsia",
  },
  {
    quote:
      "I use it whenever I’m rebuilding a section from a reference site. The spacing and CSS are right there, so I can move on without opening five DevTools panels.",
    name: "Lucas Bennett",
    meta: "Freelance developer",
    initials: "LB",
    tone: "rose",
  },
  {
    quote:
      "Font detection just works. I found the family, weight, and size I needed in a few seconds and went straight back to my design.",
    name: "Chloe Martin",
    meta: "UI/UX designer",
    initials: "CM",
    tone: "cyan",
  },
];

const avatarTones: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  violet: "bg-violet-100 text-violet-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  cyan: "bg-cyan-100 text-cyan-700",
  indigo: "bg-indigo-100 text-indigo-700",
  orange: "bg-orange-100 text-orange-700",
  fuchsia: "bg-fuchsia-100 text-fuchsia-700",
};

const bouncy = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
};

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 md:py-32 bg-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={bouncy}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100 mb-4">
            User feedback
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight text-balance px-1">
            Less time inspecting.
            <br className="hidden sm:block" /> More time making.
          </h2>
          <p className="mt-5 text-zinc-500 max-w-xl mx-auto text-base sm:text-lg px-1">
            From AI-ready element prompts to everyday CSS inspection.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white/75 p-3 shadow-[0_24px_80px_-40px_rgba(37,99,235,0.25)] backdrop-blur-sm sm:p-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...bouncy, delay: 0.1 }}
            className="mb-3 flex flex-col gap-4 rounded-2xl bg-zinc-950 px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div className="flex items-center gap-4">
              <p className="text-3xl font-semibold tracking-tight">5.0</p>
              <div>
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={15}
                      className="fill-amber-300 text-amber-300"
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  Chrome Web Store rating
                </p>
              </div>
            </div>

            <a
              href={CHROME_WEB_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-blue-300"
            >
              Read all reviews
              <ArrowUpRight size={15} />
            </a>
          </motion.div>

          <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
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
      whileHover={{ y: -3 }}
      className="group relative w-full rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-5 transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-100/40"
    >
      <Quote
        size={24}
        strokeWidth={1.5}
        className="mb-4 fill-blue-100 text-blue-500"
        aria-hidden
      />

      <p className="text-sm leading-relaxed text-zinc-700">{testimonial.quote}</p>

      <div className="mt-5 flex items-center gap-3 border-t border-zinc-200/70 pt-4">
        <div
          className={`grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-bold ${avatarTones[testimonial.tone]}`}
          aria-hidden
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {testimonial.name}
          </p>
          <p className="text-xs text-zinc-500">{testimonial.meta}</p>
        </div>
      </div>
    </motion.div>
  );
}
