import { NextResponse } from "next/server";

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://inspectmode.xyz"      // your real domain
    : "http://localhost:3000";       // dev app

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function withCors<T extends NextResponse>(response: T): T {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function handleCorsOptions() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}