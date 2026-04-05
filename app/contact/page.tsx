import Link from "next/link";

export const metadata = {
  title: "Contact Us — InspectMode Pro",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-900 mb-8 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-zinc-900 mb-8">Contact Us</h1>

      <div className="prose prose-zinc max-w-none">
        <p className="text-zinc-600 mb-8">
          Have questions, feedback, or need assistance? We're here to help!
        </p>

        <div className="bg-zinc-50 rounded-xl p-8 border border-zinc-100 mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-zinc-600 mb-6">
            The best way to reach us is via email. We typically respond within
            24-48 hours.
          </p>

          <div className="flex items-center gap-3 text-zinc-700">
            <span className="font-medium">Email:</span>
            <a
              href="mailto:contact@inspectmode.xyz"
              className="text-blue-600 hover:underline"
            >
              contact@inspectmode.xyz
            </a>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          Support Hours
        </h2>
        <p className="text-zinc-600 mb-4">
          Our support team is available Monday through Friday, 9:00 AM to 5:00
          PM (EST).
        </p>
      </div>
    </div>
  );
}
