import { Webhooks } from "@polar-sh/nextjs";
import { prisma } from "@/lib/prisma";
import { polar } from "@/lib/polar";

async function fetchLicenseKeyForCustomer(polarCustomerId: string) {
  const organizationId = process.env.POLAR_ORGANIZATION_ID;

  if (!organizationId) {
    return null;
  }

  const result = await polar.licenseKeys.list({
    organizationId,
    limit: 50,
  });

  for await (const page of result as any) {
    const items =
      (page as { items?: Array<{ key?: string | null; user_id?: string | null }> }).items ??
      [];

    const matchForCustomer =
      items.find((item) => item.user_id && item.user_id === polarCustomerId) ??
      items[0];

    if (matchForCustomer?.key) {
      return matchForCustomer.key;
    }
  }

  return null;
}

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

    const isPro =
      productId === process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID;
    const isLifetime =
      productId === process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID;
    const isTrial =
      productId === process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID;

    if (!isPro && !isLifetime && !isTrial) return;

    const profile = await prisma.profile.findFirst({
      where: { email },
      select: { id: true },
    });

    if (!profile) return;

    // Try to fetch the actual license key from Polar
    let licenseKey: string | null = null;
    try {
      licenseKey = await fetchLicenseKeyForCustomer(order.customerId);
    } catch {
      licenseKey = null;
    }

    if (isPro) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          plan: "pro",
          polarCustomerId: order.customerId,
          licenseKey: licenseKey ?? undefined,
          trialEndsAt: null,
        },
      });
    } else if (isLifetime) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          plan: "lifetime",
          polarCustomerId: order.customerId,
          licenseKey: licenseKey ?? undefined,
          trialEndsAt: null,
        },
      });
    } else if (isTrial) {
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);

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
