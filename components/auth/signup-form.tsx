"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { meetsPasswordPolicy } from "@/lib/auth/password-policy";
import { GoogleIcon } from "@/components/auth/google-icon";
import { PasswordRequirements } from "@/components/auth/password-requirements";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const source = searchParams.get("source");
  const returnTo = searchParams.get("returnTo");
  const isExtension =
    source === "extension" && returnTo?.startsWith("chrome-extension://");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!meetsPasswordPolicy(password)) {
      setError("Password must meet all requirements below.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: isExtension
          ? `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(returnTo!)}`
          : `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(true);
  };

  const handleOAuth = async (provider: "google") => {
    const supabase = createClient();

    const callbackParams = new URLSearchParams();
    if (isExtension && returnTo) {
      callbackParams.set(
        "redirect",
        `/login/extension-redirect?returnTo=${encodeURIComponent(returnTo)}`,
      );
    } else {
      callbackParams.set("redirect", "/dashboard");
    }

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?${callbackParams.toString()}`,
      },
    });
  };

  if (success) {
    return (
      <div className="w-full max-w-[min(100%,24rem)] text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
          Check your email
        </h1>
        <p className="text-sm text-zinc-500 mt-3 leading-relaxed">
          We sent a confirmation link to{" "}
          <strong className="text-zinc-700">{email}</strong>. Click it to
          activate your account.
        </p>
        <p className="text-sm text-zinc-500 mt-6">
          <Link
            href={
              isExtension
                ? `/login?source=extension&returnTo=${encodeURIComponent(returnTo!)}`
                : "/login"
            }
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to log in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[min(100%,24rem)]">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
          Create your account
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Start your free 3-day trial
        </p>
        {isExtension && (
          <p className="text-xs text-blue-600 mt-3 bg-blue-50 px-3 py-1.5 rounded-lg inline-block max-w-full">
            You&apos;ll be redirected back to the extension after signup
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          className="group w-full flex items-center justify-center gap-3 min-h-10 px-3 rounded border border-[#dadce0] bg-white text-sm font-medium text-[#3c4043] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-shadow hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 cursor-pointer"
        >
          <GoogleIcon className="h-[18px] w-[18px] shrink-0" />
          <span className="font-sans">Sign up with Google</span>
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-zinc-200" />
        <span className="text-xs text-zinc-500 font-medium">or</span>
        <div className="flex-1 h-px bg-zinc-200" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="signup-email" className="sr-only">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <PasswordRequirements password={password} />
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
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-8">
        Already have an account?{" "}
        <Link
          href={
            isExtension
              ? `/login?source=extension&returnTo=${encodeURIComponent(returnTo!)}`
              : "/login"
          }
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
