export function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Super Inspect. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
          <a href="mailto:support@superinspect.dev" className="hover:text-gray-600 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
