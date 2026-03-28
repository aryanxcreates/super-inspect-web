import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

type SearchParams = Promise<{ code?: string; redirect?: string }>;

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
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar initialLoggedIn={!!user} />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
