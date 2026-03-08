import type { Plan, Feature, Action } from "./plans";

/**
 * Feature gating matrix.
 * Each feature+action pair lists which plans can access it.
 * To gate a new feature, just add a row here.
 */
const GATES: Record<Feature, Partial<Record<Action, Plan[]>>> = {
  inspect: {
    view: ["free", "pro", "lifetime"],
    copy: ["pro", "lifetime"],
    edit: ["pro", "lifetime"],
  },
  assets: {
    view: ["free", "pro", "lifetime"],
    copy: ["pro", "lifetime"],
    download: ["pro", "lifetime"],
  },
  colors: {
    view: ["free", "pro", "lifetime"],
    copy: ["pro", "lifetime"],
    pick: ["pro", "lifetime"],
  },
  fonts: {
    view: ["free", "pro", "lifetime"],
    copy: ["pro", "lifetime"],
  },
};

export function canAccess(plan: Plan, feature: Feature, action: Action): boolean {
  return GATES[feature]?.[action]?.includes(plan) ?? false;
}

export function isPaid(plan: Plan): boolean {
  return plan === "pro" || plan === "lifetime";
}
