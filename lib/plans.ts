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
    name: "Free (no license)",
    price: "$0",
    priceDetail: "",
    features: ["No active plan"],
  },
  trial: {
    name: "Free trial",
    price: "$0",
    priceDetail: "Limited-time access",
    features: [
      "All inspection tools",
      "Copy CSS properties",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
    ],
  },
  subscription: {
    name: "Subscription",
    price: "$9",
    priceDetail: "per month",
    highlighted: true,
    features: [
      "All inspection tools",
      "Copy CSS properties",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
    ],
  },
  lifetime: {
    name: "Lifetime",
    price: "$29",
    priceDetail: "one-time payment",
    features: [
      "All inspection tools",
      "Pay once, use forever",
      "All future features included",
      "No recurring charges",
      "Priority support",
    ],
  },
};

export function hasAccess(plan: Plan, trialEndsAt?: Date | string | null): boolean {
  if (plan === "subscription" || plan === "lifetime") return true;
  if (plan === "trial" && trialEndsAt) {
    return new Date(trialEndsAt) > new Date();
  }
  return false;
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
