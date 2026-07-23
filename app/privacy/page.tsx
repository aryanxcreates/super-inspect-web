import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — InspectMode Pro",
  description: "How InspectMode Pro collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-900 mb-8 inline-block"
      >
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-zinc-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-zinc max-w-none">
        <p className="text-zinc-600 mb-6">Last updated: July 24, 2026</p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          1. Introduction
        </h2>
        <p className="text-zinc-600 mb-4">
          Welcome to InspectMode Pro ("we," "our," or "us"). We respect your
          privacy and are committed to protecting your personal data. This
          privacy policy will inform you as to how we look after your personal
          data when you visit our website and use our Chrome extension, and
          tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          2. Data we collect
        </h2>
        <p className="text-zinc-600 mb-4">
          Below we explain the main types of information we collect when you use
          the InspectMode Pro website and Chrome extension.
        </p>
        <ul className="list-disc pl-6 mb-4 text-zinc-600 space-y-2">
          <li>
            <strong>Identity Data</strong> includes first name, last name,
            username or similar identifier.
          </li>
          <li>
            <strong>Contact Data</strong> includes email address and telephone
            number.
          </li>
          <li>
            <strong>Technical Data</strong> includes internet protocol (IP)
            address, your login data, browser type and version, time zone
            setting, browser plug-in types and versions, operating system and
            platform and other technology on the devices you use to access this
            website.
          </li>
          <li>
            <strong>Usage Data</strong> includes information about how you use
            our website, products and services.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          3. Chrome Extension Data Handling
        </h2>
        <p className="text-zinc-600 mb-4">
          This section explains specifically how the InspectMode Pro Chrome
          extension handles data, in line with the Chrome Web Store User Data
          Policy.
        </p>
        <ul className="list-disc pl-6 mb-4 text-zinc-600 space-y-2">
          <li>
            <strong>Account &amp; authentication.</strong> The extension
            requires you to sign in with an InspectMode Pro account. After you
            sign in, an authentication token and your current plan status are
            stored locally in the browser (via <code>chrome.storage</code>) so
            the extension can verify your access. You can remove this data at
            any time by logging out.
          </li>
          <li>
            <strong>License activation.</strong> When you activate a license, we
            send your license key and a device label (a short description of
            your browser and operating system, derived from your user agent) to
            our servers so we can manage the number of activated devices per
            license.
          </li>
          <li>
            <strong>Page content is processed locally.</strong> Inspection
            features (CSS inspection, color picking, font analysis, asset
            discovery, and AI prompt generation) read the content and styles of
            the web page you are actively inspecting entirely within your
            browser. This page content is <strong>not</strong> transmitted to
            our servers or any third party. AI prompts are generated locally and
            copied to your clipboard for you to paste into the coding tool of
            your choice.
          </li>
          <li>
            <strong>No selling of data.</strong> We do not sell or transfer your
            data to third parties, and we do not use it for purposes unrelated
            to the extension's single purpose of helping you inspect and rebuild
            web interfaces.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          4. How We Use Your Data
        </h2>
        <p className="text-zinc-600 mb-4">
          We will only use your personal data when the law allows us to. Most
          commonly, we will use your personal data in the following
          circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4 text-zinc-600 space-y-2">
          <li>
            Where we need to perform the contract we are about to enter into or
            have entered into with you.
          </li>
          <li>
            Where it is necessary for our legitimate interests (or those of a
            third party) and your interests and fundamental rights do not
            override those interests.
          </li>
          <li>
            Where we need to comply with a legal or regulatory obligation.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          5. Data Security
        </h2>
        <p className="text-zinc-600 mb-4">
          We have put in place appropriate security measures to prevent your
          personal data from being accidentally lost, used or accessed in an
          unauthorized way, altered or disclosed. In addition, we limit access
          to your personal data to those employees, agents, contractors and
          other third parties who have a business need to know.
        </p>

        <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
          6. Contact Us
        </h2>
        <p className="text-zinc-600 mb-4">
          If you have any questions about this privacy policy or our privacy
          practices, please contact us at:{" "}
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
