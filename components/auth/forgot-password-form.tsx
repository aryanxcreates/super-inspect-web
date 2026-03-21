"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/** Must match a URL allowed in Supabase Auth → Redirect URLs (include query if used). */
function getPasswordResetRedirectUrl(origin: string) {
  const path = "/auth/update-password";
  return `${origin}/auth/callback?redirect=${encodeURIComponent(path)}`;
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();

  const source = searchParams.get("source");
  const returnTo = searchParams.get("returnTo");
  const isExtension = source === "extension" && returnTo?.startsWith("chrome-extension://");

  const loginHref = isExtension
    ? `/login?source=extension&returnTo=${encodeURIComponent(returnTo!)}`
    : "/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: getPasswordResetRedirectUrl(window.location.origin),
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="w-full max-w-[min(100%,24rem)] text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Check your email
        </h1>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
          If an account exists for <strong className="text-gray-700">{email}</strong>, we sent a
          link to reset your password. The link expires after a short time.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          <Link href={loginHref} className="text-blue-600 hover:text-blue-700 font-medium">
            Back to log in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[min(100%,24rem)]">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter your email and we&apos;ll send you a reset link.
        </p>
        {isExtension && (
          <p className="text-xs text-blue-600 mt-3 bg-blue-50 px-3 py-1.5 rounded-lg inline-block max-w-full">
            After resetting, sign in here to return to the extension.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="forgot-email" className="sr-only">
            Email
          </label>
          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer shadow-sm shadow-blue-600/20"
        >
          {loading ? "Sending link…" : "Send reset link"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-8">
        <Link href={loginHref} className="text-blue-600 hover:text-blue-700 font-medium">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
