import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-4 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-700">
          &copy; {new Date().getFullYear()} InspectMode Pro. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-zinc-700">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/refund" className="hover:text-gray-600 transition-colors">Refund Policy</Link>
          <Link href="/contact" className="hover:text-gray-600 transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
}
