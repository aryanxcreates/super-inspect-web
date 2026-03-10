import { Webhooks } from "@polar-sh/nextjs";
import { prisma } from "@/lib/prisma";

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
        plan: "pro",
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
      },
    });
  },

  onOrderPaid: async (payload) => {
    const order = payload.data;
    const email = order.customer.email;
    const productId = order.productId;

    const isLifetime =
      productId === process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID;
    const isTrial =
      productId === process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID;

    if (!isLifetime && !isTrial) return;

    const profile = await prisma.profile.findFirst({
      where: { email },
      select: { id: true },
    });

    if (!profile) return;

    if (isLifetime) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          plan: "lifetime",
          polarCustomerId: order.customerId,
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
        },
      });
    }
  },
});
