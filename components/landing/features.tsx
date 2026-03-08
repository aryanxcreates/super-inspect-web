import { Crosshair, Image, Palette, Type } from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "Inspect Elements",
    description: "Hover any element to see CSS properties, spacing, dimensions, and typography in a beautiful HUD overlay.",
  },
  {
    icon: Image,
    title: "Extract Assets",
    description: "Find every image, SVG, video, and background asset on the page. Preview, copy, and download in one click.",
  },
  {
    icon: Palette,
    title: "Color Palette",
    description: "Extract every color used on the page. Switch between HEX, RGB, and HSL. Pick any color with the eyedropper.",
  },
  {
    icon: Type,
    title: "Font Analyzer",
    description: "See all fonts, weights, and sizes used on the page with live previews. Copy font names instantly.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Everything you need to inspect the web
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Four powerful tools in one lightweight extension. No clutter, just what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
