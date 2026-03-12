import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { signToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/login?error=auth`);
  }

  // Ensure a profile row exists for this Supabase user
  const existingProfile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { id: true, plan: true },
  });

  await prisma.profile.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      email: user.email ?? null,
    },
    update: {
      email: user.email ?? null,
    },
  });

  // Extension callback: return an access token to the extension instead of redirecting to web UI
  if (redirect.startsWith("chrome-extension://")) {
    const token = await signToken({
      userId: user.id,
      email: user.email ?? "",
    });
    return NextResponse.redirect(`${redirect}#token=${token}`);
  }

  // For new web users with the default plan, start the Polar trial checkout immediately
  const isNewUser = !existingProfile;
  const trialProductId = process.env.NEXT_PUBLIC_POLAR_TRIAL_PRODUCT_ID;

  if (isNewUser && trialProductId && user.email) {
    const checkoutUrl = `${origin}/api/checkout?products=${encodeURIComponent(
      trialProductId
    )}&customerEmail=${encodeURIComponent(user.email)}`;
    return NextResponse.redirect(checkoutUrl);
  }

  return NextResponse.redirect(`${origin}${redirect}`);
}
