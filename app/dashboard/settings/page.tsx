import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Settings — Snap Inspect" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const profile = await prisma.profile.findUnique({
    where: { id: user!.id },
    select: { licenseKey: true, createdAt: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your account</p>

      <div className="space-y-6 max-w-lg">
        {/* Email */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="text-xs font-medium text-gray-500">Email</label>
          <p className="text-sm text-gray-900 mt-1">{user!.email}</p>
        </div>

        {/* License key */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="text-xs font-medium text-gray-500">License Key</label>
          {profile?.licenseKey ? (
            <p className="text-sm text-gray-900 font-mono mt-1 break-all">{profile.licenseKey}</p>
          ) : (
            <p className="text-sm text-gray-400 mt-1">No license key. Upgrade your plan to get one.</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            Use this key in the Chrome extension to unlock Pro features.
          </p>
        </div>

        {/* Member since */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="text-xs font-medium text-gray-500">Member since</label>
          <p className="text-sm text-gray-900 mt-1">
            {profile?.createdAt
              ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}
