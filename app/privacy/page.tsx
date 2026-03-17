import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — InspectMode Pro",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">Last updated: March 18, 2026</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
        <p className="text-gray-600 mb-4">
          Welcome to InspectMode Pro ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Data we collect</h2>
        <p className="text-gray-600 mb-4">
          Below we explain the main types of information we collect when you use the InspectMode Pro website and Chrome extension.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address and telephone number.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Data</h2>
        <p className="text-gray-600 mb-4">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal or regulatory obligation.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:contact@inspectmode.xyz" className="text-blue-600 hover:underline">contact@inspectmode.xyz</a>
        </p>
      </div>
    </div>
  );
}
