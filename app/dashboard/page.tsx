import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { Plan } from "@/lib/plans";
import { 
  ShieldCheck, 
  Monitor, 
  Zap, 
  Download, 
  BookOpen, 
  HelpCircle, 
  Copy, 
  Check,
  Laptop
} from "lucide-react";
import { CopyButton } from "@/components/dashboard/copy-button";

export const metadata = { title: "Dashboard — Snap Inspect" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const profile = await prisma.profile.findUnique({
    where: { id: user!.id },
    select: { plan: true, licenseKey: true, createdAt: true, email: true },
  });

  const plan = (profile?.plan ?? "free") as Plan;
  const licenseKey = profile?.licenseKey ?? "No active license";
  const memberSince = profile?.createdAt 
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "Unknown";

  // Mock data for devices since we don't have a table yet
  const devices = [
    { id: 1, name: "Chrome 145", type: "browser", os: "Windows 10/11", active: true, current: true, activatedAt: "Mar 3, 2026" },
  ];
  const maxDevices = 3;
  const activeDevicesCount = devices.length;
  const progressPercentage = (activeDevicesCount / maxDevices) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-500 text-lg">
          Manage your Snap Inspect license and devices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* License Details Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">License Details</h2>
              <p className="text-gray-500 text-sm">Your Snap Inspect license information</p>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">License Key</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-50 px-4 py-3 rounded-lg text-sm font-mono text-gray-900 border border-gray-200">
                  {licenseKey}
                </code>
                <CopyButton value={licenseKey} />
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-500">Plan</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800 uppercase tracking-wide">
                {plan}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-500">Email</span>
              <span className="text-sm font-medium text-gray-900">{user?.email}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm font-medium text-gray-500">Seats</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-500">Member Since</span>
              <span className="text-sm font-medium text-gray-900">{memberSince}</span>
            </div>
          </div>
        </div>

        {/* Active Devices & Quick Actions Column */}
        <div className="flex flex-col gap-8">
          
          {/* Active Devices Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <Monitor size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Active Devices</h2>
                <p className="text-gray-500 text-sm">Manage your activated devices</p>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors mb-6 cursor-pointer shadow-sm shadow-blue-200">
              Activate Extension on This Device
            </button>

            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-900">{activeDevicesCount} / {maxDevices} devices activated</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Activated Devices</h3>
              {devices.map((device) => (
                <div key={device.id} className="flex items-center gap-4 p-3 bg-green-50/50 border border-green-100 rounded-xl">
                  <div className="p-2 bg-white rounded-lg border border-green-100 text-gray-600">
                    <Laptop size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{device.name}</p>
                      {device.current && (
                        <span className="px-1.5 py-0.5 bg-green-200 text-green-800 text-[10px] font-bold rounded uppercase tracking-wider">
                          This Browser
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{device.os} • Activated {device.activatedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex-1">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
                <Zap size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                <p className="text-gray-500 text-sm">Get started with Snap Inspect</p>
              </div>
            </div>

            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <Download size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Install Extension</p>
                    <p className="text-xs text-gray-500">Add to Chrome browser</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
              </a>

              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <BookOpen size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Documentation</p>
                    <p className="text-xs text-gray-500">Learn how to use all tools</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
              </a>

              <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200 transition-colors">
                    <HelpCircle size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-900">Get Support</p>
                    <p className="text-xs text-gray-500">Contact our team</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
