/**
 * Full-page ambient background for the marketing home.
 * Cool slate wash + soft blue depth — no flat white slab.
 */
export function LandingBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#f4f7fb]" />
      <div className="absolute inset-0 bg-linear-to-b from-blue-50/80 via-transparent to-slate-100/40" />

      {/* Fine technical grid */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 0%, black 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
        }}
      />

      {/* Horizon glow */}
      <div className="absolute inset-x-0 top-0 h-[min(70vh,640px)] bg-linear-to-b from-sky-200/30 via-blue-100/15 to-transparent" />

      {/* Soft depth orbs */}
      <div className="absolute -top-24 left-1/2 h-[560px] w-[min(120vw,1100px)] -translate-x-1/2 rounded-[100%] bg-linear-to-br from-blue-400/20 via-sky-300/12 to-transparent blur-3xl" />
      <div
        className="absolute top-[22%] right-[-10%] h-[420px] w-[420px] rounded-full bg-sky-400/12 blur-[110px] animate-pulse-soft"
        style={{ animationDelay: "0.6s" }}
      />
      <div
        className="absolute top-[48%] left-[-14%] h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-soft"
        style={{ animationDelay: "1.9s" }}
      />
      <div className="absolute bottom-[8%] left-1/2 h-[300px] w-[min(90vw,760px)] -translate-x-1/2 rounded-[100%] bg-blue-300/10 blur-3xl" />
    </div>
  );
}
