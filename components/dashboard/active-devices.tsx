"use client";

import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

interface Device {
  id: string;
  label: string;
  activatedAt: string;
}

interface DevicesResponse {
  devices: Device[];
  plan: string;
  maxDevices: number;
  canDeactivate: boolean;
}

export function ActiveDevices() {
  const [data, setData] = useState<DevicesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);

  const fetchDevices = async () => {
    try {
      const res = await fetch("/api/devices");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setData({
          devices: [],
          plan: "free",
          maxDevices: 0,
          canDeactivate: false,
        });
      }
    } catch {
      setData({
        devices: [],
        plan: "free",
        maxDevices: 0,
        canDeactivate: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDeactivate = async (activationId: string) => {
    setDeactivatingId(activationId);
    try {
      const res = await fetch("/api/license/deactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activationId }),
      });
      if (res.ok) {
        await fetchDevices();
      }
    } finally {
      setDeactivatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-green-50 rounded-xl text-green-600">
            <Monitor size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Active Devices</h2>
            <p className="text-zinc-500 text-sm">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  const devices = data?.devices ?? [];
  const maxDevices = data?.maxDevices ?? 0;
  const canDeactivate = data?.canDeactivate ?? false;
  const count = devices.length;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-100">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-green-50 rounded-xl text-green-600">
          <Monitor size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900">Active Devices</h2>
          <p className="text-zinc-500 text-sm">Manage your activated devices</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span className="text-zinc-900">
            {count} / {maxDevices} devices activated
          </span>
        </div>
        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
            style={{
              width: maxDevices
                ? `${Math.min(100, (count / maxDevices) * 100)}%`
                : "0%",
            }}
          />
        </div>
      </div>

      {maxDevices === 0 ? (
        <p className="text-sm text-zinc-400">
          Start a trial or subscribe to activate devices with your license key.
        </p>
      ) : (
        <>
          {devices.length > 0 && (
            <ul className="space-y-3 mb-4">
              {devices.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between py-3 px-3 rounded-lg bg-zinc-50 border border-zinc-100"
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-zinc-900">
                      {(d.label || "Device").split(" · ")[0]}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {(() => {
                        const parts = (d.label || "").split(" · ");
                        const os =
                          parts.length > 1 ? parts.slice(1).join(" · ") : null;
                        const date = new Date(d.activatedAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        );
                        return os
                          ? `${os} · Activated ${date}`
                          : `Activated ${date}`;
                      })()}
                    </p>
                  </div>
                  {canDeactivate && (
                    <button
                      type="button"
                      onClick={() => handleDeactivate(d.id)}
                      disabled={!!deactivatingId}
                      className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                    >
                      {deactivatingId === d.id ? "Removing…" : "Deactivate"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {!canDeactivate && count === 1 && (
            <p className="text-xs text-zinc-500">
              Trial and Subscription are limited to one device. Upgrade to
              Lifetime to use up to 3 devices and manage them here.
            </p>
          )}
          {canDeactivate && count < maxDevices && (
            <p className="text-sm text-zinc-400">
              Install the extension and enter your license key to activate
              another device.
            </p>
          )}
        </>
      )}
    </div>
  );
}
