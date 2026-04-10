/**
 * Canonical site origin for metadata, sitemap, and robots.
 * Set `NEXT_PUBLIC_APP_URL` in production (e.g. https://inspectmode.xyz).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}
