import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CHROME_WEB_STORE_URL } from "@/lib/chrome-web-store";
import { getSiteUrl } from "@/lib/site-url";
import { LandingBackground } from "@/components/landing/landing-background";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

type SearchParams = Promise<{ code?: string; redirect?: string }>;

const homeDescription =
  "Copy AI element prompts for Cursor and Claude, inspect CSS for free, and unlock assets, colors, and fonts. The all-in-one Chrome extension for designers and developers.";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "InspectMode Pro",
  description: homeDescription,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Chrome",
  url: getSiteUrl(),
  sameAs: [CHROME_WEB_STORE_URL],
};

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  if (params?.code) {
    const q = new URLSearchParams({ code: params.code });
    if (params.redirect) q.set("redirect", params.redirect);
    redirect(`/auth/callback?${q.toString()}`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <LandingBackground />
      <div className="relative z-10">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar initialLoggedIn={!!user} />
        </div>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
