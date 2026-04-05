"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Puzzle } from "lucide-react";

const AUTH_MESSAGE_TYPE = "INSPECTMODE_PRO_AUTH_TOKEN";

function sendTokenToExtension(token: string) {
  window.postMessage(
    { type: AUTH_MESSAGE_TYPE, token },
    window.location.origin,
  );
}

/** viewBox 0–100; r=42 → circumference for stroke-dash animation */
const RING_C = 2 * Math.PI * 42;

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
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status !== "done" || secondsLeft !== 0) return;
    router.push("/dashboard");
  }, [status, secondsLeft, router]);

  return (
    <div className="text-center">
      {status === "loading" && (
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 ring-1 ring-blue-100">
            <Loader2
              className="h-8 w-8 animate-spin text-blue-600"
              aria-hidden
            />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Connecting to the extension
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Securing your session and sending your sign-in to InspectMode Pro…
          </p>
        </div>
      )}

      {status === "done" && (
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-zinc-900">
            You&apos;re signed in
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            You can close this tab and keep using the extension, or stay here —
            we&apos;ll take you to your dashboard next.
          </p>
          <div
            className="mt-8 flex flex-col items-center gap-3"
            role="status"
            aria-live="polite"
            aria-label={`Redirecting to dashboard in ${secondsLeft} seconds`}
          >
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Redirecting
            </span>
            <div className="relative h-36 w-36">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 100 100"
                aria-hidden
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  className="stroke-zinc-200"
                  strokeWidth="5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  className="stroke-blue-600 transition-[stroke-dashoffset] duration-1000 ease-linear"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={RING_C * (1 - secondsLeft / 5)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pb-1">
                <span className="text-4xl font-bold tabular-nums leading-none text-zinc-900">
                  {secondsLeft}
                </span>
                <span className="mt-1 text-xs font-medium text-zinc-400">
                  {secondsLeft === 1 ? "second" : "seconds"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
            <AlertCircle className="h-9 w-9 text-red-600" aria-hidden />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Couldn&apos;t finish sign-in
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Something went wrong while connecting to the extension. Close this
            tab and try signing in again from the extension.
          </p>
        </div>
      )}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100" />
      <div className="mx-auto h-4 w-48 rounded bg-zinc-100" />
      <div className="mx-auto h-3 w-full max-w-xs rounded bg-zinc-100" />
    </div>
  );
}

export default function ExtensionRedirectPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-linear-to-b from-zinc-50 to-zinc-100/80 px-4 py-10 sm:py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] sm:p-10">
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Puzzle className="h-6 w-6" aria-hidden />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Extension login
          </p>
          <h1 className="mt-2 text-xl font-bold tracking-tight text-zinc-900">
            InspectMode Pro
          </h1>
        </div>

        <Suspense fallback={<CardSkeleton />}>
          <ExtensionRedirectInner />
        </Suspense>
      </div>
    </main>
  );
}
