export type Plan = "free" | "trial" | "subscription" | "lifetime";
export type AccessReason = "none" | "trial" | "subscription" | "lifetime" | "expired";

export interface PlanInfo {
  name: string;
  price: string;
  priceDetail: string;
  features: string[];
  highlighted?: boolean;
}

export const PLAN_INFO: Record<Plan, PlanInfo> = {
  free: {
    name: "Free",
    price: "$0",
    priceDetail: "Inspect included",
    features: [
      "CSS Inspect tool (free forever)",
      "Upgrade for AI Prompt, Assets, Colors & Fonts",
    ],
  },
  trial: {
    name: "Free trial",
    price: "$0",
    priceDetail: "Limited-time Pro access",
    features: [
      "Inspect + all Pro tools",
      "AI Element Copy Prompt",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
    ],
  },
  subscription: {
    name: "Subscription (legacy)",
    price: "$9",
    priceDetail: "per month",
    features: [
      "Inspect + all Pro tools",
      "AI Element Copy Prompt",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
    ],
  },
  lifetime: {
    name: "Lifetime",
    price: "$9",
    priceDetail: "one-time payment",
    features: [
      "Inspect + all Pro tools forever",
      "AI Element Copy Prompt",
      "Pay once, use forever",
      "All future features included",
      "No recurring charges",
      "Priority support",
      "Up to 3 devices",
    ],
  },
};

/** Pro tools: AI Prompt, Assets, Colors, Fonts. Legacy subscription still counts. */
export function canUsePro(plan: Plan, trialEndsAt?: Date | string | null): boolean {
  if (plan === "subscription" || plan === "lifetime") return true;
  if (plan === "trial" && trialEndsAt) {
    return new Date(trialEndsAt) > new Date();
  }
  return false;
}

/** Inspect is free for any authenticated account (including free / expired trial). */
export function canInspect(_plan?: Plan, _trialEndsAt?: Date | string | null): boolean {
  return true;
}

/** @deprecated Prefer canUsePro — kept as alias for license activate/verify. */
export function hasAccess(plan: Plan, trialEndsAt?: Date | string | null): boolean {
  return canUsePro(plan, trialEndsAt);
}

export function getAccessReason(plan: Plan, trialEndsAt?: Date | string | null): AccessReason {
  if (plan === "lifetime") return "lifetime";
  if (plan === "subscription") return "subscription";
  if (plan === "trial" && trialEndsAt) {
    return new Date(trialEndsAt) > new Date() ? "trial" : "expired";
  }
  return "none";
}

/** Max devices that can be activated per plan. Trial/subscription = 1, lifetime = 3. */
export function getMaxDevices(plan: Plan): number {
  if (plan === "lifetime") return 3;
  if (plan === "trial" || plan === "subscription") return 1;
  return 0;
}

/** Only lifetime users can deactivate a device from the dashboard. Trial/subscription are locked to one device. */
export function canDeactivateDevices(plan: Plan): boolean {
  return plan === "lifetime";
}
