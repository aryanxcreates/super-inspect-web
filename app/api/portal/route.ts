import { CustomerPortal } from "@polar-sh/nextjs";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (req: NextRequest) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return "";

    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: { polarCustomerId: true },
    });

    return profile?.polarCustomerId ?? "";
  },
  server: (process.env.POLAR_SERVER as "sandbox" | "production") ?? "sandbox",
});
