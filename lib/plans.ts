export type Plan = "free" | "trial" | "pro" | "lifetime";
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
    priceDetail: "",
    features: ["No active plan"],
  },
  trial: {
    name: "Trial",
    price: "$0",
    priceDetail: "7-day free trial",
    features: [
      "All inspection tools",
      "Copy CSS properties",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
    ],
  },
  pro: {
    name: "Pro",
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
  if (plan === "pro" || plan === "lifetime") return true;
  if (plan === "trial" && trialEndsAt) {
    return new Date(trialEndsAt) > new Date();
  }
  return false;
}

export function getAccessReason(plan: Plan, trialEndsAt?: Date | string | null): AccessReason {
  if (plan === "lifetime") return "lifetime";
  if (plan === "pro") return "subscription";
  if (plan === "trial" && trialEndsAt) {
    return new Date(trialEndsAt) > new Date() ? "trial" : "expired";
  }
  return "none";
}
