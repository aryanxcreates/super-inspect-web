import { Webhooks } from "@polar-sh/nextjs";
import { prisma } from "@/lib/prisma";
import { polar } from "@/lib/polar";
import { POLAR_BENEFIT_IDS } from "@/lib/polar-config";
import type {
  LicenseItem,
  LicensePage,
  LicenseResult,
  OrderPaidPayload,
  RawLicenseItem,
  SubscriptionCanceledPayload,
  SubscriptionCreatedPayload,
} from "@/lib/polar-webhook.types";

const PLACEHOLDER_UUID = "00000000-0000-0000-0000-000000000000";

function isValidBenefitId(id: string): boolean {
  return id !== "" && id !== PLACEHOLDER_UUID;
}

/** Resolve Polar benefit ID for a product (used to filter license keys by benefit). */
function getBenefitIdForProductId(productId: string): string | null {
  if (productId === process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID) {
    return isValidBenefitId(POLAR_BENEFIT_IDS.trial) ? POLAR_BENEFIT_IDS.trial : null;
  }
  if (productId === process.env.NEXT_PUBLIC_POLAR_SUBSCRIPTION_PRODUCT_ID) {
    return isValidBenefitId(POLAR_BENEFIT_IDS.subscription) ? POLAR_BENEFIT_IDS.subscription : null;
  }
  if (productId === process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID) {
    return isValidBenefitId(POLAR_BENEFIT_IDS.lifetime) ? POLAR_BENEFIT_IDS.lifetime : null;
  }
  return null;
}

function normalizeLicenseItem(raw: RawLicenseItem): LicenseItem {
  return {
    key: raw.key ?? null,
    customer_id: raw.customer_id ?? raw.customerId ?? null,
    expires_at: raw.expires_at ?? raw.expiresAt ?? null,
    created_at: raw.created_at ?? raw.createdAt ?? null,
  };
}

async function fetchLicenseForCustomer(
  polarCustomerId: string,
  benefitId?: string | null
): Promise<LicenseResult> {
  const organizationId = process.env.POLAR_ORGANIZATION_ID;
  if (!organizationId) {
    return { key: null, expiresAt: null };
  }

  const result = await polar.licenseKeys.list({
    organizationId,
    benefitId: benefitId ?? undefined,
    limit: 100,
  });

  const allItems: LicenseItem[] = [];
  for await (const page of result as AsyncIterable<LicensePage>) {
    const rawList = Array.isArray(page) ? page : (page.result?.items ?? page.items ?? []);
    allItems.push(...rawList.map(normalizeLicenseItem));
  }

  const forCustomer = allItems.filter(
    (item) => item.customer_id && item.customer_id === polarCustomerId
  );
  const candidates = forCustomer.length > 0 ? forCustomer : allItems;
  const withKey = candidates.filter((item) => item.key != null);
  const sorted = [...withKey].sort((a, b) =>
    (b.created_at ?? "").localeCompare(a.created_at ?? "")
  );
  const best = sorted[0] ?? null;

  if (!best?.key) {
    return { key: null, expiresAt: null };
  }

  return {
    key: best.key,
    expiresAt: best.expires_at,
  };
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onSubscriptionCreated: async (payload) => {
    try {
      const sub = payload.data as SubscriptionCreatedPayload;
      const email = sub.customer?.email;
      if (!email) {
        console.error("[polar:webhook] onSubscriptionCreated: missing customer email");
        return;
      }

      const profile = await prisma.profile.findFirst({
        where: { email },
        select: { id: true },
      });
      if (!profile) return;

      const benefitId = sub.productId ? getBenefitIdForProductId(sub.productId) : null;
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          polarCustomerId: sub.customerId,
          polarProductId: sub.productId ?? undefined,
          polarBenefitId: benefitId ?? undefined,
        },
      });
    } catch (err) {
      console.error("[polar:webhook] onSubscriptionCreated error", err);
      throw err;
    }
  },

  onSubscriptionCanceled: async (payload) => {
    try {
      const sub = payload.data as SubscriptionCanceledPayload;
      const customerId = sub.customerId;
      if (!customerId) {
        console.error("[polar:webhook] onSubscriptionCanceled: missing customerId");
        return;
      }
      await prisma.profile.updateMany({
        where: { polarCustomerId: customerId },
        data: {
          plan: "free",
          polarProductId: null,
          polarBenefitId: null,
          trialEndsAt: null,
        },
      });
    } catch (err) {
      console.error("[polar:webhook] onSubscriptionCanceled error", err);
      throw err;
    }
  },

  onOrderPaid: async (payload) => {
    try {
      const order = payload.data as OrderPaidPayload;
      const email = order.customer?.email;
      if (!email) {
        console.error("[polar:webhook] onOrderPaid: missing customer email");
        return;
      }

      const productId = order.productId;
      const isSubscription =
        productId === process.env.NEXT_PUBLIC_POLAR_SUBSCRIPTION_PRODUCT_ID;
      const isLifetime =
        productId === process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID;
      const isTrial =
        productId === process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID;

      if (!isSubscription && !isLifetime && !isTrial) return;

      const profile = await prisma.profile.findFirst({
        where: { email },
        select: { id: true },
      });
      if (!profile) return;

      const benefitId = getBenefitIdForProductId(productId);

      let licenseKey: string | null = null;
      let licenseExpiresAt: Date | null = null;
      try {
        const license = await fetchLicenseForCustomer(order.customerId, benefitId);
        licenseKey = license.key;
        if (license.expiresAt) {
          licenseExpiresAt = new Date(license.expiresAt);
        }
      } catch (err) {
        console.error("[polar:webhook] fetchLicenseForCustomer error", err);
      }

      const trialEndsAt = licenseExpiresAt;
      const plan = isSubscription ? "subscription" : isLifetime ? "lifetime" : "trial";

      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          plan,
          polarCustomerId: order.customerId,
          polarProductId: productId,
          polarBenefitId: benefitId ?? undefined,
          licenseKey: licenseKey ?? undefined,
          trialEndsAt,
        },
      });
    } catch (err) {
      console.error("[polar:webhook] onOrderPaid error", err);
      throw err;
    }
  },
});
