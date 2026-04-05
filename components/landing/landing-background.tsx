/**
 * Full-page ambient background: light grid + soft blue shadows for the marketing home.
 */
export function LandingBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-hidden"
      aria-hidden
    >
      {/* Base wash — cool white, barely blue (continuous down the page) */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-50/90 via-white to-slate-50/50" />

      {/* Primary grid — long vertical fade avoids a visible horizontal “cut” */}
      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.14) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.18) 72%, transparent 92%)",
        }}
      />

      {/* Accent grid — matches fade; wide ellipse only softens left/right edges */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(59 130 246 / 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(99 102 241 / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "20px 20px",
          maskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.78) 24%, rgba(0,0,0,0.32) 52%, rgba(0,0,0,0.08) 78%, transparent 96%)",
        }}
      />

      {/* Top highlight — soft blue “sky” */}
      <div className="absolute inset-x-0 top-0 h-[min(55vh,520px)] bg-linear-to-b from-blue-100/35 via-indigo-50/15 to-transparent" />

      {/* Soft shadow orbs */}
      <div className="absolute -top-32 left-1/2 h-[520px] w-[min(110vw,980px)] -translate-x-1/2 rounded-[100%] bg-linear-to-br from-blue-400/25 via-sky-200/20 to-transparent blur-3xl" />
      <div
        className="absolute top-[18%] right-[-8%] h-[380px] w-[380px] rounded-full bg-indigo-400/12 blur-[100px] animate-pulse-soft"
        style={{ animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-[42%] left-[-12%] h-[320px] w-[320px] rounded-full bg-sky-300/14 blur-[90px] animate-pulse-soft"
        style={{ animationDelay: "1.8s" }}
      />
      <div className="absolute bottom-0 left-1/2 h-[280px] w-[min(90vw,720px)] -translate-x-1/2 translate-y-1/3 rounded-[100%] bg-linear-to-t from-blue-200/18 via-indigo-100/8 to-transparent blur-3xl" />
    </div>
  );
}
