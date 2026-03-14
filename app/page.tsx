import { redirect } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

type SearchParams = Promise<{ code?: string; redirect?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  if (params?.code) {
    const q = new URLSearchParams({ code: params.code });
    if (params.redirect) q.set("redirect", params.redirect);
    redirect(`/auth/callback?${q.toString()}`);
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
