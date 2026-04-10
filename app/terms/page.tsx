import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — InspectMode Pro",
  description: "Terms and conditions for using InspectMode Pro and related services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-900 mb-8 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-zinc-900 mb-8">
        Terms & Conditions
      </h1>

      <div className="prose prose-zinc max-w-none">
        <p className="text-zinc-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          1. Agreement to Terms
        </h2>
        <p className="text-zinc-600 mb-4">
          By accessing or using InspectMode Pro, you agree to be bound by these
          Terms and Conditions and our Privacy Policy. If you do not agree to
          these terms, please do not use our services.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          2. License
        </h2>
        <p className="text-zinc-600 mb-4">
          InspectMode Pro grants you a revocable, non-exclusive,
          non-transferable, limited license to download, install and use the
          website/app strictly in accordance with the terms of this Agreement.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          3. Restrictions
        </h2>
        <p className="text-zinc-600 mb-4">
          You agree not to, and you will not permit others to:
        </p>
        <ul className="list-disc pl-6 mb-4 text-zinc-600 space-y-2">
          <li>
            License, sell, rent, lease, assign, distribute, transmit, host,
            outsource, disclose or otherwise commercially exploit the service or
            make the platform available to any third party.
          </li>
          <li>
            Modify, make derivative works of, disassemble, decrypt, reverse
            compile or reverse engineer any part of the service.
          </li>
          <li>
            Remove, alter or obscure any proprietary notice (including any
            notice of copyright or trademark) of InspectMode Pro or its
            affiliates, partners, suppliers or the licensors of the service.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          4. Intellectual Property
        </h2>
        <p className="text-zinc-600 mb-4">
          The service and its original content (excluding Content provided by
          you or other users), features and functionality are and will remain
          the exclusive property of InspectMode Pro and its licensors.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          5. Termination
        </h2>
        <p className="text-zinc-600 mb-4">
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          6. Changes to Terms
        </h2>
        <p className="text-zinc-600 mb-4">
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will try to
          provide at least 30 days' notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          7. Contact Us
        </h2>
        <p className="text-zinc-600 mb-4">
          If you have any questions about these Terms, please contact us at:{" "}
          <a
            href="mailto:contact@inspectmode.xyz"
            className="text-blue-600 hover:underline"
          >
            contact@inspectmode.xyz
          </a>
        </p>
      </div>
    </div>
  );
}
