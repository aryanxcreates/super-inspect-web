/**
 * Polar license key activation/deactivation using the official SDK.
 * Configure in Polar: trial & subscription benefits = 1 activation, deactivation disabled.
 * Lifetime benefit = 3 activations, deactivation enabled.
 */
import { polar } from "./polar";

const POLAR_ORG_ID = process.env.POLAR_ORGANIZATION_ID;

export interface PolarActivationResult {
  id: string;
  license_key_id: string;
  label: string | null;
  created_at: string;
}

/** Server-side: activate a license key for a device. Returns activation id or throws. */
export async function polarActivate(
  key: string,
  label: string
): Promise<PolarActivationResult> {
  if (!POLAR_ORG_ID) {
    throw new Error("Missing POLAR_ORGANIZATION_ID");
  }

  try {
    const res = await polar.licenseKeys.activate({
      key: key.trim(),
      organizationId: POLAR_ORG_ID,
      label: label || "device",
    });

    // Use loose typing here to be compatible with different SDK / casing versions.
    const data = res as any;

    return {
      id: data.id as string,
      license_key_id: (data.licenseKeyId ?? data.license_key_id) as string,
      label: (data.label ?? null) as string | null,
      created_at: (data.createdAt ?? data.created_at) as string,
    };
  } catch (err: any) {
    const status = err?.status ?? err?.statusCode;
    if (status === 403) {
      throw new Error("LICENSE_ACTIVATION_LIMIT_REACHED");
    }
    if (status === 404) {
      throw new Error("LICENSE_KEY_NOT_FOUND");
    }
    throw err;
  }
}

/** Server-side: deactivate an activation (e.g. from dashboard for lifetime users). */
export async function polarDeactivate(
  key: string,
  activationId: string
): Promise<void> {
  if (!POLAR_ORG_ID) {
    throw new Error("Missing POLAR_ORGANIZATION_ID");
  }

  try {
    await polar.licenseKeys.deactivate({
      key: key.trim(),
      organizationId: POLAR_ORG_ID,
      activationId,
    });
  } catch (err: any) {
    const status = err?.status ?? err?.statusCode;
    if (status === 404) {
      throw new Error("ACTIVATION_NOT_FOUND");
    }
    throw err;
  }
}

/**
 * Validate license key (optional activation_id).
 * Uses customer-portal endpoint (no auth). When activation_id is set, Polar checks that this device is still activated.
 */
export async function polarValidate(
  key: string,
  activationId?: string | null
): Promise<{ valid: boolean }> {
  if (!POLAR_ORG_ID) {
    return { valid: false };
  }

  try {
    const res = await polar.customerPortal.licenseKeys.validate({
      key: key.trim(),
      organizationId: POLAR_ORG_ID,
      activationId: activationId ?? undefined,
    });
    return { valid: !!res.id };
  } catch {
    return { valid: false };
  }
}
