import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Gradient background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Chrome Extension for Designers &amp; Developers
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
          Your all-in-one
          <br />
          <span className="text-blue-600">design toolkit</span> for the web
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Inspect elements, extract assets, pick colors, and analyze fonts — all from a
          sleek overlay right inside your browser. No context switching.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all"
          >
            Get started free
          </Link>
          <a
            href="#pricing"
            className="px-6 py-3 rounded-xl bg-white text-gray-700 text-sm font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}
