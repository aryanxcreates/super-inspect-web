import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const siteUrl = getSiteUrl();
const titleDefault = "InspectMode Pro — Your Design Toolkit for the Web";
const description =
  "Inspect elements, extract assets, pick colors, and analyze fonts. The all-in-one Chrome extension for designers and developers.";

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: titleDefault,
  description,
  applicationName: "InspectMode Pro",
  keywords: [
    "Chrome extension",
    "web design",
    "inspect element",
    "color picker",
    "font inspector",
    "CSS",
    "design tools",
    "developers",
    "UI",
  ],
  authors: [{ name: "InspectMode Pro", url: siteUrl }],
  creator: "InspectMode Pro",
  publisher: "InspectMode Pro",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "InspectMode Pro",
    title: titleDefault,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: siteUrl },
  category: "design tools",
  ...(googleSiteVerification
    ? { other: { "google-site-verification": googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
