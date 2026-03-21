"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";
import { getPasswordPolicy } from "@/lib/auth/password-policy";

export function PasswordRequirements({ password }: { password: string }) {
  const policy = useMemo(() => getPasswordPolicy(password), [password]);

  return (
    <ul
      className="mt-3 m-0 list-none space-y-1.5 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2.5"
      aria-live="polite"
    >
      <PasswordRule ok={policy.minLength}>At least 8 characters</PasswordRule>
      <PasswordRule ok={policy.uppercase}>One uppercase letter</PasswordRule>
      <PasswordRule ok={policy.lowercase}>One lowercase letter</PasswordRule>
      <PasswordRule ok={policy.digit}>One digit</PasswordRule>
    </ul>
  );
}

function PasswordRule({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-xs">
      {ok ? (
        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
      ) : (
        <span
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white"
          aria-hidden
        />
      )}
      <span className={ok ? "text-gray-700" : "text-gray-400"}>{children}</span>
    </li>
  );
}
