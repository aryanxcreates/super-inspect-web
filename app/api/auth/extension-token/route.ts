import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { signToken } from "@/lib/jwt";
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
        NextResponse.json({ error: "Not authenticated" }, { status: 401 })
      );
    }

    const token = await signToken({
      userId: user.id,
      email: user.email ?? "",
    });

    return withCors(NextResponse.json({ token }));
  } catch {
    return withCors(
      NextResponse.json({ error: "Server error" }, { status: 500 })
    );
  }
}
