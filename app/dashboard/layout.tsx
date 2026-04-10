import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/shell";
import { prisma } from "@/lib/prisma";
import type { Plan } from "@/lib/plans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { plan: true },
  });

  return (
    <DashboardShell user={user} plan={(profile?.plan ?? "free") as Plan}>
      {children}
    </DashboardShell>
  );
}
