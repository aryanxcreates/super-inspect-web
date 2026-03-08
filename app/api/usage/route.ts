import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { licenseKey, feature, action, metadata } = await request.json();

    if (!licenseKey || !feature || !action) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find user by license key
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("license_key", licenseKey)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Invalid license" }, { status: 401 });
    }

    await supabaseAdmin.from("usage_logs").insert({
      user_id: profile.id,
      feature,
      action,
      metadata: metadata ?? {},
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
