import Link from "next/link";

export const metadata = {
  title: "Refund Policy — Snap Inspect",
};

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Refund Eligibility</h2>
        <p className="text-gray-600 mb-4">
          We want you to be satisfied with Snap Inspect. If you are not completely satisfied with your purchase, we offer a refund within 14 days of your initial purchase.
        </p>
        <p className="text-gray-600 mb-4">
          To be eligible for a refund:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li>You must submit your request within 14 days of the purchase date.</li>
          <li>You must provide proof of purchase (order number or email receipt).</li>
          <li>For subscription services, the refund applies only to the current billing cycle if requested within the 14-day window.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Non-refundable Items</h2>
        <p className="text-gray-600 mb-4">
          Certain items or situations may not be eligible for refunds:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
          <li>Requests made after the 14-day refund period.</li>
          <li>Services that have been fully utilized or completed.</li>
          <li>Renewals of subscriptions where the user failed to cancel before the renewal date (though we may make exceptions on a case-by-case basis).</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. How to Request a Refund</h2>
        <p className="text-gray-600 mb-4">
          To request a refund, please contact our support team at <a href="mailto:support@snapinspect.dev" className="text-blue-600 hover:underline">support@snapinspect.dev</a> with your order details and the reason for your request. We will review your request and notify you of the approval or rejection of your refund.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Processing Refunds</h2>
        <p className="text-gray-600 mb-4">
          If your refund is approved, it will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.
        </p>
      </div>
    </div>
  );
}
