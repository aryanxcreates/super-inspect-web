import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { licenseKey } = await request.json();

    if (!licenseKey || typeof licenseKey !== "string") {
      return NextResponse.json({ valid: false, plan: "free" }, { status: 400 });
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("plan, license_key")
      .eq("license_key", licenseKey.trim())
      .single();

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
