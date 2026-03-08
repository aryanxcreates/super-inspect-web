import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { licenseKey, feature, action, metadata } = await request.json();

    if (!licenseKey || !feature || !action) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const profile = await prisma.profile.findFirst({
      where: { licenseKey },
      select: { id: true },
    });

    if (!profile) {
      return NextResponse.json({ error: "Invalid license" }, { status: 401 });
    }

    await prisma.usageLog.create({
      data: {
        userId: profile.id,
        feature,
        action,
        metadata: metadata ?? {},
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
