import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { canDeactivateDevices, type Plan } from "@/lib/plans";
import { polarDeactivate } from "@/lib/polar-activations";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { activationId } = await request.json();
    if (!activationId || typeof activationId !== "string") {
      return NextResponse.json(
        { error: "Missing activationId" },
        { status: 400 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        plan: true,
        licenseKey: true,
        deviceActivations: {
          where: { polarActivationId: activationId },
          select: { id: true },
        },
      },
    });

    if (!profile || !profile.licenseKey) {
      return NextResponse.json(
        { error: "No license or activation found" },
        { status: 404 }
      );
    }

    const plan = profile.plan as Plan;
    if (!canDeactivateDevices(plan)) {
      return NextResponse.json(
        {
          error:
            "Only Lifetime plan can deactivate devices from the dashboard. Trial and Subscription are locked to one device.",
        },
        { status: 403 }
      );
    }

    const activation = profile.deviceActivations[0];
    if (!activation) {
      return NextResponse.json(
        { error: "Activation not found or not yours" },
        { status: 404 }
      );
    }

    await polarDeactivate(profile.licenseKey, activationId);
    await prisma.deviceActivation.delete({
      where: { id: activation.id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    if (message === "ACTIVATION_NOT_FOUND") {
      return NextResponse.json(
        { error: "Activation not found" },
        { status: 404 }
      );
    }
    console.error("[license/deactivate]", err);
    return NextResponse.json(
      { error: "Deactivation failed" },
      { status: 500 }
    );
  }
}
