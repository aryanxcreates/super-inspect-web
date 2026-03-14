import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasAccess, getMaxDevices, type Plan } from "@/lib/plans";
import { polarActivate } from "@/lib/polar-activations";

export async function POST(request: NextRequest) {
  try {
    const { licenseKey, deviceLabel } = await request.json();

    if (!licenseKey || typeof licenseKey !== "string") {
      return NextResponse.json(
        { error: "Missing license key" },
        { status: 400 }
      );
    }

    const key = licenseKey.trim();
    const label = typeof deviceLabel === "string" && deviceLabel ? deviceLabel : "device";

    const profile = await prisma.profile.findFirst({
      where: { licenseKey: key },
      select: {
        id: true,
        plan: true,
        trialEndsAt: true,
        deviceActivations: { select: { polarActivationId: true, label: true } },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Invalid license key" }, { status: 404 });
    }

    const plan = profile.plan as Plan;
    if (!hasAccess(plan, profile.trialEndsAt)) {
      return NextResponse.json(
        { error: "License expired or inactive" },
        { status: 403 }
      );
    }

    const maxDevices = getMaxDevices(plan);
    if (maxDevices === 0) {
      return NextResponse.json(
        { error: "This plan does not support device activation" },
        { status: 403 }
      );
    }

    const existing = profile.deviceActivations;
    const sameDevice = existing.find((a) => a.label === label);

    if (sameDevice) {
      return NextResponse.json({
        activationId: sameDevice.polarActivationId,
        plan,
        message: "This device is already activated.",
      });
    }

    if (existing.length >= maxDevices) {
      return NextResponse.json(
        {
          error:
            plan === "lifetime"
              ? "Maximum devices (3) reached. Deactivate one from the dashboard first."
              : "This plan allows only one device. It is already activated elsewhere.",
        },
        { status: 403 }
      );
    }

    const activation = await polarActivate(key, label);

    await prisma.deviceActivation.create({
      data: {
        profileId: profile.id,
        polarActivationId: activation.id,
        label,
      },
    });

    return NextResponse.json({
      activationId: activation.id,
      plan,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    if (message === "LICENSE_ACTIVATION_LIMIT_REACHED") {
      return NextResponse.json(
        { error: "Activation limit reached for this license." },
        { status: 403 }
      );
    }
    if (message === "LICENSE_KEY_NOT_FOUND") {
      return NextResponse.json({ error: "Invalid license key" }, { status: 404 });
    }
    console.error("[license/activate]", err);
    return NextResponse.json(
      { error: "Activation failed" },
      { status: 500 }
    );
  }
}
