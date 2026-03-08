export type Plan = "free" | "pro" | "lifetime";
export type Feature = "inspect" | "assets" | "colors" | "fonts";
export type Action = "view" | "copy" | "download" | "edit" | "pick";

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
    priceDetail: "forever",
    features: [
      "View inspect data",
      "View page assets",
      "View color palette",
      "View font list",
      "Limited to viewing only",
    ],
  },
  pro: {
    name: "Pro",
    price: "$9",
    priceDetail: "per month",
    highlighted: true,
    features: [
      "Everything in Free",
      "Copy CSS properties",
      "Download & copy assets",
      "Copy colors in HEX/RGB/HSL",
      "Copy font names & details",
      "Eyedropper color picker",
      "Priority support",
    ],
  },
  lifetime: {
    name: "Lifetime",
    price: "$29",
    priceDetail: "one-time payment",
    features: [
      "Everything in Pro",
      "Pay once, use forever",
      "All future features included",
      "No recurring charges",
    ],
  },
};
