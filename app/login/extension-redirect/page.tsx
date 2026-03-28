"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AUTH_MESSAGE_TYPE = "INSPECTMODE_PRO_AUTH_TOKEN";

function sendTokenToExtension(token: string) {
  window.postMessage({ type: AUTH_MESSAGE_TYPE, token }, window.location.origin);
}

function ExtensionRedirectInner() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    let retryId: ReturnType<typeof setTimeout> | undefined;
    let retry2Id: ReturnType<typeof setTimeout> | undefined;
    let retry3Id: ReturnType<typeof setTimeout> | undefined;

    async function run() {
      try {
        const res = await fetch("/api/auth/extension-token");
        const { token } = await res.json();
        if (!token) {
          setStatus("error");
          return;
        }
        setStatus("done");
        sendTokenToExtension(token);
        // Some extensions/pages load content scripts a moment later; retry a few times.
        retryId = setTimeout(() => sendTokenToExtension(token), 300);
        retry2Id = setTimeout(() => sendTokenToExtension(token), 1200);
        retry3Id = setTimeout(() => sendTokenToExtension(token), 2500);
      } catch {
        setStatus("error");
      }
    }

    run();
    return () => {
      if (retryId) clearTimeout(retryId);
      if (retry2Id) clearTimeout(retry2Id);
      if (retry3Id) clearTimeout(retry3Id);
    };
  }, []);

  useEffect(() => {
    if (status !== "done") return;

    setSecondsLeft(5);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          router.push("/dashboard");
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [status, router]);

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
          <p className="text-gray-600 mt-3">
            Redirecting to dashboard in <span className="font-medium tabular-nums">{secondsLeft}</span>{" "}
            {secondsLeft === 1 ? "second" : "seconds"}…
          </p>
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
