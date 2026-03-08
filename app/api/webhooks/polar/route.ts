import { Webhooks } from "@polar-sh/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onSubscriptionCreated: async (payload) => {
    const sub = payload.data;
    const customerId = sub.customerId;
    const email = sub.customer.email;

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (!profile) return;

    await supabaseAdmin
      .from("profiles")
      .update({
        plan: "pro",
        polar_customer_id: customerId,
        polar_subscription_id: sub.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);
  },

  onSubscriptionCanceled: async (payload) => {
    const sub = payload.data;
    const customerId = sub.customerId;

    await supabaseAdmin
      .from("profiles")
      .update({
        plan: "free",
        polar_subscription_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("polar_customer_id", customerId);
  },

  onOrderPaid: async (payload) => {
    const order = payload.data;
    const email = order.customer.email;

    // Check if this is the lifetime product
    const isLifetime = order.productId === process.env.NEXT_PUBLIC_POLAR_LIFETIME_PRODUCT_ID;
    if (!isLifetime) return;

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (!profile) return;

    await supabaseAdmin
      .from("profiles")
      .update({
        plan: "lifetime",
        polar_customer_id: order.customerId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);
  },
});
