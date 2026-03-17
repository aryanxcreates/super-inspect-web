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

  // Extension callback: DO NOT redirect to chrome-extension:// (often blocked as chrome-extension://invalid).
  // Instead, redirect to a web page that posts the token to the extension.
  if (redirect.startsWith("chrome-extension://")) {
    return NextResponse.redirect(`${origin}/login/extension-redirect`);
  }

  return NextResponse.redirect(`${origin}${redirect}`);
}
