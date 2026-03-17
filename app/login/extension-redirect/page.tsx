"use client";

import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const AUTH_MESSAGE_TYPE = "INSPECTMODE_PRO_AUTH_TOKEN";

function sendTokenToExtension(token: string) {
  window.postMessage({ type: AUTH_MESSAGE_TYPE, token }, window.location.origin);
}

function ExtensionRedirectInner() {
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const tokenRef = useRef<string | null>(null);
  const [extensionHref, setExtensionHref] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  useEffect(() => {
    let retryId: ReturnType<typeof setTimeout>;

    async function run() {
      try {
        const res = await fetch("/api/auth/extension-token");
        const { token } = await res.json();
        if (!token) {
          setStatus("error");
          return;
        }
        tokenRef.current = token;
        setStatus("done");
        sendTokenToExtension(token);
        retryId = setTimeout(() => sendTokenToExtension(token), 300);

        if (returnTo?.startsWith("chrome-extension://")) {
          const url = new URL(returnTo);
          url.hash = `token=${encodeURIComponent(token)}`;
          const href = url.toString();
          setExtensionHref(href);
          // Auto-redirect is sometimes blocked by the browser; keep a user-click fallback too.
          try {
            window.location.replace(href);
          } catch {
            // ignore
          }
        }
      } catch {
        setStatus("error");
      }
    }

    run();
    return () => clearTimeout(retryId!);
  }, [returnTo]);

  return (
    <div className="text-center">
      {status === "loading" && (
        <>
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Connecting to extension...</p>
        </>
      )}
      {status === "done" && (
        <>
          <p className="text-green-600 font-medium">You’re logged in.</p>
          <p className="text-gray-600 mt-1">You can close this tab and use the extension.</p>
          {extensionHref && (
            <a
              href={extensionHref}
              className="inline-flex items-center justify-center mt-4 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Continue to extension
            </a>
          )}
          <button
            type="button"
            onClick={() => tokenRef.current && sendTokenToExtension(tokenRef.current)}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Send to extension again
          </button>
        </>
      )}
      {status === "error" && (
        <p className="text-red-500">Something went wrong. Try logging in again from the extension.</p>
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
