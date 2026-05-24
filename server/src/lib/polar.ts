import { Polar } from '@polar-sh/sdk';
import { env } from '../config/env';

let cachedClient: Polar | null = null;

/**
 * Lazy singleton Polar SDK client.
 * Throws if POLAR_ACCESS_TOKEN is missing so misconfig fails fast at first use,
 * not silently on server boot.
 */
export function getPolar(): Polar {
  if (cachedClient) return cachedClient;

  if (!env.POLAR_ACCESS_TOKEN) {
    throw new Error(
      'POLAR_ACCESS_TOKEN is not set. Add it to server/.env to enable checkout.'
    );
  }

  cachedClient = new Polar({
    accessToken: env.POLAR_ACCESS_TOKEN,
    server: env.POLAR_SERVER,
  });

  return cachedClient;
}
