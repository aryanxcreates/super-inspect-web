import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Settings — Super Inspect" };

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("license_key, created_at")
    .eq("id", user!.id)
    .single();

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
          {profile?.license_key ? (
            <p className="text-sm text-gray-900 font-mono mt-1 break-all">{profile.license_key}</p>
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
            {profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString("en-US", {
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
