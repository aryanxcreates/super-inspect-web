/**
 * Polar license benefit IDs (Product → Benefits → License benefit in dashboard).
 * Used to filter license keys by benefit when a customer has multiple (e.g. trial + subscription).
 *
 * Safe to keep in code: these are resource IDs, not secrets. Only POLAR_ACCESS_TOKEN
 * and POLAR_WEBHOOK_SECRET must stay in env and never be committed.
 */

/** Sandbox (local / testing) – replace with your sandbox product benefit IDs. */
const POLAR_BENEFIT_IDS_SANDBOX = {
  trial: "66ee5d12-3931-4bf9-9be7-6aec69e4cc16",
  subscription: "15c073bc-1469-44b4-a1b7-ec6e9fee12cf",
  lifetime: "64a981e3-1467-4eeb-aee1-40963fbea833",
} as const;

/** Production – replace with your production product benefit IDs. */
const POLAR_BENEFIT_IDS_PRODUCTION = {
  trial: "8e195790-ffb0-4267-a1c4-d81495753824",
  subscription: "b3bdc2a4-b8ba-4e7b-92aa-b57dbf43173c",
  lifetime: "832e4575-772f-4ab4-929f-d8dab35220ff",
} as const;

const isProduction = process.env.POLAR_SERVER === "production";

/** Active benefit IDs for the current environment (sandbox vs production). */
export const POLAR_BENEFIT_IDS = isProduction
  ? POLAR_BENEFIT_IDS_PRODUCTION
  : POLAR_BENEFIT_IDS_SANDBOX;

export type PolarPlanKey = keyof typeof POLAR_BENEFIT_IDS;
