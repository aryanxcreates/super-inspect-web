/**
 * Types for Polar webhook payloads and license key API responses.
 * Used by the Polar webhook handler to type incoming events and API data.
 */

/** Normalized license key item (snake_case). Used after parsing API response. */
export interface LicenseItem {
  key: string | null;
  customer_id: string | null;
  expires_at: string | null;
  created_at: string | null;
}

/**
 * Raw license key from Polar API. SDK may return camelCase, REST may return snake_case.
 */
export interface RawLicenseItem {
  key?: string;
  customer_id?: string;
  customerId?: string;
  expires_at?: string;
  expiresAt?: string;
  created_at?: string;
  createdAt?: string;
}

/** Result of fetching the current license for a customer. */
export interface LicenseResult {
  key: string | null;
  expiresAt: string | null;
}

/**
 * Paginated license list response. SDK may wrap items in result or return an array.
 */
export type LicensePage =
  | { result?: { items?: RawLicenseItem[] }; items?: RawLicenseItem[] }
  | RawLicenseItem[];

/** Payload for subscription.created webhook. */
export interface SubscriptionCreatedPayload {
  customerId: string;
  customer: { email?: string };
  productId?: string;
}

/** Payload for subscription.canceled webhook. */
export interface SubscriptionCanceledPayload {
  customerId: string;
}

/** Payload for order.paid webhook. */
export interface OrderPaidPayload {
  customerId: string;
  customer: { email?: string };
  productId: string;
}
