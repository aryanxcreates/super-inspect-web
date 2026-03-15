import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getMaxDevices, canDeactivateDevices, type Plan } from "@/lib/plans";
import { handleCorsOptions, withCors } from "@/lib/cors";

export function OPTIONS() {
  return handleCorsOptions();
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return withCors(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: {
        plan: true,
        deviceActivations: {
          select: { id: true, polarActivationId: true, label: true, createdAt: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!profile) {
      return withCors(
        NextResponse.json({
          devices: [],
          plan: "free",
          maxDevices: 0,
          canDeactivate: false,
        })
      );
    }

    const plan = (profile.plan ?? "free") as Plan;
    const maxDevices = getMaxDevices(plan);
    const canDeactivate = canDeactivateDevices(plan);

    return withCors(
      NextResponse.json({
        devices: profile.deviceActivations.map((d) => ({
          id: d.polarActivationId,
          label: d.label,
          activatedAt: d.createdAt.toISOString(),
        })),
        plan,
        maxDevices,
        canDeactivate,
      })
    );
  } catch (err) {
    console.error("[devices GET]", err);
    return withCors(
      NextResponse.json(
        { error: "Server error" },
        { status: 500 }
      )
    );
  }
}
