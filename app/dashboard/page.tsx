import { createClient } from "@/lib/supabase/server";
import { PLAN_INFO } from "@/lib/plans";
import type { Plan } from "@/lib/plans";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Dashboard — Super Inspect" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const profile = await prisma.profile.findUnique({
    where: { id: user!.id },
    select: { plan: true, licenseKey: true, createdAt: true },
  });

  const plan = (profile?.plan ?? "free") as Plan;
  const planInfo = PLAN_INFO[plan];

  const totalUsage = await prisma.usageLog.count({
    where: { userId: user!.id },
  });

  const featureRows = await prisma.usageLog.findMany({
    where: { userId: user!.id },
    select: { feature: true },
  });

  const featureCounts: Record<string, number> = {};
  for (const row of featureRows) {
    featureCounts[row.feature] = (featureCounts[row.feature] ?? 0) + 1;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Welcome back, {user!.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Current Plan" value={planInfo.name} detail={`${planInfo.price} ${planInfo.priceDetail}`} />
        <StatCard label="Total Actions" value={String(totalUsage)} detail="all time" />
        <StatCard
          label="License Key"
          value={profile?.licenseKey ? "Active" : "None"}
          detail={profile?.licenseKey ?? "Upgrade to get a key"}
          mono
        />
      </div>

      {Object.keys(featureCounts).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Usage by Feature</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(featureCounts).map(([feature, count]) => (
              <div key={feature} className="text-center p-3 rounded-lg bg-gray-50">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-500 capitalize mt-1">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, detail, mono }: { label: string; value: string; detail: string; mono?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-medium text-gray-500 mb-2">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className={`text-xs text-gray-400 mt-1 truncate ${mono ? "font-mono" : ""}`}>{detail}</p>
    </div>
  );
}
