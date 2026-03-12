import { Webhooks } from "@polar-sh/nextjs";
import { prisma } from "@/lib/prisma";
import { polar } from "@/lib/polar";

/**
 * Look up the current Polar license for a given Polar customer id.
 *
 * Uses the TypeScript SDK to list license keys for the configured organization
 * and tries to find a key whose `customer_id` matches `polarCustomerId`. Falls
 * back to the first key on the first page if there is no direct match.
 * Returns `{ key, expiresAt }` where both fields can be `null` if no license
 * can be resolved.
 */
async function fetchLicenseForCustomer(polarCustomerId: string) {
  const organizationId = process.env.POLAR_ORGANIZATION_ID;

  if (!organizationId) {
    return { key: null as string | null, expiresAt: null as string | null };
  }

  const result = await polar.licenseKeys.list({
    organizationId,
    limit: 100,
  });

  for await (const page of result as any) {
    const items =
      (page as {
        items?: Array<{
          key?: string | null;
          customer_id?: string | null;
          expires_at?: string | null;
        }>;
      }).items ?? [];

    const matchForCustomer =
      items.find(
        (item) => item.customer_id && item.customer_id === polarCustomerId
      ) ?? items[0];

    if (matchForCustomer?.key) {
      return {
        key: matchForCustomer.key ?? null,
        expiresAt: matchForCustomer.expires_at ?? null,
      };
    }
  }

  return { key: null, expiresAt: null };
}

/**
 * Webhook endpoint that keeps local profiles in sync with Polar.
 *
 * - onSubscriptionCreated: attach Polar customer & subscription ids
 *   to an existing profile.
 * - onSubscriptionCanceled: reset the profile back to a free plan
 *   when the subscription is canceled.
 * - onOrderPaid: when a plan-related order is paid (trial/pro/lifetime),
 *   fetch the Polar license key and update the profile's plan, license key,
 *   and trial window accordingly.
 */
export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onSubscriptionCreated: async (payload) => {
    const sub = payload.data;
    const customerId = sub.customerId;
    const email = sub.customer.email;

    const profile = await prisma.profile.findFirst({
      where: { email },
      select: { id: true },
    });

    if (!profile) return;

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        polarCustomerId: customerId,
        polarSubscriptionId: sub.id,
      },
    });
  },

  onSubscriptionCanceled: async (payload) => {
    const sub = payload.data;
    const customerId = sub.customerId;

    await prisma.profile.updateMany({
      where: { polarCustomerId: customerId },
      data: {
        plan: "free",
        polarSubscriptionId: null,
        trialEndsAt: null,
      },
    });
  },

  onOrderPaid: async (payload) => {
    const order = payload.data;
    const email = order.customer.email;
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

    // Try to fetch the actual license key + expiry from Polar
    let licenseKey: string | null = null;
    let licenseExpiresAt: Date | null = null;
    try {
      const license = await fetchLicenseForCustomer(order.customerId);
      licenseKey = license.key;
      if (license.expiresAt) {
        licenseExpiresAt = new Date(license.expiresAt);
      }
    } catch {
      licenseKey = null;
      licenseExpiresAt = null;
    }

    // Use Polar's own license expiry if present; otherwise leave as null.
    const trialEndsAt = licenseExpiresAt ?? null;

    if (isSubscription) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          plan: "subscription",
          polarCustomerId: order.customerId,
          licenseKey: licenseKey ?? undefined,
          trialEndsAt,
        },
      });
    } else if (isLifetime) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          plan: "lifetime",
          polarCustomerId: order.customerId,
          licenseKey: licenseKey ?? undefined,
          trialEndsAt,
        },
      });
    } else if (isTrial) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          plan: "trial",
          polarCustomerId: order.customerId,
          trialEndsAt,
          licenseKey: licenseKey ?? undefined,
        },
      });
    }
  },
});
