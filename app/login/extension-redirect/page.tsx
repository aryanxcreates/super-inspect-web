"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ExtensionRedirectInner() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [status, setStatus] = useState<"loading" | "redirecting" | "error">("loading");

  useEffect(() => {
    if (!returnTo?.startsWith("chrome-extension://")) {
      setStatus("error");
      return;
    }

    async function getTokenAndRedirect() {
      try {
        const res = await fetch("/api/auth/extension-token");
        const { token } = await res.json();
        if (token) {
          setStatus("redirecting");
          window.location.href = `${returnTo}#token=${token}`;
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }

    getTokenAndRedirect();
  }, [returnTo]);

  return (
    <div className="text-center">
      {status === "loading" && (
        <>
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Connecting to extension...</p>
        </>
      )}
      {status === "redirecting" && (
        <p className="text-gray-600">Redirecting back to InspectMode Pro...</p>
      )}
      {status === "error" && (
        <p className="text-red-500">Something went wrong. Please try logging in again from the extension.</p>
      )}
    </div>
  );
}

export default function ExtensionRedirectPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense fallback={null}>
        <ExtensionRedirectInner />
      </Suspense>
    </main>
  );
}
