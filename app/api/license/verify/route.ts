import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";
import { canInspect, canUsePro, getAccessReason } from "@/lib/plans";
import { polarValidate } from "@/lib/polar-activations";
import type { Plan } from "@/lib/plans";

export async function POST(request: NextRequest) {
  try {
    const { licenseKey, activationId } = await request.json();

    if (!licenseKey || typeof licenseKey !== "string") {
      return NextResponse.json(
        {
          hasAccess: false,
          canInspect: false,
          canUsePro: false,
          reason: "none",
          error: "Missing license key",
        },
        { status: 400 }
      );
    }

    const profile = await prisma.profile.findFirst({
      where: { licenseKey: licenseKey.trim() },
      select: { id: true, email: true, plan: true, trialEndsAt: true },
    });

    if (!profile) {
      return NextResponse.json({
        hasAccess: false,
        canInspect: false,
        canUsePro: false,
        reason: "none",
        error: "Invalid license key",
      });
    }

    const plan = profile.plan as Plan;
    let pro = canUsePro(plan, profile.trialEndsAt);
    const inspect = canInspect(plan, profile.trialEndsAt);

    if (pro && activationId && typeof activationId === "string") {
      const { valid } = await polarValidate(licenseKey.trim(), activationId);
      if (!valid) {
        pro = false;
      }
    }

    const reason = getAccessReason(plan, profile.trialEndsAt);

    const accessToken = await signToken({
      userId: profile.id,
      email: profile.email ?? "",
    });

    return NextResponse.json({
      accessToken,
      hasAccess: pro,
      canInspect: inspect,
      canUsePro: pro,
      reason,
      plan,
      email: profile.email,
      trialEndsAt: profile.trialEndsAt?.toISOString() ?? null,
    });
  } catch {
    return NextResponse.json(
      {
        hasAccess: false,
        canInspect: false,
        canUsePro: false,
        reason: "none",
        error: "Server error",
      },
      { status: 500 }
    );
  }
}
