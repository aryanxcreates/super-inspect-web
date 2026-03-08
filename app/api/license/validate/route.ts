import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { licenseKey } = await request.json();

    if (!licenseKey || typeof licenseKey !== "string") {
      return NextResponse.json({ valid: false, plan: "free" }, { status: 400 });
    }

    const profile = await prisma.profile.findFirst({
      where: { licenseKey: licenseKey.trim() },
      select: { plan: true, licenseKey: true },
    });

    if (!profile) {
      return NextResponse.json({ valid: false, plan: "free" });
    }

    return NextResponse.json({
      valid: true,
      plan: profile.plan,
    });
  } catch {
    return NextResponse.json({ valid: false, plan: "free" }, { status: 500 });
  }
}
