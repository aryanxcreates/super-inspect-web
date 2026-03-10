import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { getAccessReason, hasAccess } from "@/lib/plans";
import type { Plan } from "@/lib/plans";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { hasAccess: false, reason: "none", error: "Missing token" },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { hasAccess: false, reason: "none", error: "Invalid token" },
        { status: 401 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { id: payload.userId },
      select: { plan: true, trialEndsAt: true, email: true, licenseKey: true },
    });

    if (!profile) {
      return NextResponse.json({ hasAccess: false, reason: "none" });
    }

    const plan = profile.plan as Plan;
    const access = hasAccess(plan, profile.trialEndsAt);
    const reason = getAccessReason(plan, profile.trialEndsAt);

    return NextResponse.json({
      hasAccess: access,
      reason,
      plan,
      email: profile.email,
      trialEndsAt: profile.trialEndsAt?.toISOString() ?? null,
      licenseKey: profile.licenseKey ?? null,
    });
  } catch {
    return NextResponse.json(
      { hasAccess: false, reason: "none", error: "Server error" },
      { status: 500 }
    );
  }
}
