import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import {
  canInspect,
  canUsePro,
  getAccessReason,
} from "@/lib/plans";
import type { Plan } from "@/lib/plans";
import { handleCorsOptions, withCors } from "@/lib/cors";

export function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return withCors(
        NextResponse.json(
          {
            hasAccess: false,
            canInspect: false,
            canUsePro: false,
            reason: "none",
            error: "Missing token",
          },
          { status: 401 }
        )
      );
    }

    const token = authHeader.slice(7);
    const payload = await verifyToken(token);
    if (!payload) {
      return withCors(
        NextResponse.json(
          {
            hasAccess: false,
            canInspect: false,
            canUsePro: false,
            reason: "none",
            error: "Invalid token",
          },
          { status: 401 }
        )
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { id: payload.userId },
      select: { plan: true, trialEndsAt: true, email: true, licenseKey: true },
    });

    if (!profile) {
      return withCors(
        NextResponse.json({
          hasAccess: false,
          canInspect: false,
          canUsePro: false,
          reason: "none",
        })
      );
    }

    const plan = profile.plan as Plan;
    const pro = canUsePro(plan, profile.trialEndsAt);
    const inspect = canInspect(plan, profile.trialEndsAt);
    const reason = getAccessReason(plan, profile.trialEndsAt);

    return withCors(
      NextResponse.json({
        hasAccess: pro,
        canInspect: inspect,
        canUsePro: pro,
        reason,
        plan,
        email: profile.email,
        trialEndsAt: profile.trialEndsAt?.toISOString() ?? null,
        licenseKey: profile.licenseKey ?? null,
      })
    );
  } catch {
    return withCors(
      NextResponse.json(
        {
          hasAccess: false,
          canInspect: false,
          canUsePro: false,
          reason: "none",
          error: "Server error",
        },
        { status: 500 }
      )
    );
  }
}
